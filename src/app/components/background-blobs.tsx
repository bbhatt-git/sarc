'use client';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { useEffect } from 'react';

const Blob = ({ x, y, rotate, colorClass, blurClass = 'blur-[120px]' }) => (
  <motion.div
    className={`absolute ${colorClass} rounded-full opacity-30 ${blurClass}`}
    style={{
      width: 400,
      height: 400,
      x,
      y,
      rotate,
      top: -200,
      left: -200,
    }}
  />
);

export default function BackgroundBlobs() {
  const { scrollY } = useScroll();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Make mouse following more responsive
  const springConfig = { damping: 50, stiffness: 80, mass: 2 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Blob 1 & 2 follow mouse
  const blob1X = useTransform(smoothMouseX, [0, 1000], [-100, 300]);
  const blob1Y = useTransform(smoothMouseY, [0, 1000], [-100, 300]);
  const blob1Rotate = useTransform(smoothMouseY, [0, 1000], [0, 180]);

  const blob2X = useTransform(smoothMouseX, [0, 1000], [100, -300]);
  const blob2Y = useTransform(smoothMouseY, [0, 1000], [100, -300]);
  const blob2Rotate = useTransform(smoothMouseX, [0, 1000], [0, 180]);
  
  // Blob 3 follows scroll with a parallax effect
  const blob3X = useTransform(smoothMouseX, [0, 1000], [-300, 100]);
  const blob3Y = useTransform(scrollY, [0, 1000], [0, 400]); // Moves 400px for every 1000px scrolled
  const blob3Rotate = useTransform(scrollY, [0, 1000], [0, 90]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="relative w-full h-full">
         <div className="absolute inset-0 bg-background/30 backdrop-blur-sm" />
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:6rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

        <Blob x={blob1X} y={blob1Y} rotate={blob1Rotate} colorClass="bg-emerald-400" />
        <Blob x={blob2X} y={blob2Y} rotate={blob2Rotate} colorClass="bg-sky-400" />
        <Blob x={blob3X} y={blob3Y} rotate={blob3Rotate} colorClass="bg-violet-400" />
      </div>
    </div>
  );
}
