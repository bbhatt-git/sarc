'use client';

import { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

function Model(props: any) {
  const group = useRef<THREE.Group>(null);
  // Assuming the GLB is in /public/
  const { scene, animations } = useGLTF('/robo.glb');
  const { actions, names } = useAnimations(animations, group);

  useEffect(() => {
    // Play the first animation clip
    if (names.length > 0) {
      actions[names[0]]?.reset().fadeIn(0.5).play();
    }
    // Clean up on unmount
    return () => {
      if (names.length > 0) {
        actions[names[0]]?.fadeOut(0.5);
      }
    }
  }, [actions, names]);

  // Add a subtle floating animation
  useFrame((state) => {
    if (group.current) {
      const t = state.clock.getElapsedTime();
      group.current.position.y = Math.sin(t * 1.5) * 0.1 - 0.9;
    }
  });

  return <primitive ref={group} object={scene} {...props} />;
}

// Preload the model for faster loading
useGLTF.preload('/robo.glb');

export default function AiAgent() {
  return (
    <div className="fixed bottom-0 right-0 md:bottom-5 md:right-5 w-52 h-52 z-50 cursor-grab active:cursor-grabbing rounded-full overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
      <Canvas camera={{ position: [0, 0, 2.5], fov: 35 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={2} />
          <pointLight position={[10, 10, 10]} intensity={3} />
          <directionalLight position={[-3, 5, 2]} intensity={2} />
          <Model scale={0.8} position={[0, -0.9, 0]} rotation={[0.1, -0.2, 0]}/>
          <OrbitControls 
            enablePan={false}
            minDistance={2}
            maxDistance={4}
            minPolarAngle={Math.PI / 2.5}
            maxPolarAngle={Math.PI - Math.PI / 2.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
