"use client";
import { useSyncExternalStore } from "react";
import {
  JOURNEY_KEY,
  EMPTY_JOURNEY,
  parseJourney,
  addSpark,
  addStory,
  type Journey,
} from "@/lib/journey";
const empty = JSON.stringify(EMPTY_JOURNEY);
let fallback: string | null = null;
function snapshot() {
  if (fallback !== null) return fallback;
  try {
    return window.localStorage.getItem(JOURNEY_KEY) ?? empty;
  } catch {
    return empty;
  }
}
function subscribe(callback: () => void) {
  window.addEventListener("journey-change", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("journey-change", callback);
    window.removeEventListener("storage", callback);
  };
}
function save(journey: Journey) {
  const data = JSON.stringify(journey);
  try {
    window.localStorage.setItem(JOURNEY_KEY, data);
    fallback = null;
  } catch {
    fallback = data;
  }
  window.dispatchEvent(new Event("journey-change"));
}
export function useJourney() {
  const raw = useSyncExternalStore(subscribe, snapshot, () => empty);
  return {
    journey: parseJourney(raw),
    temporary: fallback !== null,
    collectSpark: (id: number) => save(addSpark(parseJourney(snapshot()), id)),
    completeStory: (id: string) => save(addStory(parseJourney(snapshot()), id)),
    resetJourney: () => save(EMPTY_JOURNEY),
  };
}
