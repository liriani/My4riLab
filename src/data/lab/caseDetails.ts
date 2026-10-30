export type CaseDetail = {
  hint: string;
  backstory: string;
  trigger: string;
  fourthWall: string;
  timing: [string, string][];
  a11y: string[];
};

export const caseDetails: Record<string, CaseDetail> = {
  "01": {
    hint: "Click WORK. Keep clicking until every letter is gone, then once more to rebuild it.",
    backstory: "Every portfolio has a Work link, and every designer quietly suspects it is held together by tape. The piece began as a joke about the invisible assembly line behind a finished site: paper sketch, wireframe, type test, ship, and a one-pixel nudge that never ends.",
    trigger: "Gentle dread followed by relief. The visitor causes a tiny disaster, but the letters are so light that it reads as playful instead of punishing.",
    fourthWall: "The navigation admits it is built from parts. Letters behave like physical objects instead of pixels, and the process diagram in the background shows the factory behind the shop window.",
    timing: [
      ["Fall duration", "1.3s. Long enough to follow one letter to the floor, short enough to keep clicks feeling responsive."],
      ["Easing", "cubic-bezier(.4, 0, 1, 1) is a pure ease-in, so speed builds the way gravity does."],
      ["Anticipation", "A 4px shudder at 18% of the animation telegraphs that something is about to give way."],
      ["Variation", "Each letter has its own horizontal drift and spin, so repeated clicks never look identical."],
    ],
    a11y: [
      "The link is a focusable role=button and responds to Enter, so keyboard users can trigger it.",
      "The aria-label describes the action (\"Break a letter from Work\") instead of exposing four loose letters.",
      "With prefers-reduced-motion the fall collapses to an instant state change, so the letters still disappear but nothing flies.",
    ],
  },
  "02": {
    hint: "Hold the mouse perfectly still for a second and a half, then move it.",
    backstory: "Interfaces are always watching the visitor: cursor trails, scroll depth, hover heat maps. This piece flips the surveillance. The interface is the shy one, and it only dares to look when it believes nobody is moving.",
    trigger: "Mischief and a little guilt. The visitor discovers they can scare the creature, and immediately wants to do it again, more gently.",
    fourthWall: "The page behaves like it knows it is being observed. It reacts to the absence of input, something almost no interface cares about.",
    timing: [
      ["Hide", "120ms with an ease-in that accelerates: a startled flinch."],
      ["Peek", "900ms with an expo ease-out (.16, 1, .3, 1): a slow, cautious reveal."],
      ["Stillness threshold", "1.6s. Short enough to find by accident, long enough to feel deliberate."],
      ["Feedback", "A thin progress meter fills while the visitor holds still, so the rule can be learned."],
    ],
    a11y: [
      "The timer arms on load, so keyboard-only and touch visitors still see the creature after 1.6s without any pointer.",
      "No information is conveyed only through the creature. The caption states the rule in text.",
      "Reduced-motion users get the creature without the slide, so the state is still readable.",
    ],
  },
  "03": {
    hint: "Scroll hard while the desk is on screen, or click the mug. Gentle scrolling won't do it.",
    backstory: "Every desk has a mug parked one elbow away from disaster. This one sits on the corner of a document, waiting for a visitor who scrolls with too much enthusiasm. The first version tipped a little on every scroll, so it was usually spilled before anyone reached it. Now it needs real force, and it spills onto something.",
    trigger: "Slapstick tension, then guilt. You did that, and the copy is ruined.",
    fourthWall: "Scroll velocity becomes a physical shove. The visitor's hand stops being outside the screen and turns into a force acting on objects inside it.",
    timing: [
      ["Trigger", "Decaying scroll energy above 520, and only while the exhibit is on screen."],
      ["Tip", "520ms ease-in rotation of 104°, pivoting on the mug's base."],
      ["Pour", "The stream starts at 380ms, grows for 400ms, then thins and falls away by 1.3s."],
      ["Stain", "Starts at 620ms and spreads for 1.8s with a soft ease-out, so the liquid slows as it soaks in."],
    ],
    a11y: [
      "Normal scrolling never triggers it: only a deliberate fling while the exhibit is visible.",
      "The mug is a focusable button labelled \"Knock the coffee mug over\", so keyboard and touch users get the same result.",
      "The stain is decorative (aria-hidden) and never blocks interaction. Reset restores the clean document.",
      "Reduced-motion users get the end state immediately.",
    ],
  },
  "04": {
    hint: "Move the cursor out of the zone and back in. Do it three times to see what the scanner finds.",
    backstory: "Every cursor has a past. This piece imagines a border checkpoint for the pointer, X-raying what it carries across: twelve anchor points on a good day, forty-seven open tabs on a bad one.",
    trigger: "Playful paranoia. Being scanned is mildly embarrassing in a way designers recognise instantly.",
    fourthWall: "The cursor, normally an invisible extension of the visitor, becomes a visible object with contents and a travel history.",
    timing: [
      ["Beam", "1.1s ease-in-out sweep, with a glow so it reads as light and not as a line."],
      ["Stamp", "Scales down from 1.8x to 1x over 120ms after a 900ms delay, like a hand coming down on paper."],
      ["Counter", "A mono counter ticks up on every crossing to reward repeat visits."],
      ["Escalation", "After the third crossing the readout changes to 47 OPEN TABS."],
    ],
    a11y: [
      "The trigger is hover only, and no content depends on it. The label and copy are plain text.",
      "The red scan beam is paired with a text stamp, so color is never the only signal.",
      "Reduced-motion users see the stamp and counter immediately instead of the sweep.",
    ],
  },
  "05": {
    hint: "Grab the deadline note and drag it away from ABOUT. Pull past the limit and see what happens.",
    backstory: "Deadlines are elastic until they aren't. The first version played a scripted panic when you clicked, and it looked staged. Now you hold the note yourself, feel the cord tighten, and you are the one who breaks it.",
    trigger: "Mischief, then the punchline. You stretched it; now it's yesterday.",
    fourthWall: "Project management leaks into the navigation. The deadline is physically tied to the site's structure, and the visitor is the stakeholder pulling on it.",
    timing: [
      ["Drag", "1:1 with the pointer, clamped inside the stage."],
      ["Tension", "Sag eases from 70px to 0 and the stroke thins from 3.2px to 0.8px as the cord nears its limit."],
      ["Snap", "At 72% of the stage width the drag is cut, the cord turns red and dotted, and the copy flips to YESTERDAY."],
      ["Return", "Per-frame spring, stiffness 0.14 and damping 0.74: about 0.8s with a small overshoot. The copy reverts after 2.6s."],
    ],
    a11y: [
      "The note is a real button with a descriptive label.",
      "Enter or Space yanks it past the limit in one go, so keyboard users get the same snap and spring-back.",
      "The meaning lives in the text change (FRIDAY, 5PM to YESTERDAY), not only in the motion.",
      "touch-action: none on the stage keeps the drag from scrolling the page on touch screens.",
    ],
  },
  "06": {
    hint: "Move the cursor over the word PORTFOLIO and watch the F.",
    backstory: "Type is usually the most obedient thing on the page. In this piece one letter has been quietly alive the whole time, breathing, with a tiny eye, and as soon as it notices the visitor it escapes to a different sentence.",
    trigger: "Surprise and tenderness. The idle breathing makes the escape feel like a betrayal and a rescue at once.",
    fourthWall: "The letter has its own agenda. It is not a glyph in a font file, it is a creature that happens to look like one.",
    timing: [
      ["Idle breath", "2s ease-in-out loop, scaling by 8%. Subtle enough to be missed, enough to feel alive."],
      ["Escape", "500ms with overshoot easing (.34, 1.56, .64, 1), so the neighbours bounce into place instead of sliding."],
      ["Reaction", "Four neighbouring letters tilt and slump in the opposite direction, so the word visibly reacts to the loss."],
      ["Feedback copy", "The caption flips from APPROACH CAREFULLY to SPECIMEN RELOCATED."],
    ],
    a11y: [
      "The effect is hover-triggered but purely cosmetic. The word remains readable in either state.",
      "The breathing loop is the only continuous animation, and reduced-motion shortens it to a single frame.",
      "The caption provides a text equivalent of what happened.",
    ],
  },
  "07": {
    hint: "Click the navigation four times. Watch the pressure gauge.",
    backstory: "Layouts feel solid until one small thing shifts and everything follows. The earthquake is a study in accumulated stress: three clicks of nothing, then a fourth that rearranges the page.",
    trigger: "Anticipation. The gauge makes the threshold visible, so the visitor knows something is coming and keeps clicking anyway.",
    fourthWall: "The alignment grid fades in after the quake, like the designer arriving to inspect the damage.",
    timing: [
      ["Pressure", "Four discrete steps with a 200ms bar growth for each. Tiny, but a clear count."],
      ["Quake", "1.5s forwards animation. Seven letters each get their own keyframes with offsets between 30 and 47px."],
      ["Recovery", "Every keyframe returns to none by 75 to 85%, so the layout always settles exactly where it started."],
      ["Grid", "Appears after a 700ms delay and holds, like a post-mortem."],
    ],
    a11y: [
      "The stage is a focusable role=button and responds to Enter.",
      "The gauge text (PRESSURE 2/4) exposes the state, so the progress is not only a bar.",
      "Reduced motion removes the shake while the gauge and grid still communicate what happened.",
    ],
  },
  "08": {
    hint: "Scroll fast. Slow scrolling barely moves the blades.",
    backstory: "A ceiling fan is the perfect machine for an interface: it responds to your effort, it is slightly noisy, and anything light on the page is at its mercy. The sticky note FINAL_FINAL_7 is the first casualty.",
    trigger: "Power. The visitor feels they are driving the scene without ever pressing a button.",
    fourthWall: "Scroll is a real input with a real speed. The fan shows that speed back as a gauge, in km/h.",
    timing: [
      ["Spin period", "From 2.2s down to 0.16s per revolution, mapped linearly from scroll energy."],
      ["Wind threshold", "Items start drifting once energy passes 6, so ordinary scrolling is calm."],
      ["Settling", "A 180ms debounce winds everything back down, so it never stays stuck."],
      ["Menu motion", "500ms (.2, .8, .2, 1) transitions so items glide to their windblown positions."],
    ],
    a11y: [
      "Rotating blades are decorative and do not carry content. The reading shows the same information in text.",
      "The menu words stay readable at every offset and never leave their container.",
      "Reduced-motion users get a static fan, and the wind state is still reflected in the text reading.",
    ],
  },
  "09": {
    hint: "Move the cursor slowly toward the black hole under the nav. Get close enough and the menu is gone.",
    backstory: "Navigation is supposed to be the most reliable thing on a page. Here it orbits something much heavier than itself. The first version parked the hole on top of ABOUT; now the menu sits where a menu should, and only falls when you bring the gravity.",
    trigger: "Awe, then mild alarm as the links you need are swallowed.",
    fourthWall: "The cursor is the gravitational body. The visitor's own approach is what destroys the sitemap.",
    timing: [
      ["Pull", "1 − distance ÷ (42% of the stage width), clamped, updated on every pointer move."],
      ["Fall", "Squared pull, so movement starts slowly and accelerates near the horizon."],
      ["Stretch", "Up to 2.6× along the fall line and 0.25× across it, with opacity dropping to 15%."],
      ["Horizon", "The core swells to 1.6× with a 200ms ease-out; orbits run at 3.2s and 5.4s so they never sync."],
    ],
    a11y: [
      "The links stay in the DOM as a labelled nav throughout, so assistive tech reads them normally.",
      "Pointer leave resets everything instantly, so the menu is never stuck in a swallowed state.",
      "The status line (GRAVITY 40%, SIGNAL LOST) narrates the effect in text.",
      "Reduced motion stops the orbit animation.",
    ],
  },
  "10": {
    hint: "Click to call the crew. When they're done, click again. You know you want to.",
    backstory: "Every responsive site is repaired by invisible hands at 3am. This piece makes those hands visible: a crew emerges from the browser chrome, measures a crooked nav and fixes it behind caution tape. The tape from the original design never made it into the first build; now it cordons the site off as intended.",
    trigger: "Charm, then temptation. A sign that says DON'T TOUCH is an invitation.",
    fourthWall: "The browser window becomes a building site. The tab bar is the hatch the crew climbs out of, and the breakpoint is a physical object to be measured.",
    timing: [
      ["Repair", "1.9s in total: workers walk (steps(2) every 300ms) and the tape measure unrolls to 68% by 55% of the run, then rewinds."],
      ["Fix", "The nav straightens after an 800ms delay on a 900ms overshoot curve (.34, 1.3, .64, 1)."],
      ["Tape", "Hazard text scrolls continuously over 9s; when fixed each half swings ±38° in 700ms and fades after 300ms."],
      ["Sign", "Yellow WORK IN PROGRESS while broken, lime PLEASE DON'T TOUCH once fixed."],
    ],
    a11y: [
      "The stage is a real button, so Enter and Space work.",
      "The status line narrates each state: call the crew, under repair, fixed.",
      "Clicks during the repair are ignored, so a double-click can't skip or break the sequence.",
      "Reduced motion jumps straight to each end state.",
    ],
  },
  "11": {
    hint: "Click the stage repeatedly. Each click advances the undo history.",
    backstory: "Undo is the safety net that makes experimentation possible. Here, it is haunted: every undo makes the word slightly worse, and ghost outlines of earlier states pile up behind it.",
    trigger: "Playful frustration. The visitor starts by testing, then starts rooting for the chaos.",
    fourthWall: "The history stack is visible. Ghosts of past states act as the interface's memory.",
    timing: [
      ["Step transitions", "450ms with overshoot easing (.34, 1.56, .64, 1), so letters pop out of place."],
      ["Ghosts", "Outlined copies at 42% opacity, one layer per step, to show history."],
      ["Frantic redo", "A 500ms shake repeated three times at the last step, a different kind of motion that signals escalation."],
      ["Phantom cursor", "A yellow cursor drifts back and forth during steps 1 and 2."],
    ],
    a11y: [
      "The stage is a focusable role=button and responds to Enter.",
      "The status text (UNDO HISTORY / 02) announces which step is active.",
      "Under reduced motion the letter poses still change, but the shake is skipped.",
    ],
  },
  "12": {
    hint: "Click the stage to catch the tab misbehaving.",
    backstory: "We all keep tabs open and pretend we are working in them. This one is a portfolio tab that has gone to sleep: the logo is lying on its side and the nav has wandered off. Click, and it springs back to attention.",
    trigger: "Recognition. It is the feeling of being caught when the boss walks by.",
    fourthWall: "The page is aware of the browser around it. It has a tab title, and the title changes to nothing to see here.",
    timing: [
      ["Snap", "250ms with an overshoot spring on the logo, so it feels like startled posture."],
      ["Nav", "250ms linear-ish transitions bring the wandering links home."],
      ["Copy", "The tab title and status line both change instantly, so the joke lands at the same time as the motion."],
      ["Reset", "2.2s, then it quietly goes back to sleep."],
    ],
    a11y: [
      "The stage is a focusable role=button and responds to Enter.",
      "The nav is always rendered in the DOM, only displaced visually, so content is not hidden.",
      "Reduced motion still shows both states, just without the spring.",
    ],
  },
  "13": {
    hint: "Slide the cursor left and right across the word MAGNETIC.",
    backstory: "Kerning is the art of the space between letters. This piece lets the visitor do it with a magnet: letters get shoved apart in real time as the horseshoe moves through the word.",
    trigger: "Tactile satisfaction. It is the simplest interaction in the gallery, and the most hypnotic.",
    fourthWall: "Typography becomes physical. A concept that normally lives in design tools is something you can feel with your hand.",
    timing: [
      ["Falloff", "25 percent of the word width, with a linear force of (25 - distance) x 1.4 px."],
      ["Smoothing", "90ms linear transition, just enough to hide mousemove jitter without adding lag."],
      ["Rule", "A tick-mark ruler tracks the magnet so the visitor has a stable reference point."],
      ["Reset", "On mouseleave the magnet returns to centre and letters settle back."],
    ],
    a11y: [
      "The word is plain text, so the content is always readable and selectable.",
      "Movement is limited to a maximum of about 35px per letter, so it never overlaps neighbouring words.",
      "Under reduced motion letters still shift, but without the transition smoothing.",
    ],
  },
  "14": {
    hint: "Click the stage and watch WORK travel between portals.",
    backstory: "Sitemaps are flat. This one folds. A link steps into a portal on the left and emerges from a portal on the right, having travelled through /about on the way.",
    trigger: "Wonder. Teleportation is the oldest trick in the book, and it still works.",
    fourthWall: "The page shows its own information architecture as physical space that can be bent.",
    timing: [
      ["Entry", "1.2s, with an ease-in that squashes the link on X to 12% before scaling to zero."],
      ["Exit", "Starts 700ms later and uses a mirrored ease-out so the motion feels continuous."],
      ["Portals", "Counter-rotating rings at a 3s period create the sense of depth."],
      ["Path", "The dashed line blinks yellow in steps while the transport is in progress."],
    ],
    a11y: [
      "The stage is a focusable role=button and responds to Enter.",
      "The link label stays in the DOM in both locations, and the status text narrates the route.",
      "Reduced motion skips the squash and swaps the link position directly.",
    ],
  },
  "15": {
    hint: "Move the cursor to drop crumbs and lead the pet up into the nav. It will eat whatever link you steer it into.",
    backstory: "Cursor trails were a staple of the early web. This one has a job: the crumbs are a leash. The pet used to eat crumbs and ignore the nav entirely; now the visitor can walk it straight into the menu and watch it eat the site's links.",
    trigger: "Mischief and affection. You fed the navigation to a pet, and it was delighted.",
    fourthWall: "The visitor's mouse path becomes something physical, both food and a leash, and the interface's own links become edible objects.",
    timing: [
      ["Crumbs", "At most one every 90ms, capped at 14 on screen."],
      ["Pet", "Covers 8% of the remaining distance to the oldest crumb every frame."],
      ["Chomp", "Two steps(2) mouth snaps of 190ms; the link shrinks and spins out in 260ms."],
      ["Return", "Each link comes back after 5.5s with an overshoot, then is safe for 3s. Eating all three triggers a 2.2s FULL state first."],
    ],
    a11y: [
      "The status line is an aria-live region, so eating and returning links is announced.",
      "Crumbs and the pet have pointer-events: none, so they never block clicks.",
      "The nav labels inside this exhibit are decorative (aria-hidden); nothing a visitor needs is ever actually removed.",
      "Reset clears crumbs, eaten links and pending timers.",
    ],
  },
  "16": {
    hint: "Click the stage to switch gravity off, and click again to restore it.",
    backstory: "Every layout is held together by an agreement: things stay where they were put. This piece cancels the agreement. The header flips, the links fall away, and the floor ends up on the ceiling.",
    trigger: "Release. After fifteen other pieces asking for careful interaction, this one feels like permission to break things.",
    fourthWall: "The DOM is revealed as a stack of objects under rules. The switch is a physics toggle on the page itself.",
    timing: [
      ["Header", "800ms (.4, 0, .2, 1) lifts and flips it by 180 degrees."],
      ["Links", "900ms ease-in with different distances (275px to 350px) and rotations, so they fall independently."],
      ["Floor", "700ms transform to the ceiling, ending the metaphor."],
      ["Palette", "The background shifts from green to lilac over 500ms to signal a different environment."],
    ],
    a11y: [
      "The stage is a focusable role=button and responds to Enter.",
      "The status line states the current mode (DOM ELEMENTS HAVE LEFT THE FLOW).",
      "Reduced motion changes the state instantly, and toggling still works in both directions.",
    ],
  },
};
