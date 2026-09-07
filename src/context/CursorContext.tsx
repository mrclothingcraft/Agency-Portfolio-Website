import React, { createContext, useContext, useState, useEffect } from 'react';
import { CursorVariant } from '../types';

interface CursorContextType {
  cursorVariant: CursorVariant;
  cursorText: string;
  setCursor: (variant: CursorVariant, text?: string) => void;
  resetCursor: () => void;
  isTouchDevice: boolean;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const CursorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>('default');
  const [cursorText, setCursorText] = useState<string>('');
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);

  useEffect(() => {
    // Detect touch-only devices to disable custom cursor per spec
    const checkTouch = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isFinePointer = window.matchMedia('(pointer: fine)').matches;
      setIsTouchDevice(hasTouch && !isFinePointer);
    };

    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  const setCursor = (variant: CursorVariant, text: string = '') => {
    setCursorVariant(variant);
    setCursorText(text);
  };

  const resetCursor = () => {
    setCursorVariant('default');
    setCursorText('');
  };

  return (
    <CursorContext.Provider
      value={{
        cursorVariant,
        cursorText,
        setCursor,
        resetCursor,
        isTouchDevice
      }}
    >
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
};
