import ProjectArtwork from "@/components/ui/ProjectArtwork";
import ProjectImage from "@/components/ui/ProjectImage";
import type { Chapter, QaStatus } from "@/data/projects";

type EditorialChaptersProps = {
  chapters: Chapter[];
  /** Section number in the page's running index. */
  index: string;
  visual: string;
};

type Essay = Extract<Chapter, { kind: "essay" }>;
type Qa = Extract<Chapter, { kind: "qa" }>;

const STATUS_LABEL: Record<QaStatus, string> = { pass: "PASS", logged: "LOGGED", fixed: "FIXED" };

/**
 * A QA log set as a test report: a tally strip, then one row per check with
 * the design intent beside the result. Open items stay visible, in orange.
 */
function QaChapter({ chapter, number }: { chapter: Qa; number: string }) {
  const tally = (status: QaStatus) => chapter.rows.filter((row) => row[2] === status).length;
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <article className="chapter chapter--qa">
      <header>
        <SectionLabel number={number} label={chapter.label} />
        <h2>{chapter.title}</h2>
        {chapter.intro && <p>{chapter.intro}</p>}
      </header>
      <dl className="qa-tally">
        <div>
          <dt>CHECKS</dt>
          <dd>{pad(chapter.rows.length)}</dd>
        </div>
        {(["pass", "fixed", "logged"] as QaStatus[])
          .filter((status) => tally(status) > 0)
          .map((status) => (
            <div key={status} className={`is-${status}`}>
              <dt>{STATUS_LABEL[status]}</dt>
              <dd>{pad(tally(status))}</dd>
            </div>
          ))}
      </dl>
      <table className="qa-table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">CHECK</th>
            <th scope="col">DESIGN INTENT</th>
            <th scope="col">RESULT</th>
            <th scope="col">HOW IT HOLDS</th>
          </tr>
        </thead>
        <tbody>
          {chapter.rows.map(([check, expected, status, note], i) => (
            <tr key={check} className={`is-${status}`}>
              <td data-label="#">QA-{pad(i + 1)}</td>
              <th scope="row">{check}</th>
              <td data-label="INTENT">{expected}</td>
              <td data-label="RESULT">
                <mark>{STATUS_LABEL[status]}</mark>
              </td>
              <td data-label="NOTE">{note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}

function SectionLabel({ number, label }: { number: string; label: string }) {
  return (
    <div className="detail-section-label">
      <span>{number}</span>
      <p>{label}</p>
    </div>
  );
}

function Body({ paragraphs, dropcap }: { paragraphs: string[]; dropcap: boolean }) {
  return (
    <div className={`chapter-body ${dropcap ? "has-dropcap" : ""}`}>
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  );
}

/**
 * Essays take one of two reading layouts: a side rail with two columns of body,
 * or a full-width headline over a three-column textbook spread.
 */
function EssayChapter({ chapter, number, first }: { chapter: Essay; number: string; first: boolean }) {
  const columns = chapter.columns ?? 2;
  return (
    <article className={`chapter chapter--essay chapter--cols-${columns}`}>
      <header>
        <SectionLabel number={number} label={chapter.label} />
        <h2>{chapter.title}</h2>
      </header>
      <Body paragraphs={chapter.body} dropcap={first} />
    </article>
  );
}

/**
 * The long read of a deep case. Each chapter kind is its own grid (rail + columns,
 * textbook spread, full-bleed image with quote, asymmetric text/image), so a page
 * reads as an article with changes of pace instead of repeated lists.
 */
export default function EditorialChapters({ chapters, index, visual }: EditorialChaptersProps) {
  const firstText = chapters.findIndex((c) => c.kind === "essay" || c.kind === "aside" || c.kind === "qa");
  let asides = 0;

  return (
    <section className="chapters" aria-label="Case study">
      {chapters.map((chapter, i) => {
        const key = `${chapter.kind}-${i}`;
        const number = i === firstText ? index : "··";

        if (chapter.kind === "pull") {
          return (
            <figure key={key} className="chapter chapter--pull">
              <blockquote>
                <p>{chapter.quote}</p>
              </blockquote>
              <figcaption>— {chapter.source}</figcaption>
            </figure>
          );
        }

        if (chapter.kind === "feature") {
          return (
            <figure key={key} className="chapter chapter--feature">
              <div className={`chapter-feature-plate visual-${visual}`}>
                <ProjectArtwork type={visual} />
                <ProjectImage src={chapter.src} alt={chapter.caption} fit={chapter.fit ?? "contain"} />
                <span>PLATE / {chapter.caption}</span>
              </div>
              <blockquote>
                <p>{chapter.quote}</p>
                <footer>— {chapter.source}</footer>
              </blockquote>
            </figure>
          );
        }

        if (chapter.kind === "aside") {
          // Default side alternates per aside, so two in a row never mirror each other.
          const side = chapter.side ?? (asides++ % 2 === 0 ? "right" : "left");
          return (
            <article key={key} className={`chapter chapter--aside is-image-${side}`}>
              <div className="chapter-aside-text">
                <SectionLabel number={number} label={chapter.label} />
                <h2>{chapter.title}</h2>
                <Body paragraphs={chapter.body} dropcap={i === firstText} />
              </div>
              <figure className={`chapter-aside-plate visual-${visual}`}>
                <ProjectArtwork type={visual} />
                <ProjectImage src={chapter.src} alt={chapter.caption} fit={chapter.fit ?? "contain"} />
                <figcaption>{chapter.caption}</figcaption>
              </figure>
            </article>
          );
        }

        if (chapter.kind === "versus") {
          return (
            <article key={key} className="chapter chapter--versus">
              <span className="chapter-label">{chapter.label}</span>
              <div>
                <span className="versus-tag">CONSIDERED</span>
                <h3>{chapter.left.head}</h3>
                <p>{chapter.left.body}</p>
              </div>
              <i aria-hidden="true">→</i>
              <div>
                <span className="versus-tag">CHOSEN</span>
                <h3>{chapter.right.head}</h3>
                <p>{chapter.right.body}</p>
              </div>
            </article>
          );
        }

        if (chapter.kind === "figures") {
          return (
            <article key={key} className="chapter chapter--figures">
              <span className="chapter-label">{chapter.label}</span>
              <dl>
                {chapter.items.map(([value, label]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </article>
          );
        }

        if (chapter.kind === "qa") {
          return <QaChapter key={key} chapter={chapter} number={number} />;
        }

        return <EssayChapter key={key} chapter={chapter} number={number} first={i === firstText} />;
      })}
    </section>
  );
}
