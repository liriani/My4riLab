import { useEffect, useState, type ReactNode } from "react";
import { Link, useParams } from "react-router";
import "@/styles/lab.css";
import { caseDetails } from "@/data/lab/caseDetails";
import { caseStudies } from "@/data/lab/caseStudies";
import { getLabCaseIndex, labCaseId, labCasePath, labCases } from "@/data/lab/labCases";

const TOKEN =
  /(\/\*[\s\S]*?\*\/)|("(?:[^"\\]|\\.)*")|(<\/?[a-zA-Z][\w-]*|\/?>)|(@keyframes|\b(?:const|let|function|return|if|new|true|false)\b)|(#[0-9a-fA-F]{3,8}\b)|((?<![\w#.-])-?\d*\.?\d+(?:px|ms|s|deg|em|%|vh|vw)?)|([a-z-]+(?=\s*:))/g;
const TOKEN_CLASSES = ["cmt", "str", "tag", "kw", "hex", "num", "prop"];

function highlight(code: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let key = 0;
  for (const match of code.matchAll(TOKEN)) {
    const index = match.index ?? 0;
    if (index > last) out.push(code.slice(last, index));
    const group = match.findIndex((value, i) => i > 0 && value !== undefined) - 1;
    out.push(
      <span key={key++} className={`tok-${TOKEN_CLASSES[group]}`}>
        {match[0]}
      </span>,
    );
    last = index + match[0].length;
  }
  if (last < code.length) out.push(code.slice(last));
  return out;
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const area = document.createElement("textarea");
    area.value = text;
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    const worked = document.execCommand("copy");
    area.remove();
    return worked;
  }
}

export default function LabCaseStudyPage() {
  const { caseId } = useParams();
  const index = getLabCaseIndex(caseId);

  if (index < 0) {
    return (
      <main className="lx-page cs-page cs-missing">
        <span>ERROR / 404</span>
        <h1>EXHIBIT NOT FOUND.</h1>
        <Link to="/lab">← BACK TO THE GALLERY</Link>
      </main>
    );
  }

  // Keyed so prev/next resets the sandbox, toast and replay counter.
  return <CaseStudy key={index} index={index} />;
}

