import { Link } from "react-router";
import SouvenirTeaser from "@/features/glitch/SouvenirTeaser";
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
        {/* Decorative: the portrait melts into the hero instead of sitting in a frame. */}
        <div className="about-hero-portrait" aria-hidden="true">
          <img src={`${import.meta.env.BASE_URL}portrait-profile.jpg`} alt="" decoding="async" />
        </div>
        <div className="about-page-kicker">
          <span>ABOUT / FROM THE CANVAS TO THE CONSOLE</span>
          <span>SENIOR CREATIVE DEVELOPER × ARTIST</span>
        </div>
        <div className="about-hero-grid">
          <h1>
            COLOR FIRST.
            <br />
            <span>CODE SECOND.</span>
            <br />
            RULES?
            <br />
            NEGOTIABLE.
          </h1>
          <div className="about-hero-aside">
            <p className="about-role-index">01 / WHO I AM</p>
            <p>
              I&apos;m Liri, a senior creative developer who came to code from
              traditional art. I still think like a painter: in color, contrast and
              gesture. The browser just happens to be a canvas that moves back.
            </p>
            <div className="about-status">
              <i />
              <span>MAKING THE WEB LESS STATIC</span>
            </div>
          </div>
        </div>
      </header>

      <section className="about-origin" aria-labelledby="about-origin-title">
        <p className="about-role-index">02 / ORIGIN</p>
        <h2 id="about-origin-title">
          I DIDN&apos;T LEAVE ART.
          <br />
          <span>I MOVED IT INTO THE BROWSER.</span>
        </h2>
        <div className="about-origin-body">
          <p>
            I trained my eye long before I trained my hands on a keyboard.
            Traditional art taught me the things I still use every single day: how
            color sets a mood before a word is read, how composition tells the eye
            where to go next, how a mark carries the energy of the hand that made it.
          </p>
          <p>
            Engineering gave those instincts a new material, and it turned out to be
            the most flexible one I&apos;ve ever worked with. Code holds color and
            composition, but it also holds time, state and response. A painting can
            only be looked at. An interface can look back.
          </p>
          <p>
            That is the part I fell for, and why I stayed. Today I design and build
            in the same breath, so nothing gets lost between the first sketch and
            the thing people actually touch.
          </p>
        </div>
        <blockquote className="about-origin-quote">
          “A painting can only be looked at.
          <br />
          <span>An interface can look back.”</span>
        </blockquote>
      </section>

      <section className="build-rhythm">
        <header className="about-section-header">
          <p>03 / THE TOOLKIT</p>
          <h2>
            TOOLS BECOME
            <br />
            <span>INSTRUMENTS.</span>
          </h2>
          <p>
            I swapped brushes for a stack, not the habit of picking each tool for
            what it lets people feel. These are the ones that earn their place.
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
            <strong>OBSERVE</strong>
            <p>Notice how people actually move.</p>
          </div>
          <div>
            <span>02</span>
            <strong>SKETCH</strong>
            <p>Paper first. Always.</p>
          </div>
          <div>
            <span>03</span>
            <strong>BUILD</strong>
            <p>Make it real. Make it respond.</p>
          </div>
          <div>
            <span>04</span>
            <strong>TUNE</strong>
            <p>Teach the hand where to go.</p>
          </div>
        </div>
      </section>

      <section className="creative-vision">
        <div className="creative-copy">
          <p className="about-role-index">04 / COLOR &amp; MOTION</p>
          <h2>
            COLOR IS
            <br />
            <span>A VERB.</span>
          </h2>
          <p>
            I don&apos;t use color to decorate a screen; I use it to direct one. Acid
            green says <em>touch here</em>. A shift in warmth says <em>something
            changed</em>. Contrast is choreography: it decides where you look first,
            what you try next, and how you know you&apos;ve arrived.
          </p>
          <p>
            Shaders, GLSL and TouchDesigner are where I push that furthest, letting
            light and color react to the person in front of them. The field beside
            this text is a small version of the idea. Move your pointer; it follows.
          </p>
          <div className="inline-badges">
            <span>COLOR SYSTEMS</span>
            <span>MOTION</span>
            <span>GLSL / WEBGL</span>
            <span>TOUCHDESIGNER</span>
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
          <p className="about-role-index">05 / TEACHING THE HAND</p>
          <h2>
            NOBODY READS
            <br />
            <span>THE RULEBOOK.</span>
          </h2>
        </div>
        <div className="analog-body">
          <p>
            Away from the screen I still make things with my hands: DIY craft,
            analog games, objects you can pick up and turn over. Board games taught
            me more about interfaces than any style guide. Nobody reads the
            rulebook; they learn by playing, and good pieces teach their own rules.
          </p>
          <p>
            That is how I design movement on the web. A page should teach you how
            to move through it: a hover that hints, a scroll that pushes back, a
            link that reacts before you commit. When the layout answers your hand
            the way an object would, you stop reading instructions and start
            exploring. That moment, when someone figures it out by touch, is the
            part of the job I love most.
          </p>
        </div>
        <div className="analog-cards">
          <article>
            <span>A</span>
            <strong>TRADITIONAL ART</strong>
            <i>COLOR &amp; COMPOSITION</i>
          </article>
          <article>
            <span>B</span>
            <strong>ANALOG GAMES</strong>
            <i>RULES YOU LEARN BY PLAYING</i>
          </article>
          <article>
            <span>C</span>
            <strong>DIY / HANDCRAFT</strong>
            <i>TACTILITY</i>
          </article>
        </div>
      </section>

      <section className="about-manifesto">
        <p>06 / THE THROUGH-LINE</p>
        <blockquote>
          I DON&apos;T BUILD PAGES.{" "}
          <span>I BUILD PLACES THAT MOVE BACK.</span>
        </blockquote>
        <p className="about-manifesto-note">
          Static, interchangeable websites are a habit, not a law. I&apos;m an
          artist, an engineer, a maker and a bit of a troublemaker, and every
          project is a small act of disobedience against the boring web: more
          color, more motion, more of a person behind the pixels. Code isn&apos;t
          just my tool. It&apos;s how I talk back.
        </p>
        <div>
          <Link to="/projects">SEE SELECTED WORK ↗</Link>
          <a href="mailto:its.liriani@gmail.com">START A CONVERSATION ↗</a>
        </div>
      </section>

      <SouvenirTeaser />

      <footer className="projects-footer">
        <Link to="/">← RETURN HOME</Link>
        <span>© {new Date().getFullYear()} 4RI / LIRI</span>
        <a href="https://github.com/liriani" target="_blank" rel="noreferrer">
          GITHUB ↗
        </a>
      </footer>
    </main>
  );
}
