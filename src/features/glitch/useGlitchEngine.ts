import { useCallback, useEffect, useRef } from "react";

export const GLITCH_WIDTH = 1200;
export const GLITCH_HEIGHT = 900;

export type MaskPreset = "clear" | "fill" | "half" | "scatter";

export type GlitchSettings = {
  pixelSize: number;
  colors: number;
  glitchRate: number;
  scanlines: number;
  zoom: number;
};

export const DEFAULT_GLITCH_SETTINGS: GlitchSettings = {
  pixelSize: 16,
  colors: 7,
  glitchRate: 0.12,
  scanlines: 0.18,
  zoom: 1,
};

type GlitchEngineOptions = {
  image: HTMLImageElement | null;
  settings: GlitchSettings;
  isAnimating?: boolean;
};

export function useGlitchEngine({
  image,
  settings,
  isAnimating = true,
}: GlitchEngineOptions) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const maskRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  const generateMask = useCallback((preset: MaskPreset) => {
    const mask = maskRef.current;
    const context = mask?.getContext("2d");
    if (!mask || !context) return;

    context.clearRect(0, 0, GLITCH_WIDTH, GLITCH_HEIGHT);
    if (preset === "clear") return;

    context.fillStyle = "#000";
    if (preset === "fill") {
      context.fillRect(0, 0, GLITCH_WIDTH, GLITCH_HEIGHT);
    } else if (preset === "half") {
      context.fillRect(GLITCH_WIDTH / 2, 0, GLITCH_WIDTH / 2, GLITCH_HEIGHT);
    } else {
      const block = 75;
      for (let x = 0; x < GLITCH_WIDTH; x += block) {
        for (let y = 0; y < GLITCH_HEIGHT; y += block) {
          if (Math.random() > 0.55) context.fillRect(x, y, block, block);
        }
      }
    }
  }, []);

  const paintMask = useCallback(
    (x: number, y: number, radius: number, erase = false) => {
      const context = maskRef.current?.getContext("2d");
      if (!context) return;

      context.save();
      context.globalCompositeOperation = erase ? "destination-out" : "source-over";
      context.fillStyle = "#000";
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill();
      context.restore();
    },
    [],
  );

  const download = useCallback((fileName = "signal-souvenir.png") => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = fileName;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const mask = maskRef.current;
    if (!image || !canvas || !mask) return;

    canvas.width = GLITCH_WIDTH;
    canvas.height = GLITCH_HEIGHT;
    if (mask.width !== GLITCH_WIDTH || mask.height !== GLITCH_HEIGHT) {
      mask.width = GLITCH_WIDTH;
      mask.height = GLITCH_HEIGHT;
    }

    const output = canvas.getContext("2d");
    if (!output) return;

    const original = document.createElement("canvas");
    const pixel = document.createElement("canvas");
    const effect = document.createElement("canvas");
    const masked = document.createElement("canvas");
    [original, effect, masked].forEach((buffer) => {
      buffer.width = GLITCH_WIDTH;
      buffer.height = GLITCH_HEIGHT;
    });

    const originalContext = original.getContext("2d");
    const effectContext = effect.getContext("2d");
    const maskedContext = masked.getContext("2d");
    if (!originalContext || !effectContext || !maskedContext) return;

    let frame = 0;
    let lastGlitch = 0;

    const render = (time = 0) => {
      frame += 1;
      const imageAspect = image.naturalWidth / image.naturalHeight;
      const canvasAspect = GLITCH_WIDTH / GLITCH_HEIGHT;
      let width =
        imageAspect > canvasAspect ? GLITCH_HEIGHT * imageAspect : GLITCH_WIDTH;
      let height =
        imageAspect > canvasAspect ? GLITCH_HEIGHT : GLITCH_WIDTH / imageAspect;
      width *= settings.zoom;
      height *= settings.zoom;
      const x = (GLITCH_WIDTH - width) / 2;
      const y = (GLITCH_HEIGHT - height) / 2;

      originalContext.fillStyle = "#11110f";
      originalContext.fillRect(0, 0, GLITCH_WIDTH, GLITCH_HEIGHT);
      originalContext.drawImage(image, x, y, width, height);

      pixel.width = Math.max(1, Math.floor(GLITCH_WIDTH / settings.pixelSize));
      pixel.height = Math.max(1, Math.floor(GLITCH_HEIGHT / settings.pixelSize));
      const pixelContext = pixel.getContext("2d", { willReadFrequently: true });
      if (!pixelContext) return;

      pixelContext.drawImage(original, 0, 0, pixel.width, pixel.height);
      const imageData = pixelContext.getImageData(0, 0, pixel.width, pixel.height);
      const factor = 255 / Math.max(1, settings.colors - 1);
      for (let index = 0; index < imageData.data.length; index += 4) {
        imageData.data[index] = Math.round(imageData.data[index] / factor) * factor;
        imageData.data[index + 1] =
          Math.round(imageData.data[index + 1] / factor) * factor;
        imageData.data[index + 2] =
          Math.round(imageData.data[index + 2] / factor) * factor;
      }
      pixelContext.putImageData(imageData, 0, 0);

      effectContext.clearRect(0, 0, GLITCH_WIDTH, GLITCH_HEIGHT);
      effectContext.imageSmoothingEnabled = false;
      effectContext.drawImage(pixel, 0, 0, GLITCH_WIDTH, GLITCH_HEIGHT);

      if (
        isAnimating &&
        time - lastGlitch > 90 &&
        Math.random() < settings.glitchRate
      ) {
        lastGlitch = time;
        for (let slice = 0; slice < 3; slice += 1) {
          const sliceY = Math.random() * GLITCH_HEIGHT;
          const sliceHeight = 12 + Math.random() * 90;
          const shift = (Math.random() - 0.5) * 150;
          effectContext.drawImage(
            effect,
            0,
            sliceY,
            GLITCH_WIDTH,
            sliceHeight,
            shift,
            sliceY,
            GLITCH_WIDTH,
            sliceHeight,
          );
          effectContext.fillStyle =
            slice % 2 ? "rgba(0, 255, 65, 0.22)" : "rgba(255, 70, 24, 0.2)";
          effectContext.fillRect(shift, sliceY, GLITCH_WIDTH, sliceHeight);
        }
      }

      maskedContext.clearRect(0, 0, GLITCH_WIDTH, GLITCH_HEIGHT);
      maskedContext.globalCompositeOperation = "source-over";
      maskedContext.drawImage(mask, 0, 0);
      maskedContext.globalCompositeOperation = "source-in";
      maskedContext.drawImage(effect, 0, 0);

      output.clearRect(0, 0, GLITCH_WIDTH, GLITCH_HEIGHT);
      output.drawImage(original, 0, 0);
      output.drawImage(masked, 0, 0);
      if (settings.scanlines > 0) {
        output.fillStyle = `rgba(0, 0, 0, ${settings.scanlines})`;
        for (let line = frame % 6; line < GLITCH_HEIGHT; line += 6) {
          output.fillRect(0, line, GLITCH_WIDTH, 2);
        }
      }

      if (isAnimating) animationRef.current = requestAnimationFrame(render);
    };

    render();
    return () => {
      if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);
    };
  }, [image, isAnimating, settings]);

  return { canvasRef, maskRef, generateMask, paintMask, download };
}
