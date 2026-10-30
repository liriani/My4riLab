export type ProjectCategory = "Product" | "Creative" | "Tool";

export type Project = {
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  stack: string[];
  category: ProjectCategory;
  badge?: string;
  type: string;
  repository: string;
  featured?: boolean;
  private?: boolean;
  visual: string;
};

export const projects: Project[] = [
  {
    slug: "pixelator",
    number: "001",
    title: "PIXELATOR",
    subtitle: "IMAGE DECONSTRUCTION ENGINE",
    description:
      "Browser-based image editor that transforms photos into retro, glitchy pixel art with live canvas preview and client-side GIF export.",
    stack: ["React", "Vite", "Tailwind CSS", "JavaScript", "gif.js", "Sharp"],
    category: "Creative",
    type: "Dynamic / Interactive",
    repository: "https://github.com/liriani/Pixelator",
    featured: true,
    visual: "pixelator",
  },
  {
    slug: "visado-assessment-board",
    number: "002",
    title: "VISADO",
    subtitle: "VISUAL ASSESSMENT BOARD",
    description:
      "Interactive canvas for mapping assessments and workflows with draggable nodes, pan and zoom, custom boards, and inline edge labeling.",
    stack: ["React", "Vite", "Tailwind CSS", "JavaScript", "Canvas interactions"],
    category: "Tool",
    type: "Dynamic / Interactive / Data-driven",
    repository: "https://github.com/liriani/VisadoAssessmentBoard",
    featured: true,
    visual: "visado",
  },
  {
    slug: "spccse-project",
    number: "003",
    title: "CCSE PROJECT",
    subtitle: "MOTION-DRIVEN PRODUCT UI",
    description:
      "A modern TypeScript React app focused on polished UI and motion-driven UX, built as a production-ready component system for a course project.",
    stack: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion", "Vitest"],
    category: "Product",
    type: "Dynamic / Interactive",
    repository: "https://github.com/liriani/spccseProject",
    visual: "ccse",
  },
  {
    slug: "potentia-lab",
    number: "004",
    title: "POTENTIA LAB",
    subtitle: "FIGMA TO PRODUCT SYSTEM",
    description:
      "Figma-derived product front-end showcasing a themeable, componentized UI and deployment-ready build pipeline.",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "shadcn-style theming"],
    category: "Product",
    type: "Interactive",
    repository: "https://github.com/liriani/PotentiaLab",
    visual: "potentia",
  },
  {
    slug: "puma-protocol",
    number: "005",
    title: "PUMA PROTOCOL",
    subtitle: "BRAND & PROTOCOL EXPERIENCE",
    description:
      "Clean landing and demo UI for a protocol product showcasing modern front-end patterns and brand-forward presentation.",
    stack: ["React", "Vite", "Tailwind CSS", "JavaScript"],
    category: "Product",
    type: "Interactive",
    repository: "https://github.com/liriani/thepumaprotocol",
    visual: "puma",
  },
  {
    slug: "photography-course",
    number: "006",
    title: "PHOTO COURSE",
    subtitle: "EDITORIAL LEARNING EXPERIENCE",
    description:
      "Visual-first course landing that emphasizes editorial layout, imagery, and a clear learner flow for photography lessons.",
    stack: ["HTML", "CSS", "JavaScript"],
    category: "Creative",
    type: "Interactive / Static",
    repository: "https://github.com/liriani/PhotographyCourse",
    visual: "photo",
  },
  {
    slug: "glsl-shader-visualizer",
    number: "007",
    title: "GLSL VISUALIZER",
    subtitle: "REAL-TIME GENERATIVE GRAPHICS",
    description:
      "Real-time shader and generative-graphics experiment exploring motion, light, and texture through GLSL-powered visuals and interactive controls.",
    stack: ["GLSL", "WebGL", "JavaScript", "HTML", "CSS"],
    category: "Creative",
    badge: "Shader",
    type: "Dynamic / Interactive",
    repository: "https://github.com/liriani/glslshadervisualizer",
    private: true,
    visual: "shader",
  },
  {
    slug: "uncut-engine",
    number: "008",
    title: "UNCUT ENGINE",
    subtitle: "EXPERIMENTAL INTERACTION ENGINE",
    description:
      "A private engine experiment exploring game and interactive-system concepts through custom creative tooling and browser-based demo assets.",
    stack: ["HTML", "JavaScript", "CSS"],
    category: "Tool",
    type: "Interactive / Experimental",
    repository: "https://github.com/liriani/uncut-engine",
    private: true,
    visual: "uncut",
  },
];

export function getProjectBySlug(slug: string | undefined) {
  return projects.find((project) => project.slug === slug);
}