function CaseStudy({ index }: { index: number }) {
  const item = labCases[index];
  const id = labCaseId(index);
  const study = caseStudies[id];
  const detail = caseDetails[id];
  const total = labCases.length;
  const prev = index > 0 ? index - 1 : null;
  const next = index < total - 1 ? index + 1 : null;
  const [run, setRun] = useState(0);
  const [toast, setToast] = useState<"" | "ok" | "fail">("");

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const copy = async () => setToast((await copyText(study.code)) ? "ok" : "fail");

  return (
    <main className="lx-page cs-page">
      <div className="cs-toolbar">
        <Link className="cs-back" to={`/lab#lab-${id}`}>
          <span aria-hidden="true">←</span> Back to Gallery
        </Link>
        <span className="cs-crumb">CASE STUDY / {id} OF {String(total).padStart(2, "0")}</span>
        <nav className="cs-pager" aria-label="Case study navigation">
          {prev !== null ? (
            <Link to={labCasePath(prev)} aria-label="Previous case study">←</Link>
          ) : (
            <span aria-hidden="true">←</span>
          )}
          {next !== null ? (
            <Link to={labCasePath(next)} aria-label="Next case study">→</Link>
          ) : (
            <span aria-hidden="true">→</span>
          )}
        </nav>
      </div>

      <section className="cs-hero">
        <div>
          <p className="cs-eyebrow">EXHIBIT {id}</p>
          <h1 className="cs-title">{item.title}</h1>
        </div>
        <aside className="cs-badge" aria-label={`Museum label for ${item.title}`}>
          <span className="cs-badge-acc">ACC. NO. {id}/{total}</span>
          <p className="cs-badge-medium"><mark>MEDIUM</mark>{item.medium}</p>
          <p className="cs-badge-note">{item.description}</p>
        </aside>
      </section>

      <section className="cs-sandbox" aria-label="Interactive sandbox">
        <div className="cs-sandbox-bar">
          <span className="cs-sandbox-live"><i /> LIVE SANDBOX</span>
          <span className="cs-sandbox-hint">{detail.hint}</span>
          <button type="button" className="cs-replay" onClick={() => setRun((value) => value + 1)}>
            <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M16 10a6 6 0 1 1-2-4.5M16 3v4h-4" /></svg>
            Reset / Replay
          </button>
        </div>
        <div className={`cs-sandbox-frame ${item.dark ? "is-dark" : ""}`}>{item.stage(run)}</div>
      </section>

      <div className="cs-body">
        <section className="cs-section">
          <h2><span>01</span>The Idea Behind It</h2>
          <div className="cs-content">
            <p className="cs-lead">{detail.backstory}</p>
            <dl className="cs-defs">
              <div><dt>Concept</dt><dd>{study.concept}</dd></div>
              <div><dt>Emotional trigger</dt><dd>{detail.trigger}</dd></div>
              <div><dt>How it breaks the fourth wall</dt><dd>{detail.fourthWall}</dd></div>
            </dl>
          </div>
        </section>

        <section className="cs-section">
          <h2><span>02</span>Design &amp; Motion Process</h2>
          <div className="cs-content">
            <p className="cs-lead">{study.motion}</p>
            <table className="cs-table">
              <tbody>
                {detail.timing.map(([name, value]) => (
                  <tr key={name}><th scope="row">{name}</th><td>{value}</td></tr>
                ))}
              </tbody>
            </table>
            <h3 className="cs-sub">Why it works</h3>
            <p>{study.why}</p>
            <h3 className="cs-sub">Accessibility &amp; graceful fallbacks</h3>
            <ul className="cs-list">
              {detail.a11y.map((line) => <li key={line}>{line}</li>)}
            </ul>
          </div>
        </section>

        <section className="cs-section">
          <h2><span>03</span>Step-by-Step Technical Breakdown</h2>
          <div className="cs-content">
            <ol className="cs-steps">
              {study.steps.map(([heading, body], i) => (
                <li key={heading}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <div><strong>{heading}</strong><p>{body}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="cs-section">
          <h2><span>04</span>Production-Ready Code</h2>
          <div className="cs-content">
            <div className="cs-code">
              <div className="cs-code-bar">
                <span>HTML + CSS + JS / single file</span>
                <button type="button" onClick={copy}>Copy Code</button>
              </div>
              <pre><code>{highlight(study.code)}</code></pre>
            </div>
          </div>
        </section>
      </div>

      <footer className="cs-footer">
        {prev !== null ? (
          <Link className="cs-footer-link" to={labCasePath(prev)}>
            <small>← PREVIOUS</small>
            <strong>{labCases[prev].title}</strong>
          </Link>
        ) : (
          <Link className="cs-footer-link" to="/lab">
            <small>← INDEX</small>
            <strong>All sixteen exhibits</strong>
          </Link>
        )}
        {next !== null ? (
          <Link className="cs-footer-link cs-footer-link--next" to={labCasePath(next)}>
            <small>NEXT →</small>
            <strong>{labCases[next].title}</strong>
          </Link>
        ) : (
          <Link className="cs-footer-link cs-footer-link--next" to="/lab">
            <small>INDEX →</small>
            <strong>All sixteen exhibits</strong>
          </Link>
        )}
      </footer>

      <div className={`cs-toast ${toast ? "is-visible" : ""} ${toast === "fail" ? "is-fail" : ""}`} role="status" aria-live="polite">
        {toast === "ok" && "✓ Code copied to clipboard"}
        {toast === "fail" && "Copy blocked by the browser. Select the code and press Ctrl/Cmd+C."}
      </div>
    </main>
  );
}
