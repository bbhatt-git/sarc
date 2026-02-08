'use client';
import { useTheme } from 'next-themes';
import FloatingLines from './FloatingLines';
import { useEffect, useState } from 'react';

export function BackgroundController() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || resolvedTheme !== 'dark') {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[-1]">
        <FloatingLines 
            enabledWaves={["top","middle","bottom"]}
            lineCount={6}
            lineDistance={2}
            bendRadius={5}
            bendStrength={-2}
            interactive={true}
            parallax={true}
            linesGradient={["#1E293B", "#334155", "#475569"]}
            animationSpeed={0.3}
            mixBlendMode="screen"
        />
    </div>
  );
}
