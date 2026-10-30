import {
  CSSProperties,
  PointerEvent as ReactPointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/** Pointer position inside an element, in px from its top-left. */
function localPoint(event: ReactPointerEvent<HTMLElement>) {
  const rect = event.currentTarget.getBoundingClientRect();
  return { x: event.clientX - rect.left, y: event.clientY - rect.top, w: rect.width, h: rect.height };
}

/* 01 ─ Fragile Assembly Line ─────────────────────────────────────────── */
export function AssemblyLine() {
  const [fallen, setFallen] = useState<number | null>(null);
  const [count, setCount] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const breakLetter = () => {
    if (timer.current) clearTimeout(timer.current);
    setFallen(count % 4);
    setCount((c) => c + 1);
    timer.current = setTimeout(() => setFallen(null), 1500);
  };

  return (
    <div className="lx-stage lx-assembly">
      <div className="lx-assembly-queue" aria-hidden="true">
        <span className="lx-tile lx-tile--solid">W</span>
        <i />
        <span className="lx-tile lx-tile--dashed">W</span>
        <i />
        <b>Ww</b>
      </div>
      <button type="button" className="lx-assembly-word" onClick={breakLetter} aria-label="Break a letter from Work">
        {"Work".split("").map((letter, i) => (
          <span key={i} className={fallen === i ? "is-fallen" : ""}>{letter}</span>
        ))}
        <em aria-hidden="true" />
      </button>
      <span className="lx-assembly-note" aria-hidden="true">nudge 1 px →</span>
      <div className="lx-belt" aria-hidden="true">
        {Array.from({ length: 5 }, (_, i) => <i key={i} style={{ animationDelay: `${-i * 120}ms` }} />)}
      </div>
    </div>
  );
}

/* 02 ─ Shy Voyeur ─────────────────────────────────────────────────────── */
export function ShyVoyeur() {
  const [watching, setWatching] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const moved = () => {
    setWatching(false);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setWatching(true), 1600);
  };

  return (
    <div className="lx-stage lx-shy" onPointerMove={moved} onPointerLeave={() => setWatching(false)}>
      <span className="lx-stage-hint lx-shy-hint">DON’T MOVE.</span>
      <div className={`lx-shy-creature ${watching ? "is-watching" : ""}`} aria-hidden="true">
        <span className="lx-shy-head"><i /><i /></span>
        <strong>WORK</strong>
      </div>
      <div className="lx-shy-floor" aria-hidden="true" />
    </div>
  );
}

/* 03 ─ Physics Spill ──────────────────────────────────────────────────── */
// Scroll "energy" decays every event; only a real fling crosses the line.
// Single jumps over JUMP_PX are programmatic (anchor links, Back) and ignored.
const SPILL_ENERGY = 520;
const JUMP_PX = 1400;

export function PhysicsSpill({ resetKey }: { resetKey: number }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [spilled, setSpilled] = useState(false);
  const visible = useRef(false);
  const energy = useRef(0);
  const last = useRef(typeof window === "undefined" ? 0 : window.scrollY);

  useEffect(() => {
    setSpilled(false);
    energy.current = 0;
    last.current = window.scrollY;
  }, [resetKey]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting;
    });
    observer.observe(stage);

    const onScroll = () => {
      const delta = Math.abs(window.scrollY - last.current);
      last.current = window.scrollY;
      if (delta > JUMP_PX) return;
      energy.current = energy.current * 0.82 + delta;
      if (visible.current && energy.current > SPILL_ENERGY) setSpilled(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div ref={stageRef} className={`lx-stage lx-spill ${spilled ? "is-spilled" : ""}`}>
      <div className="lx-spill-doc" aria-hidden="true">
        <b className="lx-spill-title" />
        <i /><i /><i /><i className="is-short" />
        <span className="lx-spill-figure" />
        <i /><i className="is-short" />
      </div>
      <span className="lx-spill-stain" aria-hidden="true" />
      <span className="lx-spill-stream" aria-hidden="true" />
      <button
        type="button"
        className="lx-spill-mug"
        onClick={() => setSpilled(true)}
        disabled={spilled}
        aria-label="Knock the coffee mug over"
      >
        <span aria-hidden="true" />
      </button>
      <span className="lx-stage-hint lx-spill-hint">
        {spilled ? "TOO LATE. IT'S IN THE COPY NOW." : "SCROLL HARD ↓ (OR NUDGE THE MUG)"}
      </span>
    </div>
  );
}

