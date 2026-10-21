import test from "node:test";
import assert from "node:assert/strict";
import {
  parseJourney,
  addSpark,
  addStory,
  EMPTY_JOURNEY,
} from "../lib/journey";
test("malformed local storage never breaks the experience", () => {
  for (const raw of [
    null,
    "not json",
    "null",
    "[]",
    '{"sparks":1,"stories":false}',
  ])
    assert.deepEqual(parseJourney(raw), EMPTY_JOURNEY);
});
test("stored rewards only accept known IDs and remove duplicates", () => {
  assert.deepEqual(
    parseJourney(
      JSON.stringify({
        sparks: [1, 1, 2, 4, "3", null],
        stories: ["kleiner-fuchs", "kleiner-fuchs", "unknown", 7],
        name: "discard",
      }),
    ),
    { sparks: [1, 2], stories: ["kleiner-fuchs"] },
  );
});
test("revisiting a story and collecting again cannot inflate rewards", () => {
  let j = addSpark(EMPTY_JOURNEY, 1);
  j = addSpark(j, 1);
  j = addStory(j, "kleiner-fuchs");
  j = addStory(j, "kleiner-fuchs");
  assert.deepEqual(j, { sparks: [1], stories: ["kleiner-fuchs"] });
  assert.deepEqual(EMPTY_JOURNEY, { sparks: [], stories: [] });
});
