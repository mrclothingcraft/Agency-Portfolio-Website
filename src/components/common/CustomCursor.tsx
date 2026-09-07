import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useCursor } from '../../context/CursorContext';
import { ArrowUpRight, MoveHorizontal } from 'lucide-react';

export const CustomCursor: React.FC = () => {
  const { cursorVariant, cursorText, isTouchDevice } = useCursor();
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Apply document class for custom cursor hiding on fine pointer devices
    document.documentElement.classList.add('has-custom-cursor');

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, [isTouchDevice, isVisible]);

  if (isTouchDevice || !isVisible) {
    return null;
  }

  // Determine variants and dimensions
  const isProjectPill = cursorVariant === 'project';
  const isButtonOrLink = cursorVariant === 'button' || cursorVariant === 'link';
  const isDrag = cursorVariant === 'drag';

  return (
    <div id="custom-cursor-container" className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Center sharp dot */}
      <motion.div
        className="fixed top-0 left-0 h-2 w-2 rounded-full bg-[#3E7BFA] shadow-[0_0_8px_rgba(62,123,250,0.85)]"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          opacity: isProjectPill ? 0 : 1,
          scale: isButtonOrLink ? 0 : 1
        }}
        transition={{
          type: 'spring',
          damping: 35,
          stiffness: 450,
          mass: 0.1
        }}
      />

      {/* Smooth outer follower / morphing container */}
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center font-medium"
        animate={{
          x: isProjectPill ? mousePosition.x - 65 : isDrag ? mousePosition.x - 30 : mousePosition.x - (isButtonOrLink ? 28 : 18),
          y: isProjectPill ? mousePosition.y - 20 : isDrag ? mousePosition.y - 18 : mousePosition.y - (isButtonOrLink ? 28 : 18),
          width: isProjectPill ? 134 : isDrag ? 60 : isButtonOrLink ? 56 : 36,
          height: isProjectPill ? 40 : isDrag ? 36 : isButtonOrLink ? 56 : 36,
          borderRadius: 9999,
          backgroundColor: isProjectPill 
            ? '#3E7BFA' 
            : isButtonOrLink 
              ? 'rgba(62, 123, 250, 0.2)' 
              : isDrag
                ? '#101626'
                : 'rgba(62, 123, 250, 0.05)',
          borderColor: isProjectPill 
            ? '#17B4E0' 
            : isButtonOrLink 
              ? '#3E7BFA' 
              : isDrag
                ? '#17B4E0'
                : 'rgba(62, 123, 250, 0.35)',
          borderWidth: isProjectPill ? 0 : 1.5,
          boxShadow: isProjectPill ? '0 4px 20px rgba(62, 123, 250, 0.45)' : 'none',
          backdropFilter: isProjectPill || isButtonOrLink || isDrag ? 'blur(6px)' : 'none'
        }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 280,
          mass: 0.25
        }}
      >
        {isProjectPill && (
          <div className="flex items-center gap-1.5 px-3.5 text-xs font-bold tracking-wider text-[#F3F5FA] uppercase select-none">
            <span>{cursorText || 'View Project'}</span>
            <ArrowUpRight className="h-3.5 w-3.5 stroke-[2.5] text-[#F3F5FA]" />
          </div>
        )}

        {isDrag && (
          <div className="flex items-center justify-center text-[#17B4E0]">
            <MoveHorizontal className="h-4 w-4" />
          </div>
        )}

        {isButtonOrLink && cursorText && (
          <span className="text-[10px] font-bold tracking-widest text-[#3E7BFA] uppercase select-none">
            {cursorText}
          </span>
        )}
      </motion.div>
    </div>
  );
};
