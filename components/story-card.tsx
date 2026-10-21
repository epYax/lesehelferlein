import Link from "next/link";
import {
  ArrowUpRight,
  Clock3,
  MoonStar,
  Flower2,
  CloudSun,
  Trees,
  Telescope,
  Flame,
} from "lucide-react";
import { levels, type Story } from "@/lib/stories";
export const sceneIcons = {
  fox: MoonStar,
  garden: Flower2,
  cloud: CloudSun,
  forest: Trees,
  stars: Telescope,
  dragon: Flame,
};
export const placeNames: Record<string, string> = {
  fox: "Mondlichtwiese",
  garden: "Wundergarten",
  cloud: "Wolkenhafen",
  forest: "Flüsterwald",
  stars: "Sternenwarte",
  dragon: "Drachenhügel",
};
export function Scene({ kind }: { kind: string }) {
  const Icon = sceneIcons[kind as keyof typeof sceneIcons] ?? MoonStar;
  return (
    <div aria-hidden="true" className={`scene scene-${kind}`}>
      <span className="scene-star s1">✦</span>
      <span className="scene-star s2">✧</span>
      <div className="scene-orb" />
      <div className="hill hill-one" />
      <div className="hill hill-two" />
      <span className="scene-character">
        <Icon size={72} strokeWidth={1.4} />
      </span>
      <span className="scene-detail">✦</span>
    </div>
  );
}
export function StoryCard({ story }: { story: Story }) {
  return (
    <Link href={`/lesen/${story.id}`} className="story-card">
      <div className="cover">
        <Scene kind={story.scene} />
        <span className="cover-tag">{placeNames[story.scene]}</span>
      </div>
      <div className="card-body">
        <div className="card-meta">
          <span className={`level level-${story.level}`}>
            <span aria-hidden="true">
              {"●".repeat(story.level)}
              {"○".repeat(3 - story.level)}
            </span>{" "}
            {levels[story.level]}
          </span>
          <span>
            <Clock3 size={13} /> {story.minutes} Min.
          </span>
        </div>
        <h3>{story.title}</h3>
        <p>{story.description}</p>
        <div className="card-bottom">
          Dieses Abenteuer lesen <ArrowUpRight size={20} />
        </div>
      </div>
    </Link>
  );
}
