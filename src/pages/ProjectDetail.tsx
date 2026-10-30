import { Link, useParams } from "react-router";
import ProjectArtwork from "@/components/ui/ProjectArtwork";
import { getProjectBySlug, projects } from "@/data/projects";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);


  if (!project) {
    return (
      <main className="project-not-found">
        <span>ERROR / 404</span>
        <h1>PROJECT SIGNAL LOST.</h1>
        <Link to="/projects">← RETURN TO THE ARCHIVE</Link>
      </main>
    );
  }

  const projectIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <main className="project-detail">

      <header className="detail-hero">
        <div className="detail-label-row">
          <span>FIG / {project.number}</span>
          <span>{project.badge ?? project.category}</span>
          <span>A PROJECT BY 4RI / LIRI</span>
        </div>
        <p>{project.subtitle}</p>
        <h1>{project.title}</h1>
        <div className="detail-hero-meta">
          <span>{project.type}</span>
          <span>{String(projectIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
        </div>
      </header>

      <section className={`detail-media visual-${project.visual}`}>
        <ProjectArtwork type={project.visual} />
        <span className="project-figure">MEDIA / PRIMARY</span>
        <span className="project-category">{project.badge ?? project.category}</span>
      </section>

      <section className="detail-overview">
        <div className="detail-section-label">
          <span>01</span>
          <p>PROJECT OVERVIEW</p>
        </div>
        <div className="detail-lead">
          <h2>{project.description}</h2>
          <p>
            Designed and developed by 4ri (Liri) as part of an ongoing practice
            exploring product thinking, expressive interaction, and production-ready
            front-end systems.
          </p>
        </div>
      </section>

      <section className="detail-specs">
        <div className="detail-stack">
          <div className="detail-section-label">
            <span>02</span>
            <p>TECHNICAL STACK</p>
          </div>
          <ul>
            {project.stack.map((technology, index) => (
              <li key={technology}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{technology}</strong>
              </li>
            ))}
          </ul>
        </div>

        <aside className="detail-links">
          <div className="detail-section-label">
            <span>03</span>
            <p>PROJECT LINKS</p>
          </div>
          <a href={project.repository} target="_blank" rel="noreferrer">
            <span>
              {project.private ? "PRIVATE REPOSITORY" : "VIEW SOURCE"}
              <small>
                {project.private ? "Access required" : "Open on GitHub"}
              </small>
            </span>
            <strong>↗</strong>
          </a>
          <Link to="/projects">
            <span>
              PROJECT ARCHIVE
              <small>Explore all work</small>
            </span>
            <strong>←</strong>
          </Link>
          <div className="detail-credit">
            <span>ROLE</span>
            <strong>DESIGN &amp; DEVELOPMENT</strong>
            <span>CREDIT</span>
            <strong>4RI / LIRI</strong>
          </div>
        </aside>
      </section>

      <section className="detail-media-grid">
        <div className={`detail-media-small visual-${project.visual}`}>
          <ProjectArtwork type={project.visual} />
          <span>DETAIL / INTERACTION</span>
        </div>
        <div className="detail-media-note">
          <span>04 / SYSTEM NOTE</span>
          <p>
            BUILT TO BALANCE
            <br />
            <strong>UTILITY</strong> WITH
            <br />
            VISUAL CHARACTER.
          </p>
        </div>
      </section>

      <Link className="next-project" to={`/projects/${nextProject.slug}`}>
        <span>NEXT PROJECT / {nextProject.number}</span>
        <strong>{nextProject.title}</strong>
        <i>↗</i>
      </Link>

      <footer className="projects-footer">
        <Link to="/projects">← PROJECT ARCHIVE</Link>
        <span>© 2025 4RI / LIRI</span>
        <a href="https://github.com/liriani" target="_blank" rel="noreferrer">
          GITHUB ↗
        </a>
      </footer>
    </main>
  );
}
