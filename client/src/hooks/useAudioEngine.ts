import { useState, useCallback } from 'react';

// This is a dummy mock to prevent breaking other components during the transition.
// All Tone.js logic has been removed as per the user's request.
export function useAudioEngine() {
  const [isInitialized, setIsInitialized] = useState(false);

  const initAudio = useCallback(async () => {
    // No-op
  }, []);

  const triggerHoverSound = useCallback(() => {
    // No-op
  }, []);

  const triggerSectionTransition = useCallback(() => {
    // No-op
  }, []);

  return { initAudio, isInitialized, triggerHoverSound, triggerSectionTransition };
}