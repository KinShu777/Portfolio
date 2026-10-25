import React, { useRef, useEffect } from "react";
import { CRT_DEFAULTS, createCrtRenderer, crtStyle, CRT_VARIANTS, type CrtOptions } from "./crtRenderer";
import type { CrtVariant } from "./crtScreens";

export { CRT_VARIANTS };
export type { CrtVariant };

export type CrtBackgroundProps = Partial<CrtOptions> & {
  className?: string;
  style?: React.CSSProperties;
};

export function CrtBackground({ className = "", style, ...props }: CrtBackgroundProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const optionsRef = useRef<CrtOptions>({ ...CRT_DEFAULTS, ...props });
  optionsRef.current = { ...CRT_DEFAULTS, ...props };

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    const renderer = createCrtRenderer(host, canvas, () => optionsRef.current);
    let rafId = 0;
    let isIntersecting = true;

    const handleResize = () => {
      renderer.resize();
      renderer.render(performance.now());
    };

    const loop = (time: number) => {
      renderer.render(time);
      rafId = isIntersecting && !document.hidden ? requestAnimationFrame(loop) : 0;
    };

    const resizeObserver = new ResizeObserver(handleResize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isIntersecting = entry?.isIntersecting ?? true;
      if (isIntersecting && !rafId) {
        rafId = requestAnimationFrame(loop);
      } else if (!isIntersecting && rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
    });

    resizeObserver.observe(host);
    intersectionObserver.observe(host);
    handleResize();
    rafId = requestAnimationFrame(loop);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      renderer.dispose();
    };
  }, []);

  const cur = optionsRef.current;
  const stylePreset = crtStyle(cur.variant);

  return (
    <div
      ref={hostRef}
      className={`threeui-background crt crt-${cur.variant}${className ? ` ${className}` : ""}`}
      style={{
        background: stylePreset.background,
        opacity: cur.opacity,
        filter: `hue-rotate(${cur.hue}deg) saturate(${cur.saturation}) brightness(${cur.brightness})`,
        ...style
      }}
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
