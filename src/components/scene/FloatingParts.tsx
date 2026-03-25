import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Trail } from '@react-three/drei';
import * as THREE from 'three';
import { globalScroll } from './useScrollValue';

function OrbitingRing({ isDark }: { isDark: boolean }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const s = globalScroll;
    
    // Rings are visible while parts are floating, fade as assembled
    const opacity = Math.max(0, 1 - s * 2.5) * (isDark ? 0.2 : 0.12);
    ref.current.rotation.x = t * 0.1 + s * Math.PI;
    ref.current.rotation.y = t * 0.15 + s * 2;
    ref.current.scale.setScalar(3 + s * 1);
    (ref.current.material as THREE.MeshBasicMaterial).opacity = opacity;
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[1, 0.003, 64, 200]} />
      <meshBasicMaterial color={isDark ? '#2E5BFF' : '#3a6aff'} transparent opacity={0.2} />
    </mesh>
  );
}

function OrbitingRing2({ isDark }: { isDark: boolean }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const s = globalScroll;
    const opacity = Math.max(0, 1 - s * 2.5) * 0.08;
    ref.current.rotation.x = Math.PI / 3 + t * 0.08 - s * 2;
    ref.current.rotation.z = t * 0.12 + s * Math.PI;
    ref.current.scale.setScalar(3.5 + s * 1.5);
    (ref.current.material as THREE.MeshBasicMaterial).opacity = opacity;
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[1, 0.002, 64, 200]} />
      <meshBasicMaterial color={isDark ? '#ffffff' : '#000000'} transparent opacity={0.08} />
    </mesh>
  );
}

function DataStream({ isDark }: { isDark: boolean }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const s = globalScroll;
    // Visible only during assembly phase
    const visibility = Math.max(0, 1 - s * 2);
    const radius = 3.5;
    ref.current.position.set(
      Math.cos(t * 0.6) * radius,
      Math.sin(t * 0.8) * 1.5 + 1,
      Math.sin(t * 0.6) * radius
    );
    ref.current.rotation.x = t;
    ref.current.rotation.y = t * 0.7;
    ref.current.scale.setScalar(visibility * 0.15);
  });

  return (
    <Trail width={0.5} length={8} color={isDark ? '#2E5BFF' : '#3a6aff'} attenuation={(w) => w * w}>
      <mesh ref={ref}>
        <octahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial
          color={isDark ? '#2E5BFF' : '#3a6aff'}
          metalness={0.9}
          roughness={0.1}
          emissive={isDark ? '#1a3fb5' : '#2E5BFF'}
          emissiveIntensity={0.3}
        />
      </mesh>
    </Trail>
  );
}

export default function FloatingParts({ isDark }: { isDark: boolean }) {
  return (
    <group>
      <OrbitingRing isDark={isDark} />
      <OrbitingRing2 isDark={isDark} />
      <DataStream isDark={isDark} />
    </group>
  );
}
