import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

interface SoundContextType {
  soundEnabled: boolean;
  toggleSound: () => void;
  playHover: () => void;
  playClick: () => void;
  playSwitch: () => void;
  playTap: () => void;
  playSuccess: () => void;
  playPop: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

// Helper: Convert Float32Array samples to standard PCM 16-bit WAV base64 data URI
function samplesToWavUri(samples: Float32Array, sampleRate: number = 44100): string {
  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);

  const writeString = (offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  writeString(0, 'RIFF');
  view.setUint32(4, 36 + samples.length * 2, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM format
  view.setUint16(22, 1, true); // Mono
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true); // byte rate (sampleRate * numChannels * bitsPerSample/8)
  view.setUint16(32, 2, true); // block align
  view.setUint16(34, 16, true); // 16 bits per sample
  writeString(36, 'data');
  view.setUint32(40, samples.length * 2, true);

  let offset = 44;
  for (let i = 0; i < samples.length; i++, offset += 2) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }

  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return 'data:audio/wav;base64,' + btoa(binary);
}

// Generate sound waveform sample buffers mathematically
function generateSoundSamples() {
  const sampleRate = 44100;

  // 1. Tactile Click: Crisp snap (1900Hz) + warm body (820Hz) + low resonance (340Hz)
  // Perfectly tuned for phone speakers, tablets, laptops, and headphones
  const clickLen = Math.floor(sampleRate * 0.038); // 38ms
  const clickSamples = new Float32Array(clickLen);
  for (let i = 0; i < clickLen; i++) {
    const t = i / sampleRate;
    const snap = Math.sin(2 * Math.PI * 1950 * t) * Math.exp(-t * 900);
    const body = Math.sin(2 * Math.PI * 820 * (1 - t * 4) * t) * Math.exp(-t * 180);
    const low = Math.sin(2 * Math.PI * 340 * t) * Math.exp(-t * 130);
    clickSamples[i] = (snap * 0.48 + body * 0.42 + low * 0.15) * 0.65;
  }

  // 2. Switch: Upward two-tone chime for tabs, filters, category selectors
  const switchLen = Math.floor(sampleRate * 0.052);
  const switchSamples = new Float32Array(switchLen);
  for (let i = 0; i < switchLen; i++) {
    const t = i / sampleRate;
    const freq = t < 0.022 ? 620 : 940;
    const env = Math.exp(-((t % 0.026) * 160));
    switchSamples[i] = Math.sin(2 * Math.PI * freq * t) * env * 0.42;
  }

  // 3. Tap: Ultra-subtle tactile micro-tick for inputs, checkboxes, radios
  const tapLen = Math.floor(sampleRate * 0.02);
  const tapSamples = new Float32Array(tapLen);
  for (let i = 0; i < tapLen; i++) {
    const t = i / sampleRate;
    tapSamples[i] = Math.sin(2 * Math.PI * 1350 * t) * Math.exp(-t * 400) * 0.32;
  }

  // 4. Hover: Gentle airy whoosh (desktop mouse only)
  const hoverLen = Math.floor(sampleRate * 0.028);
  const hoverSamples = new Float32Array(hoverLen);
  for (let i = 0; i < hoverLen; i++) {
    const t = i / sampleRate;
    hoverSamples[i] = Math.sin(2 * Math.PI * (640 + t * 3000) * t) * Math.exp(-t * 220) * 0.16;
  }

  // 5. Success: Harmonic 4-chord bell (C5, E5, G5, C6)
  const succLen = Math.floor(sampleRate * 0.25);
  const succSamples = new Float32Array(succLen);
  for (let i = 0; i < succLen; i++) {
    const t = i / sampleRate;
    const n1 = Math.sin(2 * Math.PI * 523.25 * t) * Math.exp(-t * 12);
    const n2 = t > 0.04 ? Math.sin(2 * Math.PI * 659.25 * (t - 0.04)) * Math.exp(-(t - 0.04) * 12) : 0;
    const n3 = t > 0.08 ? Math.sin(2 * Math.PI * 783.99 * (t - 0.08)) * Math.exp(-(t - 0.08) * 10) : 0;
    const n4 = t > 0.12 ? Math.sin(2 * Math.PI * 1046.5 * (t - 0.12)) * Math.exp(-(t - 0.12) * 8) : 0;
    succSamples[i] = (n1 * 0.25 + n2 * 0.25 + n3 * 0.3 + n4 * 0.35) * 0.5;
  }

  // 6. Sound On / Off chimes
  const onLen = Math.floor(sampleRate * 0.12);
  const onSamples = new Float32Array(onLen);
  for (let i = 0; i < onLen; i++) {
    const t = i / sampleRate;
    const f1 = Math.sin(2 * Math.PI * 659.25 * t) * Math.exp(-t * 25);
    const f2 = t > 0.045 ? Math.sin(2 * Math.PI * 987.77 * (t - 0.045)) * Math.exp(-(t - 0.045) * 20) : 0;
    onSamples[i] = (f1 * 0.4 + f2 * 0.5) * 0.55;
  }

  const offLen = Math.floor(sampleRate * 0.08);
  const offSamples = new Float32Array(offLen);
  for (let i = 0; i < offLen; i++) {
    const t = i / sampleRate;
    const f1 = Math.sin(2 * Math.PI * 740 * t) * Math.exp(-t * 30);
    const f2 = t > 0.035 ? Math.sin(2 * Math.PI * 440 * (t - 0.035)) * Math.exp(-(t - 0.035) * 25) : 0;
    offSamples[i] = (f1 * 0.35 + f2 * 0.45) * 0.4;
  }

  return {
    click: clickSamples,
    switch: switchSamples,
    tap: tapSamples,
    hover: hoverSamples,
    success: succSamples,
    soundOn: onSamples,
    soundOff: offSamples,
  };
}

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('aether_sound_fx_v4');
      if (saved !== null) return saved === 'true';
      return true; // Default ON
    } catch {
      return true;
    }
  });

  const audioCtxRef = useRef<AudioContext | null>(null);
  const audioBuffersRef = useRef<Record<string, AudioBuffer>>({});
  const wavUrisRef = useRef<Record<string, string>>({});
  const lastSoundTimeRef = useRef<number>(0);
  const isUnlockedRef = useRef<boolean>(false);

  // Initialize sample data and AudioContext
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const raw = generateSoundSamples();
      wavUrisRef.current = {
        click: samplesToWavUri(raw.click),
        switch: samplesToWavUri(raw.switch),
        tap: samplesToWavUri(raw.tap),
        hover: samplesToWavUri(raw.hover),
        success: samplesToWavUri(raw.success),
        soundOn: samplesToWavUri(raw.soundOn),
        soundOff: samplesToWavUri(raw.soundOff),
      };
    } catch (e) {
      console.warn('Could not generate WAV data URIs:', e);
    }
  }, []);

  // Safe getter for Web Audio Context
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
          console.warn('AudioContext creation failed:', e);
        }
      }
    }

    return audioCtxRef.current;
  }, []);

  // Populate Web Audio AudioBuffers once context is created
  const getBuffer = useCallback(
    (name: string): AudioBuffer | null => {
      const ctx = getAudioContext();
      if (!ctx) return null;

      if (audioBuffersRef.current[name]) {
        return audioBuffersRef.current[name];
      }

      try {
        const raw = generateSoundSamples();
        const samples = (raw as Record<string, Float32Array>)[name];
        if (!samples) return null;

        const buffer = ctx.createBuffer(1, samples.length, 44100);
        buffer.copyToChannel(samples, 0);
        audioBuffersRef.current[name] = buffer;
        return buffer;
      } catch (e) {
        console.warn('Buffer creation failed:', e);
        return null;
      }
    },
    [getAudioContext]
  );

  // Universal Web Audio unlocker for mobile Safari, Android Chrome, and desktop
  const unlockAudio = useCallback(() => {
    const ctx = getAudioContext();
    if (!ctx) return;

    if (ctx.state === 'suspended' || (ctx.state as string) === 'interrupted') {
      ctx.resume().catch(() => {});
    }

    if (!isUnlockedRef.current) {
      try {
        const silent = ctx.createBuffer(1, 1, 22050);
        const src = ctx.createBufferSource();
        src.buffer = silent;
        src.connect(ctx.destination);
        src.start(0);
        isUnlockedRef.current = true;
      } catch (_) {}
    }
  }, [getAudioContext]);

  // Global unlock listeners
  useEffect(() => {
    const onUserInteraction = () => {
      unlockAudio();
    };

    window.addEventListener('pointerdown', onUserInteraction, { passive: true });
    window.addEventListener('touchstart', onUserInteraction, { passive: true });
    window.addEventListener('click', onUserInteraction, { passive: true });
    window.addEventListener('keydown', onUserInteraction, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', onUserInteraction);
      window.removeEventListener('touchstart', onUserInteraction);
      window.removeEventListener('click', onUserInteraction);
      window.removeEventListener('keydown', onUserInteraction);
    };
  }, [unlockAudio]);

  // Master Sound Playback Engine with automatic fallback
  const playSound = useCallback(
    (soundName: string, force: boolean = false, minIntervalMs: number = 45) => {
      if (!soundEnabled && !force) return;

      const now = Date.now();
      if (now - lastSoundTimeRef.current < minIntervalMs) return;
      lastSoundTimeRef.current = now;

      unlockAudio();

      const ctx = getAudioContext();
      let playedViaWebAudio = false;

      // Primary: Web Audio AudioBufferSourceNode (0ms latency, best performance)
      if (ctx) {
        try {
          if (ctx.state === 'suspended' || (ctx.state as string) === 'interrupted') {
            ctx.resume();
          }
          const buffer = getBuffer(soundName);
          if (buffer) {
            const source = ctx.createBufferSource();
            source.buffer = buffer;
            source.connect(ctx.destination);
            source.start(0);
            playedViaWebAudio = true;
          }
        } catch (_) {
          playedViaWebAudio = false;
        }
      }

      // Secondary Fallback: HTML5 Audio with pre-encoded WAV URI
      if (!playedViaWebAudio && wavUrisRef.current[soundName]) {
        try {
          const audio = new Audio(wavUrisRef.current[soundName]);
          audio.volume = 0.6;
          audio.play().catch(() => {});
        } catch (_) {}
      }
    },
    [getAudioContext, getBuffer, soundEnabled, unlockAudio]
  );

  // Discrete actions for components
  const playClick = useCallback(() => {
    playSound('click', false, 40);
  }, [playSound]);

  const playSwitch = useCallback(() => {
    playSound('switch', false, 50);
  }, [playSound]);

  const playTap = useCallback(() => {
    playSound('tap', false, 35);
  }, [playSound]);

  const playHover = useCallback(() => {
    if (!soundEnabled) return;
    // Don't play hover on touch devices
    if (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      !window.matchMedia('(hover: hover)').matches
    ) {
      return;
    }
    playSound('hover', false, 50);
  }, [playSound, soundEnabled]);

  const playSuccess = useCallback(() => {
    playSound('success', false, 150);
  }, [playSound]);

  const playPop = useCallback(() => {
    playSound('click', false, 40);
  }, [playSound]);

  // Toggle sound with audible feedback chimes
  const toggleSound = useCallback(() => {
    unlockAudio();

    setSoundEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('aether_sound_fx_v4', String(next));
      } catch {}

      // Play immediate confirmation chime
      if (next) {
        playSound('soundOn', true, 0);
      } else {
        playSound('soundOff', true, 0);
      }

      return next;
    });
  }, [playSound, unlockAudio]);

  // Global Interaction Listener: Catches EVERY clickable/interactive element across all pages
  useEffect(() => {
    // Track touch positions to distinguish genuine mobile taps from scrolling swipes
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;

    const handlePointerDown = (e: PointerEvent) => {
      touchStartX = e.clientX;
      touchStartY = e.clientY;
      touchStartTime = Date.now();
      unlockAudio();
    };

    const handleInteraction = (e: Event) => {
      if (!soundEnabled) return;

      const target = e.target as EventTarget | null;
      if (!target) return;

      const el = target instanceof Element ? target : null;
      if (!el) return;

      // Find closest interactive element
      const interactive = el.closest<HTMLElement>(
        'button, a, [role="button"], [role="tab"], [role="link"], [role="menuitem"], ' +
          'input, select, textarea, label, summary, details, [tabindex]:not([tabindex="-1"]), ' +
          '[data-sound], .cursor-pointer, [data-interactive="true"]'
      );

      if (!interactive) return;

      // Skip elements explicitly opting out or sound toggle buttons (handled separately)
      if (
        interactive.hasAttribute('data-no-sound') ||
        interactive.id === 'sound-fx-toggle-btn' ||
        interactive.id === 'mobile-sound-toggle-btn'
      ) {
        return;
      }

      // Check if it's a tab, filter pill, or toggle switch
      const isTabOrFilter =
        interactive.getAttribute('role') === 'tab' ||
        interactive.getAttribute('data-sound') === 'switch' ||
        interactive.id.includes('filter') ||
        interactive.id.includes('tab') ||
        interactive.className.includes('filter') ||
        interactive.className.includes('tab-btn');

      // Check if it's a checkbox, radio, or select
      const isToggleInput =
        interactive instanceof HTMLInputElement &&
        (interactive.type === 'checkbox' || interactive.type === 'radio');
      const isSelect = interactive instanceof HTMLSelectElement;

      // Check if it's a text input or textarea
      const isTextInput =
        (interactive instanceof HTMLInputElement &&
          ['text', 'email', 'tel', 'search', 'number'].includes(interactive.type)) ||
        interactive instanceof HTMLTextAreaElement;

      if (isTabOrFilter || isToggleInput || isSelect) {
        playSwitch();
      } else if (isTextInput) {
        playTap();
      } else {
        playClick();
      }
    };

    const handlePointerUp = (e: PointerEvent) => {
      // For touch interactions: Only trigger if the finger did not drag/scroll
      if (e.pointerType === 'touch') {
        const deltaX = Math.abs(e.clientX - touchStartX);
        const deltaY = Math.abs(e.clientY - touchStartY);
        const elapsed = Date.now() - touchStartTime;

        // If moved more than 10px or held longer than 600ms, it was a scroll/drag
        if (deltaX > 10 || deltaY > 10 || elapsed > 600) {
          return;
        }

        handleInteraction(e);
      }
    };

    // For mouse clicks and accessibility keyboards
    const handleClick = (e: MouseEvent) => {
      // PointerUp already handles touch devices cleanly without scroll delay
      handleInteraction(e);
    };

    document.addEventListener('pointerdown', handlePointerDown, { capture: true, passive: true });
    document.addEventListener('pointerup', handlePointerUp, { capture: true, passive: true });
    document.addEventListener('click', handleClick, { capture: true });

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown, { capture: true });
      document.removeEventListener('pointerup', handlePointerUp, { capture: true });
      document.removeEventListener('click', handleClick, { capture: true });
    };
  }, [playClick, playSwitch, playTap, soundEnabled, unlockAudio]);

  return (
    <SoundContext.Provider
      value={{
        soundEnabled,
        toggleSound,
        playHover,
        playClick,
        playSwitch,
        playTap,
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


