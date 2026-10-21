"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  BookOpen,
  Map,
  ArrowRight,
  Star,
  Compass,
} from "@/components/reading-icons";
import { stories, levels } from "@/lib/stories";
import { StoryCard, placeNames } from "./story-card";
import { StoryArt } from "./brand-art";
import { useJourney } from "./use-journey";
export function Library() {
  const [level, setLevel] = useState(0),
    [query, setQuery] = useState(""),
    [view, setView] = useState<"map" | "books">("map");
  const { journey } = useJourney();
  const filtered = stories.filter(
    (s) =>
      (!level || s.level === level) &&
      `${s.title} ${s.description} ${s.theme} ${placeNames[s.scene]}`
        .toLocaleLowerCase("de")
        .includes(query.toLocaleLowerCase("de")),
  );
  return (
    <>
      <div className="map-intro">
        <div>
          <span className="chapter-label">
            KAPITEL 01 · FOLGE DEINER NEUGIER
          </span>
          <h1>
            Hier wohnen
            <br />
            <em>deine Abenteuer.</em>
          </h1>
          <p>
            Ein Garten voller Wunder? Ein Ausflug bis zum Mond?
            <br />
            Tippe auf einen Ort. Die Geschichte wartet schon auf dich.
          </p>
        </div>
        <div className="map-fairy">
          <Image
            src="/child-reading.png"
            alt="Die Lesefee zeigt dir den Weg"
            width={120}
            height={120}
          />
          <p>
            Alle Wege stehen dir offen.
            <br />
            <strong>Du entscheidest, wo’s losgeht!</strong>
          </p>
        </div>
      </div>
      <div className="library-tools">
        <div className="filters" aria-label="Schwierigkeitsgrad">
          <button onClick={() => setLevel(0)} aria-pressed={level === 0}>
            Alle Geschichten
          </button>
          {([1, 2, 3] as const).map((n) => (
            <button
              key={n}
              onClick={() => setLevel(n)}
              aria-pressed={level === n}
            >
              {levels[n]}
            </button>
          ))}
        </div>
        <label className="search">
          <Search size={18} />
          <input
            aria-label="Geschichten suchen"
            placeholder="Welches Abenteuer suchst du?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </div>
      <div className="map-toolbar">
        <p className="result-count" aria-live="polite">
          {filtered.length} Abenteuer · {journey.stories.length} von 6
          Demo-Stempeln gesammelt
        </p>
        <div className="view-switch" aria-label="Ansicht wählen">
          <button aria-pressed={view === "map"} onClick={() => setView("map")}>
            <Map size={16} /> Karte
          </button>
          <button
            aria-pressed={view === "books"}
            onClick={() => setView("books")}
          >
            <BookOpen size={16} /> Bücher
          </button>
        </div>
      </div>
      {filtered.length > 0 &&
        (view === "books" ? (
          <div className="story-grid">
            {filtered.map((s) => (
              <StoryCard key={s.id} story={s} />
            ))}
          </div>
        ) : (
          <div className="adventure-map">
            <svg
              className="map-paths"
              viewBox="0 0 1100 700"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M160 200C300 70 420 340 540 185S840 80 940 230S680 530 570 520S330 380 170 520"
                fill="none"
                stroke="#f8efcf"
                strokeWidth="28"
              />
              <path
                d="M160 200C300 70 420 340 540 185S840 80 940 230S680 530 570 520S330 380 170 520"
                fill="none"
                stroke="#b6ab7c"
                strokeWidth="2"
                strokeDasharray="7 10"
              />
            </svg>
            <div className="map-compass" aria-hidden="true">
              <span>N</span>
              <Compass size={48} />
              <span>IMMER DER FANTASIE NACH</span>
            </div>
            <div className="map-locations">
              {filtered.map((story) => {
                const completed = journey.stories.includes(story.id);
                return (
                  <Link
                    key={story.id}
                    href={`/lesen/${story.id}`}
                    className={`map-location location-${story.scene}`}
                  >
                    <div className="location-island">
                      <StoryArt kind={story.scene} />
                      {completed && (
                        <span
                          className="location-stamp"
                          aria-label="Demo-Stempel gesammelt"
                        >
                          <Star size={17} fill="currentColor" />
                        </span>
                      )}
                    </div>
                    <div className="location-sign">
                      <span className="place-name">
                        {placeNames[story.scene]}
                      </span>
                      <h2>{story.title}</h2>
                      <p>
                        {levels[story.level]} <span>·</span> {story.minutes}{" "}
                        Min.
                      </p>
                      <span className="enter-location">
                        {completed
                          ? "Noch einmal entdecken"
                          : "Hier beginnt dein Abenteuer"}{" "}
                        <ArrowRight size={15} />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
            <span className="map-caption">
              Die Karte der kleinen großen Abenteuer
            </span>
          </div>
        ))}
      {!filtered.length && (
        <div className="empty">
          <BookOpen size={40} />
          <h2>Hier schlummert noch kein Abenteuer.</h2>
          <p>Versuche ein anderes Wort oder entdecke alle Geschichten.</p>
          <button
            className="button"
            onClick={() => {
              setQuery("");
              setLevel(0);
            }}
          >
            Alle Geschichten zeigen
          </button>
        </div>
      )}
      <div className="map-bottom-note">
        <SparkleNote />
        <p>
          <strong>Jeder Weg zählt.</strong> Du kannst Geschichten so oft
          entdecken, wie du magst. Die Stempel gehören zum Demo-Abenteuer, nicht
          zu einer Leseprüfung.
        </p>
        <Link href="/album">
          Zum Reisealbum <ArrowRight size={17} />
        </Link>
      </div>
    </>
  );
}
function SparkleNote() {
  return <Star size={25} />;
}
