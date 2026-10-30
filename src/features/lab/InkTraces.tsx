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
  stage: [
    "Getting things dirty is part of the process.",
    "Break it properly. That's how you learn the system.",
    "Prodding is a research method.",
    "Cause, meet effect.",
    "Every exhibit resets. Your curiosity doesn't have to.",
  ],
  directory: [
    "Pick a door. Any door.",
    "Index first, chaos second.",
    "Sixteen ways to misbehave. Choose one.",
  ],
  label: [
    "Read the notes, then ignore them.",
    "The label explains it. Touching it proves it.",
    "Footnotes are for people who already played.",
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

function zoneOf(target: Element): Zone {
  if (target.closest(".lx-frame")) return "stage";
  if (target.closest(".lx-directory")) return "directory";
  if (target.closest(".lx-label")) return "label";
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

  const showTip = (zone: Zone, x: number, y: number) => {
    // Zone tips most of the time, a general line now and then; never the same line twice running.
    const pool: readonly string[] = zone !== "any" && Math.random() < 0.7 ? TIPS[zone] : TIPS.any;
    const options = pool.filter((text) => text !== lastTip.current);
    const text = options[Math.floor(Math.random() * options.length)];
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
    if (target.closest("[data-ink-ignore]")) return;
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

  return {
    traces,
    tip,
    wiping,
    markCount: traces.filter((trace) => !trace.wiped).length,
    onPageClick,
    eraseAt,
    wipeAll,
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
