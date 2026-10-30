import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import GlitchWordmark from "./GlitchWordmark";

type HeaderProps = {
  showSouvenir?: boolean;
};

type DeploymentPhase = "idle" | "opening" | "spraying" | "painted" | "settled";

const sprayParticles = Array.from({ length: 18 }, (_, index) => index);
let hasDeployedLab = false;

// Viscous drip: flares out of the letter baseline (starts above y=0 so there is
// no hard cut), tapers down the stem, and ends in a subtle oval teardrop bulb.
const dripPath = (cx: number, length: number, neck: number, flare = 8) => {
  const w = neck;
  const b = neck * 1.45;
  const L = length;
  const f = (n: number) => +n.toFixed(2);
  return [
    `M${f(cx - flare)} -3`,
    `C${f(cx - flare * 0.5)} 0 ${f(cx - w - 0.5)} 4 ${f(cx - w)} 12`,
    `C${f(cx - w - 0.2)} ${f(L * 0.5)} ${f(cx - w + 0.3)} ${f(L - 12)} ${f(cx - w)} ${f(L - 9)}`,
    `C${f(cx - w)} ${f(L - 6)} ${f(cx - b)} ${f(L - 5.5)} ${f(cx - b)} ${f(L - 3)}`,
    `C${f(cx - b)} ${f(L - 0.8)} ${f(cx - b * 0.4)} ${L} ${cx} ${L}`,
    `C${f(cx + b * 0.4)} ${L} ${f(cx + b)} ${f(L - 0.8)} ${f(cx + b)} ${f(L - 3)}`,
    `C${f(cx + b)} ${f(L - 5.5)} ${f(cx + w)} ${f(L - 6)} ${f(cx + w)} ${f(L - 9)}`,
    `C${f(cx + w - 0.3)} ${f(L - 12)} ${f(cx + w + 0.2)} ${f(L * 0.5)} ${f(cx + w + 0.5)} 12`,
    `C${f(cx + w + 0.5)} 4 ${f(cx + flare * 0.55)} 0 ${f(cx + flare)} -3`,
    "Z",
  ].join(" ");
};
const drips = [
  dripPath(23, 38, 2.2, 8),
  dripPath(51, 24, 1.8, 6),
  dripPath(77, 43, 2.4, 9),
];

export default function Header({ showSouvenir = false }: HeaderProps) {
  const [phase, setPhase] = useState<DeploymentPhase>(
    hasDeployedLab ? "settled" : "idle",
  );
  const sprayTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const paintTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = (timer: typeof sprayTimer) => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = null;
  };

  const deployFeature = () => {
    if (phase !== "idle") return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      hasDeployedLab = true;
      setPhase("painted");
      return;
    }

    setPhase("opening");
    sprayTimer.current = setTimeout(() => {
      setPhase("spraying");
      sprayTimer.current = null;
    }, 900);
    paintTimer.current = setTimeout(() => {
      hasDeployedLab = true;
      setPhase("painted");
      paintTimer.current = null;
    }, 3200);
  };

  useEffect(
    () => () => {
      clearTimer(sprayTimer);
      clearTimer(paintTimer);
    },
    [],
  );

  return (
    <header
      className={`site-nav site-header site-header--${phase}`}
      onMouseEnter={deployFeature}
    >
      <GlitchWordmark />

      <nav className="nav-links" aria-label="Primary navigation">
        <Link to="/projects">WORK</Link>

        <div
          className="guerrilla-zone"
          role={phase === "painted" || phase === "settled" ? undefined : "button"}
          tabIndex={phase === "painted" || phase === "settled" ? -1 : 0}
          aria-label={
            phase === "painted" || phase === "settled"
              ? undefined
              : "Deploy the Live Lab navigation link"
          }
          onFocus={deployFeature}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") deployFeature();
          }}
          onMouseEnter={deployFeature}
        >
          <span className="guerrilla-slot-label" aria-hidden="true">
            LAB SLOT
          </span>

          <div className="header-stencil" aria-hidden="true">
            <span />
            <strong>LAB</strong>
            <i />
            <i />
            <i />
            <i />
          </div>

          <div className="header-spray-can" aria-hidden="true">
            <span />
            <strong>NEW<br />FEATURE</strong>
          </div>

          <div className="header-spray-cloud" aria-hidden="true">
            {sprayParticles.map((particle) => <i key={particle} />)}
          </div>

          {(phase === "spraying" || phase === "painted" || phase === "settled") && (
            <div className="header-paint-mark">
              <svg className="header-splatters" viewBox="0 0 100 52" aria-hidden="true">
                <circle cx="4" cy="26" r="1.5" />
                <circle cx="10" cy="15" r="2.2" />
                <circle cx="18" cy="5" r="1.2" />
                <circle cx="25" cy="47" r="1.7" />
                <circle cx="34" cy="2" r="0.9" />
                <circle cx="65" cy="4" r="1.4" />
                <circle cx="75" cy="49" r="1.1" />
                <circle cx="84" cy="8" r="2.3" />
                <circle cx="91" cy="38" r="1.6" />
                <circle cx="97" cy="20" r="1" />
                <circle cx="3" cy="42" r="0.8" />
                <circle cx="98" cy="48" r="0.7" />
              </svg>
              <svg className="header-drips" viewBox="0 0 100 45" aria-hidden="true">
                {drips.map((d) => <path key={d} d={d} />)}
              </svg>
              <Link
                className={`injected-lab ${phase === "painted" || phase === "settled" ? "is-active" : ""}`}
                to="/lab"
                aria-label="Open the Live Lab interaction gallery"
                aria-disabled={phase !== "painted" && phase !== "settled"}
                tabIndex={phase === "painted" || phase === "settled" ? 0 : -1}
                onClick={(event) => {
                  if (phase !== "painted" && phase !== "settled") event.preventDefault();
                }}
              >
                LAB
              </Link>
            </div>
          )}

          <div className="header-fresh-paint-sign" aria-hidden="true">
            <span>SORRY,<br /><strong>FRESH PAINT!</strong></span>
          </div>
        </div>

        <div className="nav-push">
          <Link to="/about">ABOUT</Link>
          {showSouvenir && <a href="#souvenir">SOUVENIR</a>}
        </div>
      </nav>

      <a className="availability" href="mailto:its.liriani@gmail.com">
        <i />
        AVAILABLE FOR WORK
      </a>

      <span className="header-deployment-status" aria-live="polite">
        {phase === "opening" && "ALLOCATING LAB SLOT…"}
        {phase === "spraying" && "DEPLOYING LAB…"}
        {(phase === "painted" || phase === "settled") && "LAB.JSX LIVE"}
      </span>
    </header>
  );
}
