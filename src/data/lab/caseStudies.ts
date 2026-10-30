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
    concept: "A coffee cup sits on the page until the visitor scrolls with enough force to tip it. Coffee puddles and drips while the cup lies on its side.",
    motion: "A staged sequence: the cup tips first (600ms), the puddle spreads after a 300ms delay, and the drips fall last with staggered delays. Choreographed delays make one class change read as cause and effect.",
    why: "Scroll is the most passive input there is. Tying consequence to its velocity makes a normally invisible gesture feel physical.",
    code: `<div id="scene">
  <div id="cup"></div>
  <div id="puddle"></div>
  <span class="drip" style="left:49%"></span>
  <span class="drip" style="left:58%; --d: 820ms"></span>
</div>

<style>
  #scene { position: relative; height: 320px; background: #d6c3a6; }
  #cup { position: absolute; top: 22%; left: 49%; width: 130px; height: 170px; background: #e94e34;
         border: 2px solid #121212; border-radius: 6px 6px 28px 28px;
         transform: rotate(-3deg); transform-origin: 80% 90%;
         transition: transform 600ms cubic-bezier(.4, 0, 1, 1); }
  #puddle { position: absolute; top: 62%; left: 58%; width: 10px; height: 10px; background: #5b321f;
            border-radius: 50%; transition: all 900ms 300ms; }
  .drip { position: absolute; top: 68%; width: 9px; height: 0; background: #5b321f;
          border-radius: 0 0 10px 10px; transition: height 1s var(--d, 650ms); }
  .spilling #cup { transform: rotate(72deg) translate(15px, 15px); }
  .spilling #puddle { width: 270px; height: 80px; transform: translate(-90px, 0) rotate(7deg); }
  .spilling .drip { height: 120px; }
</style>

<script>
  const scene = document.getElementById("scene");
  let last = scrollY, reset;
  addEventListener("scroll", () => {
    const speed = Math.abs(scrollY - last);
    last = scrollY;
    if (speed <= 3) return;
    scene.classList.add("spilling");
    clearTimeout(reset);
    reset = setTimeout(() => scene.classList.remove("spilling"), 3200);
  }, { passive: true });
</script>`,
    steps: [
      ["Measure scroll speed, not position", "Store the previous scrollY and compare it on each event. The difference is a cheap velocity, and it filters out slow, gentle scrolling."],
      ["Apply one class to the whole scene", "A single .spilling class drives every part of the animation. The JavaScript stays tiny while CSS owns the choreography."],
      ["Stage the sequence with transition delays", "The puddle waits 300ms and the drips wait 650ms or longer, so everything plays in order from one trigger."],
      ["Keep the state alive long enough", "The reset timer is 3200ms, comfortably longer than the slowest transition (about 2s). Clearing and re-arming it on every fast scroll keeps the spill on screen while the visitor keeps scrolling."],
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
    concept: "A deadline tag tethered to the nav by an elastic cord. Click it and the cord overstretches, snaps, and the deadline mutates into YESTERDAY.",
    motion: "Overshoot and recoil: the tag lurches forward 45px, whips back 220px, then settles. The cord stretches to 1.3x before collapsing.",
    why: "Tension is a universal visual metaphor. Letting it break, instead of just bouncing, gives the piece a punchline.",
    code: `<div id="deadline">
  <svg viewBox="0 0 300 80" preserveAspectRatio="none">
    <path id="cord" d="M8 42 C80 4 198 80 282 28" />
  </svg>
  <div id="tag"><small>DEADLINE</small><b id="when">FRIDAY, 5PM</b></div>
</div>

<style>
  #deadline { position: relative; height: 200px; background: #1d1d1b; overflow: hidden; cursor: pointer; }
  #cord { fill: none; stroke: #dfff00; stroke-width: 2; stroke-dasharray: 4 4; }
  #tag { position: absolute; right: 6%; top: 24%; padding: 16px 20px; background: #dfff00;
         transform: rotate(5deg); }
  .panic #tag  { animation: snap 1.2s cubic-bezier(.5, 0, 1, 1) forwards; }
  .panic #cord { animation: cord 700ms ease-out; transform-origin: left; }
  @keyframes snap {
    35%  { transform: translateX(45px) rotate(12deg); }
    50%  { transform: translate(-220px, 60px) rotate(-50deg); }
    100% { transform: translateX(0) rotate(5deg); }
  }
  @keyframes cord { 50% { transform: scaleX(1.3); } 70% { transform: scaleX(.2); opacity: 0; } }
</style>

<script>
  const box = document.getElementById("deadline");
  const when = document.getElementById("when");
  box.addEventListener("click", () => {
    box.classList.add("panic");
    when.textContent = "YESTERDAY";
    setTimeout(() => {
      box.classList.remove("panic");
      when.textContent = "FRIDAY, 5PM";
    }, 2200);
  });
</script>`,
    steps: [
      ["Draw the cord as an SVG path", "A cubic Bezier with a dashed stroke looks like stitched elastic and scales to any width with preserveAspectRatio set to none."],
      ["Animate the tag with keyframes", "Percentages define the beats: lurch at 35%, whip at 50%, settle at 100%. Rotation changes sell the sense of weight."],
      ["Animate the cord in sync", "Scale it on X up to 1.3 and then below 0.2 with fading opacity, timed so the snap lands exactly when the tag whips back."],
      ["Reset with a timer", "A setTimeout that matches the total duration removes the class and restores the copy so the piece is replayable."],
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
    concept: "Navigation items orbiting a tiny black hole. Entering the field makes the event horizon swell and the links stretch and fade into it.",
    motion: "Different orbital periods (1.2s and 1.8s), a scale-up on the horizon with ease-out, and links squashed on the X axis to fake gravitational stretching.",
    why: "Squashing instead of just fading communicates direction and force, so the menu looks pulled rather than merely hidden.",
    code: `<div id="field">
  <div id="hole"></div>
  <nav id="links"><span>WORK</span><span>ABOUT</span><span>NOTES</span></nav>
</div>

<style>
  #field { position: relative; height: 240px; background: radial-gradient(circle, #313131, #151515 52%); }
  #hole { position: absolute; top: calc(44% - 27px); left: calc(50% - 27px); width: 55px; height: 55px;
          background: #000; border: 2px solid #dfff00; border-radius: 50%;
          box-shadow: 0 0 28px rgba(223, 255, 0, .3); transition: transform 900ms cubic-bezier(.2, .8, .2, 1); }
  #links { position: absolute; left: 7%; right: 7%; top: 41%; display: flex; justify-content: space-between;
           color: #fbfaf5; font: 700 22px Manrope, sans-serif; }
  #links span { transition: transform 1s cubic-bezier(.5, 0, 1, .5), opacity 1s; }
  .active #hole { transform: scale(1.6); }
  .active #links span:first-child { transform: translate(110px, 12px) scaleX(.2); opacity: .2; }
  .active #links span:nth-child(2) { transform: scaleX(.1); opacity: 0; }
  .active #links span:last-child { transform: translate(-110px, -9px) scaleX(.2); opacity: .2; }
</style>

<script>
  const field = document.getElementById("field");
  field.addEventListener("mouseenter", () => field.classList.add("active"));
  field.addEventListener("mouseleave", () => field.classList.remove("active"));
</script>`,
    steps: [
      ["Build the singularity", "A black circle with an acid border and a soft box-shadow glow sits on a radial gradient that darkens toward the middle."],
      ["Orbit with rotated containers", "Each orbit is an ellipse that rotates around its centre with a small dot on its edge. Different speeds make them feel independent."],
      ["Pull links inward", "Translate each link toward the centre and compress it on X. Use ease-in so the motion accelerates as it falls in."],
      ["Toggle everything with one class", "mouseenter and mouseleave add and remove .active, so the whole effect is reversible and cheap."],
    ],
  },
  "10": {
    concept: "A crooked menu and a crew that emerges from the browser chrome to fix it. Click to interrupt them and they measure, straighten, and put up a warning sign.",
    motion: "Workers slide apart on a 700ms transition, the tape measure stretches to 1.7x, and the menu items snap to alignment only after a 700ms delay.",
    why: "It acknowledges the interface as an object built by people. Delaying the fix until the workers arrive makes the sequence feel causal.",
    code: `<div id="site">
  <nav id="nav"><span>WORK</span><span>ABOUT</span><span>INFO</span></nav>
  <div id="sign">DO NOT TOUCH</div>
</div>

<style>
  #site { position: relative; height: 220px; background: #d8d8d1; cursor: pointer; }
  #nav { display: flex; justify-content: space-between; padding: 80px 17% 0; border-bottom: 2px solid #121212;
         font: 700 48px Manrope, sans-serif; }
  #nav span:nth-child(2) { transform: translateY(13px); }
  #nav span:nth-child(3) { transform: rotate(4deg); display: inline-block; }
  .repairing #nav span { transform: none; transition: transform 800ms 700ms cubic-bezier(.2, .8, .2, 1); }
  #sign { position: absolute; right: 12%; bottom: 11%; padding: 8px 12px; background: #dfff00;
          border: 1px solid; opacity: 0; transform: rotate(-5deg) translateY(20px); }
  .repairing #sign { opacity: 1; transform: rotate(-5deg); transition: 300ms 200ms; }
</style>

<script>
  const site = document.getElementById("site");
  site.addEventListener("click", () => {
    site.classList.add("repairing");
    setTimeout(() => site.classList.remove("repairing"), 2600);
  });
</script>`,
    steps: [
      ["Start from an intentionally broken layout", "Apply odd offsets and rotations to the menu items in the default state. The fix is the transform going to none."],
      ["Delay the fix", "The transition-delay of 700ms on the repairing state keeps the nav crooked until the workers have visibly arrived."],
      ["Animate props as simple CSS shapes", "Workers are built from three positioned elements each (hard hat, body, legs), so no image assets are needed."],
      ["Announce the intervention", "The warning sign fades and rises in with a 200ms delay. It is the cue that the exhibit has noticed the visitor."],
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
    concept: "A pixel pet follows the visitor's cursor, which leaves a trail of crumbs behind that gradually shrink and vanish.",
    motion: "A stepped hop and chew (steps(2)) for chunky retro motion, plus crumbs that hold for 65% of their life and then shrink and rotate away.",
    why: "Using stepped animations gives the pet a different tempo from the smooth crumbs. That contrast sells the pixel-art character.",
    code: `<div id="field"><div id="pet"></div></div>

<style>
  #field { position: relative; height: 240px; background: #f2c94c; overflow: hidden; }
  #pet { position: absolute; top: 42%; left: 50%; width: 65px; height: 55px; background: #4967ff;
         box-shadow: -10px 10px 0 #4967ff, 10px 10px 0 #4967ff; transform: translate(-50%, -50%);
         animation: hop 1.1s steps(2) infinite; }
  .crumb { position: absolute; width: 6px; height: 6px; background: #121212; pointer-events: none;
           animation: fade 3s forwards; }
  @keyframes hop { 50% { transform: translate(-50%, calc(-50% - 8px)); } }
  @keyframes fade { 0%, 65% { opacity: 1; transform: none; } 100% { opacity: 0; transform: scale(0) rotate(90deg); } }
</style>

<script>
  const field = document.getElementById("field");
  let n = 0;
  field.addEventListener("mousemove", (e) => {
    if (n++ % 3) return;
    const box = field.getBoundingClientRect();
    const crumb = document.createElement("span");
    crumb.className = "crumb";
    crumb.style.left = e.clientX - box.left + "px";
    crumb.style.top = e.clientY - box.top + "px";
    crumb.addEventListener("animationend", () => crumb.remove());
    field.appendChild(crumb);
  });
</script>`,
    steps: [
      ["Throttle the trail", "Only every third mousemove creates a crumb. Without throttling you would spawn hundreds of nodes per second."],
      ["Position crumbs in local coordinates", "Subtract the container's bounding box from the pointer position so crumbs stay in the right place wherever the card sits."],
      ["Clean up automatically", "Listen for animationend and remove the node, so the DOM never accumulates stale crumbs."],
      ["Use steps() for retro motion", "steps(2) turns a smooth hop into two discrete frames, instantly giving the pet a pixel-art feel."],
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
