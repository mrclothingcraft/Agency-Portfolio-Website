import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

interface SoundContextType {
  soundEnabled: boolean;
  toggleSound: () => void;
  playHover: () => void;
  playClick: () => void;
  playSwitch: () => void;
  playSuccess: () => void;
  playPop: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('aether_sound_fx_v2');
      if (saved !== null) return saved === 'true';
      const oldSaved = localStorage.getItem('aether_sound_fx');
      if (oldSaved !== null) return oldSaved === 'true';
      return true; // default ON for rich experience
    } catch {
      return true;
    }
  });

  const audioCtxRef = useRef<AudioContext | null>(null);
  const isUnlockedRef = useRef<boolean>(false);
  const lastSoundTimeRef = useRef<number>(0);

  // Initialize or retrieve the shared AudioContext with cross-browser compatibility
  const getAudioContext = useCallback((): AudioContext | null => {
    if (typeof window === 'undefined') return null;

    if (!audioCtxRef.current) {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

      if (AudioCtxClass) {
        try {
          audioCtxRef.current = new AudioCtxClass();
        } catch (e) {
          console.warn('Could not initialize AudioContext:', e);
        }
      }
    }

    return audioCtxRef.current;
  }, []);

  // Unlock Web Audio on mobile, tablet, and desktop on the very first user interaction
  const unlockAudio = useCallback(() => {
    const ctx = getAudioContext();
    if (!ctx) return;

    if (ctx.state === 'suspended' || (ctx.state as string) === 'interrupted') {
      ctx.resume().catch(() => {});
    }

    // Crucial for iOS Safari / WebKit: play a 1-sample silent buffer synchronously
    if (!isUnlockedRef.current) {
      try {
        const buffer = ctx.createBuffer(1, 1, 22050);
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.start(0);
        isUnlockedRef.current = true;
      } catch (_) {}
    }
  }, [getAudioContext]);

  // Global touch and pointer unlock listener
  useEffect(() => {
    const handleGesture = () => {
      unlockAudio();
    };

    window.addEventListener('pointerdown', handleGesture, { passive: true });
    window.addEventListener('touchstart', handleGesture, { passive: true });
    window.addEventListener('touchend', handleGesture, { passive: true });
    window.addEventListener('click', handleGesture, { passive: true });
    window.addEventListener('keydown', handleGesture, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', handleGesture);
      window.removeEventListener('touchstart', handleGesture);
      window.removeEventListener('touchend', handleGesture);
      window.removeEventListener('click', handleGesture);
      window.removeEventListener('keydown', handleGesture);
    };
  }, [unlockAudio]);

  // Core tone synthesizer with robust state handling and audible frequency balance
  const playTone = useCallback(
    ({
      freq,
      duration,
      volume = 0.16,
      type = 'triangle',
      endFreq,
      forcePlay = false,
      delay = 0,
    }: {
      freq: number;
      duration: number;
      volume?: number;
      type?: OscillatorType;
      endFreq?: number;
      forcePlay?: boolean;
      delay?: number;
    }) => {
      if (!soundEnabled && !forcePlay) return;

      const ctx = getAudioContext();
      if (!ctx) return;

      const execute = () => {
        try {
          const startTime = ctx.currentTime + (delay > 0 ? delay / 1000 : 0.002);
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = type;
          osc.frequency.setValueAtTime(Math.max(freq, 30), startTime);

          if (endFreq && endFreq > 0) {
            osc.frequency.exponentialRampToValueAtTime(
              Math.max(endFreq, 30),
              startTime + duration
            );
          }

          // Smooth attack and natural exponential decay
          gain.gain.setValueAtTime(0.0001, startTime);
          const attackTime = Math.min(0.005, duration * 0.2);
          gain.gain.linearRampToValueAtTime(volume, startTime + attackTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(startTime);
          osc.stop(startTime + duration + 0.02);
        } catch (_) {}
      };

      if (ctx.state === 'suspended' || (ctx.state as string) === 'interrupted') {
        ctx
          .resume()
          .then(execute)
          .catch(() => {});
      } else {
        execute();
      }
    },
    [getAudioContext, soundEnabled]
  );

  // Toggle sound with audible feedback chime
  const toggleSound = useCallback(() => {
    unlockAudio();

    setSoundEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('aether_sound_fx_v2', String(next));
        localStorage.setItem('aether_sound_fx', String(next));
      } catch {}

      if (next) {
        // Play an immediate cheerful chime when turning on (forcePlay=true bypasses mute check)
        playTone({ freq: 580, duration: 0.05, volume: 0.20, type: 'triangle', forcePlay: true });
        playTone({ freq: 920, duration: 0.08, volume: 0.22, type: 'triangle', delay: 45, forcePlay: true });
      } else {
        // Soft downward blip right before silencing
        playTone({ freq: 650, duration: 0.04, volume: 0.12, type: 'triangle', forcePlay: true });
        playTone({ freq: 380, duration: 0.05, volume: 0.10, type: 'triangle', delay: 35, forcePlay: true });
      }

      return next;
    });
  }, [playTone, unlockAudio]);

  // Crisp mechanical/digital UI click
  const playClick = useCallback(() => {
    if (!soundEnabled) return;
    const now = Date.now();
    // 50ms throttle prevents double playback from nested capture/bubble handlers
    if (now - lastSoundTimeRef.current < 50) return;
    lastSoundTimeRef.current = now;

    unlockAudio();
    playTone({
      freq: 820,
      endFreq: 240,
      duration: 0.045,
      volume: 0.16,
      type: 'triangle',
    });
  }, [playTone, soundEnabled, unlockAudio]);

  // Gentle, soft air micro-tone on hover (desktop only)
  const playHover = useCallback(() => {
    if (!soundEnabled) return;
    // Don't play hover on pure touch devices
    if (typeof window !== 'undefined' && window.matchMedia && !window.matchMedia('(hover: hover)').matches) {
      return;
    }
    const now = Date.now();
    if (now - lastSoundTimeRef.current < 40) return;
    lastSoundTimeRef.current = now;

    playTone({
      freq: 640,
      endFreq: 740,
      duration: 0.035,
      volume: 0.07,
      type: 'sine',
    });
  }, [playTone, soundEnabled]);

  // Rising two-tone micro-chime for tabs and filters
  const playSwitch = useCallback(() => {
    if (!soundEnabled) return;
    const now = Date.now();
    if (now - lastSoundTimeRef.current < 60) return;
    lastSoundTimeRef.current = now;

    unlockAudio();
    playTone({ freq: 520, duration: 0.04, volume: 0.14, type: 'triangle' });
    playTone({ freq: 780, duration: 0.06, volume: 0.15, type: 'triangle', delay: 30 });
  }, [playTone, soundEnabled, unlockAudio]);

  // Harmonic chord for forms, completions, and milestones
  const playSuccess = useCallback(() => {
    if (!soundEnabled) return;
    unlockAudio();
    playTone({ freq: 523.25, duration: 0.08, volume: 0.14, type: 'triangle' }); // C5
    playTone({ freq: 659.25, duration: 0.08, volume: 0.14, type: 'triangle', delay: 50 }); // E5
    playTone({ freq: 783.99, duration: 0.14, volume: 0.16, type: 'triangle', delay: 100 }); // G5
  }, [playTone, soundEnabled, unlockAudio]);

  // Playful pop tone
  const playPop = useCallback(() => {
    if (!soundEnabled) return;
    unlockAudio();
    playTone({
      freq: 420,
      endFreq: 780,
      duration: 0.045,
      volume: 0.15,
      type: 'sine',
    });
  }, [playTone, soundEnabled, unlockAudio]);

  // Global delegated click listener so EVERY interactive button, link, and card sounds on tap/click
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      if (!soundEnabled) return;
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check if target or parent is interactive
      const interactive = target.closest(
        'button, a, [role="button"], input[type="button"], input[type="submit"], [data-sound="click"], .cursor-pointer'
      );

      if (interactive) {
        // Respect explicit opt-outs or sound toggle button (which has its own chime)
        if (
          interactive.hasAttribute('data-no-sound') ||
          interactive.id === 'sound-fx-toggle-btn' ||
          interactive.id === 'mobile-sound-toggle-btn'
        ) {
          return;
        }
        playClick();
      }
    };

    document.addEventListener('click', handleGlobalClick, { capture: true });
    return () => {
      document.removeEventListener('click', handleGlobalClick, { capture: true });
    };
  }, [playClick, soundEnabled]);

  return (
    <SoundContext.Provider
      value={{
        soundEnabled,
        toggleSound,
        playHover,
        playClick,
        playSwitch,
        playSuccess,
        playPop,
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

