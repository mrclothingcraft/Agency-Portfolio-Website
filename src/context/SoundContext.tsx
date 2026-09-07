import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

interface SoundContextType {
  soundEnabled: boolean;
  toggleSound: () => void;
  playHover: () => void;
  playClick: () => void;
  playSwitch: () => void;
  playSuccess: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('aether_sound_fx');
      return saved !== null ? saved === 'true' : true;
    } catch {
      return true;
    }
  });

  const audioCtxRef = useRef<AudioContext | null>(null);

  const getAudioContext = (): AudioContext | null => {
    if (typeof window === 'undefined') return null;
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume().catch(() => {});
    }
    return audioCtxRef.current;
  };

  const toggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('aether_sound_fx', String(next));
      } catch {}
      if (next) {
        // Play an immediate feedback chime when unmuting
        setTimeout(() => {
          playMicroTone(720, 0.04, 0.035, 'sine');
          setTimeout(() => playMicroTone(1080, 0.05, 0.035, 'sine'), 50);
        }, 10);
      }
      return next;
    });
  };

  const playMicroTone = (
    freq: number,
    duration: number,
    volume: number = 0.03,
    type: OscillatorType = 'sine',
    endFreq?: number
  ) => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      if (endFreq) {
        osc.frequency.exponentialRampToValueAtTime(Math.max(endFreq, 50), ctx.currentTime + duration);
      }

      // Smooth envelope attack and release to avoid clicks
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.004);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio context might be restricted before gesture
    }
  };

  const playHover = () => {
    playMicroTone(950, 0.022, 0.02, 'sine');
  };

  const playClick = () => {
    playMicroTone(1200, 0.04, 0.035, 'triangle', 450);
  };

  const playSwitch = () => {
    playMicroTone(650, 0.035, 0.025, 'sine');
    setTimeout(() => {
      playMicroTone(920, 0.045, 0.03, 'sine');
    }, 35);
  };

  const playSuccess = () => {
    playMicroTone(523.25, 0.08, 0.03, 'sine'); // C5
    setTimeout(() => playMicroTone(659.25, 0.08, 0.03, 'sine'), 60); // E5
    setTimeout(() => playMicroTone(783.99, 0.12, 0.04, 'sine'), 120); // G5
  };

  return (
    <SoundContext.Provider
      value={{
        soundEnabled,
        toggleSound,
        playHover,
        playClick,
        playSwitch,
        playSuccess
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};
