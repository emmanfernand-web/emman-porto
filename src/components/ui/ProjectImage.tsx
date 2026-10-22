import Image from "next/image";

/** SVG placeholders skip the optimizer; real screenshots (png/jpg/webp) are optimized. */
export function ProjectImage({ src, alt, priority = false, sizes = "(min-width: 768px) 50vw, 100vw", className = "" }: { src: string; alt: string; priority?: boolean; sizes?: string; className?: string }) {
  return (
    <Image src={src} alt={alt} width={800} height={500} sizes={sizes} priority={priority} unoptimized={src.endsWith(".svg")} className={className} />
  );
}
