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
  /** Public deployment (GitHub Pages / Vercel). Shown as a LIVE BUILD link when set. */
  live?: string;
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
      ["STACK", "React · Django · PostgreSQL · Stripe · AWS S3 · PIX"],
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
      "A CRT-styled instrument that turns any uploaded image into animated retro pixel art in real time, then records it to a GIF without leaving the browser.",
    stack: ["React 18", "Vite", "Tailwind CSS", "Lucide React", "gif.js", "Canvas 2D", "Sharp (build)"],
    category: "Creative",
    type: "Dynamic / Interactive",
    repository: "https://github.com/liriani/Pixelator",
    // live: "TODO: GitHub Pages / Vercel URL",
    featured: true,
    visual: "pixelator",
    thumbnail: "assets/work/pixelator/cover.webp",
    log: [
      "PROBLEM STATE — Pixel-art filters are usually a single slider and a static result. The interesting part, the degradation itself, is never visible while it happens.",
      "SYSTEM — A requestAnimationFrame loop on a 640×480 canvas. Each frame: draw the image downscaled offscreen, posterize RGB, scale back up with nearest-neighbour (smoothing off), then composite glitch slices, scanlines and a vignette.",
      "INTERFACE — Hardware-style controls sit beside the viewport: pixel size, colour depth, glitch probability, scanline opacity, view bobbing, zoom. Uploading an image starts the animation immediately; there is no apply button.",
      "OUTPUT — Still-frame export plus GIF recording. Frames are sampled straight from the rendered canvas into gif.js workers, so encoding runs client-side and nothing is uploaded.",
    ],
    lesson: "When the process is the aesthetic, render the process. A live loop is a better editor than a preview button.",
    credits: [
      ["ROLE", "Design & Development"],
      ["CANVAS", "640 × 480 / nearest-neighbour"],
      ["EXPORT", "PNG frame · client-side GIF"],
      ["CREDIT", "4RI / LIRI"],
    ],
    figures: [
      {
        src: "assets/work/pixelator/crt-interface.webp",
        caption: "CRT viewport and hardware controls",
        study: {
          phase: "INTERFACE / CONTROL SURFACE",
          title: "A FILTER YOU OPERATE, NOT APPLY.",
          notes: [
            "The viewport and its controls are one instrument. Every parameter is exposed at once (resolution, colour depth, glitch rate, scanlines, bobbing, zoom), and every change lands on the next frame.",
            "Uploading an image is the only setup step. The animation pipeline starts the moment the file is read.",
          ],
          decisions: [
            ["No apply button", "The loop is always running, so a slider is feedback rather than a request. Tuning becomes play instead of trial and error."],
            ["Hardware vocabulary", "Scanlines, bobbing and colour depth are named like monitor settings, so the controls explain the look they produce."],
            ["Export inline with playback", "Record, stop and save sit next to the play state instead of in a menu, so capturing a good moment never interrupts it."],
          ],
          solves: ["Static, one-slider pixel filters", "Effects you can only judge after export"],
        },
      },
      {
        src: "assets/work/pixelator/render-pipeline.webp",
        caption: "Live render loop and GIF capture",
        study: {
          phase: "RENDER PIPELINE / EXPORT",
          title: "DOWNSCALE, POSTERIZE, BREAK, RECORD.",
          notes: [
            "Per frame: the source is drawn small onto an offscreen canvas, its RGB values are posterized, and it is scaled back up with image smoothing off so every pixel stays a hard square.",
            "Glitch slices, scanline overlays and a vignette are composited on top. The GIF recorder samples these finished frames and hands them to gif.js web workers for encoding.",
          ],
          decisions: [
            ["Nearest-neighbour on purpose", "Turning smoothing off is the whole aesthetic. Interpolation would blur the grid the piece is about."],
            ["Glitch as probability, not a preset", "A rate parameter means no two frames break the same way, which is what makes the animation read as a signal rather than a loop."],
            ["Encode in the browser", "Client-side workers keep the image on the visitor's machine and keep the UI responsive while a GIF builds."],
          ],
        },
      },
    ],
  },
  {
    slug: "visado-assessment-board",
    number: "005",
    title: "VISADO",
    subtitle: "VISUAL ASSESSMENT BOARD",
    description:
      "Static assessment diagrams rebuilt as a navigable canvas: draggable nodes, labelled edges, Post-its and question cards, with pan and cursor-anchored zoom on mouse and touch.",
    stack: ["React 18", "Vite", "Tailwind CSS", "JavaScript", "DOM + SVG canvas", "Pointer events"],
    category: "Tool",
    type: "Dynamic / Interactive / Data-driven",
    repository: "https://github.com/liriani/VisadoAssessmentBoard",
    // live: "TODO: GitHub Pages / Vercel URL",
    featured: true,
    visual: "visado",
    thumbnail: "assets/work/visado-assessment-board/cover.webp",
    log: [
      "PROBLEM STATE — Assessments and workflows were documented as static diagrams. They could be read but not worked in: nothing moved, nothing could be annotated, and big maps stopped being legible.",
      "SYSTEM — Two modes on one engine: preset assessment models and custom boards. Nodes are absolutely positioned HTML elements; edges are SVG paths drawn between them.",
      "STATE — One React tree holds node coordinates, connections, viewport offset, scale, link mode and board settings. Everything on screen derives from it.",
      "INTERACTION — Drag, connect, label, annotate. Pan and pinch/scroll zoom keep large boards readable, with mouse and touch handled through the same pointer path.",
    ],
    lesson: "A diagram becomes a tool the moment it can be rearranged. Editing is how people think on a canvas.",
    credits: [
      ["ROLE", "Design & Development"],
      ["RENDERING", "DOM nodes / SVG edges"],
      ["INPUT", "Mouse · touch · pinch"],
      ["CREDIT", "4RI / LIRI"],
    ],
    figures: [
      {
        src: "assets/work/visado-assessment-board/canvas-navigation.webp",
        caption: "Pan and cursor-anchored zoom",
        study: {
          phase: "INTERACTION MODEL / NAVIGATION",
          title: "ZOOM WHERE YOU ARE LOOKING.",
          notes: [
            "Zoom is anchored to the canvas point under the cursor, so the thing being inspected stays put while the board scales around it.",
            "Drag deltas are divided by the current scale, so a node follows the pointer one-to-one whether the board is zoomed in or out.",
          ],
          decisions: [
            ["Cursor-anchored zoom", "Zooming toward the origin makes people hunt for what they were reading. Anchoring to the cursor keeps their place."],
            ["Scale-corrected dragging", "Without dividing by scale, nodes drift faster or slower than the hand at any zoom level other than 1."],
            ["One pointer path for mouse and touch", "Pinch and scroll zoom resolve to the same state change, so the board behaves the same on a trackpad and a tablet."],
          ],
          solves: ["Large diagrams that stop being legible", "Navigation that loses the reader's place"],
        },
      },
      {
        src: "assets/work/visado-assessment-board/nodes-and-edges.webp",
        caption: "Nodes, labelled edges and question cards",
        study: {
          phase: "ARCHITECTURE / RENDERING",
          title: "HTML FOR THINGS, SVG FOR LINES.",
          notes: [
            "Nodes, Post-it notes and question cards are real HTML elements: they hold text, inputs and focus. Connections are SVG paths with direction and an inline label.",
            "Preset assessment models load as ready-made boards; custom boards start empty on the same engine.",
          ],
          decisions: [
            ["Hybrid DOM/SVG instead of one canvas", "Text editing and accessibility come free with HTML, while SVG gives crisp, restyleable edges. A pure canvas would have meant rebuilding both."],
            ["Labels live on the edge", "Relationships are named where they are drawn, so a map explains itself without a legend."],
            ["Presets and blanks share a model", "A preset is just a starting state, so anything learned from a template carries over to a custom board."],
          ],
        },
      },
    ],
  },
  {
    slug: "spccse-project",
    number: "006",
    title: "CCSE PROJECT",
    subtitle: "GAMIFIED EXAM PREP / ES",
    description:
      "CCSE exam preparation rebuilt as modular learning tracks with reward loops, interactive exercises and a map of Spain you answer by touching it.",
    stack: ["React 19", "TypeScript", "Vite", "Tailwind CSS 4", "Framer Motion", "Vitest", "React Testing Library"],
    category: "Product",
    type: "Dynamic / Interactive",
    repository: "https://github.com/liriani/spccseProject",
    // live: "TODO: GitHub Pages / Vercel URL",
    visual: "ccse",
    thumbnail: "assets/work/spccse-project/cover.webp",
    log: [
      "PROBLEM STATE — The CCSE is a memorisation exam about Spanish civic and cultural life. Studying for it from a question bank is dry, and retention fades between sessions.",
      "SYSTEM — Learning is split into modular tracks: reference material, stateful exercises, completion screens. An onboarding flow sets the learner up once.",
      "RETENTION — A reward loop wraps every track: XP, hearts, streaks and badge unlocks. Progress and score multipliers live in app state; onboarding flags persist to localStorage.",
      "OUTPUT — Exercises that use space and objects, not just text: a document wallet, a daily-schedule slider, and a map of Spain where regions are targets to hit.",
    ],
    lesson: "Memorisation sticks when the answer has a place. Put facts on a map, a clock or a card, and recall gets a location.",
    credits: [
      ["ROLE", "Design & Development"],
      ["TESTING", "Vitest · React Testing Library"],
      ["MOTION", "Framer Motion"],
      ["CREDIT", "4RI / LIRI"],
    ],
    figures: [
      {
        src: "assets/work/spccse-project/onboarding.webp",
        caption: "Onboarding flow",
        study: {
          phase: "ONBOARDING / FIRST RUN",
          title: "SET UP ONCE. NEVER AGAIN.",
          notes: [
            "First launch walks the learner into the system before the first question: what the tracks are, how rewards work, where progress shows.",
            "Completing it writes a flag to localStorage, so returning learners land straight on their module tree.",
          ],
          decisions: [
            ["Persist only the onboarding flag", "The one thing that must survive a reload is \"don't show me this again\". Everything else can live in app state."],
            ["Explain the rewards before using them", "Hearts and streaks only motivate if their rules are known up front."],
          ],
        },
      },
      {
        src: "assets/work/spccse-project/document-wallet.webp",
        caption: "Tu Cartera de Documentos: document wallet exercise",
        study: {
          phase: "INTERACTIVE EXERCISE / OBJECTS",
          title: "STUDY THE PAPERWORK BY HOLDING IT.",
          notes: [
            "Residency documents are presented as cards in a wallet rather than a list of definitions. The learner flips through the objects the exam asks about.",
            "Framer Motion handles the card transitions, so moving between documents reads as handling them.",
          ],
          decisions: [
            ["Objects over glossary", "A document you have \"held\" is easier to recall than a paragraph describing it."],
            ["Motion as affordance", "Card movement signals that each item can be picked up and examined, without instructions."],
          ],
        },
      },
      {
        src: "assets/work/spccse-project/horario-espanol.webp",
        caption: "El Horario Español: daily schedule slider",
        study: {
          phase: "INTERACTIVE EXERCISE / TIME",
          title: "SPANISH TIME, ON A SLIDER.",
          notes: [
            "Spain's daily rhythm (late lunch, late dinner, shop hours) is taught with a time-of-day slider and a moving sun. Dragging through the day surfaces what happens when.",
            "The same module card continues into practical reference, such as emergency phone numbers.",
          ],
          decisions: [
            ["Teach a schedule as a timeline", "The facts are about when, so the input is time itself. The answer has a position."],
            ["A visual sun, not a timestamp", "The light changes with the hour, so the cultural point (Spain eats late) is felt before it is read."],
          ],
        },
      },
      {
        src: "assets/work/spccse-project/spain-map.webp",
        caption: "Map of Spain spatial recall exercise",
        study: {
          phase: "SPATIAL RECALL / SVG",
          title: "THE ANSWER IS A PLACE.",
          notes: [
            "Geography questions become a map you tap. Target zones are percentage-based hitboxes projected over a custom SVG of Spain, so they stay aligned at any size.",
            "Correct and wrong hits feed the same XP, hearts and streak loop as every other exercise.",
          ],
          decisions: [
            ["Percentage hitboxes", "Relative zones scale with the SVG, so the exercise works the same on a phone and a desktop without remapping."],
            ["One reward loop for every format", "The map isn't a mini-game on the side; it pays into the same progress, so it counts."],
          ],
          solves: ["Geography memorised as a list", "Exercises that only test text recall"],
        },
      },
      { src: "assets/work/spccse-project/progression.webp", caption: "Mi Progresión: XP-gated monument badges" },
      { src: "assets/work/spccse-project/exercise-feedback.webp", caption: "Mixed exercise formats with inline feedback" },
    ],
  },
  {
    slug: "potentia-lab",
    number: "007",
    title: "POTENTIA LAB",
    subtitle: "FIGMA TO LEARNING SYSTEM",
    description:
      "A Figma design bundle translated into a working learning platform: theory modules, validated exercises with explanations, and visual boards that step through mathematical transformations.",
    stack: ["React 18", "TypeScript", "Vite", "Tailwind CSS 4", "Radix UI", "MUI / Emotion", "Framer Motion", "React Hook Form", "React Router", "Recharts", "React DnD"],
    category: "Product",
    type: "Interactive",
    repository: "https://github.com/liriani/PotentiaLab",
    // live: "TODO: GitHub Pages / Vercel URL",
    visual: "potentia",
    thumbnail: "assets/work/potentia-lab/cover.webp",
    log: [
      "PROBLEM STATE — A complete Figma bundle described the product, but a design file cannot check an answer or animate a proof.",
      "SYSTEM — Three module types share one shell: theory, practice and visual demonstration. Radix primitives carry accessibility; Tailwind 4 carries the theme.",
      "ENGINE — ExerciseSet takes multilingual payloads and renders multiple-choice, true/false and typed-input questions with correctness, step-by-step explanation, live score and completion tracking.",
      "OUTPUT — VisualBoard, a state-driven sequence engine that renders each geometric or mathematical stage deterministically, so a transformation can be stepped forward and back.",
    ],
    lesson: "A design handoff is a spec for behaviour, not just layout. The work is deciding what each screen does when someone is wrong.",
    credits: [
      ["ROLE", "Frontend Development"],
      ["SOURCE", "Figma design bundle"],
      ["ENGINES", "ExerciseSet · VisualBoard"],
      ["CREDIT", "4RI / LIRI"],
    ],
    figures: [
      {
        src: "assets/work/potentia-lab/exercise-set.webp",
        caption: "ExerciseSet: validation and explanations",
        study: {
          phase: "EXERCISE ENGINE / FEEDBACK",
          title: "WRONG ANSWERS GET THE MOST UI.",
          notes: [
            "One engine renders three question types (multiple choice, true/false, typed input) from multilingual payloads.",
            "Every response returns structure, not just a tick: correctness, a step-by-step explanation, the running score and completion state.",
          ],
          decisions: [
            ["Content as payload", "Questions arrive as data, so new exercises and languages are added without touching components."],
            ["Explain on every answer", "The explanation is the lesson. Showing it only on failure would hide it from people who guessed right."],
            ["Score visible throughout", "Live scoring turns a set of questions into a run with stakes."],
          ],
        },
      },
      {
        src: "assets/work/potentia-lab/visual-board.webp",
        caption: "VisualBoard: step-driven transformations",
        study: {
          phase: "VISUAL DEMONSTRATION / STATE",
          title: "A PROOF YOU CAN STEP THROUGH.",
          notes: [
            "VisualBoard renders a mathematical or geometric transformation as a sequence of distinct stages. React state holds the current step; each step renders deterministically.",
            "Moving forward and back replays exactly the same frames, so a learner can rewind to the step where it stopped making sense.",
          ],
          decisions: [
            ["Deterministic stages over free animation", "A transformation that always looks the same at step 3 can be referred to, explained and revisited."],
            ["State-driven, not timeline-driven", "The learner controls the pace. Nothing advances on a timer while they are still reading."],
          ],
        },
      },
    ],
  },
  {
    slug: "puma-protocol",
    number: "008",
    title: "PUMA PROTOCOL",
    subtitle: "TACTICAL ROUTINE TERMINAL",
    description:
      "Household chores, pet care and daily routines reframed as missions in a branching terminal RPG, with typewriter dialogue, CRT scanlines and a full step-back history.",
    stack: ["React 18 (CRA)", "Tailwind CSS 3", "Lucide React", "JSON dialogue trees", "Custom typewriter engine"],
    category: "Creative",
    type: "Interactive / Narrative",
    repository: "https://github.com/liriani/thepumaprotocol",
    // live: "TODO: GitHub Pages / Vercel URL",
    visual: "puma",
    thumbnail: "assets/work/puma-protocol/cover.webp",
    log: [
      "PROBLEM STATE — Routine tasks have no story. A checklist records that the cat was fed; it gives no reason to want to do it.",
      "SYSTEM — Missions are grouped into categories behind a hub. Each mission is a JSON dialogue tree: nodes, branches, objectives and metadata.",
      "STATE — React tracks the active node, completed flags, a history stack and the selected hub category. Every choice pushes to history, so any step can be walked back.",
      "OUTPUT — A terminal that talks back: a custom Typewriter component prints each line on an interval with strict cleanup, over CRT scanlines and location-specific colourways.",
    ],
    lesson: "Narrative is an interface. The same task list reads differently when it is briefed instead of listed.",
    credits: [
      ["ROLE", "Writing, Design & Development"],
      ["DATA", "JSON dialogue trees"],
      ["ENGINE", "Branching terminal + typewriter"],
      ["CREDIT", "4RI / LIRI"],
    ],
    figures: [
      {
        src: "assets/work/puma-protocol/mission-hub.webp",
        caption: "Mission category hub",
        study: {
          phase: "INFORMATION ARCHITECTURE / NARRATIVE",
          title: "CHORES, CLASSIFIED.",
          notes: [
            "The hub sorts routines into mission categories (household, pet care, personal). Each category has its own colourway, so the terminal tells you where you are before you read.",
            "Choosing a category loads its mission trees; completion flags show which objectives are already cleared.",
          ],
          decisions: [
            ["Category as location", "Colour shifts per area turn a list of chores into places to visit."],
            ["Status on the briefing, not in a report", "Completed flags sit on the mission itself, so verification is part of the story."],
          ],
        },
      },
      {
        src: "assets/work/puma-protocol/dialogue-engine.webp",
        caption: "Branching dialogue and history playback",
        study: {
          phase: "DIALOGUE ENGINE / STATE",
          title: "EVERY CHOICE IS REVERSIBLE.",
          notes: [
            "Dialogue nodes and branch logic are plain JSON. The engine resolves the active node, renders its choices and pushes each decision onto a history stack.",
            "Step-back replays the history, so a wrong branch is a detour instead of a dead end.",
          ],
          decisions: [
            ["Content as JSON", "Missions are written as data, so adding a routine never touches a component."],
            ["A history stack, not a back button", "Keeping the full path lets the player retrace the conversation, not just undo the last click."],
          ],
        },
      },
      {
        src: "assets/work/puma-protocol/typewriter-terminal.webp",
        caption: "Typewriter output over CRT scanlines",
        study: {
          phase: "MOTION / TEXT RENDERING",
          title: "THE TERMINAL TYPES. YOU WAIT. IT MATTERS.",
          notes: [
            "A custom Typewriter component prints characters on an interval hook. Moving to a new node clears the interval before the next line starts.",
            "Scanlines and retro terminal styling frame the text as a transmission rather than a notification.",
          ],
          decisions: [
            ["Strict interval cleanup", "Fast clicking through nodes would otherwise stack timers and garble lines. Cleanup on every change keeps one voice at a time."],
            ["Pacing as tone", "Character-by-character output slows the reader just enough for a chore to sound like a briefing."],
          ],
        },
      },
    ],
  },
  {
    slug: "photography-course",
    number: "009",
    title: "PHOTO COURSE",
    subtitle: "SELF-GUIDED CAMERA CURRICULUM",
    description:
      "A week-by-week photography course in plain HTML and JavaScript, with technique guides, comprehension checks and an exposure simulator that makes the aperture / shutter / ISO trade-off visible.",
    stack: ["HTML5", "CSS3", "Vanilla JavaScript (ES6+)", "Tailwind CSS (CDN)", "Lucide (CDN)"],
    category: "Creative",
    type: "Interactive / Static",
    repository: "https://github.com/liriani/PhotographyCourse",
    // live: "TODO: GitHub Pages / Vercel URL",
    visual: "photo",
    thumbnail: "assets/work/photography-course/cover.webp",
    log: [
      "PROBLEM STATE — The exposure triangle is usually taught as a diagram. Beginners can recite it and still not predict what a change will do to the photo.",
      "SYSTEM — A progressive curriculum, one week at a time: theory, step-by-step technique, common mistakes, pro tips, an assignment and a comprehension check per module.",
      "ENGINE — No framework. Course content and translation tables live in modular JS objects; vanilla DOM handlers render modules, progress meters, simulator feedback, composition challenges and drag-and-drop quizzes.",
      "OUTPUT — An exposure simulator where aperture, shutter speed and ISO move together, so each trade-off is seen rather than memorised.",
    ],
    lesson: "Simulate the trade-off and the theory explains itself.",
    credits: [
      ["ROLE", "Curriculum, Design & Development"],
      ["RUNTIME", "Vanilla JS / no build"],
      ["CREDIT", "4RI / LIRI"],
    ],
    figures: [
      {
        src: "assets/work/photography-course/exposure-simulator.webp",
        caption: "Real-time exposure simulator",
        study: {
          phase: "SIMULATION / LEARNING BY CONSEQUENCE",
          title: "SEE THE TRIANGLE BEND.",
          notes: [
            "Aperture, shutter speed and ISO are live controls. Changing one updates the simulated image immediately: depth of field, motion blur, noise and brightness.",
            "The point is the trade-off. Brightening by ISO looks different from brightening by shutter, and the simulator shows exactly how.",
          ],
          decisions: [
            ["Show the side effect, not just the exposure", "Every setting has a cost (blur, noise, focus). Rendering the cost is what turns a rule into intuition."],
            ["Instant feedback", "No submit step: the learner experiments the way they would with a real camera."],
          ],
          solves: ["Theory that doesn't transfer to the camera", "Trade-offs learned as a diagram"],
        },
      },
      {
        src: "assets/work/photography-course/curriculum.webp",
        caption: "Week-by-week modules and progress sidebar",
        study: {
          phase: "CURRICULUM ARCHITECTURE",
          title: "ONE WEEK, ONE SKILL, ONE CHECK.",
          notes: [
            "Each module repeats the same structure: theory, technique, mistakes, tips, assignment, check. The sidebar tracks progress across the whole course.",
            "Content lives in JS objects alongside translation tables, so the course can be extended or localised without rewriting the renderer.",
          ],
          decisions: [
            ["A fixed module shape", "Predictable structure means the learner's attention goes to the photography, not to finding their way around."],
            ["Vanilla over framework", "A course is mostly content. Plain JS keeps it fast, buildless and easy to host anywhere."],
          ],
        },
      },
    ],
  },
  {
    slug: "glsl-shader-visualizer",
    number: "010",
    title: "GLSL VISUALIZER",
    subtitle: "SHADER BENCH FOR TOUCHDESIGNER",
    description:
      "An in-browser bench for writing and previewing animated fragment shaders, with presets, live compile errors and one-click copy into TouchDesigner.",
    stack: ["React 19", "Vite 8", "Three.js", "WebGL", "GLSL", "Lucide React"],
    category: "Creative",
    badge: "Shader",
    type: "Dynamic / Interactive",
    repository: "https://github.com/liriani/glslshadervisualizer",
    // live: "TODO: GitHub Pages / Vercel URL",
    private: true,
    visual: "shader",
    thumbnail: "assets/work/glsl-shader-visualizer/cover.webp",
    log: [
      "PROBLEM STATE — Iterating on a shader inside TouchDesigner means a heavy project open for every small edit. Sketching is faster in a lighter loop.",
      "SYSTEM — Three panes: a preset browser, a live code editor and a WebGL viewport. Three.js owns the context, a fullscreen plane, an orthographic camera and the shader material.",
      "PIPELINE — uTime and uRes are injected continuously. TouchDesigner-style fragColor output is rewritten to gl_FragColor, and the material is disposed and rebuilt on every edit.",
      "OUTPUT — Compile errors land in a collapsible status overlay instead of the console, and finished code is one click from the clipboard.",
    ],
    lesson: "The fastest tool is the one that speaks the destination's dialect. Normalise once, and the handoff disappears.",
    credits: [
      ["ROLE", "Design & Development"],
      ["TARGET", "TouchDesigner GLSL TOP"],
      ["UNIFORMS", "uTime · uRes"],
      ["CREDIT", "4RI / LIRI"],
    ],
    figures: [
      {
        src: "assets/work/glsl-shader-visualizer/live-coding.webp",
        caption: "Editor, preview and live compile feedback",
        study: {
          phase: "LIVE CODING / FEEDBACK LOOP",
          title: "TYPE, COMPILE, SEE. NO CONSOLE.",
          notes: [
            "Every edit disposes the old shader material and builds a new one, so the viewport is always running the code on screen.",
            "When compilation fails, the error appears in a collapsible panel over the preview. Uniforms such as uTime are shown in the UI, not hidden in boilerplate.",
          ],
          decisions: [
            ["Errors where the eyes are", "Developer tools are a context switch. An overlay keeps the fix and the result in one view."],
            ["Dispose on every edit", "Rebuilding the material avoids stale programs and GPU leaks during long sessions."],
            ["Uniforms made visible", "Seeing uTime tick explains why the shader moves and what to multiply."],
          ],
        },
      },
      {
        src: "assets/work/glsl-shader-visualizer/touchdesigner-handoff.webp",
        caption: "Presets and TouchDesigner-ready export",
        study: {
          phase: "PIPELINE / HANDOFF",
          title: "WRITTEN HERE. RUNS THERE.",
          notes: [
            "Code is authored in TouchDesigner's style, with fragColor output. The app normalises it to gl_FragColor for WebGL, so the same text works in both places.",
            "A preset browser provides starting points; copy-to-clipboard moves the result into the TouchDesigner network.",
          ],
          decisions: [
            ["Normalise the dialect, not the author", "Translating fragColor at load means nobody has to edit code before pasting it into TouchDesigner."],
            ["One-click copy", "The handoff is the product. It should cost one action."],
          ],
        },
      },
    ],
  },
  {
    slug: "uncut-engine",
    number: "011",
    title: "UNCUT ENGINE",
    subtitle: "VECTOR GRAFFITI LAB",
    description:
      "A browser lettering lab for graffiti wordmarks: scroll-drawn strokes, per-letter path and drip controls, procedural roughness, and clean SVG export.",
    stack: ["HTML", "CSS", "Vanilla JavaScript", "SVG", "feTurbulence / feDisplacementMap", "Tailwind CSS (CDN)"],
    category: "Tool",
    type: "Interactive / Experimental",
    repository: "https://github.com/liriani/uncut-engine",
    // live: "TODO: GitHub Pages / Vercel URL",
    private: true,
    visual: "uncut",
    thumbnail: "assets/work/uncut-engine/cover.webp",
    log: [
      "PROBLEM STATE — Digital lettering tools produce clean, finished type. Graffiti is about the opposite: rough edges, paint that runs, letters drawn in a gesture.",
      "SYSTEM — Wordmarks are SVG paths. Edge roughness comes from feTurbulence and feDisplacementMap filters, and paint drips are their own vector shapes.",
      "INTERACTION — Scroll position is converted to a progress percentage that drives stroke-dasharray / stroke-dashoffset tracing and drip thresholds. Selecting a letter isolates its own path and drip controls.",
      "OUTPUT — Export clones the live SVG, inlines computed styles and filter primitives, and downloads a raw vector that looks the same outside the browser.",
    ],
    lesson: "Imperfection can be a parameter. Roughness, spacing and drips are design decisions once they have sliders.",
    credits: [
      ["ROLE", "Design & Development"],
      ["GRAPHICS", "SVG paths + filter primitives"],
      ["EXPORT", "Self-contained SVG"],
      ["CREDIT", "4RI / LIRI"],
    ],
    figures: [
      {
        src: "assets/work/uncut-engine/scroll-reveal.webp",
        caption: "Scroll-driven stroke tracing",
        study: {
          phase: "MOTION / SCROLL AS BRUSH",
          title: "SCROLLING IS THE SPRAY CAN.",
          notes: [
            "Native scroll listeners convert page position into a progress value. That value sets each stroke's dash offset, so letters are drawn in as the visitor scrolls.",
            "Past set thresholds, the drips switch on and run.",
          ],
          decisions: [
            ["Dash offset for drawing", "stroke-dasharray / dashoffset traces any path with no per-letter animation code."],
            ["Thresholds for drips", "Drips appear only after the stroke lands, the way paint would."],
          ],
        },
      },
      {
        src: "assets/work/uncut-engine/letter-controls.webp",
        caption: "Per-letter controls, drips and roughness",
        study: {
          phase: "CONTROL SURFACE / RESPONSIVE",
          title: "ONE LETTER AT A TIME, OR ALL OF THEM.",
          notes: [
            "Global controls (roughness, spacing, stroke weight) sit in a floating dock on desktop and reflow into an in-page stack on mobile.",
            "Selecting a single character isolates its path geometry and drip parameters, so one letter can run while its neighbours stay clean.",
          ],
          decisions: [
            ["Filters, not hand-drawn noise", "feTurbulence + feDisplacementMap make roughness procedural and adjustable instead of baked into the outline."],
            ["Dock that becomes a stack", "A floating panel would cover the artwork on a phone, so the controls fall into the page flow there."],
            ["Export what you see", "Cloning the live node and inlining computed styles and filters means the downloaded SVG matches the screen."],
          ],
          solves: ["Lettering tools that are too clean", "Exports that lose their effects"],
        },
      },
    ],
  },
];

export function getProjectBySlug(slug: string | undefined) {
  return projects.find((project) => project.slug === slug);
}
