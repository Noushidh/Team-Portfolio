import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { globalScroll } from './useScrollValue';

// Easing helper
function smoothstep(min: number, max: number, value: number) {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

// Monitor assembles from above
function Monitor({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  const bodyColor = isDark ? '#1a2744' : '#c8d0de';
  const accentColor = isDark ? '#2E5BFF' : '#3a6aff';

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    const s = globalScroll;

    // Monitor starts floating high and rotated, assembles down to table
    const assembleProgress = smoothstep(0.0, 0.35, s);
    
    // Start position: high up, rotated, offset
    const startY = 4;
    const startX = -2;
    const startZ = 1;
    const startRotY = Math.PI * 0.6;
    const startRotX = 0.3;
    const startRotZ = -0.15;

    // End position: on the desk
    const endY = 0.75;
    const endX = 0;
    const endZ = -0.3;

    groupRef.current.position.x = THREE.MathUtils.lerp(startX, endX, assembleProgress) + Math.sin(t * 0.3) * 0.03 * (1 - assembleProgress);
    groupRef.current.position.y = THREE.MathUtils.lerp(startY, endY, assembleProgress) + Math.sin(t * 0.5) * 0.05 * (1 - assembleProgress * 0.8);
    groupRef.current.position.z = THREE.MathUtils.lerp(startZ, endZ, assembleProgress);

    groupRef.current.rotation.y = THREE.MathUtils.lerp(startRotY, 0, assembleProgress) + Math.sin(t * 0.2) * 0.02 * (1 - assembleProgress);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(startRotX, 0, assembleProgress);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(startRotZ, 0, assembleProgress);

    // Gentle floating when not assembled
    const floatAmount = 1 - assembleProgress;
    groupRef.current.position.y += Math.sin(t * 0.8) * 0.15 * floatAmount;
  });

  return (
    <group ref={groupRef}>
      {/* Monitor frame */}
      <mesh castShadow>
        <boxGeometry args={[2.4, 1.5, 0.08]} />
        <meshPhysicalMaterial color={bodyColor} metalness={0.8} roughness={0.15} clearcoat={0.5} />
      </mesh>

      {/* Screen */}
      <mesh position={[0, 0, 0.045]}>
        <planeGeometry args={[2.2, 1.32]} />
        <meshPhysicalMaterial
          color={isDark ? '#0a1628' : '#e8edf5'}
          metalness={0.1}
          roughness={0.05}
          transmission={0.3}
          thickness={0.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Screen glow */}
      <mesh position={[0, 0, 0.05]}>
        <planeGeometry args={[2.2, 1.32]} />
        <meshBasicMaterial color={accentColor} transparent opacity={0.05} />
      </mesh>

      {/* Bezel wireframe */}
      <mesh position={[0, 0, 0.046]}>
        <boxGeometry args={[2.25, 1.36, 0.001]} />
        <meshBasicMaterial color={accentColor} transparent opacity={0.08} wireframe />
      </mesh>

      {/* Camera dot */}
      <mesh position={[0, 0.72, 0.04]}>
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshBasicMaterial color={accentColor} />
      </mesh>
    </group>
  );
}

// Monitor stand assembles from below-left
function Stand({ isDark }: { isDark: boolean }) {
  const ref = useRef<THREE.Group>(null);
  const bodyColor = isDark ? '#1a2744' : '#c8d0de';
  const accentColor = isDark ? '#2E5BFF' : '#3a6aff';

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const s = globalScroll;

    const assembleProgress = smoothstep(0.05, 0.4, s);

    const startY = -3;
    const startX = 1.5;
    const startRotZ = Math.PI * 0.3;

    ref.current.position.x = THREE.MathUtils.lerp(startX, 0, assembleProgress);
    ref.current.position.y = THREE.MathUtils.lerp(startY, -0.55, assembleProgress) + Math.sin(t * 0.6) * 0.1 * (1 - assembleProgress);
    ref.current.position.z = THREE.MathUtils.lerp(1.5, -0.3, assembleProgress);

    ref.current.rotation.z = THREE.MathUtils.lerp(startRotZ, 0, assembleProgress);
    ref.current.rotation.x = THREE.MathUtils.lerp(0.4, 0, assembleProgress);
  });

  return (
    <group ref={ref}>
      {/* Stand neck */}
      <mesh position={[0, 0.3, 0.1]} castShadow>
        <boxGeometry args={[0.15, 0.6, 0.08]} />
        <meshPhysicalMaterial color={bodyColor} metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Stand base */}
      <mesh castShadow>
        <cylinderGeometry args={[0.6, 0.7, 0.04, 32]} />
        <meshPhysicalMaterial color={bodyColor} metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Accent ring */}
      <mesh position={[0, 0.02, 0]}>
        <torusGeometry args={[0.65, 0.008, 16, 64]} />
        <meshBasicMaterial color={accentColor} transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

