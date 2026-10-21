import test from "node:test";
import assert from "node:assert/strict";
import { align, normalize } from "../lib/alignment";
import { demoProvider, demoText } from "../lib/transcription";
import { stories } from "../lib/stories";
test("German punctuation, case, sharp s and composed umlauts", () => {
  assert.equal(
    align("„Die Straße ist schön!“", "die STRASSE ist schön").correct,
    4,
  );
  assert.equal(normalize("GRÜN!"), normalize("gru\u0308n"));
  assert.equal(align("Ich sehe 2 Sterne.", "ich sehe zwei Sterne").correct, 4);
});
test("omission does not shift the rest", () => {
  const r = align(
    "Der kleine Fuchs sieht den Mond.",
    "Der Fuchs sieht den Mond",
  );
  assert.deepEqual(
    r.words.map((w) => w.status),
    ["correct", "omitted", "correct", "correct", "correct", "correct"],
  );
});
test("insertion is separate from substitutions", () => {
  const r = align("Der Fuchs läuft.", "Der kleine Fuchs läuft");
  assert.equal(r.correct, 3);
  assert.deepEqual(r.extras, ["kleine"]);
});
test("substitution retains recognized text", () => {
  const r = align("Die Eule fliegt.", "Die Ente fliegt");
  assert.equal(r.words[1].status, "different");
  assert.equal(r.words[1].heard, "Ente");
  assert.equal(r.correct, 2);
});
test("empty inputs, punctuation only and trailing extra", () => {
  assert.equal(
    align("Hallo Welt", "").words.every((w) => w.status === "omitted"),
    true,
  );
  assert.deepEqual(align("", "Hallo").extras, ["Hallo"]);
  assert.equal(align("... —", "!").total, 0);
  assert.deepEqual(align("Hallo", "Hallo Welt").extras, ["Welt"]);
});
test("repeated words preserve match count", () => {
  assert.equal(align("der der Fuchs", "der Fuchs").correct, 2);
});
test("combined insertion deletion and replacement", () => {
  const r = align(
    "Heute geht der kleine Fuchs zum Wald",
    "Heute geht der Fuchs zum See jetzt",
  );
  assert.equal(r.correct, 5);
  assert.equal(r.words.filter((w) => w.status === "omitted").length, 1);
  assert.equal(r.extras.length, 1);
});
test("bounds input to prevent excessive allocations", () => {
  assert.throws(() => align("a", "a ".repeat(1001)), /1000/);
});
test("all sample stories round-trip and demo stays deterministic", () => {
  for (const s of stories) {
    const r = align(s.text, s.text);
    assert.equal(r.correct, r.total);
    assert.equal(demoText(s.text), demoText(s.text));
    assert.ok(align(s.text, demoText(s.text)).correct < r.total);
  }
});
test("transcription can be cancelled before and during work", async () => {
  const first = new AbortController();
  first.abort();
  await assert.rejects(
    demoProvider.transcribe({ reference: "Hallo", signal: first.signal }),
    { name: "AbortError" },
  );
  const second = new AbortController();
  const pending = demoProvider.transcribe({
    reference: "Hallo",
    signal: second.signal,
  });
  second.abort();
  await assert.rejects(pending, { name: "AbortError" });
});
