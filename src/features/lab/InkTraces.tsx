import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type PointerEvent,
  type RefObject,
} from "react";

/* ───────── tactile layer for /lab: wet-paint traces, tips, and a cleanup cloth ───────── */

type TraceShape = "print" | "smudge" | "splat";

export type Trace = {
  id: number;
  /** Position inside the page container, so marks scroll with the content. */
  x: number;
  y: number;
  shape: TraceShape;
  color: string;
  rotation: number;
  scale: number;
  wiped?: boolean;
};

export type Tip = {
  id: number;
  /** Viewport position, for the fixed-position bubble. */
  x: number;
  y: number;
  text: string;
};

/** Oldest marks flake off past this, so a long session stays light. */
const MAX_TRACES = 80;
const TIP_MS = 2800;
const SMEAR_MS = 420;
const WIPE_MS = 900;
const CLOTH_RADIUS = 70;

const INK = "#121212";
const LIME = "#dfff00";
const RED = "#ff4b36";
const BLUE = "#4967ff";

const TIPS = {
  manifesto: [
    "Getting things dirty is part of the process.",
    "Read the rules, then break one.",
    "The fourth wall is load-bearing. Lean on it.",
  ],
  directory: [
    "Pick a door. Any door.",
    "Index first, chaos second.",
    "Sixteen ways to misbehave. Choose one.",
  ],
  hero: [
    "The header is not safe. Neither is the page.",
    "Curiosity is an act of healthy disruption.",
    "You were warned. You clicked anyway. Good.",
  ],
  footer: [
    "Almost done. Look at the mess you made.",
    "Evidence of participation: everywhere.",
    "Spotless screens are for people who only look.",
  ],
  any: [
    "Leave your mark, don't just look.",
    "Fingerprints are proof somebody was here.",
    "Nothing interesting was ever made with clean hands.",
    "Interfaces are meant to be handled.",
    "Curiosity is an act of healthy disruption.",
  ],
} as const;

type Zone = keyof typeof TIPS;

const CLEAN_TIP = "Clean hands now. Touch the wet LAB paint in the header to get messy again.";

/** Fingers stay clean across visits to the case studies until the LAB tag is touched again. */
const CLEAN_KEY = "lab:clean-fingers";
/** History entry of the last LAB-tag touch already counted, so Back doesn't re-ink. */
const PAINT_KEY = "lab:paint-touch";
const readClean = () => {
  try {
    return window.sessionStorage.getItem(CLEAN_KEY) === "1";
  } catch {
    return false;
  }
};
const writeClean = (clean: boolean) => {
  try {
    if (clean) window.sessionStorage.setItem(CLEAN_KEY, "1");
    else window.sessionStorage.removeItem(CLEAN_KEY);
  } catch {
    /* storage unavailable: the state just won't outlive this page */
  }
};

function zoneOf(target: Element): Zone {
  if (target.closest(".lx-manifesto")) return "manifesto";
  if (target.closest(".lx-directory")) return "directory";
  if (target.closest(".lx-hero")) return "hero";
  if (target.closest(".lx-footer")) return "footer";
  return "any";
}

/** Lime reads on the dark cards and footer; elsewhere mostly ink, with the odd colour. */
function colorFor(target: Element) {
  if (target.closest(".is-dark, .lx-footer")) return LIME;
  const roll = Math.random();
  return roll < 0.68 ? INK : roll < 0.84 ? RED : BLUE;
}

