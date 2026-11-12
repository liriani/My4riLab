import type { ReactNode } from "react";
import ProjectArtwork from "@/components/ui/ProjectArtwork";
import ProjectImage from "@/components/ui/ProjectImage";
import type { FigureStudy, ProjectFigure, StudyLayout } from "@/data/projects";

const pad = (n: number) => String(n).padStart(2, "0");

type StudiedFigure = ProjectFigure & { study: FigureStudy };

export const hasStudy = (figure: ProjectFigure): figure is StudiedFigure => Boolean(figure.study);

/** Used when a study doesn't name its layout: no two neighbours share a structure. */
const ROTATION: StudyLayout[] = ["wide", "split", "feature", "quote", "ledger"];

type BlockProps = {
  figure: StudiedFigure;
  number: string;
  visual: string;
};

/* ───────── shared pieces ───────── */

function Plate({ figure, number, visual, className = "" }: BlockProps & { className?: string }) {
  return (
    <figure className={`study-plate visual-${visual} ${className}`}>
      <ProjectArtwork type={visual} />
      <ProjectImage src={figure.src} alt={figure.caption} fit={figure.fit ?? "contain"} />
      <figcaption>FIG {number} / {figure.caption}</figcaption>
    </figure>
  );
}

function Kicker({ number, phase }: { number: string; phase: string }) {
  return (
    <p className="study-kicker">
      <span>FIG {number}</span>
      {phase}
    </p>
  );
}

function Notes({ notes, className = "" }: { notes: string[]; className?: string }) {
  return (
    <div className={`study-notes ${className}`}>
      {notes.map((note) => (
        <p key={note}>{note}</p>
      ))}
    </div>
  );
}

/** Pain points, struck through: the problems this phase took off the table. */
function Solved({ solves }: { solves?: string[] }) {
  if (!solves?.length) return null;
  return (
    <div className="study-solved">
      <span>PAIN POINTS ADDRESSED</span>
      <ul>
        {solves.map((pain) => (
          <li key={pain}>{pain}</li>
        ))}
      </ul>
    </div>
  );
}

const decisionId = (i: number) => `D${pad(i + 1)}`;

/* ───────── layouts ───────── */

