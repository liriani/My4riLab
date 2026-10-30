import {
  ChangeEvent,
  CSSProperties,
  PointerEvent as ReactPointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { makeDemoImage } from "./imageUtils";
import {
  DEFAULT_GLITCH_SETTINGS,
  GLITCH_HEIGHT,
  GLITCH_WIDTH,
  GlitchSettings,
  MaskPreset,
  useGlitchEngine,
} from "./useGlitchEngine";

type TargetMode = "brush" | "half" | "scatter";
type BrushMode = "add" | "erase";

export default function SouvenirStudio() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const isDrawingRef = useRef(false);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [fileName, setFileName] = useState("DEMO_SIGNAL.PNG");
  const [isAnimating, setIsAnimating] = useState(true);
  const [targetMode, setTargetMode] = useState<TargetMode>("half");
  const [brushMode, setBrushMode] = useState<BrushMode>("add");
  const [brushSize, setBrushSize] = useState(52);
  const [settings, setSettings] = useState<GlitchSettings>(DEFAULT_GLITCH_SETTINGS);
  const [saved, setSaved] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false });

  const { canvasRef, maskRef, generateMask, paintMask, download } = useGlitchEngine({
    image,
    settings,
    isAnimating,
  });

  useEffect(() => {
    let active = true;
    makeDemoImage().then((demo) => {
      if (active) setImage(demo);
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!image) return;
    const preset: MaskPreset = targetMode === "brush" ? "clear" : targetMode;
    requestAnimationFrame(() => generateMask(preset));
  }, [generateMask, image, targetMode]);

  const uploadImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const uploaded = new Image();
      uploaded.onload = () => {
        setImage(uploaded);
        setFileName(file.name.toUpperCase());
        setIsAnimating(true);
      };
      uploaded.src = String(reader.result);
    };
    reader.readAsDataURL(file);
    event.target.value = "";
  };

  const canvasPoint = (event: ReactPointerEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((event.clientX - rect.left) / rect.width) * GLITCH_WIDTH,
      y: ((event.clientY - rect.top) / rect.height) * GLITCH_HEIGHT,
    };
  };

  const paint = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (targetMode !== "brush") return;
    const point = canvasPoint(event);
    if (point) paintMask(point.x, point.y, brushSize, brushMode === "erase");
  };

  const pointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (targetMode !== "brush" || !image) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    isDrawingRef.current = true;
    paint(event);
  };

  const pointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (rect) {
      setCursor({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        visible: true,
      });
    }
    if (isDrawingRef.current) paint(event);
  };

  const updateSetting = (key: keyof GlitchSettings, value: number) => {
    setSettings((current) => ({ ...current, [key]: value }));
  };

  const save = () => {
    download("visitor-signal-souvenir.png");
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1600);
  };

  return (
    <section className="souvenir-section" id="souvenir">
      <div className="section-heading">
        <p className="kicker">THE ENGINE / LIVE</p>
        <h2>
          MAKE A <span>SOUVENIR.</span>
        </h2>
        <p className="section-copy">
          Your image stays in your browser. Distort it, mark your territory, and
          leave with a one-of-one digital artifact.
        </p>
      </div>

      <div className="studio-shell">
        <div className="studio-output">
          <div className="studio-meta">
            <span>LIVE OUTPUT / 4:3</span>
            <span>{fileName}</span>
          </div>
          <div
            ref={stageRef}
            className={`studio-stage ${targetMode === "brush" ? "is-brush" : ""}`}
            onPointerDown={pointerDown}
            onPointerMove={pointerMove}
            onPointerUp={() => (isDrawingRef.current = false)}
            onPointerCancel={() => (isDrawingRef.current = false)}
            onPointerLeave={() => {
              isDrawingRef.current = false;
              setCursor((current) => ({ ...current, visible: false }));
            }}
          >
            <canvas ref={maskRef} className="engine-mask" aria-hidden="true" />
            <canvas ref={canvasRef} className="engine-canvas" />
            {cursor.visible && targetMode === "brush" && (
              <span
                className={`brush-cursor ${brushMode}`}
                style={
                  {
                    "--cursor-x": `${cursor.x}px`,
                    "--cursor-y": `${cursor.y}px`,
                    "--cursor-size": `${
                      (brushSize * 2 * (stageRef.current?.clientWidth ?? 1)) /
                      GLITCH_WIDTH
                    }px`,
                  } as CSSProperties
                }
              />
            )}
          </div>
          <div className="transport">
            <button type="button" onClick={() => setIsAnimating((value) => !value)}>
              {isAnimating ? "PAUSE" : "PLAY"}
            </button>
            <span>MASK / {targetMode.toUpperCase()}</span>
            <button type="button" className="download-button" onClick={save}>
              {saved ? "SAVED" : "DOWNLOAD PNG ↓"}
            </button>
          </div>
        </div>

        <aside className="control-panel">
          {/* Source first: pick the image, then decide where the damage lands. */}
          <input
            ref={fileInputRef}
            className="visually-hidden"
            type="file"
            accept="image/*"
            onChange={uploadImage}
            tabIndex={-1}
            aria-hidden="true"
          />
          <button
            type="button"
            className="studio-upload"
            onClick={() => fileInputRef.current?.click()}
          >
            <span aria-hidden="true">+</span>
            <b>UPLOAD YOUR OWN PHOTO</b>
            <small>STAYS IN YOUR BROWSER</small>
          </button>

          <div className="control-head">
            <span>01</span>
            <h3>TARGET AREA</h3>
          </div>
          <div className="mode-grid">
            {(["brush", "half", "scatter"] as TargetMode[]).map((mode) => (
              <button
                key={mode}
                type="button"
                className={targetMode === mode ? "active" : ""}
                onClick={() => setTargetMode(mode)}
              >
                <b>{mode === "brush" ? "BR" : mode === "half" ? "1/2" : "SC"}</b>
                {mode}
              </button>
            ))}
          </div>

          <div className="brush-controls">
            <div className="segmented-control">
              <button
                type="button"
                className={brushMode === "add" ? "active" : ""}
                onClick={() => setBrushMode("add")}
              >
                ADD
              </button>
              <button
                type="button"
                className={brushMode === "erase" ? "active" : ""}
                onClick={() => setBrushMode("erase")}
              >
                ERASE
              </button>
            </div>
            <Slider
              label="BRUSH RADIUS"
              value={brushSize}
              min={10}
              max={150}
              step={5}
              display={`${brushSize} PX`}
              onChange={setBrushSize}
            />
            <div className="micro-actions">
              <button type="button" onClick={() => generateMask("clear")}>
                CLEAR
              </button>
              <button type="button" onClick={() => generateMask("fill")}>
                FILL ALL
              </button>
            </div>
          </div>

          <div className="control-head control-head-spaced">
            <span>02</span>
            <h3>DISTORTION</h3>
          </div>
          <div className="slider-stack">
            <Slider label="PIXEL BLOCK" value={settings.pixelSize} min={2} max={64} step={2} display={`${settings.pixelSize} PX`} onChange={(value) => updateSetting("pixelSize", value)} />
            <Slider label="COLOR DEPTH" value={settings.colors} min={2} max={32} step={1} display={`${settings.colors} LVL`} onChange={(value) => updateSetting("colors", value)} />
            <Slider label="GLITCH RATE" value={settings.glitchRate} min={0} max={0.5} step={0.01} display={`${Math.round(settings.glitchRate * 200)}%`} onChange={(value) => updateSetting("glitchRate", value)} />
            <Slider label="SCANLINES" value={settings.scanlines} min={0} max={0.8} step={0.05} display={`${Math.round(settings.scanlines * 100)}%`} onChange={(value) => updateSetting("scanlines", value)} />
            <Slider label="IMAGE SCALE" value={settings.zoom} min={0.5} max={3} step={0.1} display={`${settings.zoom.toFixed(1)}×`} onChange={(value) => updateSetting("zoom", value)} />
          </div>

          <button
            type="button"
            className="reset-button"
            onClick={() => {
              setSettings(DEFAULT_GLITCH_SETTINGS);
              setBrushSize(52);
            }}
          >
            RESET PARAMETERS ↺
          </button>
        </aside>
      </div>

    </section>
  );
}

type SliderProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (value: number) => void;
};

function Slider({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: SliderProps) {
  const progress = ((value - min) / (max - min)) * 100;
  return (
    <label className="slider">
      <span>
        {label}
        <strong>{display}</strong>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        style={{ "--progress": `${progress}%` } as CSSProperties}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}
