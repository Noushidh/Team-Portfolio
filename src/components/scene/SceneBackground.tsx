import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function SceneBackground({ isDark }: { isDark: boolean }) {
  const { scene } = useThree();

  useEffect(() => {
    scene.background = new THREE.Color(isDark ? '#080c18' : '#e8edf5');
    scene.fog = new THREE.Fog(isDark ? '#080c18' : '#e8edf5', 6, 20);
  }, [isDark, scene]);

  return null;
}
