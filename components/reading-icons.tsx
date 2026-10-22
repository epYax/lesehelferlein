import type { ReactNode } from "react";
export type IconProps = {
  size?: number;
  className?: string;
  strokeWidth?: number;
  fill?: string;
};
const green = "#42694b",
  mint = "#dce9cf",
  gold = "#edc35e",
  paper = "#fff7df",
  purple = "#8b6b90";
/** Lesezeichen: original 32px icon family, with a leaf, folded page and fairy-star vocabulary. */
function Glyph({
  children,
  size = 24,
  className = "",
  strokeWidth = 1.65,
}: IconProps & { children: ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`brand-art brand-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      stroke={green}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}
function TinyStar({ x = 24, y = 7 }: { x?: number; y?: number }) {
  return (
    <path
      d={`M${x} ${y - 4}l1.3 2.8 3 .4-2.2 2 .5 3-2.6-1.4-2.6 1.4.5-3-2.2-2 3-.4Z`}
      fill={gold}
      stroke="none"
    />
  );
}
export function Map(p: IconProps) {
  return (
    <Glyph {...p}>
      <path d="M3 7l8-3 10 3 8-3-1 22-8 3-10-3-7 3Z" fill={paper} />
      <path d="M11 5l-1 20M21 8l-1 20" stroke="#c3ba91" />
      <path d="M6 20c4-9 9 3 18-8" stroke={purple} strokeDasharray="1.5 3" />
      <path d="M5 12c0-4 3-6 5-6 0 5-1 7-5 6Z" fill={mint} stroke="none" />
      <TinyStar x={24} y={10} />
    </Glyph>
  );
}
export function BookOpen(p: IconProps) {
  return (
    <Glyph {...p}>
      <path
        d="M3 7c5-2 9-1 13 2 4-3 8-4 13-2l-1 19c-5-2-8-1-12 2-4-3-8-4-12-2Z"
        fill={paper}
      />
      <path d="M16 9v19M7 12l5 1M7 17l5 1M20 19l4-1" stroke="#97a47e" />
      <path d="M23 7v9l-2-2-2 2V8" fill={purple} stroke={purple} />
    </Glyph>
  );
}
export function BookHeart(p: IconProps) {
  return (
    <Glyph {...p}>
      <path d="M8 3h18v25H8c-6 0-6-6 0-6h18" fill={mint} />
      <path d="M7 4v18M8 26h15" stroke="#7f996b" />
      <path d="M19 4v7l-3-2-3 2V4" fill={purple} stroke={purple} />
      <TinyStar x={17} y={16} />
      <path d="M8 28c-5 0-5-5-5-7V8c0-3 2-5 5-5" />
    </Glyph>
  );
}
export function Compass(p: IconProps) {
  return (
    <Glyph {...p}>
      <path d="M13 5V3h6v3" />
      <circle cx="16" cy="18" r="11" fill={paper} />
      <path d="M16 8v2m0 16v2M6 18h2m16 0h2" stroke="#b5a677" />
      <path d="M21 11c1 7-2 12-10 14 0-7 3-12 10-14Z" fill={mint} />
      <path d="M21 11l-5 7-5 7M16 18l5-7" />
      <path d="M11 25l5-7 2 4Z" fill={purple} stroke="none" />
      <circle cx="16" cy="18" r="1.5" fill={gold} stroke="none" />
    </Glyph>
  );
}
export function Star(p: IconProps) {
  return (
    <Glyph {...p}>
      <path
        d="M16 3l4 8 9 1-6 7 2 10-9-5-9 4 2-10-6-6 9-1Z"
        fill={gold}
        stroke="#a8802e"
      />
      <path d="M12 12l3-5M8 14l3-.5" stroke={paper} />
      <path d="M23 25c1-4 4-5 7-4-1 5-3 7-7 4Z" fill={mint} />
    </Glyph>
  );
}
export function Sparkles(p: IconProps) {
  return (
    <Glyph {...p}>
      <path d="M6 28L21 13" stroke={purple} strokeWidth="4" />
      <path d="M6 28L21 13" stroke={paper} strokeWidth=".7" />
      <path
        d="M22 3l2 5 6 1-4 4 1 6-5-3-5 2 1-6-4-3 6-1Z"
        fill={gold}
        stroke="#a8802e"
      />
      <path d="M4 9h5M6.5 6.5v5M12 20h3" stroke="#a8802e" />
    </Glyph>
  );
}
export function TreePine(p: IconProps) {
  return (
    <Glyph {...p}>
      <path
        d="M5 15c4-2 8-1 11 1 3-2 7-3 11-1v13c-4-2-8-1-11 1-3-2-7-3-11-1Z"
        fill={paper}
      />
      <path d="M16 17v12M2 15L16 5l14 10" />
      <path d="M12 6C9 1 6 2 4 3c1 5 4 7 8 3Z" fill={mint} />
      <path d="M16 6c0-5 6-5 9-3-2 5-6 6-9 3Z" fill={mint} />
      <path d="M19 27v-5a3 3 0 016 0v5" fill={gold} />
      <path d="M9 19v3m-1.5-1.5h3" stroke="#9b8447" />
    </Glyph>
  );
}
export function ArrowRight(p: IconProps) {
  return (
    <Glyph {...p}>
      <path d="M4 17c8-1 14-1 23-1M20 8l8 8-8 9" stroke="currentColor" />
      <path d="M7 13c-4 0-5-3-4-6 4 1 6 3 4 6Z" fill={mint} stroke="none" />
    </Glyph>
  );
}
export function ArrowLeft(p: IconProps) {
  return (
    <Glyph {...p}>
      <path d="M28 15c-8 1-14 1-23 1M12 8l-8 8 8 9" stroke="currentColor" />
      <path d="M25 12c4 0 5-3 4-6-4 1-6 3-4 6Z" fill={mint} stroke="none" />
    </Glyph>
  );
}
export function ArrowUpRight(p: IconProps) {
  return (
    <Glyph {...p}>
      <path d="M6 26C13 17 18 12 26 6M14 6h12v12" stroke="currentColor" />
      <path d="M7 17c-4 0-5-3-4-6 4 1 6 3 4 6Z" fill={mint} stroke="none" />
    </Glyph>
  );
}
export function Check(p: IconProps) {
  return (
    <Glyph {...p}>
      <path
        d="M5 16l7 8C16 17 22 10 28 6"
        stroke="currentColor"
        strokeWidth="2.6"
      />
      <path d="M6 10c-4 0-5-3-4-6 4 1 6 3 4 6Z" fill={mint} stroke="none" />
    </Glyph>
  );
}
export function Search(p: IconProps) {
  return (
    <Glyph {...p}>
      <circle cx="13" cy="13" r="9" fill={paper} />
      <path d="M20 20l8 8" stroke={purple} strokeWidth="4" />
      <path d="M8 13c0-3 2-5 5-5" stroke="#b4c5a0" />
      <path d="M24 20c0-4 3-5 6-4-1 4-3 6-6 4Z" fill={mint} />
    </Glyph>
  );
}
export function Play(p: IconProps) {
  return (
    <Glyph {...p}>
      <path d="M8 5c7 3 13 7 20 11L7 28Z" fill={mint} stroke="currentColor" />
      <path d="M12 11l9 5-9 6Z" fill="currentColor" stroke="none" />
    </Glyph>
  );
}
export function Square(p: IconProps) {
  return (
    <Glyph {...p}>
      <path d="M6 6l20-1 1 21-21 1Z" fill={paper} stroke="currentColor" />
      <path d="M11 11h11v11H11Z" fill={purple} stroke="none" />
    </Glyph>
  );
}
export function RotateCcw(p: IconProps) {
  return (
    <Glyph {...p}>
      <path
        d="M7 11C13 0 29 8 27 19c-2 10-16 12-22 2M6 4l.5 8 9-1"
        stroke="currentColor"
      />
      <path d="M10 24c2-5 6-5 9-3-2 5-6 6-9 3Z" fill={mint} />
    </Glyph>
  );
}
export function Type(p: IconProps) {
  return (
    <Glyph {...p}>
      <path
        d="M5 8l22-1M16 8l-.5 19M11 27h9M5 7v5m22-6v5"
        stroke="currentColor"
      />
      <path d="M24 23c0-4 3-5 6-4-1 4-3 6-6 4Z" fill={mint} />
    </Glyph>
  );
}
export function LoaderCircle(p: IconProps) {
  return (
    <Glyph {...p}>
      <path d="M17 4c14 1 14 23 0 24C4 29-1 11 7 6" stroke="currentColor" />
      <TinyStar x={10} y={6} />
    </Glyph>
  );
}
export function Clock3(p: IconProps) {
  return (
    <Glyph {...p}>
      <path d="M15 5c15-1 16 22 1 23C1 29 0 6 15 5Z" fill={paper} />
      <path d="M15 10v7l6 3" />
      <path d="M17 5c-1-4 3-5 6-3-1 3-3 4-6 3Z" fill={mint} />
    </Glyph>
  );
}
export function ShieldCheck(p: IconProps) {
  return (
    <Glyph {...p}>
      <path
        d="M16 3C11 6 7 7 3 7c0 11 5 17 13 22 9-5 13-12 13-22-5 0-8-2-13-4Z"
        fill={mint}
      />
      <path d="M9 16l5 5 9-11" stroke={green} strokeWidth="2.2" />
    </Glyph>
  );
}
export function Leaf(p: IconProps) {
  return (
    <Glyph {...p}>
      <path d="M5 25C0 9 14 3 29 4c0 16-8 26-21 20Z" fill={mint} />
      <path d="M5 29L23 9m-11 12v-7m6 1h6" />
      <TinyStar x={8} y={6} />
    </Glyph>
  );
}
