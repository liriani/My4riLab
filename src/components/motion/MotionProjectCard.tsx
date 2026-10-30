import {
  motion,
  MotionValue,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useState } from "react";
import { Link } from "react-router";
import { Project } from "@/data/projects";
import ProjectArtwork from "@/components/ui/ProjectArtwork";

const spring = { stiffness: 300, damping: 20, mass: 0.7 };

type MotionProjectCardProps = {
  project: Project;
  scrollProgress: MotionValue<number>;
};

export default function MotionProjectCard({
  project,
  scrollProgress,
}: MotionProjectCardProps) {
  const reducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rawSkew = useMotionValue(0);
  const rotateX = useSpring(rawRotateX, spring);
  const rotateY = useSpring(rawRotateY, spring);
  const skewX = useSpring(rawSkew, spring);
  const artworkX = useTransform(rotateY, [-6, 6], [-13, 13]);
  const artworkY = useTransform(rotateX, [-6, 6], [10, -10]);
  const figureX = useTransform(scrollProgress, [0, 1], [-18, 46]);
  const categoryX = useTransform(scrollProgress, [0, 1], [22, -38]);

  const moveCard = (event: React.PointerEvent<HTMLElement>) => {
    if (reducedMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const normalizedX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const normalizedY = (event.clientY - bounds.top) / bounds.height - 0.5;
    rawRotateY.set(normalizedX * 8);
    rawRotateX.set(normalizedY * -7);
    rawSkew.set(normalizedX * -1.1);
  };

  const resetCard = () => {
    setIsHovered(false);
    rawRotateX.set(0);
    rawRotateY.set(0);
    rawSkew.set(0);
  };

  return (
    <motion.article
      className={`project-card ${project.featured ? "featured" : ""}`}
      style={{
        rotateX: reducedMotion ? 0 : rotateX,
        rotateY: reducedMotion ? 0 : rotateY,
        skewX: reducedMotion ? 0 : skewX,
        transformPerspective: 1100,
      }}
      whileHover={reducedMotion ? undefined : { y: -10, scale: 1.008 }}
      transition={spring}
      onPointerMove={moveCard}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={resetCard}
      onPointerLeave={resetCard}
    >
      <Link
        className="project-card-hitbox"
        to={`/projects/${project.slug}`}
        aria-label={`View ${project.title} project details`}
      >
        <span className="visually-hidden">View {project.title}</span>
      </Link>

      <div className={`project-visual visual-${project.visual}`}>
        <motion.div
          className="project-artwork-motion"
          style={{
            x: reducedMotion ? 0 : artworkX,
            y: reducedMotion ? 0 : artworkY,
          }}
        >
          <ProjectArtwork type={project.visual} />
        </motion.div>
        <motion.span className="project-figure" style={{ x: figureX }}>
          FIG / {project.number}
        </motion.span>
        <motion.span className="project-category" style={{ x: categoryX }}>
          {project.badge ?? project.category}
        </motion.span>
      </div>

      <div className="project-content">
        <div className="project-meta-row">
          <div className="project-number">/{project.number}</div>
          <span>{project.type}</span>
        </div>
        <div className="project-title-row">
          <div>
            <p>{project.subtitle}</p>
            <h2 aria-label={project.title}>
              {project.title.split("").map((character, index) => (
                <motion.span
                  aria-hidden="true"
                  key={`${character}-${index}`}
                  animate={
                    reducedMotion
                      ? undefined
                      : {
                          x: isHovered ? ((index % 3) - 1) * 2 : 0,
                          y: isHovered ? (index % 2 ? 4 : -4) : 0,
                          rotate: isHovered ? (index % 2 ? 1.4 : -1.4) : 0,
                        }
                  }
                  transition={{ ...spring, delay: index * 0.012 }}
                >
                  {character === " " ? "\u00a0" : character}
                </motion.span>
              ))}
            </h2>
          </div>
          <motion.span
            className="project-arrow"
            animate={isHovered ? { x: 6, y: -6 } : { x: 0, y: 0 }}
            transition={spring}
          >
            ↗
          </motion.span>
        </div>
        <p className="project-description">{project.description}</p>
        <ul>
          {project.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <a
          className="project-link"
          href={project.repository}
          target="_blank"
          rel="noreferrer"
        >
          {project.private ? "PRIVATE REPOSITORY / ACCESS REQUIRED" : "VIEW REPOSITORY"}
          <span>↗</span>
        </a>
      </div>
    </motion.article>
  );
}
