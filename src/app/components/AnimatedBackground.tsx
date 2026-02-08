'use client';
import { useTheme } from 'next-themes';
import Galaxy from './Galaxy';
import { useEffect, useState } from 'react';

export function AnimatedBackground() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="fixed inset-0 -z-10 bg-background" />;
  }

  return (
    <div className="fixed inset-0 -z-10 bg-background">
      {resolvedTheme === 'dark' && (
        <Galaxy
            mouseRepulsion
            mouseInteraction
            density={0.7}
            glowIntensity={0.3}
            saturation={0}
            hueShift={158}
            twinkleIntensity={0.3}
            rotationSpeed={0.1}
            repulsionStrength={2}
            autoCenterRepulsion={0}
            starSpeed={2}
            speed={1}
        />
      )}
    </div>
  );
}
