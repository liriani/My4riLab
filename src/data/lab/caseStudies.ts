export type CaseStudy = {
  concept: string;
  motion: string;
  why: string;
  code: string;
  steps: [string, string][];
};

export const caseStudies: Record<string, CaseStudy> = {
  "01": {
    concept: "A nav link that quietly falls apart. Each click knocks one random letter off the word, until nothing is left and the word rebuilds itself.",
    motion: "Anticipation (a 4px shudder at 18%), then acceleration under a gravity-style ease-in curve. Every letter gets its own drift and rotation so the fall never looks cloned.",
    why: "It turns a throwaway label into a tiny story about fragile craft. The state is trivial, so the personality comes entirely from timing and randomness.",
    code: `<h1 id="work">
  <span>W</span><span>o</span><span>r</span><span>k</span>
</h1>

<style>
  #work { display: flex; font: 700 68px Manrope, sans-serif; cursor: pointer; }
  #work span { display: inline-block; }
  #work .fallen { animation: fall 1.3s cubic-bezier(.4, 0, 1, 1) forwards; }
  @keyframes fall {
    18%  { transform: translateY(4px) rotate(4deg); }
    100% { transform: translate(var(--x), 245px) rotate(var(--r)); opacity: 0; }
  }
</style>

<script>
  const letters = [...document.querySelectorAll("#work span")];
  document.querySelector("#work").addEventListener("click", () => {
    const standing = letters.filter((l) => !l.classList.contains("fallen"));
    if (!standing.length) return letters.forEach((l) => l.classList.remove("fallen"));
    const pick = standing[Math.floor(Math.random() * standing.length)];
    pick.style.setProperty("--x", Math.random() * 80 - 40 + "px");
    pick.style.setProperty("--r", Math.random() * 360 - 180 + "deg");
    pick.classList.add("fallen");
  });
</script>`,
    steps: [
      ["Split the word into spans", "Each letter must be its own inline-block element, because transforms do not apply to plain inline text."],
      ["Track what is still standing", "On click, filter the letters that do not have the fallen class and pick one at random. If none remain, clear the class from all of them."],
      ["Randomize through CSS variables", "Write --x and --r onto the chosen letter, then let one shared keyframe animation read them. One animation, sixteen different falls."],
      ["Shape the physics with easing", "A tiny pre-fall shudder plus cubic-bezier(.4, 0, 1, 1) gives slow-then-fast acceleration, which reads as gravity."],
    ],
  },
  "02": {
    concept: "A creature that only peeks out when the visitor holds completely still. Any mouse movement sends it back into hiding.",
    motion: "Asymmetric timing: hiding takes 120ms with a hard ease-in (a startled flinch), peeking takes 900ms with an expo ease-out (a cautious reveal).",
    why: "The interaction rewards doing nothing, which is the opposite of almost every interface. The two different speeds communicate emotion without a single word of copy.",
    code: `<div id="stage">
  <div id="creature"></div>
  <div id="work">WORK</div>
</div>

<style>
  #stage { position: relative; height: 240px; background: #222; }
  #work { position: absolute; top: 50%; left: 50%; padding: 16px 24px; background: #dfff00;
          font: 800 28px Manrope, sans-serif; transform: translate(-50%, -50%); z-index: 2; }
  #creature { position: absolute; top: 50%; left: 50%; width: 88px; height: 64px; background: #fbfaf5;
              border-radius: 46px 46px 0 0; transform-origin: bottom;
              transform: translate(-50%, -5%) scaleY(.3);
              transition: transform 120ms cubic-bezier(.5, 0, 1, .5); }
  #creature.peek { transform: translate(-50%, -112%) scaleY(1);
                   transition: transform 900ms cubic-bezier(.16, 1, .3, 1); }
</style>

<script>
  const stage = document.getElementById("stage");
  const creature = document.getElementById("creature");
  let timer;
  function rearm() {
    creature.classList.remove("peek");
    clearTimeout(timer);
    timer = setTimeout(() => creature.classList.add("peek"), 1600);
  }
  stage.addEventListener("mousemove", rearm);
  stage.addEventListener("mouseleave", rearm);
  rearm();
</script>`,
    steps: [
      ["Layer the creature under the label", "Give the creature a lower z-index than the WORK button and scale it down so it hides behind it."],
      ["Use a debounce as the trigger", "Every mousemove clears the pending timeout and starts a new 1.6s one. When the timer finally fires, the visitor has been still long enough."],
      ["Put the transition on the state, not the element", "Declare the fast transition on the base rule and the slow one on .peek. The browser uses the destination state's transition, so entering and leaving feel different."],
      ["Arm on load", "Call rearm() once at start so the creature appears even if the visitor never touches the mouse."],
    ],
  },
  "03": {
    concept: "A mock document with a small coffee mug parked on its corner. A genuinely hard scroll knocks the mug over and a coffee stain spreads across the copy, soaking and blurring the text underneath. Calm scrolling never triggers it.",
    motion: "Three beats: the mug tips 104° around its base (520ms ease-in, so it accelerates), a short stream pours from the lip (from 380ms), then the stain grows out of the corner over 1.8s with a soft ease-out, slowing as it soaks in.",
    why: "Scroll is the most passive input on the web. Requiring real force before anything happens makes the consequence feel earned, and the stain lands on content, so the accident has a victim.",
    code: `<div id="desk">
  <article id="doc"><!-- heading bar, text lines, a figure --></article>
  <button id="mug" aria-label="Knock the coffee mug over"></button>
  <div id="stain"></div>
</div>

<style>
  #desk { position: relative; height: 340px; background: #d5c2a3; overflow: hidden; }
  #doc { position: absolute; inset: 34px 22% 26px 9%; padding: 26px; background: #fbfaf5; }
  #mug { position: absolute; top: 6px; right: calc(22% - 30px); width: 48px; height: 56px;
         background: #e84c30; border: 2px solid #121212; border-radius: 4px 4px 12px 12px;
         transform-origin: 85% 100%; transition: transform 520ms cubic-bezier(.5, 0, .9, .4); }
  #stain { position: absolute; top: 46px; right: calc(22% - 18px); width: 62%; height: 74%;
           border-radius: 58% 42% 63% 37% / 44% 61% 39% 56%;
           background: radial-gradient(ellipse at 74% 20%, rgba(170, 104, 48, .32) 0 40%,
             rgba(146, 84, 34, .44) 66%, rgba(104, 56, 20, .85) 76%, transparent 79%);
           mix-blend-mode: multiply; backdrop-filter: blur(1.6px); pointer-events: none;
           opacity: 0; transform: scale(.05); transform-origin: 82% 6%; }
  .spilled #mug { transform: rotate(-104deg) translate(10px, -6px); }
  .spilled #stain { animation: stain 1.8s 620ms cubic-bezier(.2, .7, .3, 1) forwards; }
  @keyframes stain { 20% { opacity: 1; } to { opacity: 1; transform: scale(1) rotate(-4deg); } }
</style>

<script>
  const desk = document.getElementById("desk");
  const spill = () => desk.classList.add("spilled");
  let visible = false, energy = 0, last = scrollY;

  new IntersectionObserver(([entry]) => (visible = entry.isIntersecting)).observe(desk);

  addEventListener("scroll", () => {
    const delta = Math.abs(scrollY - last);
    last = scrollY;
    if (delta > 1400) return;          // anchor jumps and Back are not flings
    energy = energy * 0.82 + delta;    // decays, so only sustained force builds up
    if (visible && energy > 520) spill();
  }, { passive: true });

  document.getElementById("mug").addEventListener("click", spill);
</script>`,
    steps: [
      ["Build the victim first", "Lay out a fake document: heading bar, text lines, a figure. The stain only means something if it lands on content."],
      ["Measure force, not distance", "Each scroll event adds its delta to an energy value that decays by 18% per event. Gentle scrolling levels off around 300; a fling crosses 520."],
      ["Only when it's watched", "An IntersectionObserver gates the trigger, so scrolling elsewhere never spills a mug you can't see. Single jumps over 1400px are ignored as programmatic (anchor links, Back)."],
      ["Soak, don't paint", "The stain is a radial gradient with a darker rim (the coffee-ring effect), multiply blending so the text shows through, and backdrop-filter blur so the copy underneath looks wet."],
      ["Give touch and keyboard a way in", "The mug is a real button. Clicking it spills too, which covers devices where a hard scroll is awkward."],
    ],
  },
  "04": {
    concept: "A security checkpoint for the cursor. Hovering the zone fires a laser scan, reveals the cursor's contents, and stamps it CLEARED.",
    motion: "A linear sweep with ease-in-out for the beam, followed by a stamp that scales down from 1.8x with a deliberate 900ms delay, like a hand coming down on paper.",
    why: "Borrowing a familiar bureaucratic ritual makes the joke instantly legible. The running crossing count rewards repeat visits.",
    code: `<div id="zone">
  <div id="beam"></div>
  <p id="readout">12 ANCHOR POINTS</p>
  <div id="stamp">CLEARED</div>
</div>

<style>
  #zone { position: relative; height: 200px; overflow: hidden; border: 1px dashed #121212; }
  #beam { position: absolute; top: 0; bottom: 0; left: -4%; width: 3px; background: #ff4b36;
          box-shadow: 0 0 14px #ff4b36; }
  #stamp { position: absolute; right: 10%; bottom: 15%; padding: 7px; color: #ff4b36;
           border: 3px solid; opacity: 0; transform: rotate(-12deg) scale(1.8); }
  .scanning #beam { animation: scan 1.1s ease-in-out; }
  .scanning #stamp { opacity: 1; transform: rotate(-12deg) scale(1); transition: 120ms 900ms; }
  @keyframes scan { 50%, 100% { left: 102%; } }
</style>

<script>
  const zone = document.getElementById("zone");
  const readout = document.getElementById("readout");
  let crossings = 0;
  zone.addEventListener("mouseenter", () => {
    crossings++;
    readout.textContent = crossings > 2 ? "47 OPEN TABS" : "12 ANCHOR POINTS";
    zone.classList.remove("scanning");
    void zone.offsetWidth;
    zone.classList.add("scanning");
    setTimeout(() => zone.classList.remove("scanning"), 1500);
  });
</script>`,
    steps: [
      ["Trigger on mouseenter", "mouseenter fires once per crossing, unlike mouseover, which bubbles and fires repeatedly."],
      ["Restart the animation on demand", "Remove the class, force a reflow with void zone.offsetWidth, then re-add it. Without the reflow the browser merges the changes and nothing replays."],
      ["Let the stamp lag behind the beam", "A 900ms transition delay means the stamp lands only after the beam has crossed the zone."],
      ["Escalate the joke with state", "A simple counter swaps the readout text after the third crossing, giving repeat visitors a surprise."],
    ],
  },
  "05": {
    concept: "A deadline note hangs from the nav on an elastic cord. Drag it away and the cord thins and pulls taut; past the limit it snaps, the note springs home, and FRIDAY, 5PM comes back as YESTERDAY.",
    motion: "Direct manipulation while dragging, then a per-frame damped spring on release (stiffness 0.14, damping 0.74), so the note overshoots home and settles. The cord is a quadratic curve whose sag falls from 70px to 0 and whose stroke thins from 3.2px to 0.8px as tension rises.",
    why: "The first version played a canned panic animation on click. Letting the visitor feel the resistance and cause the snap puts the punchline in their hand instead of on a timer.",
    code: `<div id="desk">
  <strong id="about">ABOUT</strong>
  <svg id="cord-svg"><path id="cord" /></svg>
  <button id="note"><small>DEADLINE</small><b id="when">FRIDAY, 5PM</b></button>
</div>

<style>
  #desk { position: relative; height: 372px; background: #1d1d1b; color: #fff; touch-action: none; }
  #about { position: absolute; top: 62px; left: 11%; font: 700 22px Manrope, sans-serif; }
  #cord-svg { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
  #cord { fill: none; stroke: #dfff00; stroke-dasharray: 6 6; stroke-linecap: round; }
  #note { position: absolute; padding: 14px 20px; border: 0; background: #dfff00; cursor: grab; }
  .late #note { background: #ff4b36; }
</style>

<script>
  const desk = document.getElementById("desk"), note = document.getElementById("note");
  const cord = document.getElementById("cord"), when = document.getElementById("when");
  const W = () => desk.clientWidth;
  const rest = () => ({ x: W() * 0.62, y: 96 });
  const anchor = () => ({ x: W() * 0.11 + 40, y: 92 });
  let off = { x: 0, y: 0 }, vel = { x: 0, y: 0 }, grab = null, raf;

  function draw() {
    const r = rest(), a = anchor(), n = { x: r.x + off.x, y: r.y + off.y };
    const len = Math.hypot(n.x - a.x, n.y - a.y), base = Math.hypot(r.x - a.x, r.y - a.y);
    const t = Math.min(1, Math.max(0, (len - base) / (W() * 0.72 - base)));
    note.style.left = n.x + "px";
    note.style.top = n.y + "px";
    cord.setAttribute("d", \`M\${a.x} \${a.y} Q \${(a.x + n.x) / 2} \${(a.y + n.y) / 2 + 70 * (1 - t)} \${n.x} \${n.y + 20}\`);
    cord.style.strokeWidth = 3.2 - t * 2.4;
    return len;
  }

  function springHome() {
    cancelAnimationFrame(raf);
    (function step() {
      vel.x = (vel.x - off.x * 0.14) * 0.74;
      vel.y = (vel.y - off.y * 0.14) * 0.74;
      off.x += vel.x;
      off.y += vel.y;
      draw();
      if (Math.abs(off.x) + Math.abs(off.y) + Math.abs(vel.x) + Math.abs(vel.y) > 0.4) raf = requestAnimationFrame(step);
    })();
  }

  note.addEventListener("pointerdown", (e) => {
    cancelAnimationFrame(raf);
    note.setPointerCapture(e.pointerId);
    const b = desk.getBoundingClientRect(), r = rest();
    grab = { dx: e.clientX - b.left - (r.x + off.x), dy: e.clientY - b.top - (r.y + off.y) };
  });

  note.addEventListener("pointermove", (e) => {
    if (!grab) return;
    const b = desk.getBoundingClientRect(), r = rest();
    off = { x: e.clientX - b.left - grab.dx - r.x, y: e.clientY - b.top - grab.dy - r.y };
    vel = { x: 0, y: 0 };
    if (draw() > W() * 0.72) {           // overstretched: the cord gives
      grab = null;
      desk.classList.add("late");
      when.textContent = "YESTERDAY";
      setTimeout(() => { desk.classList.remove("late"); when.textContent = "FRIDAY, 5PM"; }, 2600);
      springHome();
    }
  });

  note.addEventListener("pointerup", () => { if (grab) { grab = null; springHome(); } });
  draw();
</script>`,
    steps: [
      ["Anchor the joke to the nav", "ABOUT is the anchor point and the note hangs from it, so the deadline is visibly tied to the site's structure."],
      ["Let the visitor hold it", "The note is a real button using pointer capture, so the drag keeps tracking even when the cursor slips off it."],
      ["Show tension, not just distance", "Tension maps the stretch between the rest length and the snap limit (72% of the stage width) to 0–1. The cord's sag and stroke width both follow it, so you can see it about to give."],
      ["Snap mid-drag", "Crossing the limit ends the drag on the spot. The visitor doesn't decide when it breaks; the material does."],
      ["Spring home by hand", "A few lines of per-frame spring (stiffness 0.14, damping 0.74) give a natural overshoot without an animation library."],
    ],
  },
  "06": {
    concept: "A living letter in a word. When the cursor approaches, the F wriggles free, flees to the ABOUT link, and the neighbours slump in its absence.",
    motion: "Springy overshoot easing (cubic-bezier .34, 1.56, .64, 1) on every letter, plus a looping breathing animation while the F is idle.",
    why: "Typography is usually static. A single idle animation tells the visitor this letter is alive before anything has been touched.",
    code: `<div id="word">
  <span>P</span><span>O</span><span>R</span><span>T</span>
  <span id="f">F</span>
  <span>O</span><span>L</span><span>I</span><span>O</span>
</div>

<style>
  #word { display: flex; font: 800 56px Manrope, sans-serif; letter-spacing: -.12em; }
  #word span { display: inline-block; transition: transform 500ms cubic-bezier(.34, 1.56, .64, 1); }
  #f { color: #ff4b36; animation: breathe 2s ease-in-out infinite; }
  @keyframes breathe { 50% { transform: scale(1.08) translateY(-2px); } }
  .escaped #f { animation: none; transform: translate(230px, 130px) rotate(22deg); opacity: 0; }
  .escaped span:nth-child(1) { transform: translateX(12px) rotate(5deg); }
  .escaped span:nth-child(4) { transform: translateY(13px) rotate(5deg); }
</style>

<script>
  const word = document.getElementById("word");
  word.addEventListener("mouseenter", () => word.classList.add("escaped"));
  word.addEventListener("mouseleave", () => word.classList.remove("escaped"));
</script>`,
    steps: [
      ["Give the star letter a name", "Wrap each letter in a span, and give the one that moves its own id so the animation targets it directly."],
      ["Loop a subtle idle animation", "A two-second scale and lift on the F is the only hint of life. When .escaped is added, animation: none lets the transform take over."],
      ["Use overshoot easing", "Control points above 1 (here 1.56) make the transform overshoot its target and settle back like a spring."],
      ["React in the neighbours", "Nudge a few of the other letters in the opposite direction so the word visibly reacts to the loss."],
    ],
  },
  "07": {
    concept: "A navigation bar that tolerates three clicks of rising pressure, then shatters into a layout earthquake on the fourth.",
    motion: "Seven different keyframes, one per letter, with offsets in alternating directions. A 1.5s forwards animation lets each letter jump and return to rest.",
    why: "Progressive disclosure of consequence. The pressure gauge teaches the rule, so the quake feels earned instead of random.",
    code: `<div id="quake">
  <div id="nav"></div>
  <small id="gauge">PRESSURE 0/4</small>
</div>

<style>
  #nav { display: flex; font: 700 64px Manrope, sans-serif; letter-spacing: -.07em; cursor: pointer; }
  #nav span { display: inline-block; }
  .quaking #nav span:nth-child(odd)  { animation: jolt-a 1.5s forwards; }
  .quaking #nav span:nth-child(even) { animation: jolt-b 1.5s forwards; }
  @keyframes jolt-a { 25% { transform: translate(-10px, 30px) rotate(-14deg); } 75% { transform: none; } }
  @keyframes jolt-b { 30% { transform: translate(8px, -40px) rotate(9deg); } 80% { transform: none; } }
</style>

<script>
  const quake = document.getElementById("quake");
  const nav = document.getElementById("nav");
  const gauge = document.getElementById("gauge");
  nav.innerHTML = [..."WORK ABOUT NOTES"].map((c) => "<span>" + (c === " " ? "&nbsp;" : c) + "</span>").join("");
  let pressure = 0;
  nav.addEventListener("click", () => {
    pressure++;
    if (pressure >= 4) {
      pressure = 0;
      quake.classList.add("quaking");
      gauge.textContent = "RECALIBRATING";
      setTimeout(() => { quake.classList.remove("quaking"); gauge.textContent = "PRESSURE 0/4"; }, 1800);
    } else {
      gauge.textContent = "PRESSURE " + pressure + "/4";
    }
  });
</script>`,
    steps: [
      ["Count clicks as pressure", "A plain integer in memory. Show it in a gauge so the visitor can see the threshold approaching."],
      ["Split the nav into letters", "Generate one span per character so each can have its own offset. Replace spaces with non-breaking spaces so they keep their width."],
      ["Fan out the keyframes", "Alternate odd and even letters between two animations (more in the full version) with different directions and rotations. Chaos looks organic when it is not uniform."],
      ["Let every letter return home", "Each keyframe returns to none at 75 to 85%, so the layout always recovers exactly where it started."],
    ],
  },
  "08": {
    concept: "A ceiling fan whose blade speed is driven by how fast the visitor scrolls. At high speed the menu and a sticky note get blown around.",
    motion: "A continuous rotation whose duration is mapped from scroll velocity, plus spring-eased displacement on the menu items once a wind threshold is passed.",
    why: "Input becomes weather. The visitor controls a physical-feeling system just by doing what they were already doing.",
    code: `<div id="room">
  <div id="fan"><i></i><i></i><i></i></div>
  <nav id="menu"><span>WORK</span><span>ABOUT</span><span>CONTACT</span></nav>
</div>

<style>
  #fan { width: 170px; height: 170px; position: relative; animation: spin var(--speed, 2.2s) linear infinite; }
  #fan i { position: absolute; top: 71px; left: 85px; width: 73px; height: 28px; background: #121212;
           border-radius: 50% 100% 30% 50%; transform-origin: 0 50%; }
  #fan i:nth-child(2) { transform: rotate(120deg); }
  #fan i:nth-child(3) { transform: rotate(240deg); }
  @keyframes spin { to { transform: rotate(360deg); } }
  #menu { display: flex; justify-content: space-between; font: 12px "DM Mono", monospace; }
  #menu span { transition: transform 500ms cubic-bezier(.2, .8, .2, 1); }
  #menu.windy span:nth-child(1) { transform: translate(15px, -8px) rotate(9deg); }
  #menu.windy span:nth-child(2) { transform: translate(34px, 5px) rotate(-6deg); }
  #menu.windy span:nth-child(3) { transform: translate(70px, -13px) rotate(12deg); }
</style>

<script>
  const fan = document.getElementById("fan");
  const menu = document.getElementById("menu");
  let last = scrollY, decay;
  addEventListener("scroll", () => {
    const energy = Math.min(20, Math.abs(scrollY - last));
    last = scrollY;
    fan.style.setProperty("--speed", Math.max(0.16, 2.2 - energy / 18) + "s");
    menu.classList.toggle("windy", energy > 6);
    clearTimeout(decay);
    decay = setTimeout(() => {
      fan.style.setProperty("--speed", "2.2s");
      menu.classList.remove("windy");
    }, 180);
  }, { passive: true });
</script>`,
    steps: [
      ["Compute a clamped scroll energy", "The difference between two scrollY readings, capped at 20, keeps a violent flick from producing nonsense values."],
      ["Map energy to animation duration", "Subtract energy / 18 from the base 2.2s and floor it at 0.16s. A shorter duration is a faster spin."],
      ["Write it to a CSS variable", "The animation reads var(--speed), so JavaScript only changes a number and never touches keyframes."],
      ["Decay back to calm", "A 180ms debounce resets the speed and wind state shortly after scrolling stops, so the fan always winds back down."],
    ],
  },
  "09": {
    concept: "The nav sits in a row above a small black hole. As the cursor approaches the event horizon, each link is pulled along its own path toward it, stretching as it falls, until the whole menu is gone and the signal is lost.",
    motion: "Pull is 1 minus the cursor's distance to the hole divided by 42% of the stage width, then squared, so the fall starts slowly and accelerates. Each link travels up to 90% of the way along its own vector, stretching to 2.6× along it and thinning to 0.25× across it.",
    why: "Stretching along the direction of travel, rather than a flat squash, sells the gravity. Keeping the hole below the nav means nothing overlaps at rest; the original version placed the core right on top of ABOUT.",
    code: `<div id="field">
  <span class="link" data-x=".16">WORK</span>
  <span class="link" data-x=".5">ABOUT</span>
  <span class="link" data-x=".84">NOTES</span>
  <i id="hole"></i>
</div>

<style>
  #field { position: relative; height: 372px; color: #fff; overflow: hidden;
           background: radial-gradient(circle at 50% 70%, #333, #121212 58%); }
  .link { position: absolute; top: 24%; font: 700 21px Manrope, sans-serif; white-space: nowrap; }
  #hole { position: absolute; left: 50%; top: 70%; width: 52px; height: 52px; border: 2px solid #dfff00;
          border-radius: 50%; background: #000; transform: translate(-50%, -50%); }
</style>

<script>
  const field = document.getElementById("field"), hole = document.getElementById("hole");
  const links = [...field.querySelectorAll(".link")];
  const HOLE = { x: 0.5, y: 0.7 }, ROW = 0.24;

  function render(pull) {
    const w = field.clientWidth, h = field.clientHeight, fall = pull * pull;
    links.forEach((link) => {
      const x = +link.dataset.x, dx = (HOLE.x - x) * w, dy = (HOLE.y - ROW) * h;
      const a = Math.atan2(dy, dx);
      link.style.left = x * 100 + "%";
      link.style.opacity = 1 - fall * 0.85;
      link.style.transform = \`translate(-50%, -50%) translate(\${dx * fall * 0.9}px, \${dy * fall * 0.9}px)
        rotate(\${a}rad) scale(\${1 + fall * 1.6}, \${1 - fall * 0.75}) rotate(\${-a}rad)\`;
    });
    hole.style.transform = \`translate(-50%, -50%) scale(\${1 + pull * 0.6})\`;
  }

  field.addEventListener("pointermove", (e) => {
    const b = field.getBoundingClientRect();
    const d = Math.hypot(e.clientX - b.left - b.width * HOLE.x, e.clientY - b.top - b.height * HOLE.y);
    render(Math.min(1, Math.max(0, 1 - d / (b.width * 0.42))));
  });
  field.addEventListener("pointerleave", () => render(0));
  render(0);
</script>`,
    steps: [
      ["Separate the nav from the hole", "Links sit in a row at 24% of the height and the hole at 70%. Nothing overlaps at rest, so the core can never sit on top of ABOUT again."],
      ["Measure pull from the hole, not the stage", "Distance from the cursor to the hole, normalised against 42% of the stage width and clamped to 0–1."],
      ["Square it", "fall = pull². Gravity should feel gentle at the edge of the field and violent near the centre."],
      ["Stretch along the fall line", "rotate(angle) scale(x, y) rotate(-angle) stretches each link along its own vector toward the hole: spaghettification rather than a flat squash."],
      ["Report the loss", "Above 92% pull the status line reads SIGNAL LOST, so the joke has words as well as motion."],
    ],
  },
  "10": {
    concept: "A crooked menu cordoned off with caution tape. Call the crew and two workers walk out, unroll a tape measure and straighten the nav; then the tape tears and falls away and a sign asks you not to touch. Touch it, and it breaks again.",
    motion: "Three states. Repairing lasts 1.9s: the workers walk in steps(2) to the ends of the rule, the tape measure unrolls to 68% and rewinds, and the nav straightens after an 800ms delay with a slight overshoot. When fixed, the two halves of the tape swing down from the middle and fade.",
    why: "The caution tape was the missing piece of the original design: without it nothing showed that the menu was off-limits. A loop of break, repair and break again turns a one-shot gag into something visitors play with.",
    code: `<button id="site" class="broken">
  <nav id="nav"><span>WORK</span><span>ABOUT</span><span>INFO</span></nav>
  <i id="measure"></i>
  <div id="tape">
    <span><b>CAUTION · BREAKPOINT UNDER REPAIR · CAUTION · BREAKPOINT UNDER REPAIR ·</b></span>
    <span><b>CAUTION · BREAKPOINT UNDER REPAIR · CAUTION · BREAKPOINT UNDER REPAIR ·</b></span>
  </div>
  <span id="sign">⚠ WORK IN PROGRESS</span>
</button>

<style>
  #site { position: relative; width: 100%; height: 372px; border: 0; background: #d8d7cf; overflow: hidden; }
  #nav { position: absolute; top: 74px; left: 16%; right: 16%; display: flex; justify-content: space-between;
         font: 700 56px Manrope, sans-serif; }
  #nav span { transition: transform 900ms cubic-bezier(.34, 1.3, .64, 1); }
  .broken #nav span:nth-child(1) { transform: translateY(-14px) rotate(-1.5deg); }
  .broken #nav span:nth-child(2) { transform: translateY(14px) rotate(1deg); }
  .broken #nav span:nth-child(3) { transform: translateY(-20px) rotate(-5deg); }
  .repairing #nav span { transition-delay: 800ms; }
  #measure { position: absolute; top: 152px; left: 16%; width: 0; height: 10px; background: #ffd23f; }
  .repairing #measure { animation: measure 1.9s ease-in-out; }
  @keyframes measure { 55%, 80% { width: 68%; } }
  #tape { position: absolute; top: 214px; left: -4%; right: -4%; display: flex; transform: rotate(-3deg); }
  #tape span { flex: 1; overflow: hidden; transition: transform 700ms, opacity 500ms 300ms;
               background: repeating-linear-gradient(-45deg, #ffd23f 0 14px, #121212 14px 28px); }
  #tape b { display: block; width: max-content; background: #ffd23f; font: 10px "DM Mono", monospace;
            animation: run 9s linear infinite; }
  @keyframes run { to { transform: translateX(-50%); } }
  #tape span:first-child { transform-origin: 0 50%; }
  #tape span:last-child { transform-origin: 100% 50%; }
  .fixed #tape span:first-child { transform: rotate(38deg); opacity: 0; }
  .fixed #tape span:last-child { transform: rotate(-38deg); opacity: 0; }
</style>

<script>
  const site = document.getElementById("site"), sign = document.getElementById("sign");
  site.addEventListener("click", () => {
    if (site.className === "repairing") return;
    if (site.className === "fixed") {
      site.className = "broken";
      sign.textContent = "⚠ WORK IN PROGRESS";
      return;
    }
    site.className = "repairing";
    setTimeout(() => {
      site.className = "fixed";
      sign.textContent = "PLEASE DON'T TOUCH";
    }, 1900);
  });
</script>`,
    steps: [
      ["Start broken, on purpose", "The default state carries the offsets and rotations; fixing the menu is just transform: none."],
      ["Cordon it off", "The caution tape is two halves in a flex row, each with hazard stripes and a scrolling text strip. Splitting it in two is what lets it tear in the middle later."],
      ["Make the repair causal", "The workers walk first, the tape measure unrolls, and only then (an 800ms transition delay) does the nav straighten. The fix arrives because the crew did something."],
      ["Tear and drop", "When fixed, each half swings down around its outer end and fades: the tape falls away instead of vanishing."],
      ["Close the loop", "Clicking a fixed menu breaks it again and re-hangs the tape. The sign told you not to touch it."],
    ],
  },
  "11": {
    concept: "A word that gets worse each time the visitor clicks. Letters jump, ghost outlines pile up, and a phantom cursor drifts in.",
    motion: "Springy transforms between four discrete steps, ghost layers at 42% opacity, and a frantic 500ms shake that repeats three times at the final step.",
    why: "A tiny state machine with four steps tells a complete story. The step number is encoded in a class name, which keeps the CSS declarative.",
    code: `<div id="undo" data-step="0">
  <div id="word"><span>W</span><span>O</span><span>R</span><span>K</span></div>
  <small id="status">CLICK TO MAKE A MISTAKE</small>
</div>

<style>
  #word { display: flex; font: 800 82px Manrope, sans-serif; letter-spacing: -.09em; cursor: pointer; }
  #word span { display: inline-block; transition: transform 450ms cubic-bezier(.34, 1.56, .64, 1); }
  [data-step="1"] #word span:nth-child(2) { transform: translateY(48px) rotate(18deg); }
  [data-step="1"] #word span:nth-child(4) { transform: translate(28px, -22px) rotate(-15deg); }
  [data-step="2"] #word span:nth-child(1) { transform: translate(-35px, 20px) rotate(-22deg); }
  [data-step="2"] #word span:nth-child(3) { transform: translate(16px, 58px) rotate(30deg); }
  [data-step="3"] #word span { animation: redo 500ms ease-in-out 3; }
  @keyframes redo { 25% { transform: translate(-8px, 12px) rotate(-8deg); } 60% { transform: translate(11px, -9px) rotate(7deg); } }
</style>

<script>
  const undo = document.getElementById("undo");
  const status = document.getElementById("status");
  const labels = ["CLICK TO MAKE A MISTAKE", "UNDO HISTORY / 01", "UNDO HISTORY / 02", "REDOING EVERYTHING"];
  let step = 0;
  undo.addEventListener("click", () => {
    step = (step + 1) % 4;
    undo.dataset.step = step;
    status.textContent = labels[step];
  });
</script>`,
    steps: [
      ["Model the experience as four steps", "A counter that wraps with modulo 4. Step 0 is the clean state, so the cycle always returns to the start."],
      ["Drive CSS from a data attribute", "Writing dataset.step lets attribute selectors choose each letter's pose. No per-step JavaScript animation code is needed."],
      ["Use spring easing for mistakes", "Overshoot makes letters pop out of place instead of sliding, which sells the glitch."],
      ["Save the panic for the end", "The last step swaps transitions for a repeating keyframe animation, a different kind of motion that signals things have escalated."],
    ],
  },
  "12": {
    concept: "A fake browser tab where the logo is asleep and the menu has wandered off. Click to catch it, and everything snaps to attention.",
    motion: "Resting poses are deliberately wrong (rotated 90 degrees, displaced 110px). A quick 250ms spring snaps everything upright on catch.",
    why: "The humour comes from a short response time. Immediate correction is what makes it feel like being caught.",
    code: `<div id="tab">
  <div id="logo">F</div>
  <nav id="nav"><span>ABOUT</span><span>WORK</span><span>CONTACT</span></nav>
  <small id="status">CLICK TO RETURN TO THE TAB</small>
</div>

<style>
  #tab { position: relative; height: 220px; background: #abc2ed; cursor: pointer; overflow: hidden; }
  #logo { position: absolute; top: 38%; left: 50%; font: 800 84px Manrope, sans-serif;
          transform: translate(-50%, -50%) rotate(90deg);
          transition: transform 250ms cubic-bezier(.34, 1.56, .64, 1); }
  #nav { position: absolute; left: 11%; right: 11%; bottom: 22%; display: flex; justify-content: space-between;
         font: 10px "DM Mono", monospace; }
  #nav span { transition: transform 250ms; }
  #nav span:first-child { transform: translateX(110px); }
  #nav span:nth-child(2) { transform: translateX(-95px); }
  #nav span:last-child { transform: rotate(180deg); }
  .caught #logo { transform: translate(-50%, -50%) rotate(0); }
  .caught #nav span { transform: none; }
</style>

<script>
  const tab = document.getElementById("tab");
  const status = document.getElementById("status");
  tab.addEventListener("click", () => {
    tab.classList.add("caught");
    status.textContent = "ACT NATURAL.";
    setTimeout(() => { tab.classList.remove("caught"); status.textContent = "CLICK TO RETURN TO THE TAB"; }, 2200);
  });
</script>`,
    steps: [
      ["Make the default state the lazy one", "Rotate and displace the elements in the base CSS. The caught state is just clearing those transforms."],
      ["Keep the transition fast", "250ms is quick enough to feel like a startled reaction. Slower would feel like an animation, faster would read as a flicker."],
      ["Change the copy too", "Swap the status text to ACT NATURAL. Small copy changes double the comedy of a visual one."],
      ["Reset after a pause", "A 2.2s timeout restores the slacking state so the joke can be played repeatedly."],
    ],
  },
  "13": {
    concept: "A horseshoe magnet that follows the cursor and pushes each letter of MAGNETIC away, re-kerning the word in real time.",
    motion: "Continuous, distance-based displacement with a very short 90ms linear transition. It smooths mouse jitter without adding perceptible lag.",
    why: "It makes an abstract typographic idea (kerning) physical. The falloff formula ensures only nearby letters react.",
    code: `<div id="word"><span>M</span><span>A</span><span>G</span><span>N</span><span>E</span><span>T</span><span>I</span><span>C</span></div>

<style>
  #word { display: flex; font: 800 96px Manrope, sans-serif; letter-spacing: -.1em; }
  #word span { display: inline-block; transition: transform 90ms linear; }
</style>

<script>
  const word = document.getElementById("word");
  const spans = [...word.children];
  word.addEventListener("mousemove", (e) => {
    const box = word.getBoundingClientRect();
    const mouse = ((e.clientX - box.left) / box.width) * 100;
    spans.forEach((s, i) => {
      const distance = (i / (spans.length - 1)) * 100 - mouse;
      const push = Math.abs(distance) < 25 ? Math.sign(distance) * (25 - Math.abs(distance)) * 1.4 : 0;
      s.style.transform = "translateX(" + push + "px)";
    });
  });
  word.addEventListener("mouseleave", () => spans.forEach((s) => (s.style.transform = "")));
</script>`,
    steps: [
      ["Normalize everything to percentages", "Convert the mouse X and each letter's position into a 0 to 100 scale so the maths ignores pixel sizes."],
      ["Apply a linear falloff", "Within a 25-unit radius the push equals (25 - distance) x 1.4. It is strongest next to the magnet and fades to zero at the edge."],
      ["Push away from the magnet", "Math.sign(distance) sends letters left when they are left of the cursor and right when they are right of it."],
      ["Smooth with a tiny transition", "90ms of linear easing is just enough to blend the discrete mousemove events into continuous motion."],
    ],
  },
  "14": {
    concept: "A WORK link that enters one portal and emerges from another, having routed through /about on the way.",
    motion: "Entry squashes the link to 12% width before scaling it to zero (a stretch-into-the-portal effect). Exit begins 700ms later with the reverse curve.",
    why: "Splitting one trip into two separately animated halves, with a pause between, is what makes the teleport convincing.",
    code: `<div id="space">
  <div class="portal left"></div>
  <div class="portal right"></div>
  <div id="from">WORK</div>
  <div id="to">WORK</div>
</div>

<style>
  #space { position: relative; height: 220px; background: #181820; cursor: pointer; overflow: hidden; }
  .portal { position: absolute; top: 20%; width: 76px; height: 150px; border: 3px solid #4967ff;
            border-radius: 50%; box-shadow: 0 0 25px rgba(73, 103, 255, .75); }
  .left { left: 7%; } .right { right: 7%; border-color: #dfff00; box-shadow: 0 0 25px rgba(223, 255, 0, .55); }
  #from, #to { position: absolute; top: 38%; color: #fbfaf5; font: 800 35px Manrope, sans-serif; }
  #from { left: 18%; } #to { right: 18%; opacity: 0; }
  .go #from { animation: enter 1.2s cubic-bezier(.5, 0, 1, .5) forwards; }
  .go #to   { animation: leave 1.2s 700ms cubic-bezier(0, .5, .5, 1) forwards; }
  @keyframes enter { 60% { transform: translateX(-70px) scaleX(.12); } 100% { transform: translateX(-70px) scale(0); opacity: 0; } }
  @keyframes leave { 0% { transform: translateX(65px) scale(0); opacity: 0; } 100% { transform: none; opacity: 1; } }
</style>

<script>
  const space = document.getElementById("space");
  space.addEventListener("click", () => {
    space.classList.add("go");
    setTimeout(() => space.classList.remove("go"), 1900);
  });
</script>`,
    steps: [
      ["Use two copies of the same link", "One element leaves, a second one arrives. Teleportation is just two coordinated animations."],
      ["Squash before vanishing", "Scaling X down first makes the link look like it is being sucked through a narrow gap, then scale(0) finishes the disappearance."],
      ["Offset the arrival", "A 700ms animation-delay on the exit overlaps slightly with the end of the entry, giving a believable handoff."],
      ["Mirror the easing", "Ease-in on the way in and ease-out on the way out make the path feel like one continuous motion."],
    ],
  },
  "15": {
    concept: "A pixel pet follows a trail of crumbs left by the cursor. Lead it over a nav link and it eats the link: it chomps, announces what it swallowed, and spits it back a few seconds later. Feed it all three and it gets full first.",
    motion: "The pet eases 8% of the way to the next crumb every frame. A chomp is two steps(2) snaps of the mouth (190ms each). Eaten links shrink and spin out in 260ms and come back on an overshoot curve, cubic-bezier(.2, 1.8, .4, 1). When full, the pet swells in three steps and shuts its eyes for 2.2s.",
    why: "The original pet ate crumbs and nothing else, so the nav labels were set dressing. Letting it eat the navigation closes the loop: the visitor's trail becomes a way to steer, and steering has a consequence.",
    code: `<div id="field">
  <nav><span>WORK</span><span>TRAIL</span><span>CONTACT</span></nav>
  <div id="pet"><i></i><i></i><b></b></div>
</div>

<style>
  #field { position: relative; height: 372px; background: #f3c64a; overflow: hidden; cursor: crosshair; }
  nav { position: absolute; top: 50px; left: 8%; right: 8%; display: flex; justify-content: space-between;
        font: 10px "DM Mono", monospace; pointer-events: none; }
  nav span { padding: 6px 8px; border: 1px solid; background: #fbfaf5; transition: transform 260ms, opacity 200ms; }
  nav span.eaten { opacity: 0; transform: scale(.2) rotate(-25deg); }
  .crumb { position: absolute; width: 6px; height: 6px; margin: -3px; background: #121212; pointer-events: none; }
  #pet { position: absolute; top: 0; left: 0; width: 86px; height: 66px; background: #4967ff; pointer-events: none; }
  #pet b { position: absolute; left: 33px; top: 44px; width: 20px; height: 4px; background: #121212; }
  #pet.chomp b { animation: chomp 190ms steps(2) 2; }
  @keyframes chomp { 50% { height: 16px; } }
</style>

<script>
  const field = document.getElementById("field"), pet = document.getElementById("pet");
  const links = [...field.querySelectorAll("nav span")];
  const eaten = new Set(), crumbs = [];
  const p = { x: field.clientWidth / 2, y: field.clientHeight * 0.62 };
  let last = 0;

  field.addEventListener("pointermove", (e) => {
    if (performance.now() - last < 90) return;
    last = performance.now();
    const b = field.getBoundingClientRect(), crumb = document.createElement("i");
    crumb.className = "crumb";
    crumb.x = e.clientX - b.left;
    crumb.y = e.clientY - b.top;
    crumb.style.left = crumb.x + "px";
    crumb.style.top = crumb.y + "px";
    field.appendChild(crumb);
    crumbs.push(crumb);
    if (crumbs.length > 14) crumbs.shift().remove();
  });

  function eat(i) {
    eaten.add(i);
    links[i].classList.add("eaten");
    pet.classList.add("chomp");
    setTimeout(() => pet.classList.remove("chomp"), 380);
    setTimeout(() => { eaten.delete(i); links[i].classList.remove("eaten"); }, 5500);
  }

  (function tick() {
    const target = crumbs[0];
    if (target) {
      p.x += (target.x - p.x) * 0.08;
      p.y += (target.y - p.y) * 0.08;
      if (Math.hypot(target.x - p.x, target.y - p.y) < 22) crumbs.shift().remove();
    }
    const b = field.getBoundingClientRect();
    links.forEach((link, i) => {
      if (eaten.has(i)) return;
      const r = link.getBoundingClientRect();
      const cx = r.left - b.left + r.width / 2, cy = r.top - b.top + r.height / 2;
      if (Math.abs(p.x - cx) < r.width / 2 + 18 && Math.abs(p.y - cy) < r.height / 2 + 22) eat(i);
    });
    pet.style.transform = \`translate(\${p.x - 43}px, \${p.y - 33}px)\`;
    requestAnimationFrame(tick);
  })();
</script>`,
    steps: [
      ["Turn the trail into steering", "Crumbs drop at most every 90ms, capped at 14. The pet always heads for the oldest one, so the visitor draws the path it will walk."],
      ["Ease, don't teleport", "Each frame the pet covers 8% of the remaining distance: fast when far, careful when close, which reads as an animal sniffing its way along."],
      ["Hit-test the links", "Every frame, compare the pet's centre with each link's box, padded by 18px and 22px. Overlap means dinner."],
      ["Close the loop", "An eaten link shrinks out, the status line announces it, and it is spat back 5.5s later with a springy overshoot. A 3s grace period stops the pet re-eating a link it is still standing on."],
      ["Reward the completionist", "Eat all three before any come back and the pet swells, shuts its eyes, reports NAVIGATION DIGESTED, then returns everything at once."],
    ],
  },
  "16": {
    concept: "A single switch revokes gravity. The header flips, links tumble off the page, and the floor jumps to the ceiling.",
    motion: "Long, differently timed transitions (700 to 900ms) with large rotations. Letting elements fall at slightly different speeds avoids a rigid, mechanical look.",
    why: "It literally breaks the fourth wall of layout: the DOM is shown as objects subject to rules that the visitor can revoke.",
    code: `<div id="room">
  <button id="switch">GRAVITY / ON</button>
  <header id="header"><strong>STUDIO</strong><nav><span>WORK</span><span>ABOUT</span><span>INFO</span></nav></header>
  <div id="floor">TOP OF PAGE</div>
</div>

<style>
  #room { position: relative; height: 320px; overflow: hidden; background: #c8d3c1; transition: background 500ms; }
  #header { position: absolute; left: 7%; right: 7%; top: 42%; display: flex; justify-content: space-between;
            border-bottom: 2px solid; transition: transform 800ms cubic-bezier(.4, 0, .2, 1); }
  #header span { display: inline-block; margin-left: 28px; transition: transform 900ms cubic-bezier(.5, 0, 1, .5); }
  #floor { position: absolute; left: 0; right: 0; bottom: 0; height: 27px; background: #121212; color: #fbfaf5;
           text-align: center; transition: transform 700ms; }
  .off { background: #b8b1dc; }
  .off #header { transform: translateY(-175px) rotate(180deg); }
  .off #header span:nth-child(1) { transform: translateY(320px) rotate(-160deg); }
  .off #header span:nth-child(2) { transform: translateY(275px) rotate(130deg); }
  .off #header span:nth-child(3) { transform: translateY(350px) rotate(-90deg); }
  .off #floor { transform: translateY(-360px) rotate(180deg); }
</style>

<script>
  const room = document.getElementById("room");
  const toggle = document.getElementById("switch");
  toggle.addEventListener("click", () => {
    const off = room.classList.toggle("off");
    toggle.textContent = off ? "GRAVITY / OFF" : "GRAVITY / ON";
  });
</script>`,
    steps: [
      ["Treat gravity as a boolean", "A single toggled class holds the state. Everything else is CSS reacting to it."],
      ["Give every body its own fall", "Links get different distances, rotations, and directions so they do not fall in lockstep."],
      ["Flip the container, not just the contents", "Rotating the header 180 degrees while lifting it makes the whole layout feel like it was inverted rather than merely moved."],
      ["Make it reversible", "Because the state lives in a class, a second click returns every transform to its default and the transitions run backwards."],
    ],
  },
};
