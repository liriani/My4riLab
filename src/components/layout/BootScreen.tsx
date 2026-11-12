import type { CSSProperties } from "react";

type BootScreenProps = {
  /** Laid over the app while the minimum boot time runs, instead of filling the route. */
  overlay?: boolean;
  /** Fading out: the boot is over. */
  leaving?: boolean;
  /** Length of the progress bar's fill, matched to the minimum boot time. */
  durationMs?: number;
};

/**
 * The "system boot" screen. Shown by the router while the first page loads,
 * and by App as an overlay so the boot always runs for a minimum time.
 * Both render the same frame, so handing over from one to the other is seamless.
 */
export default function BootScreen({ overlay = false, leaving = false, durationMs }: BootScreenProps) {
  // As an overlay it sits beside the page's own <main>, so it mustn't be a second one.
  const Frame = overlay ? "div" : "main";
  return (
    <Frame
      className={`route-fallback ${overlay ? "route-fallback--overlay" : ""} ${leaving ? "is-leaving" : ""}`}
      aria-live="polite"
      aria-label="Loading page"
      aria-hidden={leaving || undefined}
      style={durationMs ? ({ "--boot-ms": `${durationMs}ms` } as CSSProperties) : undefined}
    >
      <span>4RI.EXE</span>
      <div>
        <i />
        LOADING SIGNAL
      </div>
      {overlay && <b className="route-fallback-bar" aria-hidden="true" />}
    </Frame>
  );
}
