import { Library } from "@/components/library";
export default function Stories() {
  return (
    <main id="main" className="shell library-page">
      <div className="section-heading centered">
        <span className="eyebrow">AUFSCHLAGEN & EINTAUCHEN</span>
        <h1>
          Eine Welt voller <span>Geschichten.</span>
        </h1>
        <p>Finde dein nächstes Abenteuer. Jede Geschichte beginnt mit dir.</p>
      </div>
      <Library />
    </main>
  );
}
