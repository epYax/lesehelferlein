"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
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
import { Voice } from "./reading-icons";
const instructions =
  "Text anklicken zum Vorlesen. Einen Menüpunkt erneut anklicken zum Öffnen. Escape stoppt.";
const Context = createContext({
  enabled: false,
  unavailable: false,
  message: instructions,
  toggle: () => {},
});
export function ReadAloudToggle() {
  const { enabled, unavailable, message, toggle } = useContext(Context);
  return (
    <>
      <button
        type="button"
        className="read-toggle"
        role="switch"
        aria-checked={enabled}
        aria-label="Vorlesen"
        aria-describedby="read-help"
        title={enabled ? message : instructions}
        onClick={toggle}
        data-read-controls
      >
        <Voice size={26} />
        <span>
          Vorlesen{" "}
          <strong>{enabled ? (unavailable ? "fehlt" : "an") : "aus"}</strong>
        </span>
        <span className="switch-track" aria-hidden="true">
          <i />
        </span>
      </button>
      <span id="read-help" className="sr-only" aria-live="polite">
        {enabled ? message : instructions}
      </span>
    </>
  );
}
export function ReadAloudProvider({ children }: { children: ReactNode }) {
  const path = usePathname();
  const [enabled, setEnabled] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [unavailable, setUnavailable] = useState(false);
  const [message, setMessage] = useState(instructions);
  const current = useRef<SpeechSynthesisUtterance | null>(null);
  const armed = useRef<{ element: HTMLElement; text: string } | null>(null);
  const sequence = useRef(0);
  const selectedVoice = voices[0];
  const stop = useCallback(() => {
    sequence.current++;
    window.speechSynthesis?.cancel();
    current.current = null;
    armed.current = null;
    clearSpokenWord();
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
    stop();
  }, [path, stop]);
  useEffect(() => {
    const leave = () => {
      if (document.hidden) stop();
    };
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        stop();
        setMessage("Gestoppt. " + instructions);
      }
    };
    document.addEventListener("visibilitychange", leave);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("visibilitychange", leave);
      document.removeEventListener("keydown", escape);
      stop();
    };
  }, [stop]);
  useEffect(() => {
    document.body.dataset.readAloud = enabled ? "on" : "off";
  }, [enabled]);
  useEffect(() => {
    const header = document.querySelector("header");
    const measure = () =>
      document.documentElement.style.setProperty(
        "--header-height",
        `${header?.getBoundingClientRect().height || 88}px`,
      );
    const observer = new ResizeObserver(measure);
    if (header) observer.observe(header);
    measure();
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);
  const speak = useCallback(
    (item: ReadTarget | null, copy: string) => {
      stop();
      if (!selectedVoice) {
        setUnavailable(true);
        setMessage(
          "Keine lokale deutsche Stimme verfügbar. Anna lässt sich gegebenenfalls in den Spracheinstellungen des Geräts installieren.",
        );
        return;
      }
      const voice = localGermanVoices(window.speechSynthesis.getVoices()).find(
        (v) => v.voiceURI === selectedVoice.voiceURI,
      );
      if (!voice) {
        setUnavailable(true);
        setMessage("Die deutsche Gerätestimme ist gerade nicht verfügbar.");
        return;
      }
      setUnavailable(false);
      const id = sequence.current;
      const tokens = spokenWords(copy);
      try {
        const utterance = new SpeechSynthesisUtterance(copy);
        current.current = utterance;
        utterance.voice = voice;
        utterance.lang = voice.lang;
        utterance.rate = 0.9;
        utterance.pitch = 1;
        armed.current = item?.action
          ? { element: item.action, text: item.text }
          : null;
        utterance.onstart = () => {
          if (sequence.current === id)
            setMessage(`${voice.name} liest vor. ${instructions}`);
        };
        utterance.onboundary = (e) => {
          if (sequence.current !== id || e.name !== "word" || !item) return;
          const index = wordAtBoundary(tokens, e.charIndex);
          if (index >= 0)
            markSpokenWord(item, tokens[index].start, tokens[index].end);
        };
        utterance.onend = () => {
          if (sequence.current !== id) return;
          current.current = null;
          clearSpokenWord();
          setMessage(`Fertig. ${instructions}`);
        };
        utterance.onerror = () => {
          if (sequence.current !== id) return;
          stop();
          setMessage(
            "Das Vorlesen hat nicht geklappt. Klicke den Text zum Wiederholen an.",
          );
        };
        window.speechSynthesis.speak(utterance);
      } catch {
        stop();
        setUnavailable(true);
        setMessage("Dein Browser konnte die Stimme nicht starten.");
      }
    },
    [selectedVoice, stop],
  );
  const toggle = useCallback(() => {
    if (enabled) {
      stop();
      setEnabled(false);
      return;
    }
    setEnabled(true);
    if (
      !("speechSynthesis" in window) ||
      !("SpeechSynthesisUtterance" in window)
    ) {
      setUnavailable(true);
      setMessage("Dieser Browser unterstützt das Vorlesen nicht.");
      return;
    }
    speak(
      null,
      "Tippe auf einen Text. Ich lese ihn dir vor. Tippe auf einen Knopf noch einmal, um ihn zu benutzen.",
    );
  }, [enabled, speak, stop]);
  useEffect(() => {
    if (!enabled || !selectedVoice) return;
    const click = (e: MouseEvent) => {
      if (
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
      // A deliberate second activation uses the element's native click/keyboard action.
      if (
        item.action &&
        armed.current?.element === item.action &&
        armed.current.text === item.text
      ) {
        stop();
        return;
      }
      e.preventDefault();
      e.stopImmediatePropagation();
      speak(item, item.text);
    };
    document.addEventListener("click", click, true);
    return () => document.removeEventListener("click", click, true);
  }, [enabled, selectedVoice, speak, stop]);
  return (
    <Context.Provider value={{ enabled, unavailable, message, toggle }}>
      {children}
    </Context.Provider>
  );
}
