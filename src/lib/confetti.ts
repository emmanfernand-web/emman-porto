/** Dependency-free confetti: draws on a temporary full-screen canvas. */

const COLORS = ["#ff2e93", "#19e3ff", "#ffb800", "#b6ff3b", "#ffffff", "#9b5cff"];

type Piece = { x: number; y: number; vx: number; vy: number; r: number; vr: number; w: number; h: number; c: string };

export function fireConfetti(originX?: number, originY?: number, count = 140) {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.style.cssText = "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:120";
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    canvas.remove();
    return;
  }
  ctx.scale(dpr, dpr);

  const ox = originX ?? window.innerWidth / 2;
  const oy = originY ?? window.innerHeight / 2;
  const pieces: Piece[] = Array.from({ length: count }, () => {
    const a = Math.random() * Math.PI * 2;
    const s = 4 + Math.random() * 10;
    return {
      x: ox,
      y: oy,
      vx: Math.cos(a) * s,
      vy: Math.sin(a) * s - 6,
      r: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.4,
      w: 6 + Math.random() * 8,
      h: 4 + Math.random() * 6,
      c: COLORS[Math.floor(Math.random() * COLORS.length)],
    };
  });

  const start = performance.now();
  const frame = (now: number) => {
    const t = now - start;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (const p of pieces) {
      p.vy += 0.3;
      p.vx *= 0.985;
      p.x += p.vx;
      p.y += p.vy;
      p.r += p.vr;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.r);
      ctx.globalAlpha = Math.max(0, 1 - t / 2600);
      ctx.fillStyle = p.c;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    }
    if (t < 2600) requestAnimationFrame(frame);
    else canvas.remove();
  };
  requestAnimationFrame(frame);
}
