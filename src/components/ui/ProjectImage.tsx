import { useState } from "react";

/** Resolves a public/ path against the deploy base (e.g. /My4riLab/ on GitHub Pages). */
export const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

type ProjectImageProps = {
  src: string;
  alt: string;
  className?: string;
};

/**
 * A local project image layered over the CSS artwork. If the file isn't in
 * public/ yet (or fails to load) it removes itself and the artwork shows.
 */
export default function ProjectImage({ src, alt, className = "" }: ProjectImageProps) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  return (
    <img
      className={`project-image ${className}`}
      src={assetUrl(src)}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