/* 04 ─ Cursor Customs Check ───────────────────────────────────────────── */
export function CustomsCheck() {
  const [inside, setInside] = useState(false);
  const [crossings, setCrossings] = useState(0);
  const [at, setAt] = useState({ x: 50, y: 50 });

  return (
    <div className="lx-stage lx-customs">
      <div
        className={`lx-customs-zone ${inside ? "is-scanning" : ""}`}
        onPointerEnter={() => { setInside(true); setCrossings((c) => c + 1); }}
        onPointerLeave={() => setInside(false)}
        onPointerMove={(e) => { const p = localPoint(e); setAt({ x: (p.x / p.w) * 100, y: (p.y / p.h) * 100 }); }}
      >
        <span>CURSOR CONTENTS<br />12 ANCHOR POINTS</span>
        <i className="lx-customs-laser" aria-hidden="true" />
        <b className="lx-customs-cursor" style={inside ? { left: `${at.x}%`, top: `${at.y}%` } : undefined} aria-hidden="true">↖</b>
      </div>
      <span className="lx-stage-hint lx-customs-count">CROSSINGS / {String(crossings).padStart(2, "0")}</span>
    </div>
  );
}

/* 05 ─ Elastic Deadline ───────────────────────────────────────────────── */
// The note hangs on a cord from ABOUT. Drag it: the cord thins and loses its
// sag as tension rises. Past SNAP_AT of the stage width it snaps; on release a
// spring brings the note home, and an overstretched deadline returns as YESTERDAY.
const SNAP_AT = 0.72;
const SPRING = 0.14;
const DAMPING = 0.74;

