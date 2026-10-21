import { stories } from "./stories";
export const JOURNEY_KEY = "lesehelferlein.journey.v2";
export type Journey = { sparks: number[]; stories: string[] };
export const EMPTY_JOURNEY: Journey = { sparks: [], stories: [] };
export function parseJourney(raw: string | null): Journey {
  try {
    const value = JSON.parse(raw ?? "{}");
    return {
      sparks: Array.isArray(value?.sparks)
        ? [
            ...new Set<number>(
              value.sparks.filter(
                (id: unknown) =>
                  typeof id === "number" && [1, 2, 3].includes(id),
              ),
            ),
          ]
        : [],
      stories: Array.isArray(value?.stories)
        ? [
            ...new Set<string>(
              value.stories.filter(
                (id: unknown) =>
                  typeof id === "string" && stories.some((s) => s.id === id),
              ),
            ),
          ]
        : [],
    };
  } catch {
    return { sparks: [], stories: [] };
  }
}
export function addSpark(journey: Journey, id: number): Journey {
  return parseJourney(
    JSON.stringify({ ...journey, sparks: [...journey.sparks, id] }),
  );
}
export function addStory(journey: Journey, id: string): Journey {
  return parseJourney(
    JSON.stringify({ ...journey, stories: [...journey.stories, id] }),
  );
}
