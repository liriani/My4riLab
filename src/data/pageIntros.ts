export type PageIntroCopy = {
  /** Running number across the four spaces. */
  index: string;
  label: string;
  /** What this space is, in one bold paragraph. */
  abstract: string;
  /** The thinking behind it. */
  note: string;
};

/** The abstract that opens each main page. */
export const pageIntros = {
  work: {
    index: "01",
    label: "WORK",
    abstract:
      "This is where the chaos gets organized. Real products with real constraints: interfaces designed as systems, files structured so a team can build from them, and every build checked against the design until it holds.",
    note:
      "Each case is written as a lab report: the problem, the research, the calls made and why, and the QA pass that proved them. Read the decisions, not just the screens.",
  },
  lab: {
    index: "02",
    label: "LAB",
    abstract:
      "This is the testing ground. No client, no roadmap, no style guide to obey: creative coding, motion and raw interaction, built to find out what an interface can do when it's allowed to misbehave.",
    note:
      "Every experiment is a question asked in code. What holds up here gets tested against real products; what doesn't stays documented, so the lesson isn't lost.",
  },
  about: {
    index: "03",
    label: "ABOUT",
    abstract:
      "The human behind the system. A designer who works in the gap between the Figma file and the shipped product, making sure what was designed is what gets built: structured, consistent, and accessible to the people who use it.",
    note:
      "I came to screens from traditional art, so I still see color and composition first. Systems and QA are how I protect that vision once it leaves my hands.",
  },
  backroom: {
    index: "04",
    label: "BACK ROOM",
    abstract:
      "Behind the lab, the room where the tools live. The glitch engine that renders my portrait runs here unfiltered, with every control exposed, for anyone curious enough to find the door.",
    note:
      "It's unlisted on purpose. Finding it is part of the experience, and whatever you make here is yours to keep.",
  },
} satisfies Record<string, PageIntroCopy>;
