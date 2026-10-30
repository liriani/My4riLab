import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  hue: number;
};

export default function CursorTrailCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!canvas || !context || reducedMotion.matches) return;

    const particles: Particle[] = [];
    let frame = 0;
    let lastX = window.innerWidth / 2;
    let lastY = window.innerHeight / 2;
    let lastTime = performance.now();

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const addParticles = (event: PointerEvent) => {
      const now = performance.now();
      const elapsed = Math.max(16, now - lastTime);
      const velocityX = ((event.clientX - lastX) / elapsed) * 16;
      const velocityY = ((event.clientY - lastY) / elapsed) * 16;
      const speed = Math.min(18, Math.hypot(velocityX, velocityY));
      const count = Math.max(1, Math.ceil(speed / 3));

      for (let index = 0; index < count; index += 1) {
        particles.push({
          x: event.clientX + (Math.random() - 0.5) * 10,
          y: event.clientY + (Math.random() - 0.5) * 10,
          vx: -velocityX * 0.18 + (Math.random() - 0.5) * 1.4,
          vy: -velocityY * 0.18 + (Math.random() - 0.5) * 1.4,
          life: 1,
          size: 2 + speed * 0.45 + Math.random() * 4,
          hue: Math.random() > 0.72 ? 14 : 135 + Math.random() * 30,
        });
      }

      if (particles.length > 140) particles.splice(0, particles.length - 140);
      lastX = event.clientX;
      lastY = event.clientY;
      lastTime = now;
    };

    const render = () => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      context.globalCompositeOperation = "lighter";

      for (let index = particles.length - 1; index >= 0; index -= 1) {
        const particle = particles[index];
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.965;
        particle.vy *= 0.965;
        particle.life -= 0.025;
        particle.size *= 0.985;

        if (particle.life <= 0) {
          particles.splice(index, 1);
          continue;
        }

        const gradient = context.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 2.5,
        );
        gradient.addColorStop(
          0,
          `hsla(${particle.hue}, 100%, 58%, ${particle.life * 0.6})`,
        );
        gradient.addColorStop(1, `hsla(${particle.hue}, 100%, 50%, 0)`);
        context.fillStyle = gradient;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.size * 2.5, 0, Math.PI * 2);
        context.fill();
      }

      frame = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", addParticles, { passive: true });
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", addParticles);
    };
  }, []);

  return <canvas ref={canvasRef} className="cursor-trail-canvas" aria-hidden="true" />;
}