export function ElasticDeadline() {
  const stageRef = useRef<HTMLDivElement>(null);
  const noteRef = useRef<HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ w: 645, h: 372, note: 150 });
  const [snapped, setSnapped] = useState(false);
  const [late, setLate] = useState(false);
  const drag = useRef<{ dx: number; dy: number } | null>(null);
  const physics = useRef({ x: 0, y: 0, vx: 0, vy: 0, raf: 0 });
  const lateTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const measure = () =>
      setSize({ w: stage.clientWidth, h: stage.clientHeight, note: noteRef.current?.offsetWidth ?? 150 });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(physics.current.raf);
      if (lateTimer.current) clearTimeout(lateTimer.current);
    };
  }, []);

  // Rest position of the note's left edge, and the cord's anchor under ABOUT.
  const rest = { x: Math.min(size.w * 0.62, size.w - size.note - 14), y: 96 };
  const anchor = { x: size.w * 0.11 + 40, y: 92 };
  const note = { x: rest.x + offset.x, y: rest.y + offset.y };
  const stretch = Math.hypot(note.x - anchor.x, note.y - anchor.y);
  const restLength = Math.hypot(rest.x - anchor.x, rest.y - anchor.y);
  const tension = clamp((stretch - restLength) / (size.w * SNAP_AT - restLength), 0, 1);

  const springHome = () => {
    const p = physics.current;
    cancelAnimationFrame(p.raf);
    const step = () => {
      p.vx = (p.vx - p.x * SPRING) * DAMPING;
      p.vy = (p.vy - p.y * SPRING) * DAMPING;
      p.x += p.vx;
      p.y += p.vy;
      if (Math.abs(p.x) + Math.abs(p.y) + Math.abs(p.vx) + Math.abs(p.vy) < 0.4) {
        p.x = p.y = 0;
        setOffset({ x: 0, y: 0 });
        setSnapped(false);
        return;
      }
      setOffset({ x: p.x, y: p.y });
      p.raf = requestAnimationFrame(step);
    };
    p.raf = requestAnimationFrame(step);
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const stage = stageRef.current;
    if (!stage) return;
    cancelAnimationFrame(physics.current.raf);
    event.currentTarget.setPointerCapture(event.pointerId);
    const box = stage.getBoundingClientRect();
    drag.current = { dx: event.clientX - box.left - note.x, dy: event.clientY - box.top - note.y };
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const stage = stageRef.current;
    if (!drag.current || !stage || snapped) return;
    const box = stage.getBoundingClientRect();
    const x = clamp(event.clientX - box.left - drag.current.dx, 0, size.w - 60) - rest.x;
    const y = clamp(event.clientY - box.top - drag.current.dy, 0, size.h - 60) - rest.y;
    physics.current.x = x;
    physics.current.y = y;
    physics.current.vx = physics.current.vy = 0;
    setOffset({ x, y });
    if (Math.hypot(rest.x + x - anchor.x, rest.y + y - anchor.y) > size.w * SNAP_AT) {
      // Overstretched: the cord gives, the note flies home, the deadline has moved.
      drag.current = null;
      setSnapped(true);
      setLate(true);
      if (lateTimer.current) clearTimeout(lateTimer.current);
      lateTimer.current = setTimeout(() => setLate(false), 2600);
      springHome();
    }
  };

  const onPointerUp = () => {
    if (!drag.current) return;
    drag.current = null;
    springHome();
  };

  const sag = 70 * (1 - tension);
  const midX = (anchor.x + note.x) / 2;
  const midY = (anchor.y + note.y) / 2 + sag;

  return (
    <div ref={stageRef} className={`lx-stage lx-elastic ${snapped ? "is-snapped" : ""} ${late ? "is-late" : ""}`}>
      <strong className="lx-elastic-word">ABOUT</strong>
      <svg className="lx-elastic-curve" viewBox={`0 0 ${size.w} ${size.h}`} aria-hidden="true">
        <path
          d={`M${anchor.x} ${anchor.y} Q ${midX} ${midY} ${note.x} ${note.y + 20}`}
          style={{ strokeWidth: 3.2 - tension * 2.4 }}
        />
      </svg>
      <button
        ref={noteRef}
        type="button"
        className="lx-elastic-note"
        style={{ left: note.x, top: note.y, transform: `rotate(${-4 + offset.x * 0.02}deg)` }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={(event) => {
          // Keyboard: Enter yanks it past the limit in one go.
          if (event.key !== "Enter" && event.key !== " ") return;
          event.preventDefault();
          physics.current.x = size.w * 0.3;
          physics.current.y = 140;
          setLate(true);
          if (lateTimer.current) clearTimeout(lateTimer.current);
          lateTimer.current = setTimeout(() => setLate(false), 2600);
          springHome();
        }}
        aria-label="Deadline note. Drag it away from ABOUT to stretch the deadline."
      >
        <small>DEADLINE</small>
        <b>{late ? "YESTERDAY" : "FRIDAY, 5PM"}</b>
      </button>
      <span className="lx-stage-hint lx-elastic-hint">
        {late ? "IT SNAPPED. THE DEADLINE MOVED." : `DRAG THE DEADLINE · TENSION ${Math.round(tension * 100)}%`}
      </span>
    </div>
  );
}

/* 06 ─ Typographic Wildlife ───────────────────────────────────────────── */
export function TypographicWildlife() {
  const [off, setOff] = useState({ x: 0, y: 0 });
  return (
    <div
      className="lx-stage lx-wildlife"
      onPointerMove={(e) => {
        const p = localPoint(e);
        setOff({ x: clamp((p.x - p.w / 2) * 0.12, -60, 60), y: clamp((p.y - p.h / 2) * 0.18, -45, 45) });
      }}
      onPointerLeave={() => setOff({ x: 0, y: 0 })}
    >
      <div className="lx-wildlife-word" aria-label="PORTFOLIO">
        {"PORT".split("").map((l, i) => <span key={i}>{l}</span>)}
        <span className="lx-wildlife-f" style={{ transform: `translate(${off.x}px, ${off.y}px) rotate(${off.x * 0.3}deg)` }}>F</span>
        {"OLIO".split("").map((l, i) => <span key={i + 5}>{l}</span>)}
      </div>
      <span className="lx-stage-hint lx-wildlife-hint">APPROACH CAREFULLY</span>
      <span className="lx-wildlife-link">ABOUT <i /></span>
    </div>
  );
}

