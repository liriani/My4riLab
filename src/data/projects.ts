import type { ImageFit } from "@/components/ui/ProjectImage";

export type ProjectCategory = "Product" | "Creative" | "Tool";

/**
 * The design reasoning behind one figure: which phase of the work it records,
 * what the research or screen shows, and the calls made because of it.
 */
/**
 * Editorial layout for a figure's block on the detail page:
 * - wide: full-width image band, notes in two columns, pains vs calls side by side.
 * - split: image beside the argument, decisions as a row of cards.
 * - quote: oversized offset callout with a tilted image, decisions as newspaper columns.
 * - ledger: metadata row, text beside image, decisions as a data table.
 */
export type StudyLayout = "wide" | "split" | "quote" | "ledger";

export type FigureStudy = {
  /** Defaults to a rotation that keeps neighbouring figures from sharing a layout. */
  layout?: StudyLayout;
  /** Process phase, e.g. "UX DISCOVERY", "INFORMATION ARCHITECTURE". */
  phase: string;
  /** One-line headline for the figure's argument. */
  title: string;
  /** Lab-note paragraphs: what the figure shows and why it matters. */
  notes: string[];
  /** [decision, rationale] pairs. */
  decisions: [string, string][];
  /** Pain points (from the personas) this phase answers. */
  solves?: string[];
};

