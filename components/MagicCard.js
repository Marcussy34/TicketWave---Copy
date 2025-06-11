"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { cn } from "../lib/utils";

export function MagicCard({
  children,
  className,
  gradientColor = "#262626",
  gradientSize = 200,
  gradientOpacity = 0.8,
  ...props
}) {
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    cardRef.current.style.setProperty("--x", `${x}px`);
    cardRef.current.style.setProperty("--y", `${y}px`);
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    card.addEventListener("mousemove", handleMouseMove);
    return () => card.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div
      ref={cardRef}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-white/10 bg-gray-900/50 backdrop-blur-sm",
        "before:absolute before:inset-0 before:rounded-xl before:opacity-0 before:transition-opacity before:duration-500",
        "before:bg-[radial-gradient(var(--gradientSize,200px)_circle_at_var(--x,0)_var(--y,0),var(--gradientColor,theme(colors.gray.500)),transparent_50%)]",
        "hover:before:opacity-20",
        className
      )}
      style={{
        "--gradientColor": gradientColor,
        "--gradientSize": `${gradientSize}px`,
        "--gradientOpacity": gradientOpacity,
      }}
      {...props}
    >
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
