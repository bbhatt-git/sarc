'use client';

import { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

function Model(props: any) {
  const group = useRef<THREE.Group>(null);
  // It's important to use the correct path to your GLB file in the /public directory
  const { scene, animations } = useGLTF('/robo.glb');
  const { actions, names } = useAnimations(animations, group);

  // Play the first available animation
  useEffect(() => {
    if (actions && names.length > 0) {
      actions[names[0]]?.play();
    }
  }, [actions, names]);
  
  // Add a subtle floating animation
  useFrame((state) => {
    if (group.current) {
      const t = state.clock.getElapsedTime();
      group.current.rotation.y = Math.sin(t * 0.5) * 0.2;
      group.current.position.y = Math.sin(t) * 0.05;
    }
  });

  // The primitive object is the entire loaded scene
  return <primitive ref={group} object={scene} {...props} />;
}
useGLTF.preload('/robo.glb');

export default function AIAgent() {
  return (
    <motion.div
      drag
      dragConstraints={{ top: -500, left: -1000, right: 50, bottom: 50 }}
      dragElastic={0.1}
      dragTransition={{ bounceStiffness: 200, bounceDamping: 20 }}
      whileTap={{ cursor: 'grabbing' }}
      className="fixed bottom-4 right-4 w-64 h-80 z-[100] cursor-grab"
    >
       <Canvas camera={{ position: [0, 0.5, 2.5], fov: 45 }} shadows>
        <ambientLight intensity={1.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={1} />
        <Suspense fallback={null}>
            <Model scale={1.2} position={[0, -1, 0]} />
        </Suspense>
        <OrbitControls enableZoom={true} enablePan={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
      </Canvas>
    </motion.div>
  );
}
