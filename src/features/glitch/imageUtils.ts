import { GLITCH_HEIGHT, GLITCH_WIDTH } from "./useGlitchEngine";

export function loadImage(source: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = source;
  });
}

export function makeDemoImage(): Promise<HTMLImageElement> {
  const canvas = document.createElement("canvas");
  canvas.width = GLITCH_WIDTH;
  canvas.height = GLITCH_HEIGHT;
  const context = canvas.getContext("2d");
  if (!context) return Promise.reject(new Error("Canvas is not supported"));

  const gradient = context.createLinearGradient(0, 0, GLITCH_WIDTH, GLITCH_HEIGHT);
  gradient.addColorStop(0, "#ff4618");
  gradient.addColorStop(0.5, "#00ff41");
  gradient.addColorStop(1, "#7457ff");
  context.fillStyle = gradient;
  context.fillRect(0, 0, GLITCH_WIDTH, GLITCH_HEIGHT);

  context.fillStyle = "#11110f";
  context.fillRect(74, 74, 650, 752);
  context.strokeStyle = "#f5f2e8";
  context.lineWidth = 5;
  context.strokeRect(102, 102, 594, 696);
  context.fillStyle = "#f5f2e8";
  context.font = "900 154px Arial";
  context.fillText("MAKE", 125, 320);
  context.fillText("NOISE", 125, 475);
  context.font = "700 34px monospace";
  context.fillText("UPLOAD / DISTORT / KEEP", 128, 700);

  context.strokeStyle = "#11110f";
  context.lineWidth = 16;
  context.beginPath();
  context.arc(930, 410, 180, 0, Math.PI * 2);
  context.stroke();
  context.fillStyle = "#11110f";
  context.fillRect(815, 385, 230, 50);
  context.font = "900 76px Arial";
  context.fillText("01", 865, 690);

  return loadImage(canvas.toDataURL("image/png"));
}
