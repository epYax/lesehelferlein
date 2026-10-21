export type WordStatus = "correct" | "omitted" | "different";
export type AlignedWord = { word: string; status: WordStatus; heard?: string };
export type Alignment = {
  words: AlignedWord[];
  extras: string[];
  correct: number;
  total: number;
};
const numbers: Record<string, string> = {
  "0": "null",
  "1": "eins",
  "2": "zwei",
  "3": "drei",
  "4": "vier",
  "5": "fünf",
  "6": "sechs",
  "7": "sieben",
  "8": "acht",
  "9": "neun",
  "10": "zehn",
  "11": "elf",
  "12": "zwölf",
};
export function normalize(word: string): string {
  const cleaned = word
    .normalize("NFC")
    .toLocaleLowerCase("de-DE")
    .replace(/ß/g, "ss")
    .replace(/[^\p{L}\p{N}]/gu, "");
  return numbers[cleaned] ?? cleaned;
}
export function tokenize(text: string): string[] {
  return text.split(/\s+/).filter((word) => normalize(word).length > 0);
}
/** Global minimum-edit alignment. Prefer matches, then substitutions, then deletions.
 * No fuzzy acceptance: different recognized words are uncertain, never declared reading mistakes.
 * Hard cap bounds the O(n*m) matrix for manually entered input.
 */
export function align(reference: string, transcript: string): Alignment {
  const expected = tokenize(reference),
    heard = tokenize(transcript);
  if (expected.length > 1000 || heard.length > 1000)
    throw new Error("Bitte verwende höchstens 1000 Wörter.");
  const a = expected.map(normalize),
    b = heard.map(normalize);
  const dp = Array.from(
    { length: a.length + 1 },
    () => new Uint16Array(b.length + 1),
  );
  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      dp[i][j] = Math.min(
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
      );
  const words: AlignedWord[] = [],
    extras: string[] = [];
  let i = a.length,
    j = b.length;
  while (i || j) {
    if (
      i &&
      j &&
      dp[i][j] === dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
    ) {
      words.push({
        word: expected[i - 1],
        status: a[i - 1] === b[j - 1] ? "correct" : "different",
        heard: heard[j - 1],
      });
      i--;
      j--;
    } else if (i && dp[i][j] === dp[i - 1][j] + 1) {
      words.push({ word: expected[i - 1], status: "omitted" });
      i--;
    } else {
      extras.push(heard[j - 1]);
      j--;
    }
  }
  words.reverse();
  extras.reverse();
  return {
    words,
    extras,
    total: a.length,
    correct: words.filter((word) => word.status === "correct").length,
  };
}
