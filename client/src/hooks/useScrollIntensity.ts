import { useState, useEffect } from 'react';

export function useScrollIntensity() {
  const [intensity, setIntensity] = useState(0);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const velocity = Math.abs(currentScrollY - lastScrollY);
      const normalizedVelocity = Math.min(velocity / 100, 1);
      
      const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
      const depth = currentScrollY / pageHeight;
      
      setIntensity(normalizedVelocity * 0.5 + depth * 0.5);
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return intensity;
}