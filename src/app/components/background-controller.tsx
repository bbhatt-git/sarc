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

  if (!mounted) {
    return <div className="fixed inset-0 z-[-1]" />;
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <div className="fixed inset-0 z-[-1] transition-opacity duration-300" style={{ opacity: isDark ? 1 : 0.5 }}>
        <FloatingLines 
            enabledWaves={["top","middle","bottom"]}
            lineCount={6}
            lineDistance={2}
            bendRadius={5}
            bendStrength={-2}
            interactive={true}
            parallax={true}
            linesGradient={['#059669', '#0ea5e9', '#64748b']}
            animationSpeed={0.3}
            mixBlendMode={isDark ? "screen" : "multiply"}
        />
    </div>
  );
}
