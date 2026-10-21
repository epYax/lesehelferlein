import Image from "next/image";
export const artRoot = "/art/lesehelferlein-v3";
export type StoryArtName =
  "fox" | "garden" | "cloud" | "forest" | "stars" | "dragon";
export type BrandArtName =
  StoryArtName | "icon-map" | "icon-album" | "icon-compass" | "icon-spark";
/** Dedicated LeseHelferlein illustrations. Labels belong to the surrounding controls. */
export function BrandArt({
  name,
  size = 48,
  className = "",
  priority = false,
}: {
  name: BrandArtName;
  size?: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={`${artRoot}/${name}.webp`}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      sizes={`${size}px`}
      className={`brand-art ${className}`}
      priority={priority}
    />
  );
}
export function StoryArt({
  kind,
  className = "",
}: {
  kind: string;
  className?: string;
}) {
  return (
    <Image
      src={`${artRoot}/${kind}.webp`}
      alt=""
      aria-hidden="true"
      width={360}
      height={300}
      sizes="(max-width:650px) 44vw, (max-width:1000px) 28vw, 340px"
      className={`story-art ${className}`}
    />
  );
}