// Keyboard flies in from the right
function Keyboard({ isDark }: { isDark: boolean }) {
  const ref = useRef<THREE.Group>(null);
  const bodyColor = isDark ? '#1a2744' : '#c8d0de';

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const s = globalScroll;

    const assembleProgress = smoothstep(0.1, 0.5, s);

    const startX = 5;
    const startY = 2;
    const startZ = 3;
    const startRotY = -Math.PI * 0.8;
    const startRotX = 0.5;

    // Final position: in front of monitor on the desk
    const endX = 0;
    const endY = -0.82;
    const endZ = 1.5;

    ref.current.position.x = THREE.MathUtils.lerp(startX, endX, assembleProgress) + Math.sin(t * 0.4) * 0.1 * (1 - assembleProgress);
    ref.current.position.y = THREE.MathUtils.lerp(startY, endY, assembleProgress) + Math.sin(t * 0.7) * 0.12 * (1 - assembleProgress);
    ref.current.position.z = THREE.MathUtils.lerp(startZ, endZ, assembleProgress);

    ref.current.rotation.y = THREE.MathUtils.lerp(startRotY, 0, assembleProgress);
    ref.current.rotation.x = THREE.MathUtils.lerp(startRotX, -Math.PI * 0.1, assembleProgress);
    ref.current.rotation.z = THREE.MathUtils.lerp(0.3, 0, assembleProgress);

    ref.current.scale.setScalar(0.8);
  });

  return (
    <group ref={ref}>
      <mesh castShadow>
        <boxGeometry args={[2, 0.05, 0.7]} />
        <meshPhysicalMaterial color={bodyColor} metalness={0.7} roughness={0.2} clearcoat={0.3} />
      </mesh>
      {[-0.2, -0.05, 0.1, 0.25].map((z, row) =>
        Array.from({ length: 12 }).map((_, col) => (
          <mesh key={`${row}-${col}`} position={[(col - 5.5) * 0.15, 0.03, z]}>
            <boxGeometry args={[0.12, 0.02, 0.12]} />
            <meshPhysicalMaterial color={isDark ? '#0d1a33' : '#dde3ed'} metalness={0.5} roughness={0.3} />
          </mesh>
        ))
      )}
    </group>
  );
}

// Mouse flies in from the left
function Mouse({ isDark }: { isDark: boolean }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const s = globalScroll;

    const assembleProgress = smoothstep(0.15, 0.55, s);

    const startX = -4;
    const startY = 3;
    const startZ = 2;

    const endX = 1.5;
    const endY = -0.82;
    const endZ = 1.5;

    ref.current.position.x = THREE.MathUtils.lerp(startX, endX, assembleProgress) + Math.sin(t * 0.5 + 2) * 0.15 * (1 - assembleProgress);
    ref.current.position.y = THREE.MathUtils.lerp(startY, endY, assembleProgress) + Math.cos(t * 0.6) * 0.1 * (1 - assembleProgress);
    ref.current.position.z = THREE.MathUtils.lerp(startZ, endZ, assembleProgress);

    ref.current.rotation.y = THREE.MathUtils.lerp(Math.PI, 0, assembleProgress);
    ref.current.rotation.x = THREE.MathUtils.lerp(0.8, -0.2, assembleProgress);
    ref.current.rotation.z = THREE.MathUtils.lerp(-0.5, 0, assembleProgress);

    ref.current.scale.setScalar(0.5);
  });

  return (
    <mesh ref={ref} castShadow>
      <capsuleGeometry args={[0.12, 0.2, 8, 16]} />
      <meshPhysicalMaterial color={isDark ? '#1a2744' : '#c8d0de'} metalness={0.7} roughness={0.2} clearcoat={0.5} />
    </mesh>
  );
}

