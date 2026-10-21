"use client";
import { useState } from "react";
import { Search, BookOpen } from "lucide-react";
import { stories, levels } from "@/lib/stories";
import { StoryCard } from "./story-card";
export function Library() {
  const [level, setLevel] = useState(0),
    [query, setQuery] = useState("");
  const filtered = stories.filter(
    (s) =>
      (!level || level === s.level) &&
      `${s.title} ${s.description} ${s.theme}`
        .toLocaleLowerCase("de")
        .includes(query.toLocaleLowerCase("de")),
  );
  return (
    <>
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
            placeholder="Dein Abenteuer finden …"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </div>
      <p className="result-count" aria-live="polite">
        {filtered.length} Geschichten warten auf dich
      </p>
      <div className="story-grid">
        {filtered.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>
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
    </>
  );
}
