import type { ReactNode } from "react";
import { BrandArt } from "./brand-art";
type IconProps = {
  size?: number;
  className?: string;
  strokeWidth?: number;
  fill?: string;
};
/** Project-authored small controls. Narrative symbols use the painted brand assets. */
function Ink({
  children,
  size = 20,
  className = "",
  strokeWidth = 1.8,
}: IconProps & { children: ReactNode }) {
  return (
    <svg
      className={`ink-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}
export function ArrowRight(p: IconProps) {
  return (
    <Ink {...p}>
      <path d="M3 13c5-1 10-1 17-1M14 5l7 7-7 7" />
    </Ink>
  );
}
export function ArrowLeft(p: IconProps) {
  return (
    <Ink {...p}>
      <path d="M21 11c-5 1-10 1-17 1M10 5l-7 7 7 7" />
    </Ink>
  );
}
export function ArrowUpRight(p: IconProps) {
  return (
    <Ink {...p}>
      <path d="M5 19C9 14 13 10 19 5M10 5l9-.5.5 10" />
    </Ink>
  );
}
export function Check(p: IconProps) {
  return (
    <Ink {...p}>
      <path d="M4 12l5 6C13 12 16 8 21 5" />
    </Ink>
  );
}
export function Search(p: IconProps) {
  return (
    <Ink {...p}>
      <path d="M16 14c4-8-5-14-10-9-6 5-1 14 6 12 2-.5 3-1 4-3ZM16 16l5 5" />
    </Ink>
  );
}
export function Play(p: IconProps) {
  return (
    <Ink {...p}>
      <path d="M7 4c5 2 9 5 13 8L6 21Z" />
    </Ink>
  );
}
export function Square(p: IconProps) {
  return (
    <Ink {...p}>
      <path d="M5 5l14-1 1 15-15 1Z" />
    </Ink>
  );
}
export function RotateCcw(p: IconProps) {
  return (
    <Ink {...p}>
      <path d="M5 8c5-8 16-2 14 6-2 7-11 8-15 2M4 3l.5 6L11 8" />
    </Ink>
  );
}
export function Type(p: IconProps) {
  return (
    <Ink {...p}>
      <path d="M3 6l18-1M12 6l-.5 15M8 21h7M3 5v4m18-5v4" />
    </Ink>
  );
}
export function LoaderCircle(p: IconProps) {
  return (
    <Ink {...p}>
      <path d="M13 3c11 1 11 17 0 18C3 22-1 9 5 5" />
      <path d="M7 2l1 4-4-1Z" fill="currentColor" stroke="none" />
    </Ink>
  );
}
export function Clock3(p: IconProps) {
  return (
    <Ink {...p}>
      <path d="M12 3c12-1 13 18 1 18C1 22 0 4 12 3ZM12 7v6l5 2" />
    </Ink>
  );
}
export function ShieldCheck(p: IconProps) {
  return (
    <Ink {...p}>
      <path d="M12 3C9 5 6 6 3 6c0 8 3 12 9 15 7-4 9-8 9-15-4 0-6-1-9-3Z" />
      <path d="M7 12l3 3 6-6" />
    </Ink>
  );
}
export function Leaf(p: IconProps) {
  return (
    <Ink {...p}>
      <path d="M4 19C0 7 10 2 21 3c0 12-5 19-15 15M4 21L16 8m-7 7v-5m4 1h4" />
    </Ink>
  );
}
export function Map({ size = 24, className = "" }: IconProps) {
  return <BrandArt name="icon-map" size={size} className={className} />;
}
export function BookOpen({ size = 24, className = "" }: IconProps) {
  return <BrandArt name="icon-album" size={size} className={className} />;
}
export const BookHeart = BookOpen;
export function Compass({ size = 24, className = "" }: IconProps) {
  return <BrandArt name="icon-compass" size={size} className={className} />;
}
export function Star({ size = 24, className = "" }: IconProps) {
  return <BrandArt name="icon-spark" size={size} className={className} />;
}
export const Sparkles = Star;
export function TreePine({ size = 24, className = "" }: IconProps) {
  return <BrandArt name="forest" size={size} className={className} />;
}