// Coffee mug appears from above-right
function CoffeeMug({ isDark }: { isDark: boolean }) {
  const ref = useRef<THREE.Group>(null);
  const bodyColor = isDark ? '#2a3a5c' : '#b8c4d8';

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const s = globalScroll;

    const assembleProgress = smoothstep(0.2, 0.55, s);

    ref.current.position.x = THREE.MathUtils.lerp(3, -1.6, assembleProgress) + Math.sin(t * 0.3 + 5) * 0.1 * (1 - assembleProgress);
    ref.current.position.y = THREE.MathUtils.lerp(5, -0.65, assembleProgress) + Math.sin(t * 0.4) * 0.15 * (1 - assembleProgress);
    ref.current.position.z = THREE.MathUtils.lerp(-2, 0.8, assembleProgress);

    ref.current.rotation.y = THREE.MathUtils.lerp(Math.PI * 2, 0, assembleProgress);
    ref.current.rotation.x = THREE.MathUtils.lerp(0.6, 0, assembleProgress);
    ref.current.scale.setScalar(THREE.MathUtils.lerp(0.3, 0.35, assembleProgress));
  });

  return (
    <group ref={ref}>
      {/* Mug body */}
      <mesh castShadow>
        <cylinderGeometry args={[0.3, 0.25, 0.5, 24]} />
        <meshPhysicalMaterial color={bodyColor} metalness={0.3} roughness={0.4} />
      </mesh>
      {/* Handle */}
      <mesh position={[0.35, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.15, 0.03, 8, 16, Math.PI]} />
        <meshPhysicalMaterial color={bodyColor} metalness={0.3} roughness={0.4} />
      </mesh>
    </group>
  );
}

// Phone slides in
function Phone({ isDark }: { isDark: boolean }) {
  const ref = useRef<THREE.Group>(null);
  const bodyColor = isDark ? '#1a2744' : '#c8d0de';
  const accentColor = isDark ? '#2E5BFF' : '#3a6aff';

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const s = globalScroll;

    const assembleProgress = smoothstep(0.18, 0.5, s);

    ref.current.position.x = THREE.MathUtils.lerp(-5, 1.8, assembleProgress) + Math.cos(t * 0.35 + 3) * 0.12 * (1 - assembleProgress);
    ref.current.position.y = THREE.MathUtils.lerp(-3, -0.78, assembleProgress) + Math.sin(t * 0.55 + 1) * 0.1 * (1 - assembleProgress);
    ref.current.position.z = THREE.MathUtils.lerp(3, 0.5, assembleProgress);

    ref.current.rotation.z = THREE.MathUtils.lerp(Math.PI * 0.5, 0, assembleProgress);
    ref.current.rotation.x = THREE.MathUtils.lerp(0.5, -Math.PI * 0.45, assembleProgress);
    ref.current.rotation.y = THREE.MathUtils.lerp(-1, 0, assembleProgress);
    ref.current.scale.setScalar(0.35);
  });

  return (
    <group ref={ref}>
      <mesh castShadow>
        <boxGeometry args={[0.45, 0.9, 0.04]} />
        <meshPhysicalMaterial color={bodyColor} metalness={0.8} roughness={0.15} clearcoat={0.8} />
      </mesh>
      {/* Screen */}
      <mesh position={[0, 0.02, 0.025]}>
        <planeGeometry args={[0.38, 0.75]} />
        <meshPhysicalMaterial color={isDark ? '#0a1020' : '#dde3ee'} metalness={0.1} roughness={0.05} />
      </mesh>
      {/* Screen glow */}
      <mesh position={[0, 0.02, 0.026]}>
        <planeGeometry args={[0.38, 0.75]} />
        <meshBasicMaterial color={accentColor} transparent opacity={0.03} />
      </mesh>
    </group>
  );
}

// Desk surface appears
function Desk({ isDark }: { isDark: boolean }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const s = globalScroll;

    const assembleProgress = smoothstep(0.05, 0.45, s);

    ref.current.position.y = THREE.MathUtils.lerp(-5, -0.85, assembleProgress);
    (ref.current.material as THREE.MeshPhysicalMaterial).opacity = assembleProgress * (isDark ? 0.6 : 0.5);
    ref.current.scale.set(
      THREE.MathUtils.lerp(0.5, 1, assembleProgress),
      1,
      THREE.MathUtils.lerp(0.5, 1, assembleProgress)
    );
  });

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[6, 4]} />
      <meshPhysicalMaterial
        color={isDark ? '#111c33' : '#d5dce8'}
        metalness={0.2}
        roughness={0.6}
        transparent
        opacity={0}
      />
    </mesh>
  );
}

export default function DesktopModel({ isDark }: { isDark: boolean }) {
  return (
    <group>
      <Desk isDark={isDark} />
      <Monitor isDark={isDark} />
      <Stand isDark={isDark} />
      <Keyboard isDark={isDark} />
      <Mouse isDark={isDark} />
      <CoffeeMug isDark={isDark} />
      <Phone isDark={isDark} />
    </group>
  );
}
