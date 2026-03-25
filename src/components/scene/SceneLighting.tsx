import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { globalScroll } from './useScrollValue';

function MouseLight() {
  const light = useRef<THREE.PointLight>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (!light.current) return;
    const x = (state.pointer.x * viewport.width) / 2;
    const y = (state.pointer.y * viewport.height) / 2;
    light.current.position.set(x, y, 4);
  });

  return <pointLight ref={light} intensity={0.6} color="#2E5BFF" distance={12} />;
}

function ScrollLight({ isDark }: { isDark: boolean }) {
  const light = useRef<THREE.SpotLight>(null);

  useFrame(() => {
    if (!light.current) return;
    const s = globalScroll;
    light.current.position.set(
      Math.sin(s * Math.PI * 2) * 6,
      4 - s * 2,
      Math.cos(s * Math.PI * 2) * 4
    );
    light.current.intensity = 0.5 + s * 0.5;
  });

  return <spotLight ref={light} angle={0.5} penumbra={1} color={isDark ? '#2E5BFF' : '#4a7aff'} />;
}

export default function SceneLighting({ isDark }: { isDark: boolean }) {
  return (
    <>
      <ambientLight intensity={isDark ? 0.2 : 0.5} />
      <directionalLight position={[5, 5, 5]} intensity={isDark ? 0.6 : 1} color="#ffffff" castShadow />
      <directionalLight position={[-3, 3, -2]} intensity={0.3} color={isDark ? '#2E5BFF' : '#6B8CFF'} />
      <pointLight position={[-3, -2, 3]} intensity={0.4} color="#2E5BFF" />
      <ScrollLight isDark={isDark} />
      <MouseLight />
    </>
  );
}
