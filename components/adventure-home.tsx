"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Map,
  Sparkles,
  BookHeart,
  Compass,
  Star,
  Check,
} from "@/components/reading-icons";
import { WorldArt } from "./world-art";
import { useJourney } from "./use-journey";
import { stories } from "@/lib/stories";
const hints = [
  "Hallo, ich bin deine LeseFee! Welche Geschichte entdecken wir heute?",
  "Siehst du die drei goldenen Lichtfunken? Tippe sie an und bring den Wald zum Leuchten!",
  "Hier gibt es kein Wettrennen. Such dir eine Geschichte aus und lies in deinem Tempo.",
  "Jedes Demo-Abenteuer schenkt dir einen Stempel fürs Reisealbum. Wir nehmen dabei nichts auf.",
];
export function AdventureHome() {
  const { journey, collectSpark } = useJourney();
  const [hint, setHint] = useState(0);
  const [announcement, setAnnouncement] = useState("");
  const [surprise, setSurprise] = useState(0);
  const complete = journey.sparks.length === 3;
  function collect(id: number) {
    collectSpark(id);
    setAnnouncement(
      journey.sparks.length === 2
        ? "Alle drei Lichtfunken gefunden! Dein Entdeckerabzeichen wartet im Reisealbum."
        : "Ein Lichtfunke für deinen Zauber!",
    );
  }
  return (
    <main id="main" className="play-home">
      <section
        className={`play-stage ${complete ? "forest-awake" : ""}`}
        aria-label="Deine magische Waldlichtung"
      >
        <WorldArt />
        <div className="play-hud">
          <span className="place-label">
            <Map size={24} /> Deine Lichtung
          </span>
          <Link href="/album" className="stamp-pocket">
            <BookHeart size={26} />
            <span>
              <strong>{journey.stories.length} / 6</strong> Reisestempel
            </span>
          </Link>
        </div>
        <div className="play-welcome">
          <span className="welcome-ribbon">Mach dich bereit …</span>
          <h1>
            Dein
            <br />
            <em>Geschichtenwald</em>
          </h1>
          <p>
            Sechs Abenteuer warten auf dich.
            <br />
            Du entscheidest, wo es losgeht!
          </p>
          <Link className="button play-start" href="/geschichten">
            <Map size={28} />
            <span>Ab in den Geschichtenwald</span>
            <ArrowRight size={24} />
          </Link>
          <span className="play-demo-note">
            Lese-Demo · Ohne Mikrofon · In deinem Tempo
          </span>
        </div>
        <div className="fairy-guide">
          <div className="fairy-speech" aria-live="polite">
            <span>DEINE LESEFEE</span>
            <p>{hints[hint]}</p>
            <button
              onClick={() => setHint((h) => (h + 1) % hints.length)}
              aria-label="Nächster Tipp der Lesefee"
            >
              {hint === 0 ? "Zeig mir den Zauber" : "Noch ein Tipp"}
              <Sparkles size={23} />
            </button>
          </div>
          <Image
            src="/child-reading.png"
            alt="Deine Lesefee begleitet dich im Geschichtenwald"
            width={480}
            height={480}
            priority
          />
          <div
            className="spark-hunt play-sparks"
            aria-label="Lichtfunken sammeln"
          >
            {[1, 2, 3].map((id) => (
              <button
                key={id}
                className={`collect-spark spark-${id} ${journey.sparks.includes(id) ? "collected" : ""}`}
                aria-label={
                  journey.sparks.includes(id)
                    ? `Lichtfunke ${id} gefunden`
                    : `Lichtfunke ${id} sammeln`
                }
                disabled={journey.sparks.includes(id)}
                onClick={() => collect(id)}
              >
                {journey.sparks.includes(id) ? (
                  <Check size={30} />
                ) : (
                  <Star size={56} />
                )}
              </button>
            ))}
          </div>
        </div>
        <aside
          className={`play-mission ${complete ? "mission-complete" : ""}`}
          aria-label="Deine Funkenmission"
        >
          <div className="mission-title">
            <Sparkles size={32} />
            <span>
              {complete ? "Geschafft, Entdecker!" : "Eine kleine Nebenmission"}
            </span>
          </div>
          <h2>{complete ? "Der Wald leuchtet!" : "Finde die 3 Lichtfunken"}</h2>
          <p>
            {complete
              ? "Dein Abzeichen wartet im Reisealbum."
              : "Entdeckst du die goldenen Sterne? Tippe sie an!"}
          </p>
          <div
            className="mission-progress"
            aria-label={`${journey.sparks.length} von 3 Lichtfunken gefunden`}
          >
            <div className="mission-stars" aria-hidden="true">
              {[1, 2, 3].map((id) => (
                <span
                  key={id}
                  className={journey.sparks.includes(id) ? "found" : ""}
                >
                  <Star size={29} />
                </span>
              ))}
            </div>
            <strong>{journey.sparks.length} von 3 gefunden</strong>
          </div>
          {complete && (
            <Link href="/album" className="mission-reward">
              Abzeichen ansehen <ArrowRight size={20} />
            </Link>
          )}
        </aside>
        <div className="play-dock" aria-label="Deine Abenteuer-Ausrüstung">
          <section className="surprise-station">
            <Compass size={58} />
            <div>
              <h2>Wohin weht der Wind?</h2>
              <p>
                {surprise
                  ? stories[(surprise - 1) % stories.length].title
                  : "Lass eine Geschichte zu dir finden."}
              </p>
              {surprise > 0 && (
                <Link
                  className="surprise-link"
                  href={`/lesen/${stories[(surprise - 1) % stories.length].id}`}
                >
                  Dieses Abenteuer öffnen <ArrowRight size={20} />
                </Link>
              )}
            </div>
            <button
              className="surprise-draw"
              aria-label="Überraschungsgeschichte ziehen"
              onClick={() =>
                setSurprise((s) =>
                  s
                    ? (s % stories.length) + 1
                    : Math.floor(Math.random() * stories.length) + 1,
                )
              }
            >
              <Sparkles size={25} />
              <span>{surprise ? "Noch einmal" : "Überrasch mich!"}</span>
            </button>
          </section>
          <Link className="album-station" href="/album">
            <BookHeart size={58} />
            <div>
              <h2>Mein Reisealbum</h2>
              <p>
                {journey.stories.length
                  ? `${journey.stories.length} Demo-Abenteuer entdeckt`
                  : "Hier wohnen deine Entdeckungen."}
              </p>
            </div>
            <ArrowRight size={26} />
          </Link>
        </div>
        <p role="status" className="sr-only">
          {announcement}
        </p>
      </section>
      <p className="play-kindness">
        Jeder kleine Schritt ist ein Abenteuer.{" "}
        <strong>Schön, dass du da bist!</strong>
      </p>
    </main>
  );
}
