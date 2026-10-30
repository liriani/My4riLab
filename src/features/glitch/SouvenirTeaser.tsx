import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { makeDemoImage } from "./imageUtils";
import { DEFAULT_GLITCH_SETTINGS, useGlitchEngine } from "./useGlitchEngine";

/**
 * A small, non-interactive run of the souvenir engine for the end of /about.
 * It only animates while on screen, so it costs nothing while people read the
 * top of the page.
 */
export default function SouvenirTeaser() {
  const rootRef = useRef<HTMLElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [onScreen, setOnScreen] = useState(false);
  const { canvasRef, maskRef, generateMask } = useGlitchEngine({
    image,
    settings: DEFAULT_GLITCH_SETTINGS,
    isAnimating: onScreen,
  });

  useEffect(() => {
    let active = true;
    makeDemoImage().then((demo) => {
      if (active) setImage(demo);
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (image) requestAnimationFrame(() => generateMask("half"));
  }, [generateMask, image]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting));
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={rootRef} className="souvenir-teaser" aria-labelledby="souvenir-teaser-title">
      <div className="souvenir-teaser-copy">
        <p className="souvenir-teaser-kicker">
          <i />
          END OF PAGE / REWARD UNLOCKED
        </p>
        <h2 id="souvenir-teaser-title">
          YOU READ <span>ALL THE WAY DOWN.</span>
        </h2>
        <p>
          Most people stop scrolling long before this line. If you&apos;re still
          here, you&apos;re curious about how I work, so here&apos;s something I
          keep off the menu: a live glitch engine that turns any image into a
          one-of-one souvenir, generated in your browser and yours to keep.
        </p>
        <Link className="souvenir-teaser-cta" to="/souvenir" state={{ from: "about" }}>
          SEE THE COMPLETE ENGINE &amp; CREATION PROCESS
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      <figure className="souvenir-teaser-preview" aria-hidden="true">
        <div className="souvenir-teaser-frame">
          <canvas ref={maskRef} className="engine-mask" />
          <canvas ref={canvasRef} className="engine-canvas" />
          <span>PREVIEW / 1:4 SCALE</span>
        </div>
        <figcaption>
          <span>SOUVENIR.ENGINE</span>
          <span>{onScreen ? "RUNNING" : "IDLE"}</span>
        </figcaption>
      </figure>
    </section>
  );
}
