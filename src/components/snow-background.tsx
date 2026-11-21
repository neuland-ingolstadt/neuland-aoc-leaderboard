import { useEffect, useRef } from "react";

interface Flake {
  x: number;
  y: number;
  speed: number;
  size: number;
  alpha: number;
  phase: number;
  sway: number;
}

const FLAKE_DENSITY = 1 / 16000; // flakes per px²

function createFlake(width: number, height: number, anywhere: boolean): Flake {
  return {
    x: Math.random() * width,
    y: anywhere ? Math.random() * height : -20,
    speed: 0.3 + Math.random() * 0.9,
    size: 10 + Math.random() * 14,
    alpha: 0.15 + Math.random() * 0.45,
    phase: Math.random() * Math.PI * 2,
    sway: 0.2 + Math.random() * 0.6,
  };
}

export function SnowBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const parent = canvas?.parentElement;
    if (!canvas || !ctx || !parent) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    const flakes: Flake[] = [];
    let color = "white";
    let frame = 0;
    let raf = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = Math.round(width * height * FLAKE_DENSITY);
      if (flakes.length > target) flakes.length = target;
      while (flakes.length < target) {
        flakes.push(createFlake(width, height, true));
      }
    };

    const draw = () => {
      // Re-read the theme color now and then so light/dark switches apply
      if (frame++ % 60 === 0) color = getComputedStyle(canvas).color;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = color;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (const flake of flakes) {
        if (!reducedMotion) {
          flake.y += flake.speed;
          flake.phase += 0.01;
          flake.x += Math.sin(flake.phase) * flake.sway;
          if (flake.y > height + 20)
            Object.assign(flake, createFlake(width, height, false));
        }
        ctx.globalAlpha = flake.alpha;
        ctx.font = `${flake.size}px "IBM Plex Mono", monospace`;
        ctx.fillText("*", flake.x, flake.y);
      }

      if (!reducedMotion) raf = requestAnimationFrame(draw);
    };

    resize();
    draw();

    const observer = new ResizeObserver(() => {
      resize();
      if (reducedMotion) draw();
    });
    observer.observe(parent);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 size-full text-foreground"
    />
  );
}
