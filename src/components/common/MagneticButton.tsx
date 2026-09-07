import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { useCursor } from '../../context/CursorContext';
import { useSound } from '../../context/SoundContext';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  magneticStrength?: number;
  cursorLabel?: string;
  id?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  onClick,
  magneticStrength = 0.35,
  cursorLabel = '',
  id,
  type = 'button',
  disabled = false
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const { setCursor, resetCursor } = useCursor();
  const { playHover } = useSound();

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = (e.clientX - centerX) * magneticStrength;
    const distanceY = (e.clientY - centerY) * magneticStrength;

    setPosition({ x: distanceX, y: distanceY });
  };

  const handleMouseEnter = () => {
    if (disabled) return;
    playHover();
    setCursor('button', cursorLabel);
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    resetCursor();
  };

  return (
    <motion.button
      id={id}
      ref={buttonRef}
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', damping: 20, stiffness: 350, mass: 0.1 }}
      className={`relative inline-flex items-center justify-center transition-colors ${className}`}
    >
      {children}
    </motion.button>
  );
};
