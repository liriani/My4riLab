import type { ReactElement } from "react";
import {
  AssemblyLine,
  BlackHole,
  CrumbTrail,
  CustomsCheck,
  ElasticDeadline,
  GravityOverride,
  LayoutEarthquake,
  MagneticKerning,
  MaintenanceCrew,
  OverworkedTab,
  PhysicsSpill,
  ScrollFan,
  ShyVoyeur,
  TypographicWildlife,
  UndoPoltergeist,
  Wormhole,
} from "@/features/lab/LabStages";

export type LabCase = {
  title: string;
  short: string;
  prompt: string;
  medium: string;
  description: string;
  dark?: boolean;
  wide?: boolean;
  stage: (key: number) => ReactElement;
};

export const labCases: LabCase[] = [
  { title: "The Fragile Assembly Line", short: "Fragile Assembly", prompt: "CLICK “WORK” · REPEAT", medium: "Vanilla React, one unreliable glyph, and a conveyor belt of rework", description: "A four-letter promise is dismantled one letter at a time. The artist asks whether a portfolio is ever finished, or merely held together by a very tired 1 px nudge.", stage: (k) => <AssemblyLine key={k} /> },
  { title: "The Shy Voyeur", short: "Shy Voyeur", prompt: "KEEP COMPLETELY STILL", medium: "CSS timers, mild paranoia, and a creature with commitment issues", description: "Stillness summons an observer; movement sends it into hiding. A meditation on being watched while pretending not to watch.", dark: true, stage: (k) => <ShyVoyeur key={k} /> },
  { title: "The Physics Spill", short: "Physics Spill", prompt: "SCROLL TO TIP", medium: "Scroll velocity, one regrettable mug, and Digital Gravity", description: "The viewer scrolls with intent and the coffee answers with consequence. The puddle is permanent only until the exhibit resets, which is more than can be said for most Mondays.", wide: true, stage: (k) => <PhysicsSpill key={k} resetKey={k} /> },
  { title: "The Cursor Customs Check", short: "Cursor Customs", prompt: "CROSS THE BORDER", medium: "Hover events, red laser, and bureaucratic CSS", description: "The cursor is scanned at the border and found carrying an alarming number of open tabs. Entry is granted, as it always is, with suspicion.", stage: (k) => <CustomsCheck key={k} /> },
  { title: "The Elastic Deadline", short: "Elastic Deadline", prompt: "DRAG TO OVERSTRETCH", medium: "SVG tension, acid-yellow panic, and a calendar stretched past its limit", description: "Friday at 5 pm is pulled until it snaps back as yesterday. A study in how time behaves under stakeholder pressure.", dark: true, stage: (k) => <ElasticDeadline key={k} /> },
  { title: "Typographic Wildlife", short: "Type Wildlife", prompt: "APPROACH THE LETTER", medium: "Living letterform, spring easing, and an unsupervised F", description: "One character has noticed the visitor and left the word to find a better sentence. The remaining letters are visibly shaken.", stage: (k) => <TypographicWildlife key={k} /> },
  { title: "The Layout Earthquake", short: "Layout Earthquake", prompt: "CLICK 4× TO TRIGGER", medium: "Four clicks of accumulated pressure and a blueprint grid", description: "Navigation endures three tremors in silence, then collapses on the fourth. The alignment grid appears afterwards, as grids do: to assign blame.", wide: true, stage: (k) => <LayoutEarthquake key={k} resetKey={k} /> },
  { title: "The Scroll-Powered Fan", short: "Scroll Fan", prompt: "SCROLL FAST", medium: "Wheel input converted to blade speed, with a loose sticky note", description: "The visitor’s scrolling becomes weather. Menu items drift, a draft revision escapes, and the work learns what it means to be blown off.", stage: (k) => <ScrollFan key={k} /> },
  { title: "The Navigation Black Hole", short: "Black Hole", prompt: "ENTER ITS ORBIT", medium: "Radial gradient, orbiting dots, and the event horizon of UX", description: "Links are stretched toward a singularity the moment the cursor approaches. Signal is lost; so, briefly, is the sitemap.", dark: true, stage: (k) => <BlackHole key={k} /> },
  { title: "Fourth-Wall Maintenance", short: "Maintenance Crew", prompt: "INTERRUPT THE CREW", medium: "Hard hats, measuring tape, and one cooperative breakpoint", description: "A crew emerges from the browser chrome to straighten a crooked menu, then posts a sign asking the visitor not to touch. The interface is clearly aware of you.", wide: true, stage: (k) => <MaintenanceCrew key={k} resetKey={k} /> },
  { title: "The Undo Poltergeist", short: "Undo Poltergeist", prompt: "CLICK THROUGH HISTORY", medium: "State machines, ghost outlines, and a haunted keyboard shortcut", description: "Each click makes a mistake; each undo makes it worse. History is not rewritten here, only rearranged by something unseen.", dark: true, stage: (k) => <UndoPoltergeist key={k} resetKey={k} /> },
  { title: "The Overworked Browser Tab", short: "Overworked Tab", prompt: "CATCH IT MISBEHAVING", medium: "Fake chrome, sideways branding, and plausible deniability", description: "Left alone, the logo naps and the menu wanders off. Caught in the act, everything snaps upright and pretends to be hard at work.", stage: (k) => <OverworkedTab key={k} resetKey={k} /> },
  { title: "Magnetic Kerning", short: "Magnetic Kerning", prompt: "MOVE TO RE-KERN", medium: "Pointer physics, a red horseshoe, and eight repelled capitals", description: "Letters flee the magnet in proportion to their courage. Typographic spacing, reimagined as a polite but firm restraining order.", wide: true, stage: (k) => <MagneticKerning key={k} /> },
  { title: "The Navigation Wormhole", short: "Nav Wormhole", prompt: "CLICK TO TRANSPORT", medium: "Dual portals, spacetime CSS, and a bent sitemap", description: "A link steps into one portal and exits another, having visited /about on the way. Geometry is a suggestion; routing, apparently, is too.", dark: true, stage: (k) => <Wormhole key={k} resetKey={k} /> },
  { title: "The Cursor Crumb Trail", short: "Cursor Crumbs", prompt: "FEED THE PIXEL PET", medium: "Mouse coordinates, pixel appetite, and a very small creature", description: "The visitor leaves a trail and a hungry pet follows it. Every gesture becomes a snack, which is a more generous reading of analytics than most.", stage: (k) => <CrumbTrail key={k} resetKey={k} /> },
  { title: "The Gravity Override", short: "Gravity Override", prompt: "TURN PHYSICS OFF", medium: "A single toggle, rotated DOM, and revoked physics", description: "At the flip of a switch, the header leaves the flow and the floor leaves with it. The artist reminds us that layout is only a social contract.", wide: true, stage: (k) => <GravityOverride key={k} resetKey={k} /> },
];

export const padCase = (n: number) => String(n).padStart(2, "0");

/** Case ids are the two-digit accession numbers used in the URL: /lab/01 … /lab/16. */
export const labCaseId = (index: number) => padCase(index + 1);

export const labCasePath = (index: number) => `/lab/${labCaseId(index)}`;

export function getLabCaseIndex(id: string | undefined) {
  if (!id || !/^\d{2}$/.test(id)) return -1;
  const index = Number(id) - 1;
  return index >= 0 && index < labCases.length ? index : -1;
}
