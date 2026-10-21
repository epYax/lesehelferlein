import Link from "next/link";
import { ShieldCheck } from "@/components/reading-icons";
export default function Parents() {
  return (
    <main id="main" className="shell parent-page">
      <ShieldCheck size={42} />
      <span className="eyebrow">FÜR ELTERN & BEGLEITPERSONEN</span>
      <h1>
        Lesefreude braucht
        <br />
        <span>ein gutes Gefühl.</span>
      </h1>
      <p className="intro">
        LeseHelferlein lädt Kinder ein, Geschichten in ihrem eigenen Tempo zu
        entdecken. Begleiten Sie Ihr Kind und feiern Sie kleine Schritte
        gemeinsam.
      </p>
      <section>
        <h2>Was diese erste Version kann</h2>
        <p>
          Sechs Geschichten, eine ruhige Leseansicht und eine nachvollziehbare
          Wortauswertung. Der Lesefluss ist eine ausdrücklich gekennzeichnete
          Demo: Das angezeigte Transkript wird simuliert oder von Ihnen
          eingegeben. Die Sterne sind Demo-Belohnungen und keine Bewertung der
          Lesefähigkeit.
        </p>
        <h2>Keine Aufnahmen. Kein Konto.</h2>
        <p>
          Diese Version greift nicht auf das Mikrofon zu und sendet keine
          Audiodaten an einen Spracherkennungsdienst. Eingetippte
          Beispieltranskripte werden ausschließlich im Browser ausgewertet und
          nicht dauerhaft gespeichert. Das Reisealbum speichert lokal im Browser
          nur die Kennungen abgeschlossener Demo-Geschichten und gefundener
          Lichtfunken. Diese Entdeckungen bewerten keine Lesefähigkeit. Im
          Reisealbum können Sie den Speicher jederzeit zurücksetzen. Bitte
          verwenden Sie keine persönlichen Angaben. Es gibt keine
          Analyse-Tracker, Cookies für Werbung oder extern geladenen
          Schriftarten. Der lokale Webserver erhält beim Laden technisch
          notwendige HTTP-Anfragen.
        </p>
        <h2>Erkennung ist keine Gewissheit</h2>
        <p>
          Auch zukünftige echte Spracherkennung kann Wörter überhören oder
          anders verstehen. Markierungen sind deshalb Gesprächsanlässe, keine
          Diagnose und kein Beweis für einen Lesefehler. Dialekte, Kinderstimmen
          und Selbstkorrekturen benötigen besondere Sorgfalt.
        </p>
        <h2>Was als Nächstes kommt</h2>
        <p>
          Echte Spracherkennung und geräteübergreifender Lernfortschritt sind
          noch nicht aktiviert. Dafür sind ein Datenschutzkonzept, eine
          ausdrückliche Freigabe der Dienste und eine geeignete Elternverwaltung
          vorgesehen.
        </p>
      </section>
      <Link className="button" href="/geschichten">
        Gemeinsam eine Geschichte entdecken
      </Link>
    </main>
  );
}
