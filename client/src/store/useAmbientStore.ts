import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AmbientState {
    isAmbient: boolean;
    toggleAmbient: () => void;
    setAmbient: (val: boolean) => void;
}

export const useAmbientStore = create<AmbientState>()(
    persist(
        (set) => ({
            isAmbient: true,
            toggleAmbient: () => set((state) => ({ isAmbient: !state.isAmbient })),
            setAmbient: (val) => set({ isAmbient: val }),
        }),
        {
            name: 'portfolio-ambient-storage', // unique name
        }
    )
);
