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

/**
 * How much page a project gets:
 * - deep: an editorial case study. Overview, editorial chapters, then the process log.
 * - experiment: a lab log. One terminal readout and the media; no prose sections.
 */
export type CaseFormat = "deep" | "experiment";

/** One block of a deep case's editorial run, rendered between the specs and the process log. */
export type Chapter =
  /** Long-form text: kicker, headline, body in flowing columns. */
  | { kind: "essay"; label: string; title: string; body: string[] }
  /** Oversized offset blockquote: one design call, stated as a position. */
  | { kind: "pull"; quote: string; source: string }
  /** Two columns set against each other: assumption vs finding, before vs after. */
  | { kind: "versus"; label: string; left: { head: string; body: string }; right: { head: string; body: string } }
  /** A row of hard numbers. Only figures that are on record. */
  | { kind: "figures"; label: string; items: [value: string, label: string][] };

/** An experiment's terminal readout. Short lines, no paragraphs. */
export type LabLog = {
  /** One line: the itch that started it. */
  spark: string;
  /** What was built, one technical fact per bullet. */
  build: string[];
  /** Process output: the pipeline as it runs, step by step. */
  stdout: string[];
  /** Constraints or known edges, stated plainly. */
  limits?: string[];
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
  /** Defaults to "deep". */
  format?: CaseFormat;
  /** Deep cases only: editorial blocks between the specs and the process log. */
  chapters?: Chapter[];
  /** Experiments only: the terminal readout that replaces the prose sections. */
  labLog?: LabLog;
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
    lesson: "Localization is not translation. It is payment behaviour, cultural nuance, and the specific friction of one market.",
    format: "deep",
    chapters: [
      {
        kind: "figures",
        label: "ON RECORD",
        items: [
          ["500+", "creators onboarded"],
          ["R$1M+", "processed"],
          ["50+", "creator interviews"],
          ["8 MO", "concept to scale"],
        ],
      },
      {
        kind: "essay",
        label: "THE CHALLENGE",
        title: "THE FRICTION WAS NEVER TECHNICAL. IT WAS LOCAL.",
        body: [
          "Brazilian creators were not short of audience. They were short of a way to charge it. The international platforms they were pushed toward took high fees, hid pricing behind multi-step settings, and paid out in a foreign currency after up to three days of waiting.",
          "None of that is a feature gap. It is a market gap: the products were designed around how creators get paid somewhere else. Nobody had built for PIX, for reais, for an audience that already lives inside Instagram.",
          "Fifty-plus interviews made the brief blunt. Creators did not want another destination to grow. They wanted a cash register attached to the one they already had, and they wanted it to run without them.",
        ],
      },
      {
        kind: "pull",
        quote: "Who paid is in. Who didn't pay is out.",
        source: "Creator interviews. Became the rule every screen was checked against",
      },
      {
        kind: "versus",
        label: "THE REFRAME",
        left: {
          head: "A BETTER PLATFORM",
          body: "Ask creators to move their audience to a new destination and out-feature the global players on their own terms.",
        },
        right: {
          head: "A LOCAL CASH REGISTER",
          body: "Sit on top of the channels fans already open, charge in reais, withdraw through PIX, and let payment status decide who gets in.",
        },
      },
      {
        kind: "essay",
        label: "RESEARCH → SYSTEM",
        title: "THREE MODULES CARRY THE WEIGHT.",
        body: [
          "The profile builder is the storefront: tiered plans set in one modal, every post flagged promotional or private at the moment it is published. The paywall is a single field, not a configuration screen.",
          "The subscriber feed pays the creator twice: once for the subscription, again through gifts that don't wait for the next post. Recommendations inside the paid feed turn every subscriber into traffic for the next creator.",
          "The Instagram bridge removes the last chore. Membership of private groups follows payment automatically, and earnings from every source land in one ledger, withdrawn through PIX.",
          "The system outgrew its first name. Privi became Creators Fit and moved into fitness and lifestyle without rebuilding the core.",
        ],
      },
    ],
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
    live: "https://liriani.github.io/Pixelator/",
    featured: true,
    visual: "pixelator",
    thumbnail: "assets/work/pixelator/cover.webp",
    format: "experiment",
    labLog: {
      spark: "Every pixel filter shows you the result. None of them let you watch the image break. So the breaking became the product.",
      build: [
        "React 18 + Vite shell, Tailwind + Lucide for the control deck",
        "requestAnimationFrame loop on a fixed 640×480 canvas",
        "offscreen downscale → RGB posterize → nearest-neighbour upscale, smoothing OFF",
        "glitch slices, scanlines, vignette composited every frame",
        "gif.js workers encode frames sampled from the rendered canvas",
      ],
      stdout: [
        "upload received → loop armed. no apply button",
        "draw source at 1/n resolution → offscreen buffer",
        "posterize: clamp colour depth per channel",
        "upscale ×n, imageSmoothingEnabled = false",
        "glitch roll < rate → slice + offset a row band",
        "overlay scanlines, vignette, view bob",
        "REC → frames → worker pool → GIF blob, client-side",
      ],
      limits: [
        "output is fixed at 640×480: the canvas is the format",
        "GIF caps each frame at 256 colours; encode time grows with every frame recorded",
      ],
    },
    lesson: "If the process is the aesthetic, render the process.",
    figures: [
      { src: "assets/work/pixelator/render-pipeline.webp", caption: "Live loop + GIF capture" },
      { src: "assets/work/pixelator/crt-interface.webp", caption: "CRT viewport and control deck" },
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
    live: "https://assessment-board.vercel.app/",
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
    live: "https://spccseproject.vercel.app",
    visual: "ccse",
    thumbnail: "assets/work/spccse-project/cover.webp",
    lesson: "Memorisation sticks when the answer has a place. Put facts on a map, a clock or a card, and recall gets a location.",
    format: "deep",
    chapters: [
      {
        kind: "versus",
        label: "THE REFRAME",
        left: {
          head: "A QUESTION BANK",
          body: "Read, answer, repeat. Every fact is a line of text, and every session starts cold.",
        },
        right: {
          head: "TRACKS + A REWARD LOOP",
          body: "Modules with reference, exercises and a finish line. XP, hearts, streaks and badges keep the next session warm. Facts get placed on maps, clocks and cards.",
        },
      },
      {
        kind: "essay",
        label: "THE CHALLENGE",
        title: "AN EXAM ABOUT A COUNTRY, STUDIED AS A LIST.",
        body: [
          "The CCSE tests constitutional and sociocultural knowledge of Spain and is a requirement for Spanish nationality. The usual preparation is a bank of questions read in order until they stick.",
          "Most of what it asks has a shape the list throws away. Regions have a position. The Spanish day has an order. Documents are objects you will one day carry. Stripped to text, every one of those facts competes for the same kind of memory.",
          "So the build gives facts back their shape. Geography is answered on a map, schedule on a slider, paperwork in a wallet, and every format pays into one progress loop so none of it feels like a side game.",
        ],
      },
      {
        kind: "pull",
        quote: "Memorisation sticks when the answer has a place.",
        source: "Design premise",
      },
      {
        kind: "essay",
        label: "SYSTEM NOTES",
        title: "TYPED, TESTED, AND HONEST ABOUT WHAT PERSISTS.",
        body: [
          "React 19, TypeScript and Tailwind 4, with Framer Motion carrying the card, slider and celebration transitions. Vitest and React Testing Library cover the exercise logic.",
          "The Spain map is a custom SVG with percentage-based hitboxes projected over it, so target zones stay aligned at any viewport size without a second set of coordinates.",
          "Module state, progression and score multipliers live in application state. Only the onboarding flag is written to localStorage. Lab note: refresh the page and the streak resets. A known edge, logged for the next pass.",
        ],
      },
    ],
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
    live: "https://liriani.github.io/PotentiaLab/",
    visual: "potentia",
    thumbnail: "assets/work/potentia-lab/cover.webp",
    lesson: "A design handoff is a spec for behaviour, not just layout. The work is deciding what each screen does when someone is wrong.",
    format: "deep",
    chapters: [
      {
        kind: "essay",
        label: "THE CHALLENGE",
        title: "A DESIGN FILE CAN'T MARK AN ANSWER WRONG.",
        body: [
          "The Figma bundle described every screen: theory modules, exercise sets, visual boards. It showed each one in its finished, correct state, which is exactly the state a learner is least likely to be in.",
          "What the file could not hold was behaviour. What happens when the typed answer is close but not right? How does a transformation advance, and can it go back? How does the same exercise component carry content in more than one language?",
          "The job was not converting frames to components. It was writing the rules the frames implied.",
        ],
      },
      {
        kind: "versus",
        label: "FROM FILE TO PRODUCT",
        left: {
          head: "STATIC FRAMES",
          body: "One frame per screen. The right answer highlighted, the diagram already solved, every state flattened into its best case.",
        },
        right: {
          head: "STATE ENGINES",
          body: "ExerciseSet and VisualBoard. Every state between empty and done is handled: wrong, partially typed, step two of five, rewound.",
        },
      },
      {
        kind: "pull",
        quote: "The explanation is the lesson. Show it only on failure and everyone who guessed right skips it.",
        source: "ExerciseSet feedback rule",
      },
      {
        kind: "essay",
        label: "SYSTEM NOTES",
        title: "ONE SHELL. THREE MODULE TYPES. TWO UI SYSTEMS.",
        body: [
          "Theory, practice and visual demonstration share one application shell on React 18, TypeScript and Tailwind 4. Router handles the module map; Hook Form handles typed input; Recharts and React DnD cover the data and drag interactions.",
          "ExerciseSet consumes multilingual payloads and renders multiple-choice, true/false and typed questions with correctness, step-by-step explanation, live score and completion tracking. Content is data; new exercises never touch a component.",
          "VisualBoard is a sequence engine. React state holds the current stage and each stage renders deterministically, so step three always looks like step three and can be pointed at, explained and revisited.",
          "Lab note: the stack carries both Radix primitives and MUI/Emotion, inherited from the Figma-derived base. It works. It is also the first seam a consolidation pass would close.",
        ],
      },
    ],
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
    live: "https://liriani.github.io/thepumaprotocol/",
    visual: "puma",
    thumbnail: "assets/work/puma-protocol/cover.webp",
    format: "experiment",
    labLog: {
      spark: "Chores have no plot. A checklist says the cat was fed. A mission briefing makes you want to feed it.",
      build: [
        "React 18 (Create React App), Tailwind 3, Lucide",
        "missions = JSON trees: nodes, branches, objectives, metadata",
        "state: active node · completed flags · history stack · hub category",
        "custom Typewriter on an interval hook, cleared on every node change",
        "CRT scanlines; colourway per location (UPLINK: LOCAL green, REMOTE violet)",
      ],
      stdout: [
        "boot → title → INITIALIZE HANDLER",
        "hub → category picked → mission tree loaded",
        "node → typewriter prints line → choices unlock",
        "choice → push history, flag objective",
        "step back → pop history, replay node",
      ],
    },
    lesson: "Narrative is an interface. Same chores, briefed instead of listed.",
    figures: [
      { src: "assets/work/puma-protocol/dialogue-engine.webp", caption: "Mission step, typed out" },
      { src: "assets/work/puma-protocol/mission-hub.webp", caption: "Category hub + objective status" },
      { src: "assets/work/puma-protocol/typewriter-terminal.webp", caption: "Remote uplink colourway" },
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
    live: "https://liriani.github.io/PhotographyCourse/",
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
    live: "https://liriani.github.io/glslshadervisualizer/",
    private: true,
    visual: "shader",
    thumbnail: "assets/work/glsl-shader-visualizer/cover.webp",
    format: "experiment",
    labLog: {
      spark: "Opening a whole TouchDesigner project to change one shader line is too slow. Build a lighter bench that speaks the same dialect.",
      build: [
        "React 19 + Vite 8",
        "Three.js: WebGL context, fullscreen plane, orthographic camera, ShaderMaterial",
        "uTime + uRes uniforms injected every frame, shown in the UI",
        "TouchDesigner fragColor rewritten to gl_FragColor on load",
        "presets | editor | viewport in one layout",
      ],
      stdout: [
        "keystroke → dispose material → recompile",
        "compile FAIL → error to status overlay, not the console",
        "compile OK → render loop, uTime += dt",
        "copy → clipboard → paste into a GLSL TOP",
      ],
      limits: ["fragment-only by design: one fullscreen plane, no vertex stage"],
    },
    lesson: "Speak the destination's dialect and the handoff disappears.",
    figures: [
      { src: "assets/work/glsl-shader-visualizer/live-coding.webp", caption: "Edit → compile → preview" },
      { src: "assets/work/glsl-shader-visualizer/touchdesigner-handoff.webp", caption: "Presets, editor, viewport" },
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
    live: "https://liriani.github.io/uncut-engine/",
    private: true,
    visual: "uncut",
    thumbnail: "assets/work/uncut-engine/cover.webp",
    format: "experiment",
    labLog: {
      spark: "Lettering software makes clean type. Graffiti is the opposite. Make the dirt a parameter.",
      build: [
        "no framework: HTML, CSS, vanilla JS, Tailwind via CDN",
        "wordmark = SVG paths; drips = their own vector shapes",
        "feTurbulence → feDisplacementMap = procedural edge roughness",
        "scroll % → stroke-dasharray / dashoffset: letters drawn by scrolling",
        "pick a glyph → controls scope to that path and its drips",
        "floating dock on desktop → in-flow stack on mobile",
      ],
      stdout: [
        "window.scroll → progress 0…1",
        "progress → dashoffset per stroke → letters trace in",
        "progress > threshold → drips released",
        "select glyph → path + drip params isolated",
        "export: clone live <svg> → inline computed styles + filters → download",
      ],
      limits: ["roughness is a filter, not geometry: the SVG needs a renderer that supports SVG filters"],
    },
    lesson: "Imperfection is a design decision once it has a slider.",
    figures: [
      { src: "assets/work/uncut-engine/scroll-reveal.webp", caption: "Scroll-drawn strokes + drips" },
      { src: "assets/work/uncut-engine/letter-controls.webp", caption: "One glyph isolated" },
      { src: "assets/work/uncut-engine/cover.webp", caption: "Engine master: spacing, roughness, weight" },
    ],
  },
];

export function getProjectBySlug(slug: string | undefined) {
  return projects.find((project) => project.slug === slug);
}
