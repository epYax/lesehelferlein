"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ArrowLeft, Sparkles, Compass, Map } from "./reading-icons";
import { WorldArt } from "./world-art";
import { StoryArt } from "./brand-art";
import { stories } from "@/lib/stories";
const hints = [
  "Hallo, ich bin deine LeseFee! Welches Abenteuer ruft nach dir?",
  "Tippe auf ein kleines Bild. Schon öffnet sich ein Fenster in eine andere Welt!",
  "Hier gibt es kein Wettrennen. Wir lesen in deinem Tempo.",
  "Mit dem Kompass suche ich dir ein Abenteuer aus. Kommst du mit?",
];
export function AdventureHome() {
  const [hint, setHint] = useState(0);
  const [selected, setSelected] = useState(0);
  const story = stories[selected];
  function step(direction: number) {
    setSelected((s) => (s + direction + stories.length) % stories.length);
  }
  return (
    <main id="main" className="play-home">
      <section className="play-stage" aria-label="Deine magische Waldlichtung">
        <WorldArt />
        <div className="forest-fireflies" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
        <header className="play-welcome">
          <span>Wohin reisen wir heute?</span>
          <h1>
            Dein <em>Geschichtenwald</em>
          </h1>
        </header>
        <div className="adventure-scene">
          <section className="story-portal" aria-label="Wähle dein Abenteuer">
            <div className="portal-window" key={story.id}>
              <StoryArt
                kind={story.scene}
                sizes="(max-width:650px) 80vw, 560px"
              />
              <div className="portal-caption">
                <span>Dein nächstes Abenteuer · {story.minutes} Min.</span>
                <h2>{story.title}</h2>
                <Link
                  className="portal-enter"
                  href={`/lesen/${story.id}`}
                  aria-label={`Dieses Abenteuer öffnen: ${story.title}`}
                >
                  Loslesen <ArrowRight size={24} />
                </Link>
              </div>
            </div>
            <button
              className="portal-arrow portal-prev"
              aria-label="Vorherige Geschichte"
              onClick={() => step(-1)}
            >
              <ArrowLeft size={26} />
            </button>
            <button
              className="portal-arrow portal-next"
              aria-label="Nächste Geschichte"
              onClick={() => step(1)}
            >
              <ArrowRight size={26} />
            </button>
          </section>
          <div className="fairy-guide">
            <div className="fairy-speech" aria-live="polite">
              <span>DEINE LESEFEE</span>
              <p>{hints[hint]}</p>
              <button
                onClick={() => setHint((h) => (h + 1) % hints.length)}
                aria-label="Nächster Tipp der Lesefee"
              >
                Noch ein Tipp <Sparkles size={20} />
              </button>
            </div>
            <Image
              src="/child-reading.png"
              alt="Deine Lesefee begleitet dich im Geschichtenwald"
              width={480}
              height={480}
              priority
            />
          </div>
        </div>
        <nav className="adventure-path" aria-label="Sechs Geschichtenwelten">
          {stories.map((s, index) => (
            <button
              key={s.id}
              aria-label={s.title}
              aria-pressed={selected === index}
              onClick={() => setSelected(index)}
            >
              <StoryArt kind={s.scene} />
              <span>{index + 1}</span>
            </button>
          ))}
        </nav>
        <div className="forest-actions">
          <Link href="/geschichten" aria-label="Ab in den Geschichtenwald">
            <Map size={23} /> Alle Geschichten
          </Link>
          <button
            aria-label="Überraschungsgeschichte ziehen"
            onClick={() =>
              setSelected(
                (s) =>
                  (s + 1 + Math.floor(Math.random() * (stories.length - 1))) %
                  stories.length,
              )
            }
          >
            <Compass size={25} /> Überrasch mich!
          </button>
        </div>
        <p className="play-demo-note">
          Lese-Demo · Ohne Mikrofon · In deinem Tempo
        </p>
      </section>
    </main>
  );
}
