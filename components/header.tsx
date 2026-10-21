"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUpRight, BookOpen } from "lucide-react";
export function Header() {
  const path = usePathname();
  return (
    <header className="header">
      <Link href="/" className="brand" aria-label="LeseHelferlein Startseite">
        <Image src="/child-reading.png" alt="" width={48} height={48} />
        <span className="wordmark">
          Lese<span>Helferlein</span>
          <sup>✦</sup>
        </span>
      </Link>
      <nav aria-label="Hauptnavigation">
        <Link href="/" aria-current={path === "/" ? "page" : undefined}>
          Startseite
        </Link>
        <Link
          href="/geschichten"
          aria-current={path.startsWith("/geschichten") ? "page" : undefined}
        >
          Geschichten
        </Link>
        <Link
          href="/eltern"
          aria-current={path === "/eltern" ? "page" : undefined}
        >
          Für Eltern <ArrowUpRight size={14} />
        </Link>
      </nav>
      <Link className="button small" href="/geschichten">
        <BookOpen size={17} />
        <span>Loslesen</span>
      </Link>
    </header>
  );
}
