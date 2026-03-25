import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { useTheme } from './ThemeProvider';
import { Suspense } from 'react';
import { EffectComposer, ChromaticAberration } from './PostEffects';
import CameraRig from './scene/CameraRig';
import DesktopModel from './scene/DesktopModel';
import FloatingParts from './scene/FloatingParts';
import SceneLighting from './scene/SceneLighting';
import SceneParticles from './scene/SceneParticles';
import SceneBackground from './scene/SceneBackground';
import { useScrollValue } from './scene/useScrollValue';

export default function Scene3D() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useScrollValue();

  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <SceneBackground isDark={isDark} />
          <CameraRig />
          <SceneLighting isDark={isDark} />
          <DesktopModel isDark={isDark} />
          <FloatingParts isDark={isDark} />
          <SceneParticles isDark={isDark} />
          <Environment preset={isDark ? 'night' : 'city'} />
          <EffectComposer isDark={isDark} />
        </Suspense>
      </Canvas>
    </div>
  );
}
