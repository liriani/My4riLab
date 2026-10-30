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
export function PhysicsSpill({ resetKey }: { resetKey: number }) {
  const [tilt, setTilt] = useState(14);
  const [spill, setSpill] = useState(0);
  const last = useRef(typeof window === "undefined" ? 0 : window.scrollY);

  useEffect(() => {
    setTilt(14);
    setSpill(0);
  }, [resetKey]);

  useEffect(() => {
    const onScroll = () => {
      const delta = Math.abs(window.scrollY - last.current);
      last.current = window.scrollY;
      setTilt((t) => clamp(t + delta * 0.18, 14, 76));
      setSpill((s) => clamp(s + delta * 0.0045, 0, 1));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="lx-stage lx-spill">
      <div className="lx-spill-puddle" style={{ opacity: spill, transform: `scaleX(${0.3 + spill * 1.5})` }} aria-hidden="true" />
      <div className="lx-spill-table" aria-hidden="true">
        <i /><i /><i />
        <span className="lx-spill-top" />
        <div className="lx-spill-mug" style={{ transform: `rotate(${tilt}deg)` }}>
          <b>CTRL<br />Z</b>
        </div>
      </div>
      <span className="lx-stage-hint lx-spill-hint">SCROLL WITH INTENT ↓</span>
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
export function ElasticDeadline() {
  const [pull, setPull] = useState(0);
  const dragging = useRef(false);

  const move = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    const p = localPoint(e);
    setPull(clamp(p.y - 90, 0, 190));
  };
  const release = () => { dragging.current = false; setPull(0); };

  return (
    <div
      className="lx-stage lx-elastic"
      onPointerDown={(e) => { dragging.current = true; e.currentTarget.setPointerCapture(e.pointerId); move(e); }}
      onPointerMove={move}
      onPointerUp={release}
      onPointerCancel={release}
    >
      <strong className="lx-elastic-word">ABOUT</strong>
      <svg className="lx-elastic-curve" viewBox="0 0 645 372" preserveAspectRatio="none" aria-hidden="true">
        <path d={`M110 78 Q 330 ${pull > 0 ? 40 + pull * 1.6 : 40} 540 ${84 + pull * 0.4}`} className={pull > 0 ? "is-pulled" : ""} />
      </svg>
      <div className={`lx-elastic-note ${pull === 0 ? "is-snapping" : ""}`} style={{ transform: `translateY(${pull * 0.4}px) rotate(${-4 + pull * 0.05}deg)` }}>
        <small>DEADLINE</small>
        <b>FRIDAY, 5PM</b>
      </div>
      <span className="lx-stage-hint lx-elastic-hint">PULL THE DEADLINE</span>
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
export function BlackHole() {
  const [pull, setPull] = useState(0);
  return (
    <div
      className="lx-stage lx-hole"
      onPointerMove={(e) => {
        const p = localPoint(e);
        const d = Math.hypot(p.x - p.w / 2, p.y - p.h / 2);
        setPull(clamp(1 - d / (p.w * 0.45), 0, 1));
      }}
      onPointerLeave={() => setPull(0)}
    >
      <div className="lx-hole-orbit lx-hole-orbit--outer" aria-hidden="true"><i /></div>
      <div className="lx-hole-orbit lx-hole-orbit--inner" aria-hidden="true"><i /></div>
      <span className="lx-hole-link" style={{ transform: `translateX(${pull * 170}px) scaleX(${1 + pull * 0.9})`, opacity: 1 - pull * 0.7 }}>WORK</span>
      <span className="lx-hole-link lx-hole-about" style={{ opacity: 1 - pull * 0.5 }}>ABOUT</span>
      <span className="lx-hole-link" style={{ transform: `translateX(${-pull * 170}px) scaleX(${1 + pull * 0.9})`, opacity: 1 - pull * 0.7 }}>NOTES</span>
      <i className="lx-hole-core" style={{ transform: `translate(-50%, -50%) scale(${1 + pull * 0.25})` }} aria-hidden="true" />
      <span className="lx-stage-hint lx-hole-hint">ENTER GRAVITY FIELD</span>
    </div>
  );
}

/* 10 ─ Fourth-Wall Maintenance ────────────────────────────────────────── */
export function MaintenanceCrew({ resetKey }: { resetKey: number }) {
  const [aligned, setAligned] = useState(false);
  useEffect(() => { setAligned(false); }, [resetKey]);
  return (
    <button type="button" className={`lx-stage lx-crew ${aligned ? "is-aligned" : ""}`} onClick={() => setAligned((a) => !a)}>
      <div className="lx-crew-chrome" aria-hidden="true"><i /><i /><i /></div>
      <div className="lx-crew-nav">
        <span>WORK</span><span>ABOUT</span><span>INFO</span>
      </div>
      <i className="lx-crew-rule" aria-hidden="true" />
      <span className="lx-crew-worker lx-crew-worker--a" aria-hidden="true" />
      <span className="lx-crew-worker lx-crew-worker--b" aria-hidden="true" />
      {aligned && <span className="lx-crew-sign">PLEASE DON’T TOUCH</span>}
      <span className="lx-stage-hint lx-crew-hint">{aligned ? "ALIGNMENT REPORTED" : "CLICK TO REPORT ALIGNMENT"}</span>
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
type Crumb = { id: number; x: number; y: number };
export function CrumbTrail({ resetKey }: { resetKey: number }) {
  const stage = useRef<HTMLDivElement>(null);
  const petRef = useRef<HTMLDivElement>(null);
  const crumbs = useRef<Crumb[]>([]);
  const [view, setView] = useState<Crumb[]>([]);
  const [fed, setFed] = useState(0);
  const pet = useRef({ x: 0, y: 0, init: false });
  const lastDrop = useRef(0);
  const id = useRef(0);

  useEffect(() => { crumbs.current = []; setView([]); setFed(0); }, [resetKey]);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const el = stage.current;
      if (el) {
        const w = el.clientWidth, h = el.clientHeight;
        const p = pet.current;
        if (!p.init) { p.x = w / 2; p.y = h / 2; p.init = true; }
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
        if (petRef.current) petRef.current.style.transform = `translate(${p.x - 43}px, ${p.y - 33}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
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
      <nav aria-hidden="true"><span>WORK</span><span>TRAIL</span><span>CONTACT</span></nav>
      {view.map((c) => <i key={c.id} className="lx-crumb" style={{ left: c.x, top: c.y }} />)}
      <div className={`lx-pet ${fed > 0 && fed % 5 === 0 ? "is-happy" : ""}`} ref={petRef} aria-hidden="true"><i /><i /><b /></div>
      <span className="lx-stage-hint lx-crumbs-hint">MOVE AROUND · IT’S HUNGRY{fed > 0 ? ` · ${fed} FED` : ""}</span>
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
