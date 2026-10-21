"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Map,
  Sparkles,
  BookOpen,
  Compass,
  Star,
  Check,
} from "@/components/reading-icons";
import { WorldArt } from "./world-art";
import { useJourney } from "./use-journey";
import { stories } from "@/lib/stories";
const hints = [
  "Ich bin deine LeseFee. Komm, wir wecken die Geschichten auf!",
  "Siehst du die drei goldenen Lichtfunken? Tippe sie an und bring den Wald zum Leuchten!",
  "Hier gibt es kein Wettrennen. Such dir eine Geschichte aus und lies in deinem Tempo.",
  "Jedes Abenteuer schenkt dir einen Stempel fürs Reisealbum. Der Leseablauf ist noch eine Demo.",
];
export function AdventureHome() {
  const { journey, collectSpark } = useJourney();
  const [hint, setHint] = useState(0);
  const [announcement, setAnnouncement] = useState("");
  const [surprise, setSurprise] = useState(0);
  function collect(id: number) {
    collectSpark(id);
    setAnnouncement(
      journey.sparks.length === 2
        ? "Alle drei Lichtfunken gefunden! Dein Entdeckerabzeichen wartet im Reisealbum."
        : "Ein Lichtfunke für deinen Zauber!",
    );
  }
  return (
    <main id="main" className="adventure-home">
      <section
        className="forest-stage"
        aria-label="Deine magische Waldlichtung"
      >
        <WorldArt />
        <div className="world-topline">
          <span>
            <span className="live-dot" /> DER GESCHICHTENWALD
          </span>
          <Link href="/album" className="little-pouch">
            <Star size={17} />
            {journey.stories.length} / 6 Reisestempel
          </Link>
        </div>
        <div className="welcome-copy">
          <span className="paper-label">
            Pssst … ein Abenteuer wartet auf dich!
          </span>
          <h1>
            Einmal umblättern.
            <br />
            <em>Und loszaubern.</em>
          </h1>
          <p>
            Hinter jedem Wort steckt eine neue Welt.
            <br />
            Welche entdeckst du heute?
          </p>
          <Link className="button adventure-button" href="/geschichten">
            <Map size={22} /> Ab in den Geschichtenwald <ArrowRight size={20} />
          </Link>
          <span className="welcome-footnote">
            Für kleine Entdecker mit großer Fantasie.
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
              {hint === 0 ? "Zeig mir den Zauber" : "Noch ein Tipp"}{" "}
              <Sparkles size={15} />
            </button>
          </div>
          <Image
            src="/child-reading.png"
            alt="Deine Lesefee begleitet dich im Geschichtenwald"
            width={450}
            height={450}
            priority
          />
          <span className="fairy-shadow" />
        </div>
        <div className="spark-hunt" aria-label="Lichtfunken sammeln">
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
                <Check size={20} />
              ) : (
                <Star size={48} />
              )}
            </button>
          ))}
        </div>
        <div className="forest-sign">
          <BookOpen size={20} />
          <span>
            Hier wohnen
            <br />
            <strong>6 kleine Abenteuer</strong>
          </span>
        </div>
        <div className="mission-slip">
          <div className="mission-icon">
            <Sparkles size={35} />
          </div>
          <div>
            <span>DEINE KLEINE ENTDECKERMISSION</span>
            <strong>
              {journey.sparks.length === 3
                ? "Du hast den Wald zum Leuchten gebracht!"
                : "Finde die 3 versteckten Lichtfunken"}
            </strong>
          </div>
          <div
            className="spark-count"
            aria-label={`${journey.sparks.length} von 3 Lichtfunken gefunden`}
          >
            {[1, 2, 3].map((id) => (
              <span
                key={id}
                className={journey.sparks.includes(id) ? "found" : ""}
              >
                ✦
              </span>
            ))}
          </div>
          {journey.sparks.length === 3 && (
            <Link
              href="/album"
              aria-label="Entdeckerabzeichen im Reisealbum ansehen"
            >
              <ArrowRight size={22} />
            </Link>
          )}
        </div>
        <p role="status" className="sr-only">
          {announcement}
        </p>
      </section>
      <section className="trail-choices shell" aria-label="Wähle deinen Weg">
        <div className="trail-heading">
          <span className="tiny-trail">✧ · · · · · · · · · ✧</span>
          <h2>Wohin zieht’s dich?</h2>
          <p>Dein Abenteuer. Dein Tempo. Dein Weg.</p>
        </div>
        <div className="path-choices">
          <Link className="path-choice path-map" href="/geschichten">
            <span className="choice-art">
              <Map size={76} />
            </span>
            <div>
              <span className="choice-kicker">IMMER DER NEUGIER NACH</span>
              <h3>Die Abenteuerkarte</h3>
              <p>Sechs Orte. Und so viel zu entdecken.</p>
            </div>
            <ArrowRight />
          </Link>
          <div className="path-choice path-surprise">
            <span className="choice-art">
              <Compass size={76} />
            </span>
            <div>
              <span className="choice-kicker">FÜR MUTIGE ENTDECKER</span>
              <h3>Überrasch mich!</h3>
              <p>
                {surprise
                  ? stories[(surprise - 1) % stories.length].title
                  : "Welche Geschichte findet wohl dich?"}
              </p>
              {surprise > 0 && (
                <Link
                  className="surprise-link"
                  href={`/lesen/${stories[(surprise - 1) % stories.length].id}`}
                >
                  Dieses Abenteuer öffnen <ArrowRight size={15} />
                </Link>
              )}
            </div>
            <button
              aria-label="Überraschungsgeschichte ziehen"
              onClick={() =>
                setSurprise((s) =>
                  s
                    ? (s % stories.length) + 1
                    : Math.floor(Math.random() * stories.length) + 1,
                )
              }
            >
              <Sparkles />
            </button>
          </div>
          <Link className="path-choice path-album" href="/album">
            <span className="choice-art">
              <BookOpen size={76} />
            </span>
            <div>
              <span className="choice-kicker">
                DEINE KLEINEN GROSSEN MOMENTE
              </span>
              <h3>Mein Reisealbum</h3>
              <p>
                {journey.stories.length
                  ? `${journey.stories.length} Abenteuerstempel gehören schon dir.`
                  : "Für alles, was du schon entdeckt hast."}
              </p>
            </div>
            <ArrowRight />
          </Link>
        </div>
      </section>
      <div className="world-promise">
        <span>✦</span>
        <p>
          Du musst nicht alles können.
          <br />
          <strong>Du darfst einfach neugierig sein.</strong>
        </p>
        <span>✦</span>
      </div>
    </main>
  );
}