/** Full-width image band, notes in two columns, then pains vs calls side by side. */
function WideStudy({ figure, number, visual }: BlockProps) {
  const { study } = figure;
  return (
    <>
      <header className="study-wide-head">
        <Kicker number={number} phase={study.phase} />
        <h3 id={`study-${number}`}>{study.title}</h3>
      </header>
      <Plate figure={figure} number={number} visual={visual} className="study-plate--band" />
      <Notes notes={study.notes} className="study-notes--columns" />
      <div className="study-compare">
        {study.solves && (
          <div className="study-compare-pains">
            <span>WHAT WAS IN THE WAY</span>
            <ul>
              {study.solves.map((pain) => (
                <li key={pain}>{pain}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="study-compare-calls">
          <span>CALLS MADE</span>
          {study.decisions.map(([call, why], i) => (
            <div key={call}>
              <b>
                <i>{decisionId(i)}</i>
                {call}
              </b>
              <p>{why}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/** Image beside the argument, decisions as a row of cards underneath. */
function SplitStudy({ figure, number, visual, flip }: BlockProps & { flip: boolean }) {
  const { study } = figure;
  return (
    <>
      <div className={`study-split ${flip ? "is-flipped" : ""}`}>
        <Plate figure={figure} number={number} visual={visual} />
        <div className="study-split-text">
          <Kicker number={number} phase={study.phase} />
          <h3 id={`study-${number}`}>{study.title}</h3>
          <Notes notes={study.notes} />
          <Solved solves={study.solves} />
        </div>
      </div>
      <ol className="study-cards" aria-label="Design decisions">
        {study.decisions.map(([call, why], i) => (
          <li key={call}>
            <span>{decisionId(i)}</span>
            <b>{call}</b>
            <p>{why}</p>
          </li>
        ))}
      </ol>
    </>
  );
}

/** Oversized offset quote with a tilted plate breaking into it; decisions as newspaper columns. */
function QuoteStudy({ figure, number, visual }: BlockProps) {
  const { study } = figure;
  const [lead, ...rest] = study.notes;
  return (
    <>
      <div className="study-quote">
        <div className="study-quote-callout">
          <Kicker number={number} phase={study.phase} />
          <h3 id={`study-${number}`}>{study.title}</h3>
        </div>
        <Plate figure={figure} number={number} visual={visual} className="study-plate--tilted" />
      </div>
      <p className="study-lead">{lead}</p>
      {rest.length > 0 && <Notes notes={rest} className="study-notes--indent" />}
      <ol className="study-columns" aria-label="Design decisions">
        {study.decisions.map(([call, why], i) => (
          <li key={call}>
            <span>{decisionId(i)}</span>
            <b>{call}</b>
            <p>{why}</p>
          </li>
        ))}
      </ol>
      <Solved solves={study.solves} />
    </>
  );
}

/** A data row of metadata, then text beside the image, then a decision / rationale table. */
function LedgerStudy({ figure, number, visual }: BlockProps) {
  const { study } = figure;
  return (
    <>
      <dl className="study-ledger-meta">
        <div>
          <dt>FIG</dt>
          <dd>{number}</dd>
        </div>
        <div>
          <dt>PHASE</dt>
          <dd>{study.phase}</dd>
        </div>
        <div>
          <dt>DECISIONS</dt>
          <dd>{pad(study.decisions.length)}</dd>
        </div>
        {study.solves && (
          <div className="is-wide">
            <dt>PAIN POINTS ADDRESSED</dt>
            <dd>{study.solves.join(" · ")}</dd>
          </div>
        )}
      </dl>
      <div className="study-ledger-body">
        <div>
          <h3 id={`study-${number}`}>{study.title}</h3>
          <Notes notes={study.notes} />
        </div>
        <Plate figure={figure} number={number} visual={visual} />
      </div>
      <table className="study-table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">DECISION</th>
            <th scope="col">RATIONALE</th>
          </tr>
        </thead>
        <tbody>
          {study.decisions.map(([call, why], i) => (
            <tr key={call}>
              <td>{decisionId(i)}</td>
              <th scope="row">{call}</th>
              <td>{why}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

/**
 * Full-bleed image with the headline set as a pull-quote across its lower edge,
 * notes as a three-column spread, decisions as one numbered ruled row.
 */
function FeatureStudy({ figure, number, visual }: BlockProps) {
  const { study } = figure;
  return (
    <>
      <div className="study-feature">
        <Plate figure={figure} number={number} visual={visual} className="study-plate--bleed" />
        <blockquote className="study-feature-quote">
          <Kicker number={number} phase={study.phase} />
          <h3 id={`study-${number}`}>{study.title}</h3>
        </blockquote>
      </div>
      <Notes notes={study.notes} className="study-notes--three" />
      <ol className="study-row" aria-label="Design decisions">
        {study.decisions.map(([call, why], i) => (
          <li key={call}>
            <span>{decisionId(i)}</span>
            <b>{call}</b>
            <p>{why}</p>
          </li>
        ))}
      </ol>
      <Solved solves={study.solves} />
    </>
  );
}

type FigureStudiesProps = {
  figures: StudiedFigure[];
  visual: string;
  /** Section number in the page's running index. */
  index: string;
  /** Where in the rotation this page starts, so neighbouring projects open differently. */
  offset?: number;
};

/**
 * The process log: one block per figure, the image beside the reasoning that
 * produced it. Each block takes one of five editorial layouts, so the page
 * reads as a sequence with rhythm rather than a stack of identical lists.
 */
export default function FigureStudies({ figures, visual, index, offset = 0 }: FigureStudiesProps) {
  let splits = 0;

  return (
    <section className="figure-studies" aria-labelledby="figure-studies-title">
      <header className="figure-studies-head">
        <div className="detail-section-label">
          <span>{index}</span>
          <p>PROCESS LOG</p>
        </div>
        <h2 id="figure-studies-title">
          FIGURE BY FIGURE.
          <br />
          <span>WHAT WAS DECIDED, AND WHY.</span>
        </h2>
      </header>

      {figures.map((figure, i) => {
        const number = pad(i + 1);
        const layout = figure.study.layout ?? ROTATION[(i + offset) % ROTATION.length];
        const props = { figure, number, visual };
        let block: ReactNode;
        if (layout === "wide") block = <WideStudy {...props} />;
        else if (layout === "quote") block = <QuoteStudy {...props} />;
        else if (layout === "ledger") block = <LedgerStudy {...props} />;
        else if (layout === "feature") block = <FeatureStudy {...props} />;
        // Consecutive splits on a page alternate which side the image sits.
        else block = <SplitStudy {...props} flip={splits++ % 2 === 1} />;

        return (
          <article key={figure.src} className={`study study--${layout}`} aria-labelledby={`study-${number}`}>
            {block}
          </article>
        );
      })}
    </section>
  );
}
