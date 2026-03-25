import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import { globalScroll } from './useScrollValue';

function Particles({ isDark }: { isDark: boolean }) {
  const count = 300;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const s = globalScroll;
    ref.current.rotation.y = state.clock.elapsedTime * 0.015 + s * 1.5;
    ref.current.rotation.x = state.clock.elapsedTime * 0.008 + s * 0.5;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color={isDark ? '#8899bb' : '#445577'}
        transparent
        opacity={isDark ? 0.6 : 0.35}
        sizeAttenuation
      />
    </points>
  );
}

export default function SceneParticles({ isDark }: { isDark: boolean }) {
  return (
    <>
      <Particles isDark={isDark} />
      {isDark && <Stars radius={40} depth={50} count={800} factor={2} saturation={0.1} fade speed={0.5} />}
    </>
  );
}
