"use client";
import { useEffect, useRef } from "react";

// Animated subtle grid with flowing highlight
export default function CanvasGrid({ className = "", color = "#0f172a", accent = "#64748b", density = 40 }) {
  const ref = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width = 0;
    let height = 0;
    let dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    let t = 0;

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

    function draw() {
      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = 0.3;
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;

      const step = Math.max(16, Math.min(64, Math.floor(Math.min(width, height) / density)));
      for (let x = 0; x <= width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y <= height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // flowing accent
      const grad = ctx.createLinearGradient(0, 0, width, 0);
      grad.addColorStop(0, "rgba(0,0,0,0)");
      grad.addColorStop(0.4, hexToRgba(accent, 0));
      grad.addColorStop(0.5, hexToRgba(accent, 0.6));
      grad.addColorStop(0.6, hexToRgba(accent, 0));
      grad.addColorStop(1, "rgba(0,0,0,0)");

      const w = Math.max(80, width * 0.15);
      const x = (Math.sin(t) * 0.5 + 0.5) * (width + w) - w;
      ctx.globalAlpha = 1;
      ctx.fillStyle = grad;
      ctx.fillRect(x, 0, w, height);

      t += 0.01;
      rafRef.current = requestAnimationFrame(draw);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);
    resize();
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [color, accent, density]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}

function hexToRgba(hex, a = 1) {
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
