'use client';

import { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Sphere, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

function Robot() {
  const group = useRef<THREE.Group>(null);
  const head = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = Math.sin(t / 2) * 0.2;
      group.current.position.y = Math.sin(t) * 0.1;
    }
    if(head.current) {
      head.current.rotation.y = Math.sin(t) * 0.4;
    }
  });

  return (
    <group ref={group}>
        {/* Body */}
        <Box args={[1, 1.5, 0.75]} position={[0, 0, 0]}>
            <meshStandardMaterial color={hovered ? '#059669' : '#10b981'} />
        </Box>

        {/* Head */}
        <Box args={[1.2, 0.8, 0.9]} position={[0, 1.1, 0]} ref={head}>
            <meshStandardMaterial color={hovered ? '#059669' : '#10b981'} />
        </Box>

        {/* Eyes */}
        <Sphere args={[0.15, 16, 16]} position={[-0.3, 1.2, 0.45]}>
            <meshStandardMaterial color={'#f0f0f0'} />
        </Sphere>
         <Sphere args={[0.15, 16, 16]} position={[0.3, 1.2, 0.45]}>
            <meshStandardMaterial color={'#f0f0f0'} />
        </Sphere>
         <Sphere args={[0.05, 16, 16]} position={[-0.3, 1.2, 0.55]}>
            <meshStandardMaterial color={'#0f172a'} />
        </Sphere>
        <Sphere args={[0.05, 16, 16]} position={[0.3, 1.2, 0.55]}>
            <meshStandardMaterial color={'#0f172a'} />
        </Sphere>

        {/* Neck */}
        <Cylinder args={[0.2, 0.2, 0.2]} position={[0, 0.85, 0]}>
            <meshStandardMaterial color={'#374151'} />
        </Cylinder>

        {/* Arms */}
        <Box args={[0.25, 1.2, 0.25]} position={[-0.75, 0.1, 0]}>
            <meshStandardMaterial color={'#374151'} />
        </Box>
         <Box args={[0.25, 1.2, 0.25]} position={[0.75, 0.1, 0]}>
            <meshStandardMaterial color={'#374151'} />
        </Box>

        {/* Legs */}
         <Box args={[0.3, 1, 0.3]} position={[-0.3, -1.25, 0]}>
            <meshStandardMaterial color={'#374151'} />
        </Box>
         <Box args={[0.3, 1, 0.3]} position={[0.3, -1.25, 0]}>
            <meshStandardMaterial color={'#374151'} />
        </Box>
    </group>
  );
}

function Loader() {
  return (
    <div className="flex h-full w-full items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-dashed border-primary"></div>
    </div>
  );
}

export default function CodeRobot() {
  return (
    <div className="w-full h-full cursor-grab active:cursor-grabbing">
      <Suspense fallback={<Loader />}>
        <Canvas camera={{ position: [0, 1, 5], fov: 50 }}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} />
          <Robot />
          <OrbitControls enableZoom={true} enablePan={false} />
        </Canvas>
      </Suspense>
    </div>
  );
}
