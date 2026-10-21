import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Heart,
  Sparkles,
  Mic,
  Star,
  ShieldCheck,
} from "lucide-react";
import { stories } from "@/lib/stories";
import { StoryCard } from "@/components/story-card";
export default function Home() {
  return (
    <main id="main">
      <section className="hero shell">
        <div className="hero-copy">
          <div className="eyebrow">
            <span /> Kleine Worte. Große Abenteuer.
          </div>
          <h1>
            In jedem Kind
            <br />
            steckt ein
            <br />
            <span>Lesezauber.</span>
            <span className="title-spark" aria-hidden="true">
              ✧
            </span>
          </h1>
          <p>
            Entdecke wundervolle Geschichten, lies sie laut vor und wachse mit
            jedem Wort. Deine Lesefee begleitet dich!
          </p>
          <Link className="button" href="/geschichten">
            Mein Leseabenteuer starten <ArrowRight size={20} />
          </Link>
          <div className="hero-note">
            <Heart size={15} /> Mit Freude lernen. Im eigenen Tempo.
          </div>
        </div>
        <div className="hero-art">
          <div className="art-orbit" />
          <span className="floating-star star-one">✦</span>
          <span className="floating-star star-two">✧</span>
          <span className="floating-star star-three">✦</span>
          <div className="hello-bubble">
            Hallo, ich bin deine Lesefee! <span>Schön, dass du da bist.</span>
          </div>
          <Image
            className="mascot"
            src="/child-reading.png"
            alt="Deine freundliche Lesefee mit Büchern und einem Sternenzauberstab"
            width={540}
            height={540}
            priority
          />
          <div className="magic-label">
            <span>✨</span> Ein bisschen Magie.
            <br />
            <strong>Ganz viel Lesefreude.</strong>
          </div>
          <span className="art-caption">
            Dein nächstes Abenteuer beginnt mit einem Wort.
          </span>
        </div>
      </section>
      <div className="benefit-strip">
        <span>
          <BookOpen /> Geschichten zum Verlieben
        </span>
        <span>
          <Sparkles /> Spielerisch besser lesen
        </span>
        <span>
          <Heart /> Jedes Kind in seinem Tempo
        </span>
      </div>
      <section className="section shell how">
        <div className="section-heading centered">
          <span className="eyebrow">SO EINFACH GEHT’S</span>
          <h2>Drei kleine Schritte. Ein großes Abenteuer.</h2>
          <p>Du bringst die Neugier mit. Wir den Lesezauber.</p>
        </div>
        <div className="steps">
          <article>
            <div className="step-icon mint">
              <BookOpen />
              <b>1</b>
            </div>
            <h3>Geschichte aussuchen</h3>
            <p>
              Magische Welten, tierische Freunde oder ein kleines Abenteuer? Du
              entscheidest.
            </p>
          </article>
          <article>
            <div className="step-icon peach">
              <Mic />
              <b>2</b>
            </div>
            <h3>In Ruhe laut vorlesen</h3>
            <p>
              Wort für Wort, in deinem Tempo. Probiere den Ablauf in unserer
              Demo aus.
            </p>
          </article>
          <article>
            <div className="step-icon yellow">
              <Star />
              <b>3</b>
            </div>
            <h3>Über dich hinauswachsen</h3>
            <p>
              Entdecke die Wortauswertung und sammle deinen ersten
              Demo-Lesestern.
            </p>
          </article>
        </div>
      </section>
      <section className="library-preview section">
        <div className="shell">
          <div className="section-heading split">
            <div>
              <span className="eyebrow">DEINE GESCHICHTENWELT</span>
              <h2>Welches Abenteuer ruft dich?</h2>
              <p>Kleine Geschichten, die große Freude machen.</p>
            </div>
            <Link className="text-link" href="/geschichten">
              Alle Geschichten entdecken <ArrowRight size={18} />
            </Link>
          </div>
          <div className="story-grid">
            {stories.slice(0, 3).map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        </div>
      </section>
      <section className="shell parent-banner">
        <div className="parent-symbol">
          <ShieldCheck size={38} />
        </div>
        <div>
          <span className="eyebrow">MIT EINEM GUTEN GEFÜHL</span>
          <h2>Platz zum Wachsen. Ohne Druck.</h2>
          <p>
            Keine Ranglisten. Kein Richtig-oder-falsch-Gefühl. Sondern kleine
            Erfolge und die Freude, es selbst zu schaffen.
          </p>
        </div>
        <Link href="/eltern" className="button secondary">
          Gut zu wissen <ArrowRight size={17} />
        </Link>
      </section>
    </main>
  );
}
