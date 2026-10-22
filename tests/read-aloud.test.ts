import test from "node:test";
import assert from "node:assert/strict";
import {
  localGermanVoices,
  spokenWords,
  wordAtBoundary,
} from "../lib/read-aloud";
const voice = (name: string, lang: string, localService: boolean) => ({
  name,
  lang,
  localService,
  voiceURI: name,
  default: false,
});
test("only local German voices are eligible; preferred names never bypass privacy filter", () => {
  const result = localGermanVoices([
    voice("Katja Cloud", "de-DE", false),
    voice("Anna", "en-US", true),
    voice("Hans", "de-DE", true),
    voice("Petra", "de_AT", true),
  ]);
  assert.deepEqual(
    result.map((v) => v.name),
    ["Petra", "Hans"],
  );
  assert.deepEqual(localGermanVoices([voice("Cloud", "de-DE", false)]), []);
});
test("word offsets retain UTF-16 positions, punctuation and repeated whitespace", () => {
  const text = "Hallo,  schöne 🦊 Welt!";
  const words = spokenWords(text);
  for (const word of words)
    assert.equal(text.slice(word.start, word.end), word.text);
  assert.equal(wordAtBoundary(words, 8), 1);
  assert.equal(wordAtBoundary(words, 6), -1);
  assert.equal(wordAtBoundary(words, NaN), -1);
  assert.equal(wordAtBoundary(words, 100), -1);
  assert.equal(words[3].start, 18);
});

test("Anna takes priority over other preferred female or default voices", () => {
  const result = localGermanVoices([
    { ...voice("Petra", "de-DE", true), default: true },
    voice("Anna", "de-DE", true),
    voice("Anna Cloud", "de-DE", false),
  ]);
  assert.equal(result[0].name, "Anna");
});
