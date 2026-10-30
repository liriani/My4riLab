import { useEffect, useMemo, useRef, useState } from "react";
import { loadImage } from "./imageUtils";
import {
  GlitchSettings,
  useGlitchEngine,
} from "./useGlitchEngine";

const HERO_SETTINGS: GlitchSettings = {
  pixelSize: 13,
  colors: 6,
  glitchRate: 0.18,
  scanlines: 0.16,
  zoom: 1.08,
};

const SCROLL_THRESHOLD = 50;
// How long the whole frame stays glitched while the portrait swaps.
const SWAP_BURST_MS = 220;

type HeroGlitchProps = {
  src: string;
  // Shown once the visitor scrolls past SCROLL_THRESHOLD.
  scrolledSrc?: string;
  alt: string;
};

function useScrolledPast(threshold: number) {
  const [scrolled, setScrolled] = useState(
    () => typeof window !== "undefined" && window.scrollY > threshold,
  );

  useEffect(() => {
    let frame: number | null = null;
    const update = () => {
      frame = null;
      setScrolled(window.scrollY > threshold);
    };
    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [threshold]);

  return scrolled;
}

export default function HeroGlitch({ src, scrolledSrc, alt }: HeroGlitchProps) {
  const [images, setImages] = useState<{
    rest: HTMLImageElement;
    scrolled: HTMLImageElement;
  } | null>(null);
  const isScrolled = useScrolledPast(SCROLL_THRESHOLD);
  const image = images ? (isScrolled ? images.scrolled : images.rest) : null;
  const settings = useMemo(() => HERO_SETTINGS, []);
  const { canvasRef, maskRef, generateMask } = useGlitchEngine({
    image,
    settings,
  });
  const previousImage = useRef<HTMLImageElement | null>(null);

  // Preload both portraits up front so the swap never waits on the network.
  useEffect(() => {
    let active = true;
    Promise.all([loadImage(src), loadImage(scrolledSrc ?? src)]).then(
      ([rest, scrolled]) => {
        if (active) setImages({ rest, scrolled });
      },
    );
    return () => {
      active = false;
    };
  }, [src, scrolledSrc]);

  useEffect(() => {
    if (!image) return;
    const isSwap = previousImage.current !== null && previousImage.current !== image;
    previousImage.current = image;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isSwap || reduceMotion) {
      requestAnimationFrame(() => generateMask("scatter"));
      return;
    }

    // Flood the mask so the cut lands inside a full-frame glitch, then settle.
    generateMask("fill");
    const timeout = window.setTimeout(() => generateMask("scatter"), SWAP_BURST_MS);
    return () => window.clearTimeout(timeout);
  }, [generateMask, image]);

  return (
    <figure className="hero-visual">
      <div className="hero-canvas-frame">
        <canvas ref={maskRef} className="engine-mask" aria-hidden="true" />
        <canvas ref={canvasRef} className="engine-canvas" role="img" aria-label={alt} />
        <span className="visual-index">FIG. 001</span>
        <span className="visual-state">
          <i />
          {isScrolled && scrolledSrc ? "DO NOT DISTURB" : "LIVE SIGNAL"}
        </span>
      </div>
      <figcaption>
        AUTO-RENDER / PORTRAIT STUDY
        <span>1200 × 900</span>
      </figcaption>
    </figure>
  );
}
