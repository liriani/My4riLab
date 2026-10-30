import { Link } from "react-router";
import { useState } from "react";
import CursorTrailCanvas from "@/components/motion/CursorTrailCanvas";
import MotionProjectCard from "@/components/motion/MotionProjectCard";
import { projects, ProjectCategory } from "@/data/projects";

type Category = "All" | ProjectCategory;

const categories: Category[] = ["All", "Product", "Creative", "Tool"];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const visibleProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);


  return (
    <main className="projects-page">
      <CursorTrailCanvas />

      <header className="projects-hero">
        <div className="projects-eyebrow">
          <span>SELECTED WORK</span>
          <span>PRODUCT × CODE × EXPERIMENT</span>
        </div>
        <h1>
          PROJECT
          <br />
          <span>ARCHIVE.</span>
        </h1>
        <div className="projects-intro">
          <p>
            Interfaces, tools, and digital experiments built to be used—not just
            looked at.
          </p>
          <span>{String(projects.length).padStart(2, "0")} PROJECTS / SCROLL TO EXPLORE ↓</span>
        </div>
      </header>

      <section className="project-index">
        <div className="project-toolbar">
          <p>FILTER THE SIGNAL</p>
          <div className="project-filters" aria-label="Filter projects">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={activeCategory === category ? "active" : ""}
                aria-pressed={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <span>{String(visibleProjects.length).padStart(2, "0")} RESULTS</span>
        </div>

        <div className="project-list">
          {visibleProjects.map((project) => (
            <MotionProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="project-contact">
        <p>HAVE A PROJECT IN MIND?</p>
        <a href="mailto:its.liriani@gmail.com">
          LET&apos;S BUILD
          <br />
          <span>SOMETHING ALIVE.</span>
        </a>
      </section>

      <footer className="projects-footer">
        <Link to="/">← RETURN HOME</Link>
        <span>© {new Date().getFullYear()} 4RI / LIRI</span>
        <a href="https://github.com/liriani" target="_blank" rel="noreferrer">
          GITHUB ↗
        </a>
      </footer>
    </main>
  );
}