export function useInkTraces(containerRef: RefObject<HTMLElement | null>) {
  const [traces, setTraces] = useState<Trace[]>([]);
  const [tip, setTip] = useState<Tip | null>(null);
  const [wiping, setWiping] = useState(false);
  // Inked = the visitor touched the wet LAB paint and hasn't cleaned up yet.
  const [inked, setInked] = useState(() => !readClean());
  const cleanNoticeShown = useRef(false);
  const nextId = useRef(1);
  const lastTip = useRef("");
  const tracesRef = useRef(traces);
  tracesRef.current = traces;
  const tipTimer = useRef<number | null>(null);
  const timers = useRef<number[]>([]);

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  useEffect(
    () => () => {
      timers.current.forEach(window.clearTimeout);
      if (tipTimer.current) window.clearTimeout(tipTimer.current);
    },
    [],
  );

  const toLocal = useCallback(
    (clientX: number, clientY: number) => {
      const rect = containerRef.current?.getBoundingClientRect();
      return rect ? { x: clientX - rect.left, y: clientY - rect.top } : null;
    },
    [containerRef],
  );

  const showTip = (zone: Zone, x: number, y: number, fixedText?: string) => {
    // Zone tips most of the time, a general line now and then; never the same line twice running.
    const pool: readonly string[] = zone !== "any" && Math.random() < 0.7 ? TIPS[zone] : TIPS.any;
    const options = pool.filter((text) => text !== lastTip.current);
    const text = fixedText ?? options[Math.floor(Math.random() * options.length)];
    lastTip.current = text;
    setTip({ id: nextId.current++, x, y, text });
    if (tipTimer.current) window.clearTimeout(tipTimer.current);
    tipTimer.current = window.setTimeout(() => setTip(null), TIP_MS);
  };

  /** Click handler for the page: leaves a mark and pops a tip. */
  const onPageClick = (event: MouseEvent<HTMLElement>) => {
    // detail === 0 means a keyboard "click" (Enter/Space): no finger, no print.
    if (event.detail === 0 || wiping) return;
    const target = event.target as Element;
    // Exhibits own their clicks: no prints or tips inside a card.
    if (target.closest(".lx-card, [data-ink-ignore]")) return;
    if (!inked) {
      if (!cleanNoticeShown.current) {
        cleanNoticeShown.current = true;
        showTip("any", event.clientX, event.clientY, CLEAN_TIP);
      }
      return;
    }
    const point = toLocal(event.clientX, event.clientY);
    if (!point) return;

    const roll = Math.random();
    const trace: Trace = {
      id: nextId.current++,
      ...point,
      shape: roll < 0.62 ? "print" : roll < 0.86 ? "smudge" : "splat",
      color: colorFor(target),
      rotation: Math.round(Math.random() * 70 - 35),
      scale: 0.85 + Math.random() * 0.35,
    };
    setTraces((current) => [...current.slice(-(MAX_TRACES - 1)), trace]);
    showTip(zoneOf(target), event.clientX, event.clientY);
  };

  /** Cloth dragged over the glass: smear and lift marks under it. */
  const eraseAt = (clientX: number, clientY: number) => {
    const point = toLocal(clientX, clientY);
    if (!point) return;
    const under = (trace: Trace) =>
      !trace.wiped && Math.hypot(trace.x - point.x, trace.y - point.y) <= CLOTH_RADIUS;
    if (!tracesRef.current.some(under)) return;
    setTraces((current) => current.map((trace) => (under(trace) ? { ...trace, wiped: true } : trace)));
    later(() => setTraces((current) => current.filter((trace) => !trace.wiped)), SMEAR_MS);
  };

  /** Full clean: a cloth sweeps the viewport and every mark goes with it. */
  const wipeAll = () => {
    if (wiping) return;
    setTip(null);
    setWiping(true);
    later(() => {
      setTraces([]);
      setWiping(false);
    }, WIPE_MS);
  };

  /** Wet wipe: clears every mark and stops new ones until the LAB paint is touched again. */
  const cleanFingers = () => {
    wipeAll();
    setInked(false);
    writeClean(true);
    cleanNoticeShown.current = false;
  };

  /**
   * The visitor arrived via the wet LAB tag. Each touch (one history entry)
   * counts once: returning to the same entry with Back leaves clean hands clean.
   */
  const touchWetPaint = useCallback((entryKey: string) => {
    try {
      if (window.sessionStorage.getItem(PAINT_KEY) === entryKey) return;
      window.sessionStorage.setItem(PAINT_KEY, entryKey);
    } catch {
      /* storage unavailable: treat every arrival as a fresh touch */
    }
    setInked(true);
    writeClean(false);
  }, []);

  return {
    traces,
    tip,
    wiping,
    inked,
    markCount: traces.filter((trace) => !trace.wiped).length,
    onPageClick,
    eraseAt,
    wipeAll,
    cleanFingers,
    touchWetPaint,
  };
}

/* ───────── views ───────── */

