import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="shell empty">
      <h1>Dieses Abenteuer ist noch versteckt.</h1>
      <p>In der Bibliothek wartet schon die nächste Geschichte.</p>
      <Link href="/geschichten" className="button">
        Zur Geschichtenwelt
      </Link>
    </main>
  );
}
