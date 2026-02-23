import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useAmbientStore } from '@/store/useAmbientStore';
import { useScrollIntensity } from '@/hooks/useScrollIntensity';

function ParticleCloud({ count = 2000 }) {
    const pointsRef = useRef<THREE.Points>(null);
    const isAmbient = useAmbientStore((state) => state.isAmbient);
    const scrollIntensity = useScrollIntensity();

    // Create a stable random array of points once
    const positions = useRef(
        new Float32Array(count * 3).map((_, i) => (Math.random() - 0.5) * 10)
    ).current;

    useFrame((state, delta) => {
        if (!pointsRef.current || !isAmbient) return;

        // Base slow rotation, amplified by scroll velocity reading framer-motion value without re-rendering
        const currentIntensity = typeof scrollIntensity === 'number' ? scrollIntensity : (scrollIntensity as any).get();
        const rotationSpeed = 0.05 + (currentIntensity * 0.5);

        pointsRef.current.rotation.y -= delta * rotationSpeed;
        pointsRef.current.rotation.x -= delta * (rotationSpeed * 0.5);
    });

    return (
        <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#F4A261"
                size={0.02}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.3}
            />
        </Points>
    );
}

export function AmbientCanvas() {
    const isAmbient = useAmbientStore((state) => state.isAmbient);

    return (
        <div
            className="fixed inset-0 pointer-events-none z-0 mix-blend-screen opacity-60"
            style={{ opacity: isAmbient ? 1 : 0, transition: 'opacity 0.5s ease' }}
        >
            <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
                {isAmbient && <ParticleCloud count={1500} />}
            </Canvas>
            {/* Fallback subtle CSS glow so it's not totally empty */}
            {isAmbient && (
                <>
                    <div className="absolute top-[20%] right-[10%] w-[40vw] h-[40vh] bg-primary/5 blur-[120px] rounded-full" />
                    <div className="absolute bottom-[10%] left-[10%] w-[30vw] h-[30vh] bg-accent/5 blur-[100px] rounded-full" />
                </>
            )}
        </div>
    );
}
