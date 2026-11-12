type CaseOverviewProps = {
  lede: string;
  /** Lab-note paragraphs, optionally "HEAD — body". */
  log?: string[];
  /** Shown when there is no log and no editorial run after it. */
  fallback?: string;
};

const RUN_IN = /^([A-Z0-9 /&→+·-]{3,40}?)\s+—\s+(.*)$/s;

function split(entry: string) {
  const match = entry.match(RUN_IN);
  return match ? { head: match[1], text: match[2] } : { head: null, text: entry };
}

/**
 * The opening spread: the lede set large across the page, then the lab notes as
 * a textbook page. A ruled margin index lists the sections; the notes run in two
 * columns with their heads set inline, the way a field manual reads.
 */
export default function CaseOverview({ lede, log, fallback }: CaseOverviewProps) {
  const entries = (log ?? []).map(split);
  const indexed = entries.filter((entry) => entry.head);

  return (
    <section className="case-overview">
      <div className="detail-section-label">
        <span>01</span>
        <p>PROJECT OVERVIEW</p>
      </div>
      <h2 className="case-overview-lede">{lede}</h2>

      {entries.length > 0 ? (
        <div className="case-overview-page">
          {indexed.length > 1 && (
            <ol className="case-overview-index" aria-label="In this overview">
              {indexed.map((entry, i) => (
                <li key={entry.head}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  {entry.head}
                </li>
              ))}
            </ol>
          )}
          <div className="case-overview-notes">
            {entries.map((entry) => (
              <p key={entry.text}>
                {entry.head && <b>{entry.head}</b>}
                {entry.text}
              </p>
            ))}
          </div>
        </div>
      ) : (
        fallback && <p className="case-overview-fallback">{fallback}</p>
      )}
    </section>
  );
}
