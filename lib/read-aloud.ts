/** Pure rules shared by the browser adapter and tests. */
export type VoiceInfo = {
  name: string;
  lang: string;
  localService: boolean;
  voiceURI: string;
  default: boolean;
};
export function localGermanVoices<T extends VoiceInfo>(voices: T[]): T[] {
  return voices
    .filter((v) => v.localService && /^de(?:[-_]|$)/i.test(v.lang))
    .sort((a, b) => {
      // The API has no gender field. Names are only a preference, never a guarantee.
      const rank = (v: T) =>
        (/\banna\b/i.test(v.name) ? 100 : 0) +
        (/\b(anna|katja|hedda|helena|petra|vicki|klara|marlene)\b/i.test(v.name)
          ? 10
          : 0) +
        (v.default ? 1 : 0);
      return rank(b) - rank(a) || a.name.localeCompare(b.name, "de");
    });
}
export type SpokenWord = { text: string; start: number; end: number };
export function spokenWords(text: string): SpokenWord[] {
  return Array.from(text.matchAll(/\S+/gu), (m) => ({
    text: m[0],
    start: m.index!,
    end: m.index! + m[0].length,
  }));
}
export function wordAtBoundary(words: SpokenWord[], charIndex: number): number {
  if (!Number.isFinite(charIndex) || charIndex < 0) return -1;
  return words.findIndex((w) => charIndex >= w.start && charIndex < w.end);
}
