"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Play,
  RotateCcw,
  Square,
  Sparkles,
  Type,
  LoaderCircle,
} from "lucide-react";
import { type Story, levels } from "@/lib/stories";
import { align, tokenize, type Alignment } from "@/lib/alignment";
import { demoProvider, demoText } from "@/lib/transcription";
type Phase = "ready" | "reading" | "processing" | "result";
const statusLabels = {
  correct: "Im Transkript erkannt",
  omitted: "Im Transkript nicht gefunden",
  different: "Anders erkannt",
};
export function Reader({ story }: { story: Story }) {
  const [phase, setPhase] = useState<Phase>("ready");
  const [size, setSize] = useState(26),
    [progress, setProgress] = useState(0);
  const [result, setResult] = useState<Alignment | null>(null),
    [error, setError] = useState("");
  const [transcript, setTranscript] = useState(() => demoText(story.text));
  const [source, setSource] = useState<"demo" | "manual">("demo");
  const controller = useRef<AbortController | null>(null),
    resultHeading = useRef<HTMLHeadingElement>(null);
  const total = tokenize(story.text).length;
  useEffect(() => () => controller.current?.abort(), []);
  useEffect(() => {
    if (phase !== "reading") return;
    const timer = setInterval(
      () => setProgress((p) => Math.min(p + 1, total)),
      110,
    );
    return () => clearInterval(timer);
  }, [phase, total]);
  useEffect(() => {
    if (phase === "result") resultHeading.current?.focus();
  }, [phase]);
  async function evaluate(manual = false) {
    controller.current?.abort();
    const request = new AbortController();
    controller.current = request;
    setError("");
    setPhase("processing");
    try {
      const text = manual
        ? transcript
        : (
            await demoProvider.transcribe({
              reference: story.text,
              signal: request.signal,
            })
          ).text;
      if (request.signal.aborted) return;
      setResult(align(story.text, text));
      setTranscript(text);
      setSource(manual ? "manual" : "demo");
      setProgress(total);
      setPhase("result");
    } catch (e) {
      if (request.signal.aborted) return;
      setError(
        e instanceof Error
          ? e.message
          : "Das hat gerade nicht geklappt. Versuche es noch einmal.",
      );
      setPhase("ready");
    }
  }
  function reset() {
    controller.current?.abort();
    setPhase("ready");
    setProgress(0);
    setResult(null);
    setError("");
  }
  const busy = phase === "reading" || phase === "processing";
  return (
    <main id="main" className="shell reader-page">
      <Link className="back-link" href="/geschichten">
        <ArrowLeft size={17} /> Zur Geschichtenwelt
      </Link>
      <div className="demo-notice">
        <Sparkles size={20} />
        <div>
          <strong>Du bist im Demo-Lesetraining.</strong>
          <span>
            Wir nehmen nichts auf. Das Transkript und der Leseverlauf werden
            simuliert.
          </span>
        </div>
      </div>
      <div className="reader-header">
        <div>
          <span className="eyebrow">
            {levels[story.level]} · {story.minutes} Minuten · {total} Wörter
          </span>
          <h1>{story.title}</h1>
        </div>
        <div className="text-size" aria-label="Textgröße">
          <Type size={19} />
          <button
            aria-label="Text verkleinern"
            disabled={size <= 22}
            onClick={() => setSize((s) => s - 2)}
          >
            A−
          </button>
          <button
            aria-label="Text vergrößern"
            disabled={size >= 34}
            onClick={() => setSize((s) => s + 2)}
          >
            A+
          </button>
        </div>
      </div>
      <div className="reading-layout">
        <section className="reading-paper" aria-label="Geschichte">
          <div className="reading-progress">
            <span>
              {phase === "result"
                ? "Auswertung bereit"
                : phase === "ready"
                  ? "Dein Abenteuer kann beginnen"
                  : "Simulierter Leseverlauf"}
            </span>
            <span>
              {progress} / {total} Wörter
            </span>
          </div>
          <progress
            max={total}
            value={progress}
            aria-label="Simulierter Lesefortschritt"
          />
          <p className="reading-text" style={{ fontSize: size }}>
            {tokenize(story.text).map((word, index) => {
              const match = result?.words[index];
              return (
                <span
                  key={index}
                  className={`word ${match?.status ?? ""} ${phase === "reading" && index === progress ? "current" : ""}`}
                  title={
                    match
                      ? `${statusLabels[match.status]}${match.status === "different" ? `: ${match.heard}` : ""}`
                      : undefined
                  }
                >
                  {word}{" "}
                </span>
              );
            })}
          </p>
          {result && (
            <div className="legend">
              <span className="correct">✓ Erkannt</span>
              <span className="omitted">◌ Nicht gefunden</span>
              <span className="different">≈ Anders erkannt</span>
            </div>
          )}
          <div className="reading-controls">
            {phase === "ready" && (
              <button
                className="button"
                onClick={() => {
                  setResult(null);
                  setProgress(0);
                  setPhase("reading");
                }}
              >
                <Play size={18} /> Demo starten
              </button>
            )}
            {phase === "reading" && (
              <button className="button" onClick={() => evaluate()}>
                <Square size={17} /> Demo auswerten
              </button>
            )}
            {phase === "processing" && (
              <button className="button" disabled>
                <LoaderCircle className="spin" size={18} /> Wörter werden
                verglichen …
              </button>
            )}
            {phase === "result" && (
              <button className="button secondary" onClick={reset}>
                <RotateCcw size={17} /> Noch einmal lesen
              </button>
            )}
            {busy && (
              <button className="text-button" onClick={reset}>
                Abbrechen
              </button>
            )}
            <span aria-live="polite">
              {phase === "reading"
                ? "Du kannst mitlesen. Es wird kein Mikrofon verwendet."
                : phase === "ready"
                  ? "Mach es dir gemütlich. Hier gibt es keinen Zeitdruck."
                  : ""}
            </span>
          </div>
          {error && (
            <p className="error" role="alert">
              {error}
            </p>
          )}
        </section>
        <aside className="reading-companion">
          <Image
            src="/child-reading.png"
            width={170}
            height={170}
            alt="Deine Lesefee"
          />
          <h2>Ein Wort nach dem anderen.</h2>
          <p>
            Du musst nicht schnell sein. Lass dir Zeit und entdecke die
            Geschichte in deinem Tempo.
          </p>
          <span className="companion-star">✦</span>
          <p className="small-note">
            Tipp: Ein Finger unter der Zeile hilft dir, deinen Platz zu finden.
          </p>
        </aside>
      </div>
      {result && (
        <section className="result-panel">
          <div className="reward" aria-hidden="true">
            ✦ ★ ✦
          </div>
          <span className="eyebrow">DEIN DEMO-LESESTERN</span>
          <h2 ref={resultHeading} tabIndex={-1}>
            Ein Abenteuer geschafft!
          </h2>
          <p>
            Jedes gelesene Wort ist ein kleiner Schritt. Schön, dass du dabei
            bist.
          </p>
          <div className="result-stat">
            <strong>
              {result.correct} von {result.total}
            </strong>{" "}
            Wörtern stimmen im{" "}
            {source === "demo" ? "simulierten" : "eingegebenen"} Transkript
            überein.
          </div>
          <p className="result-disclaimer">
            Diese Demo bewertet nicht, wie du gelesen hast. Auch echte
            Spracherkennung kann sich irren.
          </p>
          {result.words.some((w) => w.status !== "correct") && (
            <div className="word-review">
              <h3>Diese Wörter schauen wir uns noch einmal an</h3>
              <ul>
                {result.words.map(
                  (w, i) =>
                    w.status !== "correct" && (
                      <li key={i}>
                        <strong>{w.word}</strong>
                        <span>
                          {w.status === "omitted"
                            ? "Im Transkript nicht gefunden"
                            : `Im Transkript: „${w.heard}“`}
                        </span>
                      </li>
                    ),
                )}
              </ul>
            </div>
          )}
          {result.extras.length > 0 && (
            <div className="word-review">
              <h3>Zusätzlich im Transkript</h3>
              <p>{result.extras.join(" · ")}</p>
            </div>
          )}
          <Link className="button" href="/geschichten">
            Das nächste Abenteuer <ArrowRight size={18} />
          </Link>
        </section>
      )}
      <details className="transcript-editor">
        <summary>
          Für Neugierige: Beispieltranskript selbst ausprobieren
        </summary>
        <p>
          Ändere Wörter, lasse eines weg oder ergänze eines. So kannst du den
          Textvergleich ausprobieren. Alles bleibt in diesem Browser; bitte
          keine persönlichen Daten eingeben.
        </p>
        <label htmlFor="transcript">
          Beispieltranskript (maximal 6000 Zeichen)
        </label>
        <textarea
          id="transcript"
          maxLength={6000}
          rows={6}
          value={transcript}
          disabled={busy}
          onChange={(e) => setTranscript(e.target.value)}
        />
        <button
          disabled={busy}
          className="button secondary"
          onClick={() => evaluate(true)}
        >
          Beispieltext auswerten
        </button>
      </details>
    </main>
  );
}
