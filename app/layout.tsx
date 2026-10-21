import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import "./adventure.css";
import "./illustrations.css";
import { Header } from "@/components/header";
export const metadata: Metadata = {
  title: "LeseHelferlein · Kleine Worte, große Abenteuer",
  description:
    "Entdecke die Freude am Lesen. Geschichten und spielerisches Lesetraining für Grundschulkinder.",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body>
        <a className="skip" href="#main">
          Zum Inhalt
        </a>
        <Header />
        {children}
        <footer>
          <Link className="wordmark" href="/">
            Lese<span>Helferlein</span>
            <span className="tiny-star">✦</span>
          </Link>
          <p>Ein Wort. Eine Welt. Dein Abenteuer.</p>
          <Link href="/eltern">Für Eltern & Datenschutz</Link>
          <span className="footer-note">
            Mit Fantasie gemacht. Zum Lesen gedacht.
          </span>
        </footer>
      </body>
    </html>
  );
}
