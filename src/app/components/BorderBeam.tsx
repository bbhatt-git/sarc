"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
}

export const BorderBeam = ({
  className,
  size = 200,
  duration = 10,
  borderWidth = 1.5,
  delay = 0,
  colorFrom = "hsl(var(--primary))",
  colorTo = "hsl(195, 91%, 50%)",
}: BorderBeamProps) => {
  return (
    <div
      className={cn(
        "absolute inset-0 rounded-[inherit] overflow-hidden",
        className
      )}
      style={
        {
          "--border-width": `${borderWidth}px`,
        } as React.CSSProperties
      }
    >
      <motion.div
        style={{
          "--size": size,
          "--duration": `${duration}s`,
          "--delay": `${delay}s`,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          width: "var(--size, 100px)",
          height: "var(--size, 100px)",
          position: "absolute",
          top: "calc(50% - var(--size, 100px) / 2)",
          left: "calc(50% - var(--size, 100px) / 2)",
          background: `conic-gradient(from 0deg, transparent, var(--color-from), var(--color-to), transparent 30%)`,
          maskImage: `radial-gradient(ellipse 50% 50% at 50% 50%, black 50%, transparent 100%)`,
        }}
        initial={{
          rotate: "0deg",
        }}
        animate={{
          rotate: "360deg",
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
          delay: delay,
        }}
      />
      <div className="absolute inset-[--border-width] rounded-[calc(var(--radius)-var(--border-width))] bg-card" />
    </div>
  );
};
