const coreStack = ["React", "TypeScript", "JavaScript", "Tailwind", "Vite"];

const creativeTools = [
  "Creative coding",
  "GLSL shaders",
  "TouchDesigner",
  "Motion systems",
  "Audio-reactive environments",
];

export default function AboutSkills() {
  return (
    <section className="about-section" id="about">
      <header className="about-heading">
        <p className="kicker">02 / ABOUT THE PRACTICE</p>
        <p className="about-index">DESIGNER.DEV.MAKER</p>
      </header>

      <div className="about-statement">
        <p>
          PRODUCT DESIGNER
          <br />
          <span>WITH A DEEP</span>
          <br />
          CREATIVE EDGE.
        </p>
        <aside>
          <span>PROFILE / SINCE 2019</span>
          <p>
            I build product-ready interfaces that feel visually alive—balancing
            thoughtful UX, expressive UI, and polished browser-based storytelling.
          </p>
        </aside>
      </div>

      <div className="rhythm-bar" aria-label={`Core stack: ${coreStack.join(", ")}`}>
        {coreStack.map((technology, index) => (
          <span key={technology}>
            {technology}
            {index < coreStack.length - 1 && <i>•</i>}
          </span>
        ))}
      </div>

      <div className="about-grid">
        <article className="about-copy">
          <span className="cell-number">A / BUILD</span>
          <h3>FROM IDEA TO INTERFACE</h3>
          <p>
            My work leans toward interactive experiences, motion, and polished
            browser-based storytelling. I like turning ideas into fast prototypes,
            thoughtful UX, and expressive UI that balances design with code.
          </p>
          <div className="capability-list">
            <span>PRODUCT DESIGN</span>
            <span>FRONT-END DEVELOPMENT</span>
            <span>INTERACTION &amp; MOTION</span>
            <span>RAPID PROTOTYPING</span>
          </div>
        </article>

        <article className="about-copy about-copy-acid">
          <span className="cell-number">B / EXPERIMENT</span>
          <h3>BEYOND THE STANDARD STACK</h3>
          <p>
            My creative vision thrives on experimentation—from shaders and creative
            code to immersive, audio-reactive environments. The browser is a
            product surface, but it is also a playground.
          </p>
          <div className="tool-cloud">
            {creativeTools.map((tool) => (
              <span key={tool}>{tool}</span>
            ))}
          </div>
        </article>

        <article className="about-copy about-copy-dark">
          <span className="cell-number">C / MAKE</span>
          <h3>PHYSICAL INPUT / DIGITAL OUTPUT</h3>
          <p>
            Away from Figma grids, I reset through DIY handcrafts and analog game
            design. GitHub sees a developer who ships high-impact code; at my core,
            I am a multidisciplinary maker bringing personality to every pixel.
          </p>
          <div className="maker-signal">
            <span>HANDS</span>
            <i />
            <span>HEAD</span>
            <i />
            <span>CODE</span>
          </div>
        </article>
      </div>
    </section>
  );
}
