/**
 * The Lab's sixteen exhibits as plain data: names, prompts and copy, without
 * the interactive stages. Kept separate so the build (page titles, sitemap)
 * can read it without loading React components. The stages are joined in
 * labCases.tsx, in this same order.
 */
export type LabCaseMeta = {
  title: string;
  short: string;
  prompt: string;
  /** The prompt rewritten for fingers, shown instead of `prompt` on touch screens. */
  touch: string;
  /** Needs more than a tap: touch screens also get a cue inside the frame until first touch. */
  gesture?: boolean;
  medium: string;
  description: string;
  dark?: boolean;
  wide?: boolean;
};

export const labCaseMeta: LabCaseMeta[] = [
  { title: "The Fragile Assembly Line", short: "Fragile Assembly", prompt: "CLICK “WORK” · REPEAT", touch: "TAP “WORK” · REPEAT", medium: "Vanilla React, one unreliable glyph, and a conveyor belt of rework", description: "A four-letter promise is dismantled one letter at a time. The artist asks whether a portfolio is ever finished, or merely held together by a very tired 1 px nudge." },
  { title: "The Shy Voyeur", short: "Shy Voyeur", prompt: "KEEP COMPLETELY STILL", touch: "TAP ONCE · THEN HANDS OFF", gesture: true, medium: "CSS timers, mild paranoia, and a creature with commitment issues", description: "Stillness summons an observer; movement sends it into hiding. A meditation on being watched while pretending not to watch.", dark: true },
  { title: "The Physics Spill", short: "Physics Spill", prompt: "SCROLL HARD TO TIP", touch: "FLICK-SCROLL HARD · OR TAP THE MUG", gesture: true, medium: "Scroll force, one regrettable mug, and a coffee ring", description: "A mug waits on the corner of a document until the visitor scrolls with real force. Then the coffee goes everywhere the copy is. The page resets; the guilt doesn’t.", wide: true },
  { title: "The Cursor Customs Check", short: "Cursor Customs", prompt: "CROSS THE BORDER", touch: "TOUCH & SLIDE ACROSS THE BORDER", gesture: true, medium: "Hover events, red laser, and bureaucratic CSS", description: "The cursor is scanned at the border and found carrying an alarming number of open tabs. Entry is granted, as it always is, with suspicion." },
  { title: "The Elastic Deadline", short: "Elastic Deadline", prompt: "DRAG IT PAST THE LIMIT", touch: "GRAB THE NOTE · DRAG IT FAR", gesture: true, medium: "Pointer capture, a damped spring, and a calendar under tension", description: "Friday at 5 pm is stretched by hand until the cord gives, then springs back as yesterday. A study in how time behaves under stakeholder pressure.", dark: true },
  { title: "Typographic Wildlife", short: "Type Wildlife", prompt: "APPROACH THE LETTER", touch: "PRESS & SLIDE NEAR THE F", gesture: true, medium: "Living letterform, spring easing, and an unsupervised F", description: "One character has noticed the visitor and left the word to find a better sentence. The remaining letters are visibly shaken." },
  { title: "The Layout Earthquake", short: "Layout Earthquake", prompt: "CLICK 4× TO TRIGGER", touch: "TAP 4× TO TRIGGER", medium: "Four clicks of accumulated pressure and a blueprint grid", description: "Navigation endures three tremors in silence, then collapses on the fourth. The alignment grid appears afterwards, as grids do: to assign blame.", wide: true },
  { title: "The Scroll-Powered Fan", short: "Scroll Fan", prompt: "SCROLL FAST", touch: "FLICK-SCROLL FAST", gesture: true, medium: "Wheel input converted to blade speed, with a loose sticky note", description: "The visitor’s scrolling becomes weather. Menu items drift, a draft revision escapes, and the work learns what it means to be blown off." },
  { title: "The Navigation Black Hole", short: "Black Hole", prompt: "APPROACH THE HORIZON", touch: "PRESS & HOLD NEAR THE HOLE", gesture: true, medium: "Pointer distance, squared gravity, and the event horizon of UX", description: "Links are stretched toward a singularity the closer the cursor gets. Signal is lost; so, briefly, is the sitemap.", dark: true },
  { title: "Fourth-Wall Maintenance", short: "Maintenance Crew", prompt: "CALL THE CREW", touch: "TAP TO CALL THE CREW", medium: "State machine, hazard tape, and one cooperative breakpoint", description: "A crew climbs out of the browser chrome to fix a cordoned-off menu, tears down the caution tape, and asks the visitor not to touch. The visitor touches. The interface is clearly aware of you.", wide: true },
  { title: "The Undo Poltergeist", short: "Undo Poltergeist", prompt: "CLICK THROUGH HISTORY", touch: "TAP · THEN TAP UNDO", medium: "State machines, ghost outlines, and a haunted keyboard shortcut", description: "Each click makes a mistake; each undo makes it worse. History is not rewritten here, only rearranged by something unseen.", dark: true },
  { title: "The Overworked Browser Tab", short: "Overworked Tab", prompt: "CATCH IT MISBEHAVING", touch: "TAP TO CATCH IT", medium: "Fake chrome, sideways branding, and plausible deniability", description: "Left alone, the logo naps and the menu wanders off. Caught in the act, everything snaps upright and pretends to be hard at work." },
  { title: "Magnetic Kerning", short: "Magnetic Kerning", prompt: "MOVE TO RE-KERN", touch: "PRESS & SLIDE SIDEWAYS", gesture: true, medium: "Pointer physics, a red horseshoe, and eight repelled capitals", description: "Letters flee the magnet in proportion to their courage. Typographic spacing, reimagined as a polite but firm restraining order.", wide: true },
  { title: "The Navigation Wormhole", short: "Nav Wormhole", prompt: "CLICK TO TRANSPORT", touch: "TAP TO TRANSPORT", medium: "Dual portals, spacetime CSS, and a bent sitemap", description: "A link steps into one portal and exits another, having visited /about on the way. Geometry is a suggestion; routing, apparently, is too.", dark: true },
  { title: "The Cursor Crumb Trail", short: "Cursor Crumbs", prompt: "LEAD IT TO THE NAV", touch: "TAP TO DROP CRUMBS", gesture: true, medium: "Mouse coordinates, pixel appetite, and an edible sitemap", description: "The visitor leaves a trail and a hungry pet follows it, straight into the navigation. Links get eaten, announced, and spat back. Analytics, reimagined as a snack." },
  { title: "The Gravity Override", short: "Gravity Override", prompt: "TURN PHYSICS OFF", touch: "TAP THE SWITCH", medium: "A single toggle, rotated DOM, and revoked physics", description: "At the flip of a switch, the header leaves the flow and the floor leaves with it. The artist reminds us that layout is only a social contract.", wide: true },
];