export function InkLayer({ traces, wiping }: { traces: Trace[]; wiping: boolean }) {
  return (
    <div className={`lx-ink-layer ${wiping ? "is-wiping" : ""}`} aria-hidden="true">
      {traces.map((trace) => (
        <i
          key={trace.id}
          className={`lx-trace lx-trace--${trace.shape} ${trace.wiped ? "is-wiped" : ""}`}
          style={
            {
              left: trace.x,
              top: trace.y,
              "--ink": trace.color,
              "--rot": `${trace.rotation}deg`,
              "--scale": trace.scale,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

export function InkTip({ tip }: { tip: Tip | null }) {
  // Keep the bubble on screen: flip left/up when the click is near an edge.
  const flipX = tip ? tip.x > window.innerWidth - 300 : false;
  const flipY = tip ? tip.y < 120 : false;

  return (
    <>
      {tip && (
        <div
          key={tip.id}
          className={`lx-tip ${flipX ? "is-flip-x" : ""} ${flipY ? "is-flip-y" : ""}`}
          style={{ left: tip.x, top: tip.y }}
          aria-hidden="true"
        >
          <span>FIELD NOTE</span>
          {tip.text}
        </div>
      )}
      {/* Screen readers get the line without the floating bubble. */}
      <p className="visually-hidden" aria-live="polite">
        {tip?.text ?? ""}
      </p>
    </>
  );
}

type ClothProps = {
  markCount: number;
  wiping: boolean;
  onWipeAll: () => void;
  onEraseAt: (clientX: number, clientY: number) => void;
};

/**
 * Footer cleanup cloth. Click (or Enter) wipes the whole screen; drag it and it
 * follows the pointer, lifting the marks it passes over.
 */
export function CleanupCloth({ markCount, wiping, onWipeAll, onEraseAt }: ClothProps) {
  const drag = useRef<{ startX: number; startY: number; moved: boolean } | null>(null);
  const [held, setHeld] = useState<{ x: number; y: number } | null>(null);

  const onPointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { startX: event.clientX, startY: event.clientY, moved: false };
  };

  const onPointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    const state = drag.current;
    if (!state) return;
    if (!state.moved && Math.hypot(event.clientX - state.startX, event.clientY - state.startY) > 6) {
      state.moved = true;
    }
    if (!state.moved) return;
    setHeld({ x: event.clientX, y: event.clientY });
    onEraseAt(event.clientX, event.clientY);
  };

  const onPointerEnd = () => {
    const state = drag.current;
    drag.current = null;
    setHeld(null);
    // A press that never travelled is a click: wipe everything.
    if (state && !state.moved) onWipeAll();
  };

  return (
    <div className="lx-cleanup" data-ink-ignore>
      <p>
        <span>MAINTENANCE</span>
        {markCount === 0
          ? "THE GLASS IS CLEAN. GO MAKE A MESS."
          : `${String(markCount).padStart(2, "0")} ${markCount === 1 ? "MARK" : "MARKS"} ON THE GLASS`}
      </p>
      <button
        type="button"
        className={`lx-cloth ${held ? "is-held" : ""}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onWipeAll();
          }
        }}
        disabled={wiping}
        aria-label={`Clean the screen: wipe away ${markCount} paint marks`}
      >
        <i aria-hidden="true" />
        <b>CLEAN SCREEN</b>
        <small>CLICK TO WIPE · DRAG TO SCRUB</small>
      </button>

      {held && (
        <span className="lx-cloth-held" style={{ left: held.x, top: held.y }} aria-hidden="true" />
      )}
      {wiping && <span className="lx-cloth-sweep" aria-hidden="true" />}
    </div>
  );
}

type PacketProps = {
  /** Scrolled past the intro and still has paint on their fingers. */
  show: boolean;
  onClean: () => void;
};

const PULL_MS = 650;
const DONE_MS = 1600;
const NOTE_MS = 7000;

/**
 * Floating wet-wipe packet. It turns up once the visitor is past the intro,
 * explains itself, and cleans their fingers: every mark goes, and no new ones
 * appear until they touch the wet LAB tag again.
 */
export function WetWipePacket({ show, onClean }: PacketProps) {
  const [phase, setPhase] = useState<"idle" | "pulling" | "done">("idle");
  const [noteOpen, setNoteOpen] = useState(false);
  const shownOnce = useRef(false);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  // First appearance: let the note speak for a few seconds before it tucks away.
  useEffect(() => {
    if (!show || shownOnce.current) return;
    shownOnce.current = true;
    setNoteOpen(true);
    timers.current.push(window.setTimeout(() => setNoteOpen(false), NOTE_MS));
  }, [show]);

  // Re-inked after a clean: the packet comes back ready.
  useEffect(() => {
    if (show && phase === "done") setPhase("idle");
  }, [show, phase]);

  const pull = () => {
    if (phase !== "idle") return;
    setNoteOpen(false);
    setPhase("pulling");
    timers.current.push(
      window.setTimeout(() => {
        onClean();
        setPhase("done");
      }, PULL_MS),
    );
  };

  const visible = show || phase !== "idle";
  // Once done, it lingers just long enough to confirm, then leaves.
  const [lingering, setLingering] = useState(false);
  useEffect(() => {
    if (phase !== "done") return;
    setLingering(true);
    const timer = window.setTimeout(() => setLingering(false), DONE_MS);
    return () => window.clearTimeout(timer);
  }, [phase]);

  if (!visible || (phase === "done" && !lingering && !show)) return null;

  return (
    <aside
      className={`lx-wipes is-${phase} ${noteOpen ? "is-note-open" : ""}`}
      data-ink-ignore
      aria-label="Wet wipes"
    >
      <p className="lx-wipes-note" id="lx-wipes-note">
        <span>STAFF NOTICE</span>
        That LAB sign in the header was wet, and you touched it. Wipe your fingers
        before they smudge the exhibits.
      </p>
      <button
        type="button"
        className="lx-wipes-packet"
        onClick={pull}
        onMouseEnter={() => phase === "idle" && setNoteOpen(true)}
        onMouseLeave={() => setNoteOpen(false)}
        onFocus={() => phase === "idle" && setNoteOpen(true)}
        onBlur={() => setNoteOpen(false)}
        aria-describedby="lx-wipes-note"
        disabled={phase !== "idle"}
      >
        <i className="lx-wipes-tissue" aria-hidden="true" />
        <span className="lx-wipes-flap" aria-hidden="true">PEEL</span>
        <b>LAB·WIPES</b>
        <small>{phase === "done" ? "FINGERS CLEAN ✓" : "10 WET TISSUES · FOR PAINTED FINGERS"}</small>
      </button>
    </aside>
  );
}
