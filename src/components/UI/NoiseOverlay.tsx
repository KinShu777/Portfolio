import React, { useEffect, useRef } from 'react';

interface NoiseOverlayProps {
  opacity?: number;
  burst?: boolean;
}

export const NoiseOverlay: React.FC<NoiseOverlayProps> = ({ opacity = 0.08, burst = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const width = 160;
    const height = 120;
    canvas.width = width;
    canvas.height = height;

    const imgData = ctx.createImageData(width, height);
    const buffer32 = new Uint32Array(imgData.data.buffer);
    const len = buffer32.length;

    let lastTime = 0;
    const targetFps = burst ? 30 : 18;
    const interval = 1000 / targetFps;

    const render = (time: number) => {
      animId = requestAnimationFrame(render);
      if (time - lastTime < interval) return;
      lastTime = time;

      for (let i = 0; i < len; i++) {
        // Fast 32-bit random grayscale pixel generation
        const val = (Math.random() * 255) | 0;
        buffer32[i] = (255 << 24) | (val << 16) | (val << 8) | val;
      }
      ctx.putImageData(imgData, 0, 0);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [burst]);

  return (
    <canvas
      ref={canvasRef}
      className="crt-noise-canvas"
      style={{
        opacity: burst ? 0.75 : opacity,
        imageRendering: 'pixelated'
      }}
      aria-hidden="true"
    />
  );
};