export type ProjectFigure = {
  src: string;
  caption: string;
  /** Defaults to "contain": case study figures are mostly screenshots. Use "cover" for photos. */
  fit?: ImageFit;
  /** With a study, the figure gets a full process-log row instead of a bare grid tile. */
  study?: FigureStudy;
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
   *
   * Convention: public/assets/work/<slug>/cover.webp for the cover, plus one
   * kebab-case file per figure. A path can be listed before its file exists.
   */
  thumbnail: string;
  /** Defaults to "cover". Use "contain" for covers whose edges carry the content. */
  thumbnailFit?: ImageFit;
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
    thumbnail: "assets/work/creators-fit/cover.webp",
    thumbnailFit: "contain",
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
      {
        src: "assets/work/creators-fit/creator-persona.webp",
        caption: "Creator persona research",
        study: {
          phase: "UX DISCOVERY / SYNTHESIS",
          title: "SHE HAS AN AUDIENCE. SHE NEEDS A CASH REGISTER.",
          notes: [
            "50+ creator interviews, compressed into one working persona: Michelle Torres, 20–32, an existing following, publishing daily across photos, video, live streams and 1:1 chats with fans. Audience was never her problem. Getting paid by it was.",
            "The pain-point quadrant reads like a spec written by the user: no time for menial tasks like tracking who paid for what; international platforms like OnlyFans are hard to set up and pay out with currency conversion and up to three days of waiting.",
          ],
          decisions: [
            ["Admin is the enemy", "“Who paid is in, who didn't pay is out” became a hard rule: access is granted and revoked by the system, never by hand. Every later screen was checked against it."],
            ["Payout speed is a headline, not a settings page", "The three-day, currency-converted withdrawal was the most emotionally loaded complaint in the research. Fast withdrawal in reais moved from back-office detail to core promise."],
            ["Sit on top of her channels, don't replace them", "“Managing more than one platform is complicated.” The product had to reach the audience where it already lived instead of asking it to move."],
          ],
          solves: ["Manual subscriber tracking", "Slow foreign-currency payouts", "Too many platforms"],
        },
      },
      {
        src: "assets/work/creators-fit/custom-profile.webp",
        caption: "Custom profile builder",
        study: {
          phase: "INFORMATION ARCHITECTURE → UI",
          title: "THE PROFILE IS THE STOREFRONT.",
          notes: [
            "One screen carries three jobs: brand page, price list and sales funnel. Pricing, Edit Profile and the share link sit together in the profile header, one tap from the content they monetize.",
            "Every post is one of two types: promotional, visible to everyone, or private, visible only to paying members. That single flag is the entire paywall model, set at the moment of posting rather than configured somewhere else.",
          ],
          decisions: [
            ["Plans as toggles, not a pricing wizard", "Set Plan Prices is one modal: 1, 3, 6 and 12-month plans, each switched on or off with its own price in reais and a R$4.90 floor. Pricing becomes a thirty-second decision instead of a setup project."],
            ["Let duration do the selling", "Longer plans sit next to the monthly one, so creators can price commitment below the monthly rate (in the mock, R$79.90 for three months against R$34.90 for one). The fan is anchored on the better deal without a discount banner."],
            ["Promotional posts as the trailer", "Public posts are previews that point at private ones. The curiosity gap does the conversion work, so the creator never has to hard-sell."],
          ],
          solves: ["Pricing buried in settings", "No visible reason to subscribe", "Unbranded, generic profiles"],
        },
      },
      {
        src: "assets/work/creators-fit/private-feed.webp",
        caption: "Private content feed",
        study: {
          phase: "CONVERSION FLOW / ENGAGEMENT LOOP",
          title: "A FEED THAT PAYS THE CREATOR TWICE.",
          notes: [
            "The subscriber's side of the product: one feed of every creator they pay for, recommendations of similar creators beside it, direct messages, and a way to send money without buying anything.",
            "Send a Gift is a small modal: a message of up to 140 characters and a value with a R$5.00 minimum. Income that doesn't wait for the next post.",
          ],
          decisions: [
            ["Recommendations inside the paid feed", "Suggesting similar creators to people who already pay someone turns every subscriber into organic traffic for the next account. The network grows from inside instead of from ads."],
            ["Gifts as their own low-friction action", "Tipping runs on reciprocity and the bond fans already feel. A 140-character cap keeps it a gesture rather than a conversation, and keeps moderation light."],
            ["Messages next to the feed", "The persona already sold 1:1 conversations. Keeping DMs one tab away holds that income inside the platform instead of leaking it to other apps."],
          ],
          solves: ["Revenue tied only to new posts", "Discovery that depends on ads", "1:1 sales happening off-platform"],
        },
      },
      {
        src: "assets/work/creators-fit/instagram-bridge.webp",
        caption: "Instagram integration",
        study: {
          phase: "SYSTEM DESIGN / LOCALIZATION",
          title: "MEET THE AUDIENCE WHERE IT ALREADY SCROLLS.",
          notes: [
            "Instead of asking fans to move, Privi wraps Instagram private groups. Subscribers are created and managed in the group automatically, and the creator broadcasts premium posts inside the app fans already open every day.",
            "The Creator Area turns that into accounting: Overview, My Sales, Financial. Every transaction is logged with date, buyer, value and type: a normal purchase or a present.",
          ],
          decisions: [
            ["Automate membership, not just billing", "Payment status drives who is in the group. The persona's “who paid is in, who didn't pay is out” stopped being a weekly chore and became a system rule."],
            ["PIX for instant withdrawal", "Balance is redeemed through PIX, Brazil's instant payment system: the direct answer to the three-day, currency-converted payout of international platforms. Here, localization meant payment behaviour, not translation."],
            ["One ledger for every income type", "Subscriptions and gifts share one transactions table with a type column, so earnings read as a single number and the creator never reconciles two systems."],
          ],
          solves: ["Audience stranded on another platform", "Manual group admin", "Slow international payouts"],
        },
      },
      {
        src: "assets/work/creators-fit/brand-inspiration.webp",
        caption: "Brand inspiration board",
        study: {
          phase: "BRAND / REBRAND",
          title: "FROM PRIVATE VIEW TO CREATOR STUDIO.",
          notes: [
            "The mood board behind the move from Privi to Creators Fit: creators shot in their own setups, with ring lights, tripods, neon and warm interiors, framed by the red-to-magenta gradient and a family of keyhole marks.",
            "The keyhole is the original thesis in one shape: exclusive access, a private view, something behind the door worth paying for.",
          ],
          decisions: [
            ["Show the work, not just the content", "The imagery centres creators producing (lighting, framing, recording) so the brand can stretch toward fitness and lifestyle without disowning where it started."],
            ["Stress-test the mark", "Solid, outlined and colour-filled keyhole variations test how far the symbol can flex across new verticals while staying recognisable."],
          ],
          solves: ["A name tied to one niche", "A brand that couldn't stretch to new verticals"],
        },
      },
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
    thumbnail: "assets/work/fiap-healthhub/cover.webp",
    thumbnailFit: "contain",
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
      {
        src: "assets/work/fiap-healthhub/patient-persona.webp",
        caption: "Patient persona & journey map",
        study: {
          phase: "UX DISCOVERY",
          title: "THE RECORD ISN'T MISSING. IT'S SCATTERED.",
          notes: [
            "Jessica Medeiros, 28–50, a working professional on a 9-to-5 with a long-term condition such as surgery recovery or diabetes. She picks doctors by distance from work and clinic shift hours, so her care is spread across several of them.",
            "Every pain point is paper or fragmentation: prescriptions and records lost at home, notes from different doctors that contradict each other, and no direct way to ask a doctor what she forgot.",
          ],
          decisions: [
            ["One place for the whole history", "Her first expressed need, a centralized place to check previous exams and prescriptions, became the home screen rather than a feature buried inside it."],
            ["Treatment as the unit, not the appointment", "Long-term care is a timeline. Organizing the record by treatment matches how she thinks about her health, not how a clinic schedules it."],
            ["Push the time-sensitive things to her", "She asked to be told when the next appointment is due and when new results arrive, so those surface to her instead of waiting to be found."],
          ],
          solves: ["Lost prescriptions and records", "Contradicting doctor notes", "No reminders"],
        },
      },
      {
        src: "assets/work/fiap-healthhub/doctor-persona.webp",
        caption: "Doctor persona",
        study: {
          phase: "UX DISCOVERY / THE OTHER SIDE",
          title: "THREE CLINICS. THREE SYSTEMS. NONE OF THEM TALK.",
          notes: [
            "William Costa, 32–48, a specialist contracted across two or three clinics, seeing dozens to hundreds of patients a week. Each clinic runs its own offline system, so a test done in one is invisible in the next.",
            "He calls clinic admins to get results, can rarely reach colleagues between shifts, and watches patients struggle to follow the prescriptions he writes.",
          ],
          decisions: [
            ["Two-sided from day one", "A patient record only stops getting lost if doctors write to it. Without a doctor persona, the product would have been a prettier filing cabinet."],
            ["Portable by default", "His need to check profiles and new results on the go, from any clinic, ruled out anything tied to a single clinic's software."],
            ["Plain language as a requirement", "“Patient communication that's simple and understandable” set the copy bar for every clinical screen that followed."],
          ],
          solves: ["Disconnected clinic systems", "Admin calls for test results", "Unreachable colleagues"],
        },
      },
      {
        src: "assets/work/fiap-healthhub/appointment-history.webp",
        caption: "Appointment history",
        study: {
          phase: "INFORMATION ARCHITECTURE",
          title: "THREE DOORS, ONE PATIENT.",
          notes: [
            "The patient dashboard opens on three large entry points (Appointments, Test Results, Prescriptions), then lists her medical treatments as cards with specialty, start date and a single status: Active or Complete.",
            "Sign-up is four fields: name, email, password, confirmation. Nothing clinical at the door.",
          ],
          decisions: [
            ["Oversized tiles for the three jobs that matter", "The persona has intermediate tech literacy. Three big targets answer “where do I go?” before any menu has to."],
            ["Status as one word", "Active and Complete let someone with years of history see what needs attention without opening anything."],
            ["Short intake, data from doctors", "Medical detail arrives later from the doctors' side (results, prescriptions, notes), so onboarding stays a minute long instead of becoming a health questionnaire."],
          ],
          solves: ["Past exams impossible to find", "Treatments blurring together", "Heavy onboarding"],
        },
      },
      {
        src: "assets/work/fiap-healthhub/health-information.webp",
        caption: "Digital health record",
        study: {
          phase: "CONTENT DESIGN / CLINICAL UX",
          title: "MAKE THE DIAGNOSIS READABLE AND SHARED.",
          notes: [
            "A treatment page reads like a case file: the patient, every doctor involved (here a dermatologist and a general practitioner), the diagnosis in full, and each test result with who requested it and when.",
            "Two doctors on one page is the point. The record is shared between colleagues, so notes build on each other instead of contradicting each other.",
          ],
          decisions: [
            ["Name every doctor on the record", "Showing who wrote what and who requested which test attacks the persona's “different notes from different doctors” problem at the source."],
            ["Results as cards with one action", "Each test is a card with a single CHECK RESULTS button, plus an empty card to add the next one. No tables, no lab codes."],
            ["Discuss inside the record", "Colleagues read and discuss the same diagnosis in place, replacing the phone calls that fail between shifts."],
          ],
          solves: ["Contradicting notes", "Results scattered across clinics", "Colleagues out of reach"],
        },
      },
      {
        src: "assets/work/fiap-healthhub/patient-management.webp",
        caption: "Patient management",
        study: {
          phase: "DOCTOR WORKFLOW",
          title: "52 PATIENTS ON ONE SCREEN.",
          notes: [
            "The doctor's home: active patients as a grid of faces and names, an Add New action, and a path into each patient's history, past diagnoses and follow-ups.",
            "On mobile, Create Prescription is five fields: patient, treatment, date of issue, medicine (searchable) and dosage & frequency.",
          ],
          decisions: [
            ["Faces before record numbers", "A doctor seeing hundreds of patients a week across clinics recognises people faster than IDs."],
            ["Prescriptions written into the record", "A prescription created here lands in the patient's history, where it can't be lost the way the paper one was."],
            ["Search, not free text, for medicine", "Picking from search keeps prescriptions consistent and legible on the patient's side."],
          ],
          solves: ["Patient profiles split across clinics", "Lost prescriptions", "Time lost to admin"],
        },
      },
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
    thumbnail: "assets/work/nohs-somos/cover.webp",
    thumbnailFit: "contain",
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
      {
        src: "assets/work/nohs-somos/neighbourhood-map.webp",
        caption: "Neighborhood safety map",
        study: {
          layout: "wide",
          phase: "DISCOVERY → INFORMATION ARCHITECTURE",
          title: "SAFETY AS A MAP LAYER.",
          notes: [
            "The home screen is the neighbourhood itself: venues as rainbow pins carrying their community rating and distance. Filter chips sit above the map: Amigáveis (friendly), Voucher, Bares e Baladas.",
            "Browsing splits into Entertainment and Businesses, then categories (bars, clubs, events) with filters for audience, service, price and distance, scoped to a city: Florianópolis.",
          ],
          decisions: [
            ["The score lives on the pin", "Safety is the first question, so the community rating is visible before tapping, not two screens deep."],
            ["“Recomendados para você”", "A personal list beside the map turns a search tool into a feed of places that people like you rated well."],
            ["Vouchers as a map filter", "Partner discounts are findable on the map itself, which gives businesses a reason to be listed and users a reason to come back."],
          ],
          solves: ["Maps that don't say who is welcome", "Safe places shared only by word of mouth"],
        },
      },
      {
        src: "assets/work/nohs-somos/community-reviews.webp",
        caption: "Community review system",
        study: {
          layout: "ledger",
          phase: "TRUST & SAFETY UX",
          title: "ONE AVERAGE CAN HIDE A LOT.",
          notes: [
            "A venue has five tabs: Destaques, Comentários, Denúncias, Sobre, Menu. Highlights carry the score (4.9 from 15 reviews), active discounts and community badges.",
            "Comments filter by LGBTI+ letter (in the mock: lesbians 4.8, gays 4.6, bisexuals 4.0) and by how people felt there: à vontade, bem, mais ou menos.",
          ],
          decisions: [
            ["Split the rating by letter", "A place can welcome gay men and still be hostile to lesbians. Breaking the score down by letter stops one average from hiding that."],
            ["Measure comfort, not quality", "“How did you feel?” answers what the user actually came to learn: will I be at ease here? Stars alone can't say that."],
            ["Reports as a first-class tab", "Denúncias sits beside Comentários instead of in an overflow menu. Reporting unsafe treatment is part of the product, not an edge case."],
          ],
          solves: ["Uneven safety hidden by one score", "Ratings that ignore comfort", "No visible way to report"],
        },
      },
      {
        src: "assets/work/nohs-somos/secure-onboarding.webp",
        caption: "Secure onboarding",
        study: {
          layout: "split",
          phase: "ONBOARDING / CONSENT",
          title: "ASK ONCE. MAKE IT COUNT.",
          notes: [
            "Registration opens with the value exchange, “sign up, rate LGBTI places and earn coupons for partner stores”, then offers Facebook, Google or email.",
            "A short illustrated stepper follows: sexual orientation (lésbica, bissexual, gay, hétero, outro), then CPF and password, closing on explicit consent to the terms and privacy policy.",
          ],
          decisions: [
            ["Lead with the reward", "Coupons for rating places give people a reason to create an account before they have a reason to trust the app."],
            ["One sensitive question, with a purpose", "Orientation is asked once, in a single step, and it is what allows every review to be counted under its letter on each venue."],
            ["Illustration over interrogation", "Hand-drawn people instead of form icons keep a sensitive question feeling like a conversation rather than a census."],
          ],
          solves: ["Cold, form-like onboarding", "Reviews with no context about the reviewer"],
        },
      },
      {
        src: "assets/work/nohs-somos/forbes-feature.webp",
        caption: "Forbes feature",
        study: {
          layout: "quote",
          phase: "IMPACT",
          title: "FROM A STATE MAP TO NATIONAL PRESS.",
          notes: [
            "Regional coverage came first: in July 2020, NSC Total reported that Nohs Somos was mapping LGBTI+-safe places in Santa Catarina. In July 2021, Forbes featured the project in its ESG section.",
            "The platform later merged with TODXS to extend its reach across Brazil.",
          ],
          decisions: [
            ["Start local, prove it, then scale", "One city with dense, trustworthy data beat a national map with thin coverage: the community score only means something when enough people have rated the same places."],
          ],
        },
      },
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
