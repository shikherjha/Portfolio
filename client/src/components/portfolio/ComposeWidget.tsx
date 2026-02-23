import { useState, useRef, useEffect } from "react";
import * as Tone from "tone";
import { motion } from "framer-motion";
import { Play, Square } from "lucide-react";

export function ComposeWidget() {
    const [atmosphereOn, setAtmosphereOn] = useState(false);
    const synthRef = useRef<Tone.MembraneSynth | null>(null);
    const hatRef = useRef<Tone.MetalSynth | null>(null);
    const verbRef = useRef<Tone.Reverb | null>(null);
    const autoPadRef = useRef<Tone.PolySynth | null>(null);

    const toggleAtmosphere = async () => {
        await Tone.start();

        if (atmosphereOn) {
            autoPadRef.current?.releaseAll();
            setAtmosphereOn(false);
            return;
        }

        if (!synthRef.current) {
            verbRef.current = new Tone.Reverb(4).toDestination();

            synthRef.current = new Tone.MembraneSynth({
                pitchDecay: 0.05,
                octaves: 2,
                oscillator: { type: "sine" },
                envelope: { attack: 0.01, decay: 0.4, sustain: 0.01, release: 1.2 }
            }).connect(verbRef.current);
            synthRef.current.volume.value = -8;

            hatRef.current = new Tone.MetalSynth({
                envelope: { attack: 0.001, decay: 0.1, release: 0.01 },
                harmonicity: 5.1,
                modulationIndex: 32,
                resonance: 4000,
                octaves: 1.5
            }).connect(verbRef.current);
            hatRef.current.volume.value = -30;

            autoPadRef.current = new Tone.PolySynth(Tone.Synth, {
                oscillator: { type: "sine" },
                envelope: { attack: 4, decay: 2, sustain: 0.5, release: 4 }
            }).connect(verbRef.current);
            autoPadRef.current.volume.value = -25;
        }

        // Swelling ambient chord
        autoPadRef.current?.triggerAttack(["C2", "G2", "D3", "A3"]);
        setAtmosphereOn(true);
    };

    useEffect(() => {
        if (!atmosphereOn) return;

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('a') || target.closest('button')) {
                if (Tone.context.state === "running") {
                    hatRef.current?.triggerAttackRelease("32n", "+0.01", 0.5);
                }
            }
        };

        const handleClick = () => {
            if (Tone.context.state === "running") {
                synthRef.current?.triggerAttackRelease("C1", "8n");
            }
        };

        window.addEventListener("mouseover", handleMouseOver);
        window.addEventListener("mousedown", handleClick);

        return () => {
            window.removeEventListener("mouseover", handleMouseOver);
            window.removeEventListener("mousedown", handleClick);
        };
    }, [atmosphereOn]);

    return (
        <div className="flex flex-col items-center justify-center py-8">
            <motion.button
                onClick={toggleAtmosphere}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-3 px-8 py-4 rounded-full font-heading tracking-wide transition-all border ${atmosphereOn
                    ? "bg-primary/20 text-primary border-primary shadow-[0_0_20px_hsla(var(--primary)/0.3)]"
                    : "bg-card/40 text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                    }`}
            >
                {atmosphereOn ? <Square className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
                {atmosphereOn ? "Stop Atmosphere" : "Enable Atmosphere"}
            </motion.button>

            {atmosphereOn && (
                <div className="flex gap-1 mt-6 h-4 items-end justify-center w-full max-w-[100px] overflow-hidden">
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="w-1.5 bg-primary/70 rounded-full"
                            animate={{ height: ["10%", "100%", "10%"] }}
                            transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: i * 0.2 }}
                        />
                    ))}
                </div>
            )}

            <p className="mt-4 text-[10px] md:text-xs font-mono uppercase tracking-widest text-muted-foreground/50 text-center max-w-sm">
                Interactive Canvas Active. Click & Hover to Compose.
            </p>
        </div>
    );
}
