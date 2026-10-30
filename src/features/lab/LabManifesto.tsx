import { forwardRef } from "react";

const PRINCIPLES = [
  {
    title: "PRECISION VS. CHAOS",
    body: "Code is exact to the pixel. People are not. Every exhibit starts as a rigid, well-behaved layout and then lets one physical force in: gravity, wind, appetite, wear and tear.",
  },
  {
    title: "THE FOURTH WALL IS LOAD-BEARING",
    body: "The navigation knows you are there. Headers notice when you stop moving, menus get repaired while you watch, links get eaten. The interface stops pretending to be glass.",
  },
  {
    title: "CODE AS A REBELLIOUS MEDIUM",
    body: "React, CSS and a few lines of physics, used against their own conventions. Every misbehaviour is deliberate, reversible, and documented down to the easing curve.",
  },
  {
    title: "TOUCH IS THE METHOD",
    body: "Nothing here explains itself until you poke it. Every card resets, and every case study shows the working: the idea, the timing, the code.",
  },
];

const PROCESS = ["SKETCH IT ON PAPER", "BUILD THE RIGID VERSION", "LET ONE FORCE IN", "TUNE THE TIMING", "WRITE IT DOWN"];

/** The Lab's opening statement, between the hero and the concept directory. */
const LabManifesto = forwardRef<HTMLElement, { inked: boolean }>(function LabManifesto({ inked }, ref) {
  return (
    <section ref={ref} className="lx-manifesto" aria-labelledby="lx-manifesto-title">
      <div className="lx-manifesto-head">
        <p className="lx-manifesto-kicker">00 / BEFORE YOU TOUCH ANYTHING</p>
        <h2 id="lx-manifesto-title">
          <span>PIXELS PRETEND</span>
          <span>TO BE PRECISE.</span>
          <em>THIS LAB DOESN&apos;T.</em>
        </h2>
        <p className="lx-manifesto-lead">
          Every interface is a negotiation between the grid and the hand that uses it.
          Screens promise perfect alignment; people bring fingerprints, impatience and
          curiosity. This lab lives in that gap and lets the two collide on purpose.
        </p>
      </div>

      <ol className="lx-manifesto-rules">
        {PRINCIPLES.map((rule, index) => (
          <li key={rule.title}>
            <span>0{index + 1}</span>
            <h3>{rule.title}</h3>
            <p>{rule.body}</p>
          </li>
        ))}
      </ol>

      <div className="lx-manifesto-process" aria-label="Creative process">
        <span>PROCESS</span>
        <ol>
          {PROCESS.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>

      <p className="lx-manifesto-foot">
        ↓ Sixteen experiments follow.{" "}
        {inked ? "Your fingers still have paint on them." : "Your hands are clean. For now."}
      </p>
    </section>
  );
});

export default LabManifesto;
