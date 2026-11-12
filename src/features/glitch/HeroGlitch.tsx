import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
} from "react";
import { loadImage, makeDemoImage } from "./imageUtils";
import { useGlitchEngine, type GlitchSettings } from "./useGlitchEngine";

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
  // Hover (or tap, on touch) to focus: the engine stops its loop and the
  // clean photo fades in over it; leaving resumes the glitch.
  const [focused, setFocused] = useState(false);
  const pointerType = useRef("mouse");
  const { canvasRef, maskRef, generateMask } = useGlitchEngine({
    image,
    settings,
    isAnimating: !focused,
  });

  const onPointerEnter = (event: PointerEvent) => {
    if (event.pointerType === "mouse") setFocused(true);
  };
  const onPointerLeave = (event: PointerEvent) => {
    if (event.pointerType === "mouse") setFocused(false);
  };
  const onPointerDown = (event: PointerEvent) => {
    pointerType.current = event.pointerType;
  };
  // Touch screens have no hover, so a tap toggles focus instead.
  const onClick = () => {
    if (pointerType.current !== "mouse") setFocused((value) => !value);
  };
  const previousImage = useRef<HTMLImageElement | null>(null);

  // Preload both portraits up front so the swap never waits on the network.
  // If a photo fails to load, fall back to the other one, then to the generated
  // demo image, so the frame never sits on an empty black canvas.
  useEffect(() => {
    let active = true;
    // The first portrait is on screen at load; the scrolled one can wait its turn.
    const load = (source: string, priority: "high" | "low") =>
      loadImage(source, priority).catch(() => null);
    Promise.all([load(src, "high"), scrolledSrc ? load(scrolledSrc, "low") : Promise.resolve(null)])
      .then(async ([rest, scrolled]) => {
        const base = rest ?? scrolled ?? (await makeDemoImage());
        if (active) setImages({ rest: base, scrolled: scrolled ?? base });
      })
      .catch(() => undefined);
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
      <div
        className={`hero-canvas-frame ${focused ? "is-focused" : ""}`}
        style={{ "--hero-zoom": settings.zoom } as CSSProperties}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onPointerDown={onPointerDown}
        onClick={onClick}
      >
        <canvas ref={maskRef} className="engine-mask" aria-hidden="true" />
        <canvas ref={canvasRef} className="engine-canvas" role="img" aria-label={alt} />
        {image && (
          <div className="hero-photo" aria-hidden="true">
            <img
              src={image.src}
              alt=""
              width={image.naturalWidth}
              height={image.naturalHeight}
              decoding="async"
            />
          </div>
        )}
        <span className="visual-index">FIG. 001</span>
        <span className="visual-state">
          <i />
          {focused ? "SIGNAL PAUSED" : isScrolled && scrolledSrc ? "DO NOT DISTURB" : "LIVE SIGNAL"}
        </span>
      </div>
      <figcaption>
        AUTO-RENDER / PORTRAIT STUDY
        <span>1200 × 900</span>
      </figcaption>
    </figure>
  );
}
