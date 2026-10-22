"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, Leaf } from "@/components/reading-icons";
import { StoryArt } from "./brand-art";
import { useJourney } from "./use-journey";
import { stories } from "@/lib/stories";
import { placeNames } from "./story-card";
export function JourneyAlbum() {
  const { journey, resetJourney, temporary } = useJourney();
  const [confirm, setConfirm] = useState(false);
  return (
    <main id="main" className="shell album-page">
      <div className="album-heading">
        <span className="chapter-label">DEINE KLEINEN GROSSEN MOMENTE</span>
        <h1>
          Ein Album voller <em>Abenteuer.</em>
        </h1>
        <p>Hier haben deine Entdeckungen einen ganz besonderen Platz.</p>
      </div>
      <section className="album-book">
        <div className="album-binding" />
        <div className="album-left">
          <span className="album-corner">✦</span>
          <Image
            src="/child-reading.png"
            alt="Deine Lesefee feiert deine Entdeckungen"
            width={200}
            height={200}
          />
          <h2>
            {journey.stories.length
              ? "Schau, wo du schon warst!"
              : "Dein erstes Abenteuer wartet."}
          </h2>
          <p>
            {journey.stories.length === 6
              ? "Alle sechs Orte entdeckt! Und jede Geschichte freut sich auf ein Wiedersehen."
              : "Für jedes abgeschlossene Demo-Abenteuer bekommst du einen Reisestempel. Ganz ohne Noten. Versprochen."}
          </p>
          <span className="album-signature">Deine LeseFee ♡</span>
        </div>
        <div className="album-right">
          <div className="album-progress">
            <span>
              <Leaf size={17} /> DEIN REISETAGEBUCH
            </span>
            <strong>{journey.stories.length} / 6</strong>
          </div>
          <div className="stamp-grid">
            {stories.map((s) => {
              const earned = journey.stories.includes(s.id);
              return (
                <Link
                  key={s.id}
                  href={`/lesen/${s.id}`}
                  className={`album-stamp stamp-${s.scene} ${earned ? "earned" : ""}`}
                  aria-label={`${placeNames[s.scene]}: ${earned ? "Demo-Stempel gesammelt, erneut lesen" : "noch entdecken"}`}
                >
                  <span className="stamp-illustration">
                    <StoryArt kind={s.scene} />
                    {earned && (
                      <Star
                        className="stamp-star"
                        size={16}
                        fill="currentColor"
                      />
                    )}
                  </span>
                  <strong>{placeNames[s.scene]}</strong>
                  <span>
                    {earned
                      ? "Demo-Abenteuer entdeckt"
                      : "Dein Platz fürs Abenteuer"}
                  </span>
                </Link>
              );
            })}
          </div>
          <p className="album-note">
            Diese Stempel erzählen von deinen Demo-Abenteuern. Sie sagen nicht,
            wie gut du lesen kannst.
          </p>
        </div>
      </section>
      <div className="album-actions">
        <Link href="/geschichten" className="button adventure-button">
          Mein nächstes Abenteuer <ArrowRight size={19} />
        </Link>
        <p>
          {temporary
            ? "Dein Browser kann das Album gerade nicht speichern. Es bleibt für diesen Besuch erhalten."
            : "Dein Album bleibt in diesem Browser. Ohne Namen. Ohne Konto."}
        </p>
      </div>
      <details className="album-settings">
        <summary>Für Eltern: Album-Speicher verwalten</summary>
        <p>
          Gespeichert werden ausschließlich die Kennungen entdeckter
          Demo-Geschichten und Lichtfunken. Kein Transkript, keine Aufnahme und
          keine Leistungsdaten. Das Album wird nicht mit anderen Geräten
          synchronisiert.
        </p>
        {confirm ? (
          <div role="group" aria-label="Album zurücksetzen bestätigen">
            <p>Alle lokalen Reisestempel und Lichtfunken wirklich entfernen?</p>
            <button
              className="button secondary"
              onClick={() => {
                resetJourney();
                setConfirm(false);
              }}
            >
              Ja, Album zurücksetzen
            </button>
            <button className="text-button" onClick={() => setConfirm(false)}>
              Behalten
            </button>
          </div>
        ) : (
          <button className="text-button" onClick={() => setConfirm(true)}>
            Album zurücksetzen
          </button>
        )}
      </details>
    </main>
  );
}
