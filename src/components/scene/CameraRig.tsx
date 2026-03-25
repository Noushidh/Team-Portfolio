import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { globalScroll } from './useScrollValue';

export default function CameraRig() {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3(0, 1, 6));
  const lookTarget = useRef(new THREE.Vector3(0, 0.5, 0));

  useFrame(() => {
    const s = globalScroll;

    // Phase 1 (0-0.5): Watch the assembly from a good angle, slowly orbit
    // Phase 2 (0.5-1): Pan around the assembled desk
    const angle = s * Math.PI * 0.6;
    const radius = 6 - s * 1.5;
    const camY = 2.5 - s * 1.8;

    target.current.set(
      Math.sin(angle) * radius,
      Math.max(camY, 0.5),
      Math.cos(angle) * radius
    );

    // Look at the center of action
    lookTarget.current.set(
      0,
      THREE.MathUtils.lerp(1, 0, Math.min(s * 2, 1)),
      0
    );

    camera.position.lerp(target.current, 0.05);
    camera.lookAt(lookTarget.current);
  });

  return null;
}