/* 07 ─ Layout Earthquake ──────────────────────────────────────────────── */
export function LayoutEarthquake({ resetKey }: { resetKey: number }) {
  const [pressure, setPressure] = useState(0);
  const [shake, setShake] = useState(0);
  useEffect(() => { setPressure(0); }, [resetKey]);
  const collapsed = pressure >= 4;

  return (
    <button
      type="button"
      className={`lx-stage lx-quake ${collapsed ? "is-collapsed" : ""}`}
      onClick={() => { if (!collapsed) { setPressure((p) => p + 1); setShake((s) => s + 1); } }}
    >
      <img className="lx-quake-crack" src={`${import.meta.env.BASE_URL}assets/lab/crack-line.svg`} alt="" />
      <div key={shake} className={`lx-quake-words ${pressure > 0 && !collapsed ? `is-shaking-${Math.min(pressure, 3)}` : ""}`}>
        {["WORK", "ABOUT", "NOTES"].map((w) => <span key={w}>{w}</span>)}
      </div>
      <div className="lx-quake-grid" aria-hidden="true" />
      <div className="lx-quake-meter" aria-hidden="true"><i style={{ width: `${(Math.min(pressure, 4) / 4) * 100}%` }} /></div>
      <span className="lx-quake-label">PRESSURE {Math.min(pressure, 4)}/4</span>
    </button>
  );
}

