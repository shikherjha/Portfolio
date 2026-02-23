import { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Outer ring lags subtly behind for liquid feel
  const outerX = useSpring(cursorX, { stiffness: 150, damping: 15, mass: 0.5 });
  const outerY = useSpring(cursorY, { stiffness: 150, damping: 15, mass: 0.5 });

  // Inner dot is much faster
  const innerX = useSpring(cursorX, { stiffness: 300, damping: 20, mass: 0.1 });
  const innerY = useSpring(cursorY, { stiffness: 300, damping: 20, mass: 0.1 });

  useEffect(() => {
    let ticking = false;

    const updateMousePosition = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          cursorX.set(e.clientX);
          cursorY.set(e.clientY);
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (typeof window === "undefined" || window.innerWidth < 768) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[100] mix-blend-screen"
        style={{
          x: innerX,
          y: innerY,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: "hsl(var(--primary))",
        }}
        animate={{
          scale: isHovering ? 2.5 : 1,
          opacity: 0.4,
        }}
        transition={{ duration: 0.1 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[99] border border-primary/30"
        style={{
          x: outerX,
          y: outerY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: 0,
        }}
        transition={{ duration: 0.2 }}
      />
    </AnimatePresence>
  );
}