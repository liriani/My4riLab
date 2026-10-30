import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Link, useLocation } from "react-router";
import GlitchWordmark from "./GlitchWordmark";

type DeploymentPhase = "idle" | "opening" | "spraying" | "painted" | "settled";

const sprayParticles = Array.from({ length: 18 }, (_, index) => index);

let hasDeployedLab = false;

const SPRAY_ANCHORS = [
  [19, 7],
  [18, 27],
  [19, 50],
  [43, 53],
  [58, 48],
  [66, 21],
  [76, 4],
  [87, 24],
  [97, 52],
  [106, 7],
  [132, 11],
  [125, 28],
  [136, 43],
  [116, 53],
];

const SPRAY_DOTS = Array.from({ length: 52 }, (_, index) => {
  const noise = (salt: number) => {
    const value = Math.sin((index + 1) * 91.345 + salt * 43.117) * 47453.5453;
    return value - Math.floor(value);
  };
  const anchor = SPRAY_ANCHORS[(index * 5) % SPRAY_ANCHORS.length];
  const isFlyaway = index % 8 === 0;
  const distance = isFlyaway ? 12 + noise(1) * 17 : 1.5 + noise(1) * 7;
  const angle = noise(2) * Math.PI * 2;
  const diameter = 1 + noise(3) * (isFlyaway ? 1.1 : 2);

  return {
    x: anchor[0] + Math.cos(angle) * distance,
    y: anchor[1] + Math.sin(angle) * distance,
    radius: diameter / 2,
    opacity: Math.max(0.28, 0.61 - distance * 0.014),
    delay: `${35 + noise(4) * 310}ms`,
  };
});

export default function Header() {
  const [phase, setPhase] = useState<DeploymentPhase>(
    hasDeployedLab ? "settled" : "idle",
  );
  const sprayTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const paintTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { pathname } = useLocation();

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

  // The header stays mounted across routes, so a fresh page settles the
  // painted LAB link instead of replaying its reveal.
  useEffect(() => {
    setPhase((current) => (current === "painted" ? "settled" : current));
  }, [pathname]);

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
              <svg className="paint-spray" viewBox="0 0 150 64" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                {SPRAY_DOTS.map((dot, index) => (
                  <circle
                    key={index}
                    cx={dot.x}
                    cy={dot.y}
                    r={dot.radius}
                    style={
                      {
                        "--speck-opacity": dot.opacity,
                        "--speck-delay": dot.delay,
                      } as CSSProperties
                    }
                  />
                ))}
              </svg>
              <svg className="paint-drips" viewBox="0 0 150 62" preserveAspectRatio="xMidYMin meet">
                <path className="paint-drip paint-drip--one" d="M34 0 L40 0 C39 9 39 17 38 25 C37.5 30 39 35 37 39 C34.5 35 36 30 35.5 25 C35 16 34 8 34 0 Z" />
                <path className="paint-drip paint-drip--two" d="M118 0 L124 0 C123 12 124 22 122.5 34 C122 41 124 48 121 53 C118 48 120 41 119.5 34 C119 22 118 11 118 0 Z" />
                <path className="paint-drip paint-drip--three" d="M131 0 L135 0 C134 7 135 13 133.5 20 C133 24 134 28 132 31 C130 28 131.5 24 131 20 C130.5 13 131 7 131 0 Z" />
              </svg>
              <div className="paint-glitch">
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
                <span className="paint-glitch-cut paint-glitch-cut--ink" aria-hidden="true">LAB</span>
                <span className="paint-glitch-cut paint-glitch-cut--cyan" aria-hidden="true">LAB</span>
                <span className="paint-glitch-cut paint-glitch-cut--magenta" aria-hidden="true">LAB</span>
              </div>
            </div>
          )}

          <div className="header-fresh-paint-sign" aria-hidden="true">
            <span>SORRY,<br /><strong>FRESH PAINT!</strong></span>
          </div>
        </div>

        {/* Touch screens can't hover to spray the LAB link in, so phones get it plainly. */}
        <Link className="nav-lab-compact" to="/lab">LAB</Link>

        <div className="nav-push">
          <Link to="/about">ABOUT</Link>
          <Link className="nav-souvenir" to="/#souvenir">SOUVENIR</Link>
        </div>
      </nav>

      <a className="availability" href="mailto:its.liriani@gmail.com" aria-label="Available for work: email 4ri">
        <i />
        <span>AVAILABLE FOR WORK</span>
      </a>

      <span className="header-deployment-status" aria-live="polite">
        {phase === "opening" && "ALLOCATING LAB SLOT…"}
        {phase === "spraying" && "DEPLOYING LAB…"}
        {(phase === "painted" || phase === "settled") && "LAB.JSX LIVE"}
      </span>
    </header>
  );
}