/* 08 ─ Scroll-Powered Fan ─────────────────────────────────────────────── */
export function ScrollFan() {
  const bladeRef = useRef<HTMLDivElement>(null);
  const [speed, setSpeed] = useState(0);
  const state = useRef({ angle: 0, vel: 0, lastY: 0, shown: 0 });

  useEffect(() => {
    state.current.lastY = window.scrollY;
    const onScroll = () => {
      const s = state.current;
      s.vel = clamp(s.vel + Math.abs(window.scrollY - s.lastY) * 0.35, 0, 48);
      s.lastY = window.scrollY;
    };
    let raf = 0;
    const tick = () => {
      const s = state.current;
      s.angle = (s.angle + s.vel) % 360;
      s.vel *= 0.965;
      if (s.vel < 0.05) s.vel = 0;
      if (bladeRef.current) bladeRef.current.style.transform = `rotate(${s.angle}deg)`;
      const kmh = Math.round(s.vel * 6);
      if (kmh !== s.shown) { s.shown = kmh; setSpeed(kmh); }
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  const drift = Math.min(speed / 4, 60);
  return (
    <div className="lx-stage lx-fan">
      <i className="lx-fan-cord" aria-hidden="true" />
      <div className="lx-fan-blades" ref={bladeRef} aria-hidden="true">
        <b /><b /><b /><em />
      </div>
      <span className="lx-fan-sticky" style={{ transform: `translate(${drift}px, ${-drift * 0.4}px) rotate(${6 + drift * 0.3}deg)` }}>FINAL_FINAL_7</span>
      <nav className="lx-fan-nav" aria-hidden="true">
        {["WORK", "ABOUT", "CONTACT"].map((l, i) => (
          <span key={l} style={{ transform: `translate(${drift * (i + 1) * 0.6}px, ${-drift * 0.3 * i}px)`, opacity: 1 - drift / 160 }}>{l}</span>
        ))}
      </nav>
      <span className="lx-fan-speed">SCROLL VELOCITY / {speed} KM/H</span>
    </div>
  );
}

/* 09 ─ Navigation Black Hole ──────────────────────────────────────────── */
// The nav sits in its own row; the hole sits below it. Each link is pulled
// along its own vector toward the hole, so nothing ever overlaps at rest.
const HOLE = { x: 0.5, y: 0.7 };
const HOLE_LINKS = [
  { label: "WORK", x: 0.16 },
  { label: "ABOUT", x: 0.5 },
  { label: "NOTES", x: 0.84 },
];
const LINK_ROW = 0.24;

export function BlackHole() {
  const [pull, setPull] = useState(0);
  const [size, setSize] = useState({ w: 645, h: 372 });

  return (
    <div
      className={`lx-stage lx-hole ${pull > 0.92 ? "is-lost" : ""}`}
      onPointerMove={(e) => {
        const p = localPoint(e);
        if (p.w !== size.w || p.h !== size.h) setSize({ w: p.w, h: p.h });
        const d = Math.hypot(p.x - p.w * HOLE.x, p.y - p.h * HOLE.y);
        setPull(clamp(1 - d / (p.w * 0.42), 0, 1));
      }}
      onPointerLeave={() => setPull(0)}
    >
      <nav className="lx-hole-nav" aria-label="Navigation being pulled into a black hole">
        {HOLE_LINKS.map((link) => {
          const dx = (HOLE.x - link.x) * size.w;
          const dy = (HOLE.y - LINK_ROW) * size.h;
          const angle = Math.atan2(dy, dx);
          const fall = pull * pull;
          return (
            <span
              key={link.label}
              className="lx-hole-link"
              style={{
                left: `${link.x * 100}%`,
                top: `${LINK_ROW * 100}%`,
                opacity: 1 - fall * 0.85,
                transform: `translate(-50%, -50%) translate(${dx * fall * 0.9}px, ${dy * fall * 0.9}px) rotate(${angle}rad) scale(${1 + fall * 1.6}, ${1 - fall * 0.75}) rotate(${-angle}rad)`,
              }}
            >
              {link.label}
            </span>
          );
        })}
      </nav>
      <div className="lx-hole-system" style={{ left: `${HOLE.x * 100}%`, top: `${HOLE.y * 100}%` }} aria-hidden="true">
        <div className="lx-hole-orbit lx-hole-orbit--outer"><i /></div>
        <div className="lx-hole-orbit lx-hole-orbit--inner"><i /></div>
        <i className="lx-hole-core" style={{ transform: `translate(-50%, -50%) scale(${1 + pull * 0.6})` }} />
      </div>
      <span className="lx-stage-hint lx-hole-hint">
        {pull > 0.92 ? "SIGNAL LOST" : pull > 0 ? `GRAVITY ${Math.round(pull * 100)}%` : "APPROACH THE EVENT HORIZON"}
      </span>
    </div>
  );
}

/* 10 ─ Fourth-Wall Maintenance ────────────────────────────────────────── */
// broken → (click) repairing → fixed. Caution tape cordons the crooked nav
// until the crew finishes, then tears and drops. Touch it again and it breaks.
type CrewState = "broken" | "repairing" | "fixed";
const REPAIR_MS = 1900;

export function MaintenanceCrew({ resetKey }: { resetKey: number }) {
  const [state, setState] = useState<CrewState>("broken");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => { setState("broken"); }, [resetKey]);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const interrupt = () => {
    if (state === "repairing") return;
    if (state === "fixed") {
      setState("broken");
      return;
    }
    setState("repairing");
    timer.current = setTimeout(() => setState("fixed"), REPAIR_MS);
  };

  return (
    <button type="button" className={`lx-stage lx-crew is-${state}`} onClick={interrupt}>
      <div className="lx-crew-chrome" aria-hidden="true"><i /><i /><i /></div>
      <div className="lx-crew-nav">
        <span>WORK</span><span>ABOUT</span><span>INFO</span>
      </div>
      <i className="lx-crew-rule" aria-hidden="true" />
      <i className="lx-crew-measure" aria-hidden="true" />
      <span className="lx-crew-worker lx-crew-worker--a" aria-hidden="true" />
      <span className="lx-crew-worker lx-crew-worker--b" aria-hidden="true" />
      <div className="lx-crew-tape" aria-hidden="true">
        <span className="lx-crew-tape-half"><b>CAUTION · BREAKPOINT UNDER REPAIR · CAUTION · BREAKPOINT UNDER REPAIR ·</b></span>
        <span className="lx-crew-tape-half"><b>CAUTION · BREAKPOINT UNDER REPAIR · CAUTION · BREAKPOINT UNDER REPAIR ·</b></span>
      </div>
      <span className="lx-crew-sign" aria-hidden="true">
        {state === "fixed" ? "PLEASE DON’T TOUCH" : "⚠ WORK IN PROGRESS"}
      </span>
      <span className="lx-stage-hint lx-crew-hint">
        {state === "broken" ? "CLICK TO CALL THE CREW" : state === "repairing" ? "BREAKPOINT UNDER REPAIR…" : "FIXED. YOU’RE GOING TO TOUCH IT, AREN’T YOU?"}
      </span>
    </button>
  );
}

/* 11 ─ Undo Poltergeist ───────────────────────────────────────────────── */
const mistakes = ["WORK", "WORRK", "WOK", "WORK", "W0RK", "WROK", "WORKK"];
export function UndoPoltergeist({ resetKey }: { resetKey: number }) {
  const [step, setStep] = useState(0);
  const [ghost, setGhost] = useState<string | null>(null);
  useEffect(() => { setStep(0); setGhost(null); }, [resetKey]);

  const next = () => { setGhost(null); setStep((s) => (s + 1) % mistakes.length); };
  const undo = () => {
    setGhost(mistakes[step]);
    setStep((s) => (s + 2) % mistakes.length);
  };

  return (
    <div className="lx-stage lx-undo" onClick={next}>
      <button
        type="button"
        className="lx-undo-key"
        onClick={(e) => { e.stopPropagation(); undo(); }}
        aria-label="Undo"
      >⌘ Z</button>
      <div className="lx-undo-word" aria-live="polite">
        {ghost && <span className="lx-undo-ghost" aria-hidden="true">{ghost}</span>}
        <span>{mistakes[step]}</span>
      </div>
      <span className="lx-stage-hint lx-undo-hint">CLICK TO MAKE A MISTAKE</span>
    </div>
  );
}

/* 12 ─ Overworked Browser Tab ─────────────────────────────────────────── */
export function OverworkedTab({ resetKey }: { resetKey: number }) {
  const [awake, setAwake] = useState(false);
  useEffect(() => { setAwake(false); }, [resetKey]);
  return (
    <div className={`lx-stage lx-tab ${awake ? "is-awake" : ""}`}>
      <div className="lx-tab-strip" aria-hidden="true">
        <span><i />portfolio_final<b>×</b></span>
      </div>
      <div className="lx-tab-bar" aria-hidden="true">
        <span>←</span><span>→</span><span>↻</span><i />
      </div>
      <button type="button" className="lx-tab-page" onClick={() => setAwake((a) => !a)}>
        <strong className="lx-tab-logo">F</strong>
        <span className="lx-tab-z" aria-hidden="true">z<br />z</span>
        <span className="lx-tab-link lx-tab-link--left">ABOUT WORK</span>
        <span className="lx-tab-link lx-tab-link--right">CONTACT</span>
        <span className="lx-stage-hint lx-tab-hint">{awake ? "LOOKING BUSY" : "CLICK TO RETURN TO THE TAB"}</span>
      </button>
    </div>
  );
}

/* 13 ─ Magnetic Kerning ───────────────────────────────────────────────── */
export function MagneticKerning() {
  const letters = "MAGNETIC".split("");
  const refs = useRef<(HTMLSpanElement | null)[]>([]);
  const [mx, setMx] = useState<number | null>(null);
  const [offsets, setOffsets] = useState<{ x: number; y: number }[]>(() => letters.map(() => ({ x: 0, y: 0 })));

  const move = (e: ReactPointerEvent<HTMLDivElement>) => {
    const p = localPoint(e);
    setMx(p.x);
    const rect = e.currentTarget.getBoundingClientRect();
    setOffsets(letters.map((_, i) => {
      const el = refs.current[i];
      if (!el) return { x: 0, y: 0 };
      const r = el.getBoundingClientRect();
      const dx = r.left + r.width / 2 - e.clientX;
      const dy = r.top + r.height / 2 - e.clientY;
      const dist = Math.max(30, Math.hypot(dx, dy));
      const force = clamp(9000 / dist, 0, 70) * (1 - i * 0.05);
      return { x: (dx / dist) * force, y: (dy / dist) * force * 0.35 };
    }));
    void rect;
  };
  const leave = () => { setMx(null); setOffsets(letters.map(() => ({ x: 0, y: 0 }))); };

  return (
    <div className="lx-stage lx-kern" onPointerMove={move} onPointerLeave={leave}>
      <div className="lx-kern-magnet" style={{ left: mx === null ? "50%" : `${mx}px` }} aria-hidden="true"><span>S</span><span>N</span></div>
      <div className="lx-kern-word" aria-label="MAGNETIC">
        {letters.map((l, i) => (
          <span key={i} ref={(el) => { refs.current[i] = el; }} style={{ transform: `translate(${offsets[i].x}px, ${offsets[i].y}px)` }}>{l}</span>
        ))}
      </div>
      <i className="lx-kern-rule" aria-hidden="true"><b style={{ left: mx === null ? "50%" : `${mx}px` }} /></i>
      <span className="lx-stage-hint lx-kern-hint">MOVE CURSOR TO RE-KERN</span>
    </div>
  );
}

/* 14 ─ Navigation Wormhole ────────────────────────────────────────────── */
export function Wormhole({ resetKey }: { resetKey: number }) {
  const [side, setSide] = useState<"a" | "b">("a");
  const [traveling, setTraveling] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => { setSide("a"); }, [resetKey]);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const transport = () => {
    if (traveling) return;
    setTraveling(true);
    timer.current = setTimeout(() => { setSide((s) => (s === "a" ? "b" : "a")); setTraveling(false); }, 650);
  };

  return (
    <button type="button" className="lx-stage lx-worm" onClick={transport}>
      <i className="lx-worm-line" aria-hidden="true" />
      <div className="lx-portal lx-portal--a" aria-hidden="true"><i /><i /><i /></div>
      <div className="lx-portal lx-portal--b" aria-hidden="true"><i /><i /><i /></div>
      <span className={`lx-worm-link ${side === "b" ? "is-right" : ""} ${traveling ? "is-traveling" : ""}`}>WORK</span>
      <span className="lx-stage-hint lx-worm-hint">CLICK TO BEND THE SITEMAP</span>
    </button>
  );
}

/* 15 ─ Cursor Crumb Trail ─────────────────────────────────────────────── */
// The pet walks the crumb trail. Lead it over a nav link and it eats the link:
// chomp, announce it, then spit it back. Eat all three and it gets full first.
type Crumb = { id: number; x: number; y: number };
const PET_LINKS = ["WORK", "TRAIL", "CONTACT"];
const RESPAWN_MS = 5500;
const FULL_MS = 2200;

export function CrumbTrail({ resetKey }: { resetKey: number }) {
  const stage = useRef<HTMLDivElement>(null);
  const petRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const crumbs = useRef<Crumb[]>([]);
  const eatenRef = useRef<Set<number>>(new Set());
  // A link that was just spat back is safe for 3s, even under the pet.
  const immuneUntil = useRef<number[]>([]);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [view, setView] = useState<Crumb[]>([]);
  const [eaten, setEaten] = useState<number[]>([]);
  const [respawned, setRespawned] = useState<number[]>([]);
  const [chomping, setChomping] = useState(false);
  const [full, setFull] = useState(false);
  const [message, setMessage] = useState("");
  const [fed, setFed] = useState(0);
  const pet = useRef({ x: 0, y: 0, init: false });
  const lastDrop = useRef(0);
  const id = useRef(0);

  const later = (fn: () => void, ms: number) => { timers.current.push(setTimeout(fn, ms)); };

  useEffect(() => {
    crumbs.current = [];
    eatenRef.current = new Set();
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setView([]); setFed(0); setEaten([]); setRespawned([]); setFull(false); setMessage("");
  }, [resetKey]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const spitBack = (indexes: number[]) => {
    indexes.forEach((i) => {
      eatenRef.current.delete(i);
      immuneUntil.current[i] = performance.now() + 3000;
    });
    setEaten([...eatenRef.current]);
    setRespawned(indexes);
    later(() => setRespawned([]), 700);
  };

  const eat = (index: number) => {
    eatenRef.current.add(index);
    setEaten([...eatenRef.current]);
    setChomping(true);
    later(() => setChomping(false), 380);

    if (eatenRef.current.size === PET_LINKS.length) {
      setFull(true);
      setMessage("NAVIGATION DIGESTED. 0 LINKS LEFT.");
      later(() => {
        setFull(false);
        setMessage("…FINE. HAVE THEM BACK.");
        spitBack(PET_LINKS.map((_, i) => i));
      }, FULL_MS);
      return;
    }
    setMessage(`NOM. /${PET_LINKS[index]} IS GONE.`);
    later(() => {
      if (!eatenRef.current.has(index) || eatenRef.current.size === PET_LINKS.length) return;
      spitBack([index]);
      setMessage(`/${PET_LINKS[index]} RETURNED (SLIGHTLY CHEWED).`);
    }, RESPAWN_MS);
  };

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const el = stage.current;
      if (el) {
        const w = el.clientWidth, h = el.clientHeight;
        const p = pet.current;
        if (!p.init) { p.x = w / 2; p.y = h * 0.62; p.init = true; }
        const target = crumbs.current[0];
        if (target) {
          p.x += (target.x - p.x) * 0.08;
          p.y += (target.y - p.y) * 0.08;
          if (Math.hypot(target.x - p.x, target.y - p.y) < 22) {
            crumbs.current = crumbs.current.slice(1);
            setView(crumbs.current);
            setFed((f) => f + 1);
          }
        }
        // Did the pet walk over a link?
        const box = el.getBoundingClientRect();
        linkRefs.current.forEach((link, index) => {
          if (!link || eatenRef.current.has(index) || performance.now() < (immuneUntil.current[index] ?? 0)) return;
          const r = link.getBoundingClientRect();
          const cx = r.left - box.left + r.width / 2;
          const cy = r.top - box.top + r.height / 2;
          if (Math.abs(p.x - cx) < r.width / 2 + 18 && Math.abs(p.y - cy) < r.height / 2 + 22) eat(index);
        });
        if (petRef.current) petRef.current.style.transform = `translate(${p.x - 43}px, ${p.y - 33}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eat() only touches refs and state setters, so the loop can stay mounted.
  }, []);

  const move = (e: ReactPointerEvent<HTMLDivElement>) => {
    const now = performance.now();
    if (now - lastDrop.current < 90) return;
    lastDrop.current = now;
    const p = localPoint(e);
    crumbs.current = [...crumbs.current, { id: id.current++, x: p.x, y: p.y }].slice(-14);
    setView(crumbs.current);
  };

  return (
    <div className="lx-stage lx-crumbs" ref={stage} onPointerMove={move}>
      <nav aria-hidden="true">
        {PET_LINKS.map((label, index) => (
          <span
            key={label}
            ref={(node) => { linkRefs.current[index] = node; }}
            className={`${eaten.includes(index) ? "is-eaten" : ""} ${respawned.includes(index) ? "is-respawned" : ""}`}
          >
            {label}
          </span>
        ))}
      </nav>
      {view.map((c) => <i key={c.id} className="lx-crumb" style={{ left: c.x, top: c.y }} />)}
      <div
        className={`lx-pet ${chomping ? "is-chomping" : ""} ${full ? "is-full" : ""} ${fed > 0 && fed % 5 === 0 ? "is-happy" : ""}`}
        ref={petRef}
        aria-hidden="true"
      >
        <i /><i /><b />
      </div>
      <span className="lx-stage-hint lx-crumbs-hint" aria-live="polite">
        {message || `LEAD IT TO A LINK · IT’S HUNGRY${fed > 0 ? ` · ${fed} CRUMBS` : ""}`}
      </span>
    </div>
  );
}

/* 16 ─ Gravity Override ───────────────────────────────────────────────── */
export function GravityOverride({ resetKey }: { resetKey: number }) {
  const [gravity, setGravity] = useState(true);
  useEffect(() => { setGravity(true); }, [resetKey]);
  return (
    <div className={`lx-stage lx-gravity ${gravity ? "" : "is-floating"}`}>
      <button type="button" className="lx-gravity-toggle" onClick={() => setGravity((g) => !g)} aria-pressed={gravity}>
        <span>GRAVITY / {gravity ? "ON" : "OFF"}</span>
        <i><b /></i>
      </button>
      <strong className="lx-gravity-word">STUDIO</strong>
      <nav className="lx-gravity-nav" aria-hidden="true">
        {["WORK", "ABOUT", "INFO"].map((l, i) => <span key={l} style={{ "--i": i } as CSSProperties}>{l}</span>)}
      </nav>
      <i className="lx-gravity-rule" aria-hidden="true" />
      <span className="lx-stage-hint lx-gravity-hint">{gravity ? "CLICK TO REVOKE PHYSICS" : "PHYSICS REVOKED"}</span>
      <div className="lx-gravity-floor">TOP OF PAGE</div>
    </div>
  );
}
