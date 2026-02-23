import { useEffect } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

export function useScrollIntensity() {
  const intensity = useMotionValue(0);
  // Optional: Add a spring to make changes feel organic
  const smoothIntensity = useSpring(intensity, { stiffness: 100, damping: 30, mass: 1 });

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const velocity = Math.abs(currentScrollY - lastScrollY);
          const normalizedVelocity = Math.min(velocity / 50, 1);

          const pageHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
          const depth = currentScrollY / pageHeight;

          // Directly calculate smooth intensity curve
          const rawNewVal = normalizedVelocity * 0.4 + depth * 0.6;

          intensity.set(rawNewVal);

          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [intensity]);

  return smoothIntensity;
}