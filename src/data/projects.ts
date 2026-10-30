export type ProjectCategory = "Product" | "Creative" | "Tool";

export type ProjectFigure = {
  src: string;
  caption: string;
};

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
  repository?: string;
  /**
   * Local image under public/, without a leading slash (assetUrl() adds the
   * site base). Until the file exists the card falls back to its CSS artwork.
   */
  thumbnail: string;
  featured?: boolean;
  private?: boolean;
  visual: string;
  /** Lab-note paragraphs for the detail page; falls back to a generic line. */
  log?: string[];
  /** One-line takeaway shown in the detail page's system note. */
  lesson?: string;
  /** [label, value] pairs for the detail page credit block. */
  credits?: [string, string][];
  /** Case study images, in order, each with its caption. */
  figures?: ProjectFigure[];
};

export const projects: Project[] = [
  {
    slug: "creators-fit",
    number: "001",
    title: "CREATORS FIT",
    subtitle: "MONETIZATION INFRASTRUCTURE / BR",
    description:
      "A paywall rebuilt around how Brazilian creators actually get paid: tiered subscriptions, pay-per-view drops, local payment rails. 500+ creators onboarded, R$1M+ processed.",
    stack: ["Subscription tiers", "Pay-per-view", "Local payments", "Instagram bridge", "Creator analytics"],
    category: "Product",
    type: "Product / Platform / Monetization",
    featured: true,
    visual: "creators",
    thumbnail: "assets/work/creators-fit/thumbnail.jpg",
    log: [
      "PROBLEM STATE — International creator platforms charged high fees, buried settings in complex flows, and ignored the payment methods Brazilians actually use. The friction was not technical. It was local.",
      "FIELD WORK — 50+ interviews with creators across niches. Every screen traces back to a stated pain: how creators price, how fans pay, where their audience already lives.",
      "SYSTEM — Three load-bearing modules. A profile builder that sets subscription tiers and turns previews into conversions. A subscription-gated feed with engagement analytics. An Instagram bridge that routes existing audiences into premium content.",
      "OUTPUT — 500+ creators in the first six months and R$1M+ in creator earnings. The platform outgrew its name: Privi was rebranded Creators Fit and expanded into fitness and lifestyle.",
    ],
    lesson: "Localization is not translation. It is payment behaviour, cultural nuance, and the specific friction of one market.",
    credits: [
      ["ROLE", "Senior Product Designer & Frontend Lead"],
      ["TIMELINE", "8 months"],
      ["TEAM", "6 people"],
      ["OUTPUT", "R$1M+ processed"],
    ],
    figures: [
      { src: "assets/work/creators-fit/figure-01.jpg", caption: "Creator persona research" },
      { src: "assets/work/creators-fit/figure-02.jpg", caption: "Custom profile builder" },
      { src: "assets/work/creators-fit/figure-03.jpg", caption: "Private content feed" },
      { src: "assets/work/creators-fit/figure-04.jpg", caption: "Instagram integration" },
    ],
  },
  {
    slug: "fiap-healthhub",
    number: "002",
    title: "HEALTHHUB",
    subtitle: "PATIENT ↔ CLINIC SIGNAL BRIDGE",
    description:
      "Long-term patients kept missing appointments because the paper card got lost. Moved the card to the cloud and the reminder to WhatsApp. 2nd place, FIAP Startup Challenge 2023.",
    stack: ["Mobile-first", "WhatsApp API", "QR health record", "Journey mapping"],
    category: "Product",
    badge: "2nd place",
    type: "Product / Health / Mobile",
    featured: true,
    visual: "healthhub",
    thumbnail: "assets/work/fiap-healthhub/thumbnail.jpg",
    log: [
      "PROBLEM STATE — In Brazil's public health system (SUS), long-term treatment still runs on paper. Patients miss critical dates with no reminder; clinics absorb no-show rates near 40% and an average 72h to reschedule.",
      "FIELD WORK — 10 patients, 3 clinic administrators. Core finding: intent was never the problem. The physical appointment card was lost or damaged. The failure point was an object, not a person.",
      "SYSTEM — The Caderneta de Vacinação becomes a permanent cloud record, readable by any doctor through a QR code. Reminders ship through the WhatsApp API 24h before each appointment. Push notifications were rejected on purpose: users switch them off.",
      "OUTPUT — Prototyped in a 3-week sprint and pitched to investors and health professionals. 2nd place at the FIAP Startup Challenge; the panel singled out the WhatsApp channel as the part that scales.",
    ],
    lesson: "Accessibility is meeting people in the channel they already open. WhatsApp beat a standalone app notification.",
    credits: [
      ["ROLE", "Product Designer"],
      ["TIMELINE", "3-week sprint"],
      ["TEAM", "2 devs, 1 PM, 1 designer"],
      ["RESULT", "2nd place, FIAP Startup Challenge"],
    ],
    figures: [
      { src: "assets/work/fiap-healthhub/figure-01.jpg", caption: "Patient persona & journey map" },
      { src: "assets/work/fiap-healthhub/figure-02.jpg", caption: "Appointment reminder interface" },
      { src: "assets/work/fiap-healthhub/figure-03.jpg", caption: "Digital health record" },
    ],
  },
  {
    slug: "nohs-somos",
    number: "003",
    title: "NOHS SOMOS",
    subtitle: "COMMUNITY SAFETY CARTOGRAPHY",
    description:
      "A map of where LGBTQ+ people in Brazil are actually safe, written by the community itself. Anonymous reviews, moderated trust. 10,000+ users reached; featured in Forbes.",
    stack: ["Map interface", "Community reviews", "Anonymous posting", "Verified moderation"],
    category: "Product",
    badge: "Forbes",
    type: "Product / Civic / Map-based",
    featured: true,
    visual: "nohs",
    thumbnail: "assets/work/nohs-somos/thumbnail.jpg",
    log: [
      "PROBLEM STATE — Moving through public space as an LGBTQ+ person in Brazil carries real risk, and existing maps said nothing about which places truly welcome the community. A pin on a map is not a guarantee.",
      "FIELD WORK — Interviews with community members, advocacy groups, and business owners, run alongside LGBTQ+ advocacy partners from day one.",
      "SYSTEM — A collaborative map fed by real-time reviews and safety ratings: a living database of community knowledge. Privacy-first by architecture: contributions can be anonymous, and verified community moderation keeps them accountable.",
      "OUTPUT — 10,000+ users reached and 85% community validation on safe-space recommendations. Featured in Forbes, then merged with TODXS to extend its reach across Brazil.",
    ],
    lesson: "Build the infrastructure for collective safety. Do not be the one who defines what safety means.",
    credits: [
      ["ROLE", "UI/UX Designer & Frontend Developer"],
      ["TIMELINE", "4 months"],
      ["TEAM", "3 people"],
      ["SIGNAL", "Featured in Forbes"],
    ],
    figures: [
      { src: "assets/work/nohs-somos/figure-01.jpg", caption: "Neighborhood safety map" },
      { src: "assets/work/nohs-somos/figure-02.jpg", caption: "Community review system" },
      { src: "assets/work/nohs-somos/figure-03.jpg", caption: "Secure onboarding" },
      { src: "assets/work/nohs-somos/figure-04.jpg", caption: "Forbes feature" },
    ],
  },
  {
    slug: "pixelator",
    number: "004",
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
    thumbnail: "assets/work/pixelator/thumbnail.jpg",
  },
  {
    slug: "visado-assessment-board",
    number: "005",
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
    thumbnail: "assets/work/visado-assessment-board/thumbnail.jpg",
  },
  {
    slug: "spccse-project",
    number: "006",
    title: "CCSE PROJECT",
    subtitle: "MOTION-DRIVEN PRODUCT UI",
    description:
      "A modern TypeScript React app focused on polished UI and motion-driven UX, built as a production-ready component system for a course project.",
    stack: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion", "Vitest"],
    category: "Product",
    type: "Dynamic / Interactive",
    repository: "https://github.com/liriani/spccseProject",
    visual: "ccse",
    thumbnail: "assets/work/spccse-project/thumbnail.jpg",
  },
  {
    slug: "potentia-lab",
    number: "007",
    title: "POTENTIA LAB",
    subtitle: "FIGMA TO PRODUCT SYSTEM",
    description:
      "Figma-derived product front-end showcasing a themeable, componentized UI and deployment-ready build pipeline.",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "shadcn-style theming"],
    category: "Product",
    type: "Interactive",
    repository: "https://github.com/liriani/PotentiaLab",
    visual: "potentia",
    thumbnail: "assets/work/potentia-lab/thumbnail.jpg",
  },
  {
    slug: "puma-protocol",
    number: "008",
    title: "PUMA PROTOCOL",
    subtitle: "BRAND & PROTOCOL EXPERIENCE",
    description:
      "Clean landing and demo UI for a protocol product showcasing modern front-end patterns and brand-forward presentation.",
    stack: ["React", "Vite", "Tailwind CSS", "JavaScript"],
    category: "Product",
    type: "Interactive",
    repository: "https://github.com/liriani/thepumaprotocol",
    visual: "puma",
    thumbnail: "assets/work/puma-protocol/thumbnail.jpg",
  },
  {
    slug: "photography-course",
    number: "009",
    title: "PHOTO COURSE",
    subtitle: "EDITORIAL LEARNING EXPERIENCE",
    description:
      "Visual-first course landing that emphasizes editorial layout, imagery, and a clear learner flow for photography lessons.",
    stack: ["HTML", "CSS", "JavaScript"],
    category: "Creative",
    type: "Interactive / Static",
    repository: "https://github.com/liriani/PhotographyCourse",
    visual: "photo",
    thumbnail: "assets/work/photography-course/thumbnail.jpg",
  },
  {
    slug: "glsl-shader-visualizer",
    number: "010",
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
    thumbnail: "assets/work/glsl-shader-visualizer/thumbnail.jpg",
  },
  {
    slug: "uncut-engine",
    number: "011",
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
    thumbnail: "assets/work/uncut-engine/thumbnail.jpg",
  },
];

export function getProjectBySlug(slug: string | undefined) {
  return projects.find((project) => project.slug === slug);
}
