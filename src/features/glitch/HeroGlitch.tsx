import { useEffect, useMemo, useState } from "react";
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

type HeroGlitchProps = {
  src: string;
  alt: string;
};

export default function HeroGlitch({ src, alt }: HeroGlitchProps) {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const settings = useMemo(() => HERO_SETTINGS, []);
  const { canvasRef, maskRef, generateMask } = useGlitchEngine({
    image,
    settings,
  });

  useEffect(() => {
    let active = true;
    loadImage(src).then((loaded) => {
      if (active) setImage(loaded);
    });
    return () => {
      active = false;
    };
  }, [src]);

  useEffect(() => {
    if (!image) return;
    requestAnimationFrame(() => generateMask("scatter"));
  }, [generateMask, image]);

  return (
    <figure className="hero-visual">
      <div className="hero-canvas-frame">
        <canvas ref={maskRef} className="engine-mask" aria-hidden="true" />
        <canvas ref={canvasRef} className="engine-canvas" role="img" aria-label={alt} />
        <span className="visual-index">FIG. 001</span>
        <span className="visual-state">
          <i />
          LIVE SIGNAL
        </span>
      </div>
      <figcaption>
        AUTO-RENDER / PORTRAIT STUDY
        <span>1200 × 900</span>
      </figcaption>
    </figure>
  );
}
