import {
  useRef,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { Link } from "react-router";
import { assetUrl } from "@/components/ui/ProjectImage";
import SouvenirTeaser from "@/features/glitch/SouvenirTeaser";
import { cv } from "@/data/cv";

type Tool = {
  name: string;
  code: string;
  kind: "design" | "system" | "literacy";
};

const tools: Tool[] = [
  { name: "Figma", code: "FG", kind: "design" },
  { name: "Prototyping", code: "PR", kind: "design" },
  { name: "Variables & Tokens", code: "TK", kind: "system" },
  { name: "Auto Layout & Variants", code: "AL", kind: "system" },
  { name: "Dev Mode & Handoff", code: "DM", kind: "system" },
  { name: "React", code: "R19", kind: "literacy" },
  { name: "Tailwind", code: "TW", kind: "literacy" },
  { name: "TypeScript", code: "TS", kind: "literacy" },
];

type FieldPrint = {
  src: string;
  alt: string;
  caption: string;
  /** Where the crop holds on narrow frames. */
  focus?: string;
};

/** Photos from away from the screen. Files live in public/assets/about/. */
const fieldPrints: FieldPrint[] = [
  {
    src: "assets/about/berlin-wall.webp",
    alt: "Liri in front of a colorful street-art mural on the Berlin Wall",
    caption: "BERLIN WALL / COLOR IN PUBLIC",
    focus: "50% 62%",
  },
  {
    src: "assets/about/inline-skate.webp",
    alt: "Liri in inline skates at night, office towers lit up behind",
    caption: "INLINE SKATES / AFTER DARK",
    focus: "50% 64%",
  },
  {
    src: "assets/about/tennis.webp",
    alt: "Liri holding a tennis racket on a clay court",
    caption: "TENNIS / FOOTWORK",
    focus: "44% 40%",
  },
  {
    src: "assets/about/lakeside.webp",
    alt: "Liri laughing, wearing headphones, on a walk by a lake",
    caption: "LAKESIDE / OFFLINE",
    focus: "40% 45%",
  },
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
          <span>ABOUT / FROM THE CANVAS TO THE BUILD</span>
          <span>CREATIVE UI DESIGNER × ARTIST</span>
        </div>
        <div className="about-hero-grid">
          <h1>
            COLOR FIRST.
            <br />
            <span>SYSTEMS SECOND.</span>
            <br />
            PIXELS?
            <br />
            NON-NEGOTIABLE.
          </h1>
          <div className="about-hero-aside">
            <p className="about-role-index">01 / WHO I AM</p>
            <p>
              I&apos;m Liri, a creative UI designer who came to screens from
              traditional art. I still see like a painter: color, contrast, gesture.
              That&apos;s exactly why I notice when a build is 4px off, a shade too
              grey, or missing the state that made the design work.
            </p>
            <div className="about-status">
              <i />
              <span>AUDITING THE GAP BETWEEN FILE AND BUILD</span>
            </div>
          </div>
        </div>
      </header>

      <section className="about-origin" aria-labelledby="about-origin-title">
        <p className="about-role-index">02 / ORIGIN</p>
        <h2 id="about-origin-title">
          I DIDN&apos;T LEAVE ART.
          <br />
          <span>I MOVED IT INTO THE INTERFACE.</span>
        </h2>
        <div className="about-origin-body">
          <p>
            I trained my eye long before I opened Figma.
            Traditional art taught me the things I still use every single day: how
            color sets a mood before a word is read, how composition tells the eye
            where to go next, how a mark carries the energy of the hand that made it.
          </p>
          <p>
            Then I learned how interfaces are built, and where they break. Building
            my own experiments taught me how a design file turns into components,
            states and breakpoints, and every place a design quietly loses
            something on the way.
          </p>
          <p>
            That&apos;s where I stand now: between the file and the build. I design
            the expressive version, organise the system that holds it, and check the
            shipped result against the intent, so nothing gets lost between the
            first sketch and the thing people actually touch.
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
            I swapped brushes for components, not the habit of choosing each tool
            for what it lets people feel, and what it lets me check. Design tools
            first; the code I read is there so I can speak engineering.
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
            <strong>DESIGN</strong>
            <p>Expressive, with every state accounted for.</p>
          </div>
          <div>
            <span>03</span>
            <strong>ORGANIZE</strong>
            <p>One source of truth. No orphan components.</p>
          </div>
          <div>
            <span>04</span>
            <strong>VERIFY</strong>
            <p>The build matches, or I say exactly where it doesn&apos;t.</p>
          </div>
        </div>
      </section>

      <section className="creative-vision">
        <div className="creative-copy">
          {/* Decorative: the Berlin Wall mural bleeds through behind the copy. */}
          <div className="creative-copy-wall" aria-hidden="true">
            <img src={assetUrl("assets/about/berlin-wall.webp")} alt="" loading="lazy" decoding="async" />
          </div>
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
            Shaders, GLSL and TouchDesigner are my lab bench: where I push that furthest, letting
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
        <div className="about-field" aria-labelledby="about-field-title">
          <p className="about-field-head">
            <span id="about-field-title">FIELD PRINTS</span>
            <span>AWAY FROM THE SCREEN / {String(fieldPrints.length).padStart(2, "0")} FRAMES</span>
          </p>
          <ul>
            {fieldPrints.map((print, index) => (
              <li key={print.src}>
                <figure>
                  <div className="about-field-photo">
                    <img
                      src={assetUrl(print.src)}
                      alt={print.alt}
                      loading="lazy"
                      decoding="async"
                      style={print.focus ? { objectPosition: print.focus } : undefined}
                    />
                  </div>
                  <figcaption>
                    <span>FIG. {String.fromCharCode(65 + index)}</span>
                    {print.caption}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
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
          I DON&apos;T JUST DESIGN SCREENS.{" "}
          <span>I MAKE SURE THEY SHIP AS DESIGNED.</span>
        </blockquote>
        <p className="about-manifesto-note">
          Interchangeable websites are a habit, and so are builds that drift from
          their design. I&apos;m an artist, a systems-minded organiser and a bit of
          a troublemaker. I push for more color, more motion and more personality,
          then I stay in the room until it&apos;s real. Fidelity isn&apos;t
          pedantry. It&apos;s respect for the idea.
        </p>
        <div>
          <Link to="/projects">SEE SELECTED WORK ↗</Link>
          <a href="mailto:its.liriani@gmail.com">START A CONVERSATION ↗</a>
          <a href={cv.href} download={cv.download}>{cv.label} ↓</a>
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
