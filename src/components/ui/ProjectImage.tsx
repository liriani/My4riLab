import { useState } from "react";

/** Resolves a public/ path against the deploy base (/ on by4ri.com, or BASE_PATH if set). */
export const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

/**
 * "cover" fills the frame and crops (photos); "contain" shows the whole image
 * over the artwork (screenshots and covers, whose edges carry the content).
 */
export type ImageFit = "cover" | "contain";

type ProjectImageProps = {
  src: string;
  alt: string;
  className?: string;
  fit?: ImageFit;
};

/**
 * A local project image layered over the CSS artwork. If the file isn't in
 * public/ yet (or fails to load) it removes itself and the artwork shows, so a
 * path can be listed in the data before its file is dropped in.
 */
export default function ProjectImage({ src, alt, className = "", fit = "cover" }: ProjectImageProps) {
  // Tracked per src: the same component is reused when a page swaps projects,
  // and one missing file must not hide the next project's image.
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  if (failedSrc === src) return null;

  return (
    <img
      className={`project-image project-image--${fit} ${loadedSrc === src ? "is-loaded" : ""} ${className}`}
      src={assetUrl(src)}
      alt={alt}
      loading="lazy"
      decoding="async"
      onLoad={() => setLoadedSrc(src)}
      onError={() => setFailedSrc(src)}
    />
  );
}
