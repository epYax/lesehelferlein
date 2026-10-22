"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import {
  localGermanVoices,
  spokenWords,
  wordAtBoundary,
} from "@/lib/read-aloud";
import {
  clearSpokenWord,
  findReadTarget,
  markSpokenWord,
  type ReadTarget,
} from "./read-target";
import { Voice, Square, RotateCcw, ArrowRight } from "./reading-icons";
const Context = createContext({ enabled: false, toggle: () => {} });
export function ReadAloudToggle() {
  const { enabled, toggle } = useContext(Context);
  return (
    <button
      type="button"
      className="read-toggle"
      role="switch"
      aria-checked={enabled}
      aria-label="Vorlesen"
      onClick={toggle}
      data-read-controls
    >
      <Voice size={26} />
      <span>
        Vorlesen <strong>{enabled ? "an" : "aus"}</strong>
      </span>
      <span className="switch-track" aria-hidden="true">
        <i />
      </span>
    </button>
  );
}
export function ReadAloudProvider({ children }: { children: ReactNode }) {
  const path = usePathname();
  const [enabled, setEnabled] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceId, setVoiceId] = useState("");
  const [rate, setRate] = useState(0.9);
  const [text, setText] = useState("");
  const [word, setWord] = useState(-1);
  const [speaking, setSpeaking] = useState(false);
  const [message, setMessage] = useState(
    "Tippe auf einen Text. Ich lese ihn dir vor.",
  );
  const [settings, setSettings] = useState(false);
  const [action, setAction] = useState<HTMLElement | null>(null);
  const target = useRef<ReadTarget | null>(null);
  const current = useRef<SpeechSynthesisUtterance | null>(null);
  const sequence = useRef(0);
  const bypass = useRef(false);
  const panel = useRef<HTMLElement>(null);
  const selectedVoice = voices.find((v) => v.voiceURI === voiceId) || voices[0];
  const words = useMemo(() => spokenWords(text), [text]);
  const stop = useCallback(() => {
    sequence.current++;
    if (typeof window !== "undefined" && "speechSynthesis" in window)
      window.speechSynthesis.cancel();
    current.current = null;
    target.current?.element.classList.remove("read-target-active");
    clearSpokenWord();
    setSpeaking(false);
    setWord(-1);
  }, []);
  useEffect(() => {
    if (
      !("speechSynthesis" in window) ||
      !("SpeechSynthesisUtterance" in window)
    )
      return;
    const sync = () =>
      setVoices(localGermanVoices(window.speechSynthesis.getVoices()));
    sync();
    window.speechSynthesis.addEventListener("voiceschanged", sync);
    return () =>
      window.speechSynthesis.removeEventListener("voiceschanged", sync);
  }, []);
  useEffect(() => {
    // Deferred only to avoid a synchronous state update during rendering; cancellation is immediate.
    window.speechSynthesis?.cancel();
    sequence.current++;
    target.current?.element.classList.remove("read-target-active");
    clearSpokenWord();
    target.current = null;
    current.current = null;
    const reset = window.setTimeout(() => {
      setText("");
      setWord(-1);
      setSpeaking(false);
      setAction(null);
    }, 0);
    return () => window.clearTimeout(reset);
  }, [path]);
  useEffect(() => {
    const leave = () => {
      if (document.hidden) stop();
    };
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        stop();
        setAction(null);
        setMessage("Gestoppt. Tippe auf einen anderen Text.");
      }
    };
    document.addEventListener("visibilitychange", leave);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("visibilitychange", leave);
      document.removeEventListener("keydown", escape);
      window.speechSynthesis?.cancel();
      clearSpokenWord();
    };
  }, [stop]);
  useEffect(() => {
    document.body.dataset.readAloud = enabled ? "on" : "off";
    const header = document.querySelector("header");
    const measure = () => {
      document.documentElement.style.setProperty(
        "--header-height",
        `${header?.getBoundingClientRect().height || 88}px`,
      );
      document.documentElement.style.setProperty(
        "--readbar-height",
        `${enabled ? panel.current?.getBoundingClientRect().height || 0 : 0}px`,
      );
    };
    const observer = new ResizeObserver(measure);
    if (header) observer.observe(header);
    if (panel.current) observer.observe(panel.current);
    measure();
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [enabled]);
  const speak = useCallback(
    (item: ReadTarget | null, copy: string) => {
      stop();
      setAction(item?.action || null);
      target.current = item;
      setText(copy);
      setWord(-1);
      if (!selectedVoice) {
        setMessage(
          "Keine deutsche Gerätestimme gefunden. In den Sprach-Einstellungen des Geräts lässt sich eine installieren.",
        );
        return;
      }
      // Recheck availability: never silently fall back to a remote/default service.
      const voice = localGermanVoices(window.speechSynthesis.getVoices()).find(
        (v) => v.voiceURI === selectedVoice.voiceURI,
      );
      if (!voice) {
        setMessage("Die gewählte Gerätestimme ist gerade nicht verfügbar.");
        return;
      }
      const id = sequence.current;
      const utterance = new SpeechSynthesisUtterance(copy);
      current.current = utterance;
      utterance.voice = voice;
      utterance.lang = voice.lang;
      utterance.rate = rate;
      utterance.pitch = 1;
      const tokens = spokenWords(copy);
      utterance.onstart = () => {
        if (sequence.current !== id) return;
        setSpeaking(true);
        setMessage(
          item?.action
            ? `Ich lese vor. Danach kannst du ${item.action.tagName === "A" ? "Öffnen" : "Ausführen"} wählen.`
            : "Ich lese vor.",
        );
        item?.element.classList.add("read-target-active");
      };
      utterance.onboundary = (e) => {
        if (sequence.current !== id || e.name !== "word") return;
        const index = wordAtBoundary(tokens, e.charIndex);
        if (index < 0) return;
        setWord(index);
        if (item) markSpokenWord(item, tokens[index].start, tokens[index].end);
      };
      utterance.onend = () => {
        if (sequence.current !== id) return;
        setSpeaking(false);
        setWord(-1);
        clearSpokenWord();
        item?.element.classList.remove("read-target-active");
        current.current = null;
        setMessage("Fertig. Tippe auf den nächsten Text.");
      };
      utterance.onerror = () => {
        if (sequence.current !== id) return;
        stop();
        setMessage(
          "Das Vorlesen hat nicht geklappt. Probiere eine andere Stimme oder noch einmal.",
        );
      };
      setMessage("Die Stimme startet …");
      try {
        window.speechSynthesis.speak(utterance);
      } catch {
        stop();
        setMessage("Dein Browser konnte die Stimme nicht starten.");
      }
    },
    [rate, selectedVoice, stop],
  );
  const toggle = useCallback(() => {
    if (enabled) {
      stop();
      setEnabled(false);
      setText("");
      setAction(null);
      setSettings(false);
      return;
    }
    setEnabled(true);
    if (
      !("speechSynthesis" in window) ||
      !("SpeechSynthesisUtterance" in window)
    ) {
      setMessage("Dieser Browser unterstützt das Vorlesen nicht.");
      return;
    }
    speak(null, "Tippe auf einen Text. Ich lese ihn dir vor.");
  }, [enabled, speak, stop]);
  useEffect(() => {
    if (!enabled || !selectedVoice) return;
    const click = (e: MouseEvent) => {
      if (
        bypass.current ||
        e.button !== 0 ||
        e.ctrlKey ||
        e.metaKey ||
        e.altKey ||
        e.shiftKey ||
        !(e.target instanceof Element)
      )
        return;
      const item = findReadTarget(e.target);
      if (!item) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      speak(item, item.text);
    };
    document.addEventListener("click", click, true);
    return () => document.removeEventListener("click", click, true);
  }, [enabled, selectedVoice, speak]);
  useEffect(() => {
    if (word >= 0)
      panel.current?.querySelector("[data-current-word]")?.scrollIntoView({
        block: "nearest",
        inline: "nearest",
        behavior: "instant",
      });
  }, [word]);
  function performAction() {
    if (
      !action?.isConnected ||
      action.matches(':disabled,[aria-disabled="true"]')
    )
      return;
    stop();
    bypass.current = true;
    try {
      action.click();
    } finally {
      bypass.current = false;
      setAction(null);
    }
  }
  return (
    <Context.Provider value={{ enabled, toggle }}>
      {children}
      {enabled && (
        <section
          ref={panel}
          className="read-bar"
          aria-label="Vorlesehilfe"
          data-read-controls
        >
          <div className="read-bar-top">
            <Voice size={25} />
            <p aria-live="polite">{message}</p>
            <button
              onClick={() => {
                stop();
                setMessage("Gestoppt. Tippe auf einen Text.");
              }}
              aria-label="Vorlesen stoppen"
            >
              <Square size={23} />
            </button>
            <button
              onClick={() => setSettings((v) => !v)}
              aria-expanded={settings}
            >
              Stimme
            </button>
            <button onClick={toggle} aria-label="Vorlesemodus ausschalten">
              Aus
            </button>
          </div>
          {text && selectedVoice && (
            <div className="read-follow" aria-label="Text zum Mitlesen">
              <div className={`karaoke-line ${speaking ? "is-speaking" : ""}`}>
                {words.map((w, i) => (
                  <span
                    key={w.start}
                    data-current-word={word === i ? "" : undefined}
                    className={word === i ? "spoken-now" : ""}
                  >
                    {w.text}{" "}
                  </span>
                ))}
              </div>
              <div className="read-follow-actions">
                <button
                  onClick={() => speak(target.current, text)}
                  aria-label="Text noch einmal vorlesen"
                >
                  <RotateCcw size={22} />
                </button>
                {action && (
                  <button className="read-open" onClick={performAction}>
                    {action.tagName === "A" ? "Öffnen" : "Ausführen"}
                    <ArrowRight size={20} />
                  </button>
                )}
              </div>
            </div>
          )}
          {speaking && word < 0 && (
            <small className="read-boundary-note">
              Mitlesetext · Wortmarkierung erscheint, wenn die Stimme
              Wortpositionen meldet.
            </small>
          )}
          {settings && (
            <div className="read-settings">
              <label>
                Deutsche Gerätestimme
                <select
                  value={selectedVoice?.voiceURI || ""}
                  onChange={(e) => {
                    stop();
                    setVoiceId(e.target.value);
                  }}
                  disabled={!voices.length}
                >
                  {!voices.length && (
                    <option value="">Keine lokale deutsche Stimme</option>
                  )}
                  {voices.map((v) => (
                    <option key={v.voiceURI} value={v.voiceURI}>
                      {v.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Tempo
                <select
                  aria-label="Tempo"
                  value={rate}
                  onChange={(e) => {
                    stop();
                    setRate(Number(e.target.value));
                  }}
                >
                  <option value={0.75}>Langsam</option>
                  <option value={0.9}>Ruhig</option>
                  <option value={1}>Normal</option>
                </select>
              </label>
              <button
                onClick={() =>
                  speak(
                    null,
                    "Hallo! Ich bin deine Vorlesehilfe. Schön, dass du da bist.",
                  )
                }
              >
                Stimme anhören
              </button>
              <p>
                Nur deutsche Gerätestimmen. Stimme und Wortmarkierung hängen von
                deinem Gerät ab.
              </p>
            </div>
          )}
        </section>
      )}
    </Context.Provider>
  );
}
