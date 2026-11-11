import type { Chapter } from "@/data/projects";

type EditorialChaptersProps = {
  chapters: Chapter[];
  /** Section number in the page's running index. */
  index: string;
};

/**
 * The long read of a deep case. Each chapter kind has its own structure, so
 * a page reads as an article with changes of pace instead of repeated lists.
 */
export default function EditorialChapters({ chapters, index }: EditorialChaptersProps) {
  return (
    <section className="chapters" aria-label="Case study">
      {chapters.map((chapter, i) => {
        const key = `${chapter.kind}-${i}`;
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
        if (chapter.kind === "versus") {
          return (
            <article key={key} className="chapter chapter--versus">
              <span className="chapter-label">{chapter.label}</span>
              <div>
                <h3>{chapter.left.head}</h3>
                <p>{chapter.left.body}</p>
              </div>
              <i aria-hidden="true">→</i>
              <div>
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
        const first = chapters.findIndex((c) => c.kind === "essay") === i;
        return (
          <article key={key} className="chapter chapter--essay">
            <header>
              <div className="detail-section-label">
                <span>{first ? index : "··"}</span>
                <p>{chapter.label}</p>
              </div>
              <h2>{chapter.title}</h2>
            </header>
            <div className={`chapter-body ${first ? "has-dropcap" : ""}`}>
              {chapter.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>
        );
      })}
    </section>
  );
}
