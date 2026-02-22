import { useRef, useEffect } from 'react';

export function ProceduralCanvas({ seed }: { seed: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrame: number;
    const render = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'hsla(var(--primary), 0.2)';
      ctx.beginPath();
      for (let i = 0; i < canvas.width; i += 10) {
        const y = Math.sin(i * 0.02 + time * 0.001) * 20 + canvas.height / 2;
        ctx.lineTo(i, y);
      }
      ctx.stroke();
      animationFrame = requestAnimationFrame(render);
    };

    render(0);
    return () => cancelAnimationFrame(animationFrame);
  }, [seed]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full -z-10 opacity-30" />;
}