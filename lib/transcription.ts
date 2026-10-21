import { tokenize } from "./alignment";
export type TranscriptionRequest = {
  reference: string;
  signal: AbortSignal;
  audio?: Blob;
};
export type Transcript = { text: string; source: "demo" | "speech" };
export interface TranscriptionProvider {
  readonly kind: "demo" | "speech";
  transcribe(request: TranscriptionRequest): Promise<Transcript>;
}
export function demoText(reference: string): string {
  return tokenize(reference)
    .filter((_, i) => i !== 9)
    .map((word, i) => (i === 17 ? "Sonne" : word))
    .join(" ");
}
export const demoProvider: TranscriptionProvider = {
  kind: "demo",
  async transcribe({ reference, signal }) {
    await new Promise<void>((resolve, reject) => {
      if (signal.aborted) {
        reject(new DOMException("Abgebrochen", "AbortError"));
        return;
      }
      const onAbort = () => {
        clearTimeout(timer);
        reject(new DOMException("Abgebrochen", "AbortError"));
      };
      const timer = setTimeout(() => {
        signal.removeEventListener("abort", onAbort);
        resolve();
      }, 900);
      signal.addEventListener("abort", onAbort, { once: true });
    });
    return { text: demoText(reference), source: "demo" };
  },
};
