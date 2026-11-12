import { Link } from "react-router";
import AboutSkills from "@/components/sections/AboutSkills";
import HeroGlitch from "@/features/glitch/HeroGlitch";
import { cv } from "@/data/cv";

export default function HomePage() {
  return (
    <main>

      <header className="hero" id="top">
        <div className="hero-copy">
          <p className="kicker">CREATIVE UI DESIGNER / DESIGN SYSTEMS &amp; QA</p>
          <div className="hero-title">
            <div style={{ animation: "fade-up 0.6s ease both 0.2s" }}>
              {/* One heading for the page, set on two lines: "4RI.EXE". */}
              <h1>
                <span
                  className="text-glitch text-[clamp(54px,9vw,120px)] font-bold leading-[0.85] tracking-tight uppercase text-white"
                  data-text="4RI"
                  style={{ fontFamily: "Rajdhani, sans-serif", letterSpacing: "-0.03em" }}
                >
                  4RI
                </span>
                <span
                  className="text-[clamp(54px,9vw,120px)] font-bold leading-[0.85] tracking-tight uppercase"
                  style={{
                    fontFamily: "Rajdhani, sans-serif",
                    letterSpacing: "-0.03em",
                    color: "#00ff41",
                    textShadow: "0 0 40px #00ff4155, 0 0 80px #00ff4122",
                  }}
                >
                  .EXE
                </span>
              </h1>
            </div>
          </div>
          <div className="hero-bottom">
            <p>
              I design expressive interfaces in Figma, rescue the tangled files
              behind them, and audit every build until it matches the design, down
              to the pixel, the state and the hover.
            </p>
            <Link to="/projects">EXPLORE THE WORK ↓</Link>
          </div>
        </div>
        <HeroGlitch
          src={`${import.meta.env.BASE_URL}portrait-forward.jpg`}
          scrolledSrc={`${import.meta.env.BASE_URL}portrait-phone.jpg`}
          alt="Glitched portrait of 4ri, also known as Liri"
        />
        <div className="hero-side-note" aria-hidden="true">
          DESIGN × SYSTEMS × FIDELITY
        </div>
      </header>

      <section className="work-strip" id="work">
        <div>
          <span>01 / SELECTED WORK</span>
          <strong>EXPRESSIVE INTERFACES</strong>
        </div>
        <div>
          <span>02 / PRACTICE</span>
          <strong>UI · DESIGN SYSTEMS · DESIGN QA</strong>
        </div>
        <div>
          <span>TOOLKIT</span>
          <strong>FIGMA · TOKENS · HANDOFF</strong>
        </div>
      </section>

      <AboutSkills />

      <footer className="site-footer">
        <p>LET&apos;S MAKE THE INTERNET HUMAN.</p>
        <a href="mailto:its.liriani@gmail.com">ITS.LIRIANI@GMAIL.COM ↗</a>
        <div>
          <span>© {new Date().getFullYear()} 4RI / LIRI</span>
          <a href={cv.href} download={cv.download}>{cv.label} ↓</a>
          <span>LOCAL SIGNAL / WORLDWIDE</span>
        </div>
      </footer>
    </main>
  );
}
