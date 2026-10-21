"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Map,
  BookHeart,
  TreePine,
  ShieldCheck,
} from "@/components/reading-icons";
export function Header() {
  const path = usePathname();
  return (
    <header
      className={`header world-header ${path.startsWith("/lesen") ? "quiet-header" : ""}`}
    >
      <Link href="/" className="brand" aria-label="LeseHelferlein Startseite">
        <Image src="/child-reading.png" alt="" width={48} height={48} />
        <span className="wordmark">
          Lese<span>Helferlein</span>
          <sup>✦</sup>
        </span>
      </Link>
      <nav aria-label="Hauptnavigation">
        <Link href="/" aria-current={path === "/" ? "page" : undefined}>
          <TreePine size={29} />
          <span>Meine Lichtung</span>
        </Link>
        <Link
          href="/geschichten"
          aria-current={path === "/geschichten" ? "page" : undefined}
        >
          <Map size={29} />
          <span>Abenteuerkarte</span>
        </Link>
        <Link
          href="/album"
          aria-current={path === "/album" ? "page" : undefined}
        >
          <BookHeart size={29} />
          <span>Reisealbum</span>
        </Link>
      </nav>
      <Link className="parent-entry" href="/eltern" aria-label="Für Eltern">
        <ShieldCheck size={17} />
        <span>Für Eltern</span>
      </Link>
    </header>
  );
}
