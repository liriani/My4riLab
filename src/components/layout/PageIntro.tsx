import type { PageIntroCopy } from "@/data/pageIntros";

/** The positioning every page answers to, printed on each abstract. */
const DISCIPLINES = ["CREATIVE UI DESIGN", "SYSTEM ORGANIZATION", "FRONTEND QA"];

/**
 * The lab-note abstract that opens each main page, directly under the header:
 * which space this is, what it's for, and why it exists. Same frame on every
 * page, so the site reads as one notebook with four sections.
 */
export default function PageIntro({ intro }: { intro: PageIntroCopy }) {
  return (
    <section className="page-intro" aria-label={`${intro.label}: abstract`}>
      <div className="page-intro-meta">
        <p className="page-intro-kicker">
          <span>{intro.index}</span>
          ABSTRACT / {intro.label}
        </p>
        <ul className="page-intro-disciplines" aria-label="Disciplines">
          {DISCIPLINES.map((discipline) => (
            <li key={discipline}>{discipline}</li>
          ))}
        </ul>
      </div>
      <div className="page-intro-body">
        <p className="page-intro-abstract">{intro.abstract}</p>
        <p className="page-intro-note">
          <span>WHY IT EXISTS</span>
          {intro.note}
        </p>
      </div>
    </section>
  );
}
