const coreStack = ["Figma", "Design systems", "Components & variants", "Handoff specs", "Design QA"];

const organizeTools = ["File audits", "Component libraries", "Design tokens", "Documentation"];

export default function AboutSkills() {
  return (
    <section className="about-section" id="about">
      <header className="about-heading">
        <p className="kicker">02 / ABOUT THE PRACTICE</p>
        <p className="about-index">DESIGNER.SYSTEMS.QA</p>
      </header>

      <div className="about-statement">
        <p>
          CREATIVE UI DESIGNER
          <br />
          <span>WHO CHECKS</span>
          <br />
          THE BUILD.
        </p>
        <aside>
          <span>PROFILE</span>
          <p>
            I make interfaces with personality, then make sure that personality
            survives the trip to production. Figma is where I design. The browser
            is where I verify.
          </p>
        </aside>
      </div>

      <div className="rhythm-bar" aria-label={`Practice: ${coreStack.join(", ")}`}>
        {coreStack.map((technology, index) => (
          <span key={technology}>
            {technology}
            {index < coreStack.length - 1 && <i>•</i>}
          </span>
        ))}
      </div>

      <div className="about-grid">
        <article className="about-copy">
          <span className="cell-number">A / DESIGN</span>
          <h3>EXPRESSIVE BY DEFAULT</h3>
          <p>
            Colour, motion and interaction states designed in Figma as a system,
            not a mood board. Every hover, error and empty state exists in the
            file before anyone asks for it.
          </p>
          <div className="capability-list">
            <span>UI DESIGN</span>
            <span>INTERACTION STATES</span>
            <span>MOTION SPECS</span>
            <span>PROTOTYPING</span>
          </div>
        </article>

        <article className="about-copy about-copy-acid">
          <span className="cell-number">B / ORGANIZE</span>
          <h3>I RESCUE FILES</h3>
          <p>
            Detached instances, forty shades of grey, pages called
            &ldquo;final_v3_REAL&rdquo;. I audit legacy design projects, rebuild them
            into components and tokens, and leave a file a new designer can open
            without fear.
          </p>
          <div className="tool-cloud">
            {organizeTools.map((tool) => (
              <span key={tool}>{tool}</span>
            ))}
          </div>
        </article>

        <article className="about-copy about-copy-dark">
          <span className="cell-number">C / VERIFY</span>
          <h3>THE BRIDGE TO ENGINEERING</h3>
          <p>
            I sit between the design file and the engineering team. I read code
            well enough to know where fidelity breaks (spacing, type, states,
            breakpoints, motion) and report it in a language both sides act on.
          </p>
          <div className="maker-signal">
            <span>EYE</span>
            <i />
            <span>FILE</span>
            <i />
            <span>BUILD</span>
          </div>
        </article>
      </div>
    </section>
  );
}
