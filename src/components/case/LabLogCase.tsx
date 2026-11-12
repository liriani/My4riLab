import type { LabLog, Project } from "@/data/projects";

const pad = (n: number) => String(n).padStart(2, "0");
const slugFlag = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/**
 * An experiment's opening readout: the build stated as a terminal session.
 * The overview, specs and process log follow it like any other case.
 */
export default function LabLogCase({ project, log }: { project: Project; log: LabLog }) {
  const cmd = slugFlag(project.title);

  return (
    <section className="lablog" aria-label="Lab log">
      <div className="lablog-bar" aria-hidden="true">
        <span>~/4ri/lab/{project.number}-{cmd}</span>
        <span>{project.type}</span>
      </div>

      <div className="lablog-screen">
        <p className="lablog-cmd">cat spark.txt</p>
        <p className="lablog-spark">{log.spark}</p>

        <p className="lablog-cmd">ls ./build</p>
        <ul className="lablog-tree">
          {log.build.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>

        <p className="lablog-cmd">./{cmd} --verbose</p>
        <ol className="lablog-stdout">
          {log.stdout.map((line, i) => (
            <li key={line}>
              <span>[{pad(i + 1)}]</span>
              {line}
            </li>
          ))}
          <li className="is-ok">
            <span>[OK]</span>
            exit 0
          </li>
        </ol>

        {log.limits && log.limits.length > 0 && (
          <>
            <p className="lablog-cmd">grep WARN build.log</p>
            <ul className="lablog-warn">
              {log.limits.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </>
        )}

        <p className="lablog-stack">
          {project.stack.map((tech) => (
            <span key={tech}>--{slugFlag(tech)}</span>
          ))}
        </p>
      </div>
    </section>
  );
}
