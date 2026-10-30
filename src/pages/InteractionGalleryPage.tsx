import { useRef, useState } from "react";
import { Link } from "react-router";
import "@/styles/lab.css";
import { labCaseId, labCasePath, labCases } from "@/data/lab/labCases";
import { CleanupCloth, InkLayer, InkTip, useInkTraces } from "@/features/lab/InkTraces";

export default function InteractionGalleryPage() {
  const [resets, setResets] = useState<number[]>(() => labCases.map(() => 0));
  const pageRef = useRef<HTMLElement>(null);
  const ink = useInkTraces(pageRef);

  const reset = (index: number) =>
    setResets((current) => current.map((value, i) => (i === index ? value + 1 : value)));

  const jumpTo = (index: number) =>
    document.getElementById(`lab-${labCaseId(index)}`)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    // Clicks bubble here after each exhibit has handled them, so the paint
    // layer never gets in the way of the interactions themselves.
    <main className="lx-page lx-page--inked" ref={pageRef} onClick={ink.onPageClick}>
      <section className="lx-hero">
        <p>A FIELD STUDY IN DIGITAL MISBEHAVIOR</p>
        <h1>
          <span>THE HEADER</span>
          <span>IS <em aria-label="NOT">{"NOT".split("").map((l, i) => <b key={i} aria-hidden="true">{l}</b>)}</em> SAFE.</span>
        </h1>
        <div className="lx-hero-foot">
          <p>Sixteen interactive experiments for breaking the fourth wall between interface and visitor.</p>
          <a className="lx-scroll" href="#lab-01" onClick={(e) => { e.preventDefault(); jumpTo(0); }}>
            SCROLL TO DISTURB
            <span aria-hidden="true"><i /></span>
          </a>
        </div>
      </section>

      <nav className="lx-directory" aria-label="All sixteen interaction concepts">
        <div className="lx-directory-head">
          <p>CONCEPT DIRECTORY</p>
          <strong>16 / 16</strong>
        </div>
        <div className="lx-directory-grid">
          {labCases.map((item, i) => (
            <button type="button" key={item.title} onClick={() => jumpTo(i)}>
              <span>{labCaseId(i)}</span>
              <b>{item.short}</b>
              <span aria-hidden="true">↘</span>
            </button>
          ))}
        </div>
      </nav>

      <section className="lx-gallery" aria-label="Interaction case studies">
        {labCases.map((item, i) => (
          <article
            id={`lab-${labCaseId(i)}`}
            key={item.title}
            className={`lx-card ${item.dark ? "is-dark" : ""} ${item.wide ? "is-wide" : ""}`}
          >
            <div className="lx-card-top">
              <span className="lx-card-number">{labCaseId(i)}</span>
              <span className="lx-card-prompt">{item.prompt}</span>
              <button type="button" className="lx-reset" onClick={() => reset(i)} aria-label={`Reset ${item.title}`}>
                <img src={`${import.meta.env.BASE_URL}assets/lab/reset-${item.dark ? "light" : "dark"}.svg`} alt="" />
              </button>
            </div>

            <div className="lx-frame">{item.stage(resets[i])}</div>

            <Link className="lx-card-title" to={labCasePath(i)}>
              <h2>{item.title}</h2>
              <img src={`${import.meta.env.BASE_URL}assets/lab/arrow-${item.dark ? "light" : "dark"}.svg`} alt="" />
            </Link>

            <div className="lx-label">
              <div className="lx-label-id">
                <i />
                <span>ACC. NO. {labCaseId(i)}/16</span>
              </div>
              <div className="lx-label-body">
                <h3>{item.title}</h3>
                <p className="lx-label-medium"><mark>MEDIUM</mark>{item.medium}</p>
                <p className="lx-label-copy">{item.description}</p>
                <Link className="lx-label-cta" to={labCasePath(i)}>
                  EXPLORE PROJECT / VIEW CODE <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>

      <footer className="lx-footer">
        <span>END OF CONTROLLED ENVIRONMENT</span>
        <h2>Nothing broke permanently. Probably.</h2>
        <Link to="/projects" className="lx-play">PLAY<br />MORE</Link>
        <CleanupCloth
          markCount={ink.markCount}
          wiping={ink.wiping}
          onWipeAll={ink.wipeAll}
          onEraseAt={ink.eraseAt}
        />
      </footer>

      <InkLayer traces={ink.traces} wiping={ink.wiping} />
      <InkTip tip={ink.tip} />
    </main>
  );
}
