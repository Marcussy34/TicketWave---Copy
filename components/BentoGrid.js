"use client";

import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import { MagicCard } from "./MagicCard";

const BentoGrid = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-0.5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  ...props
}) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl cursor-pointer",
      className
    )}
    {...props}
  >
    <MagicCard
      gradientColor="#3b82f6"
      className="h-full flex flex-col justify-between"
    >
      <div>{background}</div>

      {/* Default state - Icon and Title only */}
      <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300">
        <Icon className="h-12 w-12 origin-left transform-gpu text-blue-400 transition-all duration-300 ease-in-out group-hover:scale-90 group-hover:text-blue-300" />
        <h3 className="text-xl font-semibold text-white transition-all duration-300 group-hover:text-blue-100">
          {name}
        </h3>
      </div>

      {/* Hover state - Description only */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center p-6 bg-gray-900/95 backdrop-blur-sm rounded-xl"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-center text-gray-300 leading-relaxed text-sm md:text-base">
          {description}
        </p>
      </motion.div>
    </MagicCard>
  </div>
);

export { BentoCard, BentoGrid };
