"use client";
import { useEffect, useRef } from "react";

// Lightweight animated canvas background of soft orbs
export default function CanvasOrbs({
  className = "",
  colors = ["#0f172a", "#334155", "#64748b"],
  count = 6,
  speed = 0.25,
  blur = 0.5,
  opacity = 0.9,
}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width = 0;
    let height = 0;
    let dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    // Create orbs
    const orbs = Array.from({ length: count }).map(() => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.05 + Math.random() * 0.15, // radius relative to min(width,height)
      vx: (Math.random() * 2 - 1) * speed * 0.001,
      vy: (Math.random() * 2 - 1) * speed * 0.001,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    function resize() {
      const parent = canvas.parentElement;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function step(t) {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";
      if (blur > 0) ctx.filter = `blur(${Math.round(12 * blur)}px)`;

      const minDim = Math.min(width, height);

      for (const o of orbs) {
        o.x += o.vx * width;
        o.y += o.vy * height;
        if (o.x < 0 || o.x > width) o.vx *= -1;
        if (o.y < 0 || o.y > height) o.vy *= -1;

        // draw orb
        const px = o.x;
        const py = o.y;
        const pr = o.r * minDim;
        const grad = ctx.createRadialGradient(px, py, pr * 0.1, px, py, pr);
        grad.addColorStop(0, hexToRgba(o.color, opacity));
        grad.addColorStop(1, hexToRgba(o.color, 0));

        ctx.beginPath();
        ctx.fillStyle = grad;
        ctx.arc(px, py, pr, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.filter = "none";
      ctx.globalCompositeOperation = "source-over";
      rafRef.current = requestAnimationFrame(step);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);
    resize();
    rafRef.current = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [colors, count, speed, blur, opacity]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}

function hexToRgba(hex, a = 1) {
  // supports #rgb, #rrggbb
  let r = 0, g = 0, b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length >= 7) {
    r = parseInt(hex.slice(1, 3), 16);
    g = parseInt(hex.slice(3, 5), 16);
    b = parseInt(hex.slice(5, 7), 16);
  } else {
    return hex;
  }
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}
