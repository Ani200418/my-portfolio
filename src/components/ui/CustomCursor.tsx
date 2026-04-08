'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const followerX = useSpring(cursorX, { stiffness: 100, damping: 20 });
  const followerY = useSpring(cursorY, { stiffness: 100, damping: 20 });
  const isHovering = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [data-cursor-hover]')) {
        isHovering.current = true;
        document.querySelector('.custom-cursor')?.classList.add('scale-[2.5]', 'opacity-0');
        document.querySelector('.cursor-follower')?.classList.add('scale-[2]', '!border-cyan-400/60');
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [data-cursor-hover]')) {
        isHovering.current = false;
        document.querySelector('.custom-cursor')?.classList.remove('scale-[2.5]', 'opacity-0');
        document.querySelector('.cursor-follower')?.classList.remove('scale-[2]', '!border-cyan-400/60');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="custom-cursor transition-transform duration-200"
        style={{ left: cursorX, top: cursorY }}
      />
      <motion.div
        className="cursor-follower"
        style={{ left: followerX, top: followerY }}
      />
    </>
  );
}
