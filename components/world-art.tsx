import Image from "next/image";
/** Bespoke painted woodland background; the original fairy is layered separately. */
export function WorldArt() {
  return (
    <div className="world-art painted-world" aria-hidden="true">
      <Image
        src="/art/lesehelferlein-v4/play-clearing.webp"
        alt=""
        fill
        priority
        sizes="(max-width: 650px) 1500px, 100vw"
      />
    </div>
  );
}
