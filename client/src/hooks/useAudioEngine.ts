import { useState, useEffect, useCallback } from 'react';
import * as Tone from 'tone';

export function useAudioEngine() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [ambientPad, setAmbientPad] = useState<Tone.PolySynth | null>(null);
  const [crackle, setCrackle] = useState<Tone.Noise | null>(null);

  const initAudio = useCallback(async () => {
    if (isInitialized) return;
    
    await Tone.start();
    
    // Ambient Pad
    const pad = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'sine' },
      envelope: { attack: 4, decay: 1, sustain: 1, release: 4 }
    }).toDestination();
    pad.volume.value = -30;
    
    // Vinyl Crackle
    const noise = new Tone.Noise('pink').toDestination();
    noise.volume.value = -45;
    const filter = new Tone.AutoFilter(0.1, 400, 4).start();
    noise.connect(filter);
    
    setAmbientPad(pad);
    setCrackle(noise);
    setIsInitialized(true);
    
    // Start ambient
    pad.triggerAttack(['C3', 'E3', 'G3', 'B3']);
    noise.start();
  }, [isInitialized]);

  const triggerHoverSound = useCallback(() => {
    if (!isInitialized) return;
    const synth = new Tone.MonoSynth({
      oscillator: { type: 'sine' },
      envelope: { attack: 0.1, release: 0.3 }
    }).toDestination();
    synth.volume.value = -25;
    synth.triggerAttackRelease('C5', '16n');
  }, [isInitialized]);

  const triggerSectionTransition = useCallback(() => {
    if (!isInitialized) return;
    const sweep = new Tone.NoiseSynth({
      noise: { type: 'white' },
      envelope: { attack: 0.5, release: 1 }
    }).toDestination();
    sweep.volume.value = -35;
    sweep.triggerAttackRelease('2n');
  }, [isInitialized]);

  return { initAudio, isInitialized, triggerHoverSound, triggerSectionTransition };
}