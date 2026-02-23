import { useState, useCallback } from 'react';
import * as Tone from 'tone';

let globalInitialized = false;
let padSynth: Tone.PolySynth | null = null;
let hoverSynth: Tone.PolySynth | null = null;
let pianoSynth: Tone.PolySynth | null = null;

export function useAudioEngine() {
  const [isInitialized, setIsInitialized] = useState(globalInitialized);

  const initAudio = useCallback(async () => {
    if (globalInitialized) return;

    await Tone.start();

    // Ambient Pad
    padSynth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'sine' },
      envelope: { attack: 4, decay: 1, sustain: 1, release: 4 }
    }).toDestination();
    padSynth.volume.value = -30;

    // Hover Synth (Shared Singleton)
    hoverSynth = new Tone.PolySynth(Tone.MonoSynth, {
      oscillator: { type: 'sine' },
      envelope: { attack: 0.05, release: 0.2 }
    }).toDestination();
    hoverSynth.volume.value = -25;

    // Piano Synth (Shared Singleton)
    pianoSynth = new Tone.PolySynth(Tone.FMSynth, {
      harmonicity: 8,
      modulationIndex: 2,
      oscillator: { type: "sine" },
      envelope: { attack: 0.01, decay: 2, sustain: 0.1, release: 2 },
      modulation: { type: "square" },
      modulationEnvelope: { attack: 0.002, decay: 0.2, sustain: 0, release: 0.2 }
    }).toDestination();
    pianoSynth.volume.value = -25;

    globalInitialized = true;
    setIsInitialized(true);

    // Start ambient
    padSynth.triggerAttack(['C3', 'E3', 'G3', 'B3']);
  }, []);

  const triggerHoverSound = useCallback(() => {
    if (!globalInitialized || !hoverSynth) return;
    if (Tone.context.state !== "running") return;
    hoverSynth.triggerAttackRelease(['C5'], '32n');
  }, []);

  const triggerSectionTransition = useCallback(() => {
    if (!globalInitialized || !pianoSynth) return;
    if (Tone.context.state !== "running") return;
    pianoSynth.triggerAttackRelease(['C4', 'E4', 'G4', 'B4'], '8n');
  }, []);

  return { initAudio, isInitialized, triggerHoverSound, triggerSectionTransition };
}