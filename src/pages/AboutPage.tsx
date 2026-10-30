import { Link } from "react-router";
import {
  CSSProperties,
  PointerEvent as ReactPointerEvent,
  useRef,
} from "react";

type Tool = {
  name: string;
  code: string;
  kind: "core" | "creative" | "design";
};

const tools: Tool[] = [
  { name: "React", code: "R19", kind: "core" },
  { name: "TypeScript", code: "TS", kind: "core" },
  { name: "JavaScript", code: "JS", kind: "core" },
  { name: "Tailwind", code: "TW", kind: "core" },
  { name: "Vite", code: "VT", kind: "core" },
  { name: "GLSL", code: "GL", kind: "creative" },
  { name: "TouchDesigner", code: "TD", kind: "creative" },
  { name: "Figma", code: "FG", kind: "design" },
];

export default function AboutPage() {
  const shaderRef = useRef<HTMLDivElement>(null);


  const moveShader = (event: ReactPointerEvent<HTMLDivElement>) => {
    const element = shaderRef.current;
    if (!element) return;
    const bounds = element.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    element.style.setProperty("--shader-x", `${x}%`);
    element.style.setProperty("--shader-y", `${y}%`);
  };

  const resetShader = () => {
    shaderRef.current?.style.setProperty("--shader-x", "50%");
    shaderRef.current?.style.setProperty("--shader-y", "50%");
  };

  return (
    <main className="about-page">

      <header className="about-page-hero">
        <div className="about-page-kicker">
          <span>ABOUT / MULTIDISCIPLINARY PRACTICE</span>
          <span>PRODUCT DESIGNER × FRONT-END DEVELOPER</span>
        </div>
        <div className="about-hero-grid">
          <h1>
            DESIGN
            <br />
            <span>WITH CODE.</span>
            <br />
            CODE WITH
            <br />
            CHARACTER.
          </h1>
          <div className="about-hero-aside">
            <p className="about-role-index">01 / WHO I AM</p>
            <p>
              I&apos;m a Product Designer and front-end developer with a deep
              creative edge, building interfaces that feel product-ready and
              visually alive.
            </p>
            <div className="about-status">
              <i />
              <span>DESIGNING, PROTOTYPING, SHIPPING</span>
            </div>
          </div>
        </div>
      </header>

      <section className="build-rhythm">
        <header className="about-section-header">
          <p>02 / THE BUILD RHYTHM</p>
          <h2>
            TOOLS BECOME
            <br />
            <span>INSTRUMENTS.</span>
          </h2>
          <p>
            A practical stack for moving quickly from rough idea to expressive,
            production-ready interface.
          </p>
        </header>

        <div className="tool-matrix">
          {tools.map((tool, index) => (
            <article className={`tool-card tool-${tool.kind}`} key={tool.name}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{tool.code}</strong>
              <h3>{tool.name}</h3>
              <i>{tool.kind}</i>
            </article>
          ))}
        </div>

        <div className="process-line">
          <div>
            <span>01</span>
            <strong>FRAME</strong>
            <p>Find the useful question.</p>
          </div>
          <div>
            <span>02</span>
            <strong>PROTOTYPE</strong>
            <p>Make the idea tangible.</p>
          </div>
          <div>
            <span>03</span>
            <strong>REFINE</strong>
            <p>Give every detail intent.</p>
          </div>
          <div>
            <span>04</span>
            <strong>SHIP</strong>
            <p>Put the work into motion.</p>
          </div>
        </div>
      </section>

      <section className="creative-vision">
        <div className="creative-copy">
          <p className="about-role-index">03 / CREATIVE VISION</p>
          <h2>
            BEYOND THE
            <br />
            <span>STANDARD STACK.</span>
          </h2>
          <p>
            My work leans toward interactive experiences, motion, and polished
            browser-based storytelling. Creative coding, GLSL shaders, and
            TouchDesigner let me explore light, rhythm, texture, and responsive
            systems beyond conventional UI.
          </p>
          <div className="inline-badges">
            <span>GLSL</span>
            <span>WEBGL</span>
            <span>TOUCHDESIGNER</span>
            <span>AUDIO REACTIVE</span>
          </div>
        </div>

        <div
          ref={shaderRef}
          className="shader-field"
          style={
            {
              "--shader-x": "50%",
              "--shader-y": "50%",
            } as CSSProperties
          }
          onPointerMove={moveShader}
          onPointerLeave={resetShader}
          role="img"
          aria-label="Interactive generative gradient that follows the pointer"
        >
          <div className="shader-orb shader-orb-a" />
          <div className="shader-orb shader-orb-b" />
          <div className="shader-grid" />
          <span>MOVE POINTER / BEND THE SIGNAL</span>
          <strong>LIVE<br />FIELD</strong>
          <i>GLSL_MINDSET / CSS_OUTPUT</i>
        </div>
      </section>

      <section className="analog-section">
        <div className="analog-title">
          <p className="about-role-index">04 / ANALOG &amp; OFF-SCREEN</p>
          <h2>
            HANDS ON.
            <br />
            <span>SCREEN OFF.</span>
          </h2>
        </div>
        <div className="analog-body">
          <p>
            I balance the digital with the physical, stepping away from Figma
            grids to ground myself in DIY handcrafts and analog game design.
          </p>
          <p>
            Making with real materials changes how I think about systems,
            constraints, feedback, and play. That perspective returns to the
            screen as interfaces with more personality and human texture.
          </p>
        </div>
        <div className="analog-cards">
          <article>
            <span>A</span>
            <strong>DIY / HANDCRAFT</strong>
            <i>TACTILITY</i>
          </article>
          <article>
            <span>B</span>
            <strong>ANALOG GAMES</strong>
            <i>SYSTEMS</i>
          </article>
          <article>
            <span>C</span>
            <strong>MAKING THINGS</strong>
            <i>PERSONALITY</i>
          </article>
        </div>
      </section>

      <section className="about-manifesto">
        <p>THE THROUGH-LINE</p>
        <blockquote>
          I AM A MULTIDISCIPLINARY MAKER BRINGING{" "}
          <span>PERSONALITY TO EVERY PIXEL.</span>
        </blockquote>
        <div>
          <Link to="/projects">SEE SELECTED WORK ↗</Link>
          <a href="mailto:its.liriani@gmail.com">START A CONVERSATION ↗</a>
        </div>
      </section>

      <footer className="projects-footer">
        <Link to="/">← RETURN HOME</Link>
        <span>© 2025 4RI / LIRI</span>
        <a href="https://github.com/liriani" target="_blank" rel="noreferrer">
          GITHUB ↗
        </a>
      </footer>
    </main>
  );
}
