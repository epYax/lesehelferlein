"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Sparkles,
  BookOpen,
  BookHeart,
  Map,
} from "./reading-icons";
import { WorldArt } from "./world-art";
const hints = [
  "Hallo! Schön, dass du da bist. Bereit für ein neues Leseabenteuer?",
  "Mit Lesen starten finden wir eine Geschichte für dich. Du entscheidest, wohin es geht!",
  "Hier gibt es kein Wettrennen. Wir lesen in deinem Tempo.",
  "Du möchtest etwas noch einmal lesen? In deinem Reisealbum findest du deine Entdeckungen.",
];
export function AdventureHome() {
  const [hint, setHint] = useState(0);
  return (
    <main id="main" className="play-home">
      <section className="play-stage" aria-label="Deine Leselobby">
        <WorldArt />
        <div className="forest-fireflies" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="lobby-topline">
          <span>DEINE LESEWELT</span>
          <span>Schön, dass du da bist.</span>
        </div>
        <div className="lobby-scene">
          <div className="play-welcome">
            <span className="lobby-eyebrow">Hier beginnt dein Abenteuer</span>
            <h1>
              Dein <em>Geschichtenwald</em>
            </h1>
            <p>
              Ein gemütlicher Ort für große Abenteuer.
              <br />
              Und für deinen nächsten kleinen Leseschritt.
            </p>
            <Link
              className="lobby-play"
              href="/geschichten"
              aria-label="Lesen starten"
            >
              <BookOpen size={32} />
              <span>Lesen starten</span>
              <ArrowRight size={25} />
            </Link>
            <span className="lobby-play-hint">
              Geschichte aussuchen. Gemeinsam loslesen.
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
            <div className="fairy-pool" aria-hidden="true" />
          </div>
        </div>
        <nav className="lobby-dock" aria-label="Deine Bereiche">
          <Link href="/geschichten" aria-label="Geschichten entdecken">
            <Map size={40} />
            <span>
              <strong>Geschichten entdecken</strong>
              <small>Stöbern, suchen, Lieblingswelt finden</small>
            </span>
            <ArrowRight size={23} />
          </Link>
          <Link href="/album" aria-label="Mein Reisealbum">
            <BookHeart size={40} />
            <span>
              <strong>Mein Reisealbum</strong>
              <small>Deine Abenteuer wieder besuchen</small>
            </span>
            <ArrowRight size={23} />
          </Link>
        </nav>
        <p className="play-demo-note">
          Lese-Demo · Ohne Mikrofon · In deinem Tempo
        </p>
      </section>
    </main>
  );
}
