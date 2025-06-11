import React, { useEffect, useState, useRef } from "react";
import {
  FiArrowRight,
  FiAlertTriangle,
  FiDollarSign,
  FiTrendingUp,
  FiShield,
  FiUsers,
  FiRefreshCw,
  FiLock,
  FiImage,
  FiUser,
  FiZap,
  FiCreditCard,
  FiSearch,
  FiCalendar,
  FiHeart,
  FiChevronLeft,
  FiChevronRight,
  FiStar,
  FiTwitter,
  FiLinkedin,
  FiMessageSquare,
  FiMail,
  FiBook,
  FiFileText,
} from "react-icons/fi";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
  useSpring,
  useInView,
} from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import { NumberTicker } from "../components/NumberTicker";
import { BentoCard, BentoGrid } from "../components/BentoGrid";
import { BorderBeam } from "../components/BorderBeam";
import { AnimatedBeam } from "../components/AnimatedBeam";
import { Marquee } from "../components/Marquee";
import { cn } from "../lib/utils";

// Removed Canvas and Stars imports - no longer needed

// Array of colors for the animated gradient background
const COLORS_TOP = ["#3B82F6", "#1E40AF", "#0EA5E9", "#0284C7"];

export const AuroraHero = () => {
  // State to track if component is mounted (client-side)
  const [isMounted, setIsMounted] = useState(false);

  // Refs for animation tracking
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const buttonRef = useRef(null);

  // Track if elements are in view (once only)
  const badgeInView = useInView(badgeRef, { once: true });
  const titleInView = useInView(titleRef, { once: true });
  const descInView = useInView(descRef, { once: true });
  const buttonInView = useInView(buttonRef, { once: true });

  // Motion value for animating the gradient color - used only for button effects now
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    // Set mounted to true after component mounts
    setIsMounted(true);

    // Animate through all colors in an infinite loop
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 7,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  // Create dynamic CSS properties using motion templates for button only
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  return (
    <section className="relative grid min-h-screen place-content-center px-4 py-24 text-gray-200">
      {/* Main content container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Beta badge */}

        {/* Main heading with gradient text */}
        <motion.h1
          ref={titleRef}
          className="max-w-3xl bg-gradient-to-br from-white to-gray-400 bg-clip-text text-center text-3xl font-medium leading-tight text-transparent sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Say Goodbye to Ticket Scams & Scalpers
        </motion.h1>

        {/* Description text */}
        <motion.p
          ref={descRef}
          className="my-6 max-w-xl text-center text-base leading-relaxed md:text-lg md:leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={descInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          TicketWave is the ticketing platform for fair access to events.
        </motion.p>

        {/* Animated CTA button with hover and tap effects */}
        <motion.button
          ref={buttonRef}
          style={{
            border,
            boxShadow,
          }}
          whileHover={{
            scale: 1.015,
          }}
          whileTap={{
            scale: 0.985,
          }}
          className="group relative flex w-fit items-center gap-1.5 rounded-full bg-gray-950/10 px-4 py-2 text-gray-50 transition-colors hover:bg-gray-950/50"
          initial={{ opacity: 0, y: 20 }}
          animate={buttonInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link href="/" className="flex items-center gap-1.5">
            Get Started
            <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
          </Link>
        </motion.button>
      </div>
    </section>
  );
};

// Problem and Stats Section Component
export const ProblemStatsSection = () => {
  // Refs for animation tracking
  const titleRef = useRef(null);
  const problem1Ref = useRef(null);
  const problem2Ref = useRef(null);
  const problem3Ref = useRef(null);
  const statsTextRef = useRef(null);
  const stat1Ref = useRef(null);
  const stat2Ref = useRef(null);
  const stat3Ref = useRef(null);

  // Track if elements are in view (once only)
  const titleInView = useInView(titleRef, { once: true });
  const problem1InView = useInView(problem1Ref, { once: true });
  const problem2InView = useInView(problem2Ref, { once: true });
  const problem3InView = useInView(problem3Ref, { once: true });
  const statsTextInView = useInView(statsTextRef, { once: true });
  const stat1InView = useInView(stat1Ref, { once: true });
  const stat2InView = useInView(stat2Ref, { once: true });
  const stat3InView = useInView(stat3Ref, { once: true });

  return (
    <section className="relative py-40 px-4 text-gray-200">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Problem Section */}
        <div className="text-center mb-16">
          <motion.h2
            ref={titleRef}
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white mb-12"
          >
            The Current Ticketing Situation
          </motion.h2>

          {/* Problem Bullet Points */}
          <div className="grid md:grid-cols-3 gap-8 mb-24">
            <motion.div
              ref={problem1Ref}
              initial={{ opacity: 0, y: 20 }}
              animate={
                problem1InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="bg-red-500/20 backdrop-blur-sm p-4 rounded-full mb-4 border border-red-500/30">
                <FiTrendingUp className="text-red-400 text-2xl" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Scalpers
              </h3>
              <p className="text-gray-300">Resellers drive up prices</p>
            </motion.div>

            <motion.div
              ref={problem2Ref}
              initial={{ opacity: 0, y: 20 }}
              animate={
                problem2InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col items-center text-center"
            >
              <div className="bg-red-500/20 backdrop-blur-sm p-4 rounded-full mb-4 border border-red-500/30">
                <FiDollarSign className="text-red-400 text-2xl" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Scams</h3>
              <p className="text-gray-300">Fans lose huge amounts of money</p>
            </motion.div>

            <motion.div
              ref={problem3Ref}
              initial={{ opacity: 0, y: 20 }}
              animate={
                problem3InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col items-center text-center"
            >
              <div className="bg-red-500/20 backdrop-blur-sm p-4 rounded-full mb-4 border border-red-500/30">
                <FiAlertTriangle className="text-red-400 text-2xl" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Bots</h3>
              <p className="text-gray-300">Tickets gone in seconds</p>
            </motion.div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="text-center">
          <motion.p
            ref={statsTextRef}
            initial={{ opacity: 0, y: 20 }}
            animate={
              statsTextInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.6 }}
            className="text-lg text-gray-300 font-medium mb-12"
          >
            Scalping, scams, and bots make ticketing unfair for real fans.
          </motion.p>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Stat 1 - 88% */}
            <motion.div
              ref={stat1Ref}
              initial={{ opacity: 0, y: 20 }}
              animate={
                stat1InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="text-6xl md:text-7xl font-bold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent mb-4">
                ~
                <NumberTicker
                  value={40}
                  delay={0.2}
                  className="text-6xl md:text-7xl font-bold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent"
                />
                %
              </div>
              <p className="text-gray-300 text-lg">
                of tickets bought are scalpers
              </p>
            </motion.div>

            {/* Stat 2 - $35K+ with dividers */}
            <motion.div
              ref={stat2Ref}
              initial={{ opacity: 0, y: 20 }}
              animate={
                stat2InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center relative md:border-l md:border-r border-gray-600/30 md:px-12"
            >
              <div className="text-6xl md:text-7xl font-bold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent mb-4">
                $
                <NumberTicker
                  value={1}
                  delay={0.1}
                  className="text-6xl md:text-7xl font-bold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent"
                />
                B+
              </div>
              <p className="text-gray-300 text-lg">
                total lost from ticket scams
              </p>
            </motion.div>

            {/* Stat 3 - 90% */}
            <motion.div
              ref={stat3Ref}
              initial={{ opacity: 0, y: 20 }}
              animate={
                stat3InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <div className="text-6xl md:text-7xl font-bold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent mb-4">
                <NumberTicker
                  value={78}
                  delay={0.6}
                  className="text-6xl md:text-7xl font-bold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent"
                />
                %
              </div>
              <p className="text-gray-300 text-lg">
                of tickets are grabbed by bots
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Constants for tilt animation
const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;

// 3D Tilt Card Component
const TiltCard = ({ icon: Icon, title, description, index }) => {
  const ref = useRef(null);
  const animationRef = useRef(null);

  // Track if card is in view (once only)
  const cardInView = useInView(animationRef, { once: true });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return [0, 0];

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Define different colors for each card
  const borderColors = [
    { from: "#3b82f6", to: "#8b5cf6" }, // Blue to Purple
    { from: "#10b981", to: "#06b6d4" }, // Green to Cyan
    { from: "#f59e0b", to: "#ef4444" }, // Amber to Red
    { from: "#ec4899", to: "#8b5cf6" }, // Pink to Purple
  ];

  const colors = borderColors[index % borderColors.length];

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform,
      }}
      className="relative h-80 w-64 rounded-xl bg-gradient-to-br from-blue-400/20 to-purple-400/20 backdrop-blur-sm border border-white/10 group cursor-pointer overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={cardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
    >
      <div ref={animationRef}>
        <div
          style={{
            transform: "translateZ(75px)",
            transformStyle: "preserve-3d",
          }}
          className="absolute inset-4 grid place-content-center rounded-xl bg-gray-900/80 backdrop-blur-sm shadow-lg border border-white/10"
        >
          {/* Icon and Title - Always visible */}
          <div className="text-center">
            <Icon
              style={{
                transform: "translateZ(75px)",
              }}
              className="mx-auto text-4xl text-blue-400 mb-4 transition-all duration-300 group-hover:text-blue-300"
            />
            <h3
              style={{
                transform: "translateZ(50px)",
              }}
              className="text-center text-xl font-bold text-white mb-2"
            >
              {title}
            </h3>
          </div>

          {/* Description - Shows on hover */}
          <motion.div
            style={{
              transform: "translateZ(25px)",
            }}
            className="absolute inset-0 flex items-center justify-center p-4 rounded-xl bg-gray-900/95 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-center text-sm text-gray-300 leading-relaxed">
              {description}
            </p>
          </motion.div>
        </div>

        {/* BorderBeam Animation */}
        <BorderBeam
          size={100}
          duration={8}
          delay={0}
          colorFrom={colors.from}
          colorTo={colors.to}
        />
      </div>
    </motion.div>
  );
};

// Solution Section Component
export const SolutionSection = () => {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });

  const solutions = [
    {
      icon: FiShield,
      title: "NFT-Based Tickets",
      description:
        "Every ticket is a unique NFT — secure, verifiable, and impossible to fake.",
    },
    {
      icon: FiUsers,
      title: "World ID Verification",
      description:
        "Only real humans can buy tickets, thanks to Sybil-resistant verification.",
    },
    {
      icon: FiRefreshCw,
      title: "NFT Marketplace",
      description:
        "Fans can resell safely, and organizers stay in control with fair pricing rules.",
    },
    {
      icon: FiLock,
      title: "Smart Contracts",
      description:
        "No hidden fees or shady algorithms — everything runs on audited code.",
    },
  ];

  return (
    <section className="relative py-40 px-4 text-gray-200">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Solution Title */}
        <motion.div
          ref={titleRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Solution
          </h2>
        </motion.div>

        {/* Solution Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <TiltCard
                icon={solution.icon}
                title={solution.title}
                description={solution.description}
                index={index}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Feature Showcase Section Component with Animated Beams
export const FeatureShowcase = () => {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });

  // Refs for the animated beam layout
  const containerRef = useRef(null);
  const centerRef = useRef(null);

  // Left side refs
  const leftTop = useRef(null);
  const leftMiddle = useRef(null);
  const leftBottom = useRef(null);

  // Right side refs
  const rightTop = useRef(null);
  const rightMiddle = useRef(null);
  const rightBottom = useRef(null);

  // Circle component for the layout
  const Circle = React.forwardRef(({ className, children, label }, ref) => {
    return (
      <div className="flex flex-col items-center">
        <div
          ref={ref}
          className={`z-10 flex size-16 items-center justify-center rounded-full border-2 bg-white/10 backdrop-blur-sm border-white/20 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)] transition-all duration-300 hover:bg-white/20 hover:border-white/30 hover:scale-110 ${className}`}
        >
          {children}
        </div>
        <span className="text-sm text-gray-300 mt-2 text-center font-medium">
          {label}
        </span>
      </div>
    );
  });

  Circle.displayName = "Circle";

  return (
    <section className="relative py-40 px-4 text-gray-200">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Feature Showcase Title */}
        <motion.div
          ref={titleRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Features
          </h2>
        </motion.div>

        {/* Animated Beam Layout */}
        <div
          className="relative flex h-[500px] w-full items-center justify-center overflow-hidden"
          ref={containerRef}
        >
          <div className="flex size-full max-h-[400px] max-w-5xl flex-col items-stretch justify-between gap-12">
            {/* Top Row */}
            <div className="flex flex-row items-center justify-between">
              <Circle ref={leftTop} label="NFT Tickets">
                <FiShield className="h-8 w-8 text-blue-400" />
              </Circle>

              <Circle ref={rightTop} label="World ID">
                <FiUsers className="h-8 w-8 text-green-400" />
              </Circle>
            </div>

            {/* Middle Row */}
            <div className="flex flex-row items-center justify-between">
              <Circle ref={leftMiddle} label="Smart Contracts">
                <FiLock className="h-8 w-8 text-purple-400" />
              </Circle>

              {/* Center TicketWave Circle */}
              <Circle
                ref={centerRef}
                className="size-20 border-blue-500/50 bg-blue-500/20"
                label="TicketWave"
              >
                <div className="text-2xl font-bold text-blue-300">TW</div>
              </Circle>

              <Circle ref={rightMiddle} label="NFT Marketplace">
                <FiRefreshCw className="h-8 w-8 text-cyan-400" />
              </Circle>
            </div>

            {/* Bottom Row */}
            <div className="flex flex-row items-center justify-between">
              <Circle ref={leftBottom} label="Memory Minting">
                <FiZap className="h-8 w-8 text-yellow-400" />
              </Circle>

              <Circle ref={rightBottom} label="ENS Integration">
                <FiUser className="h-8 w-8 text-teal-400" />
              </Circle>
            </div>
          </div>

          {/* Animated Beams - Left to Center */}
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={leftTop}
            toRef={centerRef}
            curvature={-40}
            gradientStartColor="#3b82f6"
            gradientStopColor="#8b5cf6"
            delay={0}
            duration={3}
            pathColor="#3b82f6"
            pathOpacity={0.3}
            pathWidth={3}
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={leftMiddle}
            toRef={centerRef}
            gradientStartColor="#a855f7"
            gradientStopColor="#3b82f6"
            delay={0.5}
            duration={3}
            pathColor="#a855f7"
            pathOpacity={0.3}
            pathWidth={3}
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={leftBottom}
            toRef={centerRef}
            curvature={40}
            gradientStartColor="#eab308"
            gradientStopColor="#a855f7"
            delay={1}
            duration={3}
            pathColor="#eab308"
            pathOpacity={0.3}
            pathWidth={3}
          />

          {/* Animated Beams - Center to Right */}
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={centerRef}
            toRef={rightTop}
            curvature={40}
            gradientStartColor="#3b82f6"
            gradientStopColor="#8b5cf6"
            reverse
            delay={1.5}
            duration={3}
            pathColor="#3b82f6"
            pathOpacity={0.3}
            pathWidth={3}
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={centerRef}
            toRef={rightMiddle}
            gradientStartColor="#a855f7"
            gradientStopColor="#3b82f6"
            reverse
            delay={2}
            duration={3}
            pathColor="#a855f7"
            pathOpacity={0.3}
            pathWidth={3}
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={centerRef}
            toRef={rightBottom}
            curvature={-40}
            gradientStartColor="#eab308"
            gradientStopColor="#a855f7"
            reverse
            delay={2.5}
            duration={3}
            pathColor="#eab308"
            pathOpacity={0.3}
            pathWidth={3}
          />
        </div>
      </div>
    </section>
  );
};

// Testimonial Card Component (moved outside to avoid hooks in callbacks)
const TestimonialCard = ({ img, name, username, body, rating, event, index = 0 }) => {
  const cardRef = useRef(null);
  const cardInView = useInView(cardRef, { once: true });

  return (
    <motion.figure 
      ref={cardRef}
      className={cn(
        "relative h-full w-80 cursor-pointer overflow-hidden rounded-xl p-6 transition-all duration-500",
        "bg-transparent"
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={cardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
    >
      {/* Header with avatar and user info */}
      <div className="flex flex-row items-center gap-3 mb-4">
        <img 
          className="rounded-full" 
          width="40" 
          height="40" 
          alt={`${name}'s avatar`} 
          src={img} 
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-semibold text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium text-gray-400">{username}</p>
        </div>
        {/* Star rating */}
        <div className="flex ml-auto">
          {[...Array(rating)].map((_, i) => (
            <FiStar key={i} className="w-3 h-3 text-yellow-400 fill-current" />
          ))}
        </div>
      </div>

      {/* Testimonial text */}
      <blockquote className="text-sm text-gray-300 leading-relaxed mb-3">
      &quot;{body}&quot;
      </blockquote>

      {/* Event tag */}
      <div className="inline-block px-2 py-1 bg-blue-500/15 text-blue-300 text-xs rounded-full">
        {event}
      </div>
    </motion.figure>
  );
};

// Testimonials Section Component
export const TestimonialsSection = () => {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });

  // Real testimonials for TicketWave
  const testimonials = [
    {
      name: "Vincent Kok",
      username: "@vincentkok",
      body: "Finally, a ticketing platform for fans! No more getting scammed by fake tickets!",
      img: "https://avatar.vercel.sh/sarah",
      rating: 5,
      event: "Bizpod Assessment"
    },
    {
      name: "Derek Liew",
      username: "@derekk2403",
      body: "Truly seamless ticketing process, I didn't even realize this was on the blockchain!",
      img: "https://avatar.vercel.sh/marcus",
      rating: 5,
      event: "Blockchain 101"
    },
    {
      name: "Ho Shao Mun",
      username: "@shaomun",
      body: "Smooth and responsive process, in a matter of seconds I already have my certificate minted!",
      img: "https://avatar.vercel.sh/emily",
      rating: 5,
      event: "superteamMY MEGA"
    },
    {
      name: "Tan Zhi Wei",
      username: "@avosavo",
      body: "Got my ticket! Everything is so smooth and easy to use!",
      img: "https://avatar.vercel.sh/david",
      rating: 5,
      event: "Trading Workshop 2025"
    },
    {
      name: "Edwina Ho",
      username: "@edwedw",
      body: "So glad to have a secure and transparent ticketing platform, no more worries about ticket availabilty!",
      img: "https://avatar.vercel.sh/lisa",
      rating: 5,
      event: "MBW 2025"
    },
    {
      name: "Alex Rodriguez",
      username: "@alexr_fest",
      body: "No more refreshing pages for hours. TicketWave's fair queue system actually works for real fans.",
      img: "https://avatar.vercel.sh/alex",
      rating: 5,
      event: "Coachella 2024"
    },
    {
      name: "Lim Zi Jian",
      username: "@lzj03",
      body: "It's great to see a platform that helps ensure my event's ticketing process is seamless",
      img: "https://avatar.vercel.sh/jamie",
      rating: 5,
      event: "Taylor's Blockchain Club"
    },
    {
      name: "Lim Hong Bing",
      username: "@lhb04",
      body: "The verification process is so smooth. Feels secure knowing everyone in line is a real person.",
      img: "https://avatar.vercel.sh/rachel",
      rating: 5,
      event: "Polytera.dev"
    }
  ];

  // Split testimonials into two rows for the marquee effect
  const firstRow = testimonials.slice(0, testimonials.length / 2);
  const secondRow = testimonials.slice(testimonials.length / 2);

  return (
    <section className="relative py-40 text-gray-200">
      {/* Section Title - Centered with max-width */}
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          ref={titleRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What Fans Are Saying
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Real testimonials from users
          </p>
        </motion.div>
      </div>

      {/* Marquee Testimonials - Full width */}
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        {/* First row - left to right */}
        <Marquee pauseOnHover className="[--duration:25s] mb-4" repeat={4}>
          {firstRow.map((testimonial, index) => (
            <TestimonialCard key={testimonial.username} {...testimonial} index={index} />
          ))}
        </Marquee>
        
        {/* Second row - right to left */}
        <Marquee reverse pauseOnHover className="[--duration:25s]" repeat={4}>
          {secondRow.map((testimonial, index) => (
            <TestimonialCard key={testimonial.username} {...testimonial} index={index} />
          ))}
        </Marquee>
      </div>
    </section>
  );
};

// How it Works Section Component
export const HowItWorksSection = () => {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });

  const steps = [
    {
      step: "Step 1",
      title: "Connect Account",
      description:
        "Link your wallet and verify your identity with World ID for secure, bot-free access.",
      icon: FiUser,
    },
    {
      step: "Step 2",
      title: "Discover Events",
      description:
        "Browse upcoming events and find tickets at fair, transparent prices with no hidden fees.",
      icon: FiSearch,
    },
    {
      step: "Step 3",
      title: "Secure Your Ticket",
      description:
        "Purchase your NFT ticket with smart contract protection and guaranteed authenticity.",
      icon: FiShield,
    },
    {
      step: "Step 4",
      title: "Experience & Collect",
      description:
        "Attend your event and mint exclusive NFT memories to commemorate your experience.",
      icon: FiHeart,
    },
  ];

  // Create refs for all steps at once
  const stepRefs = useRef([]);
  stepRefs.current = steps.map((_, index) => stepRefs.current[index] ?? React.createRef());
  
  // Create inView tracking for all steps - individual calls instead of map
  const step0InView = useInView(stepRefs.current[0], { once: true });
  const step1InView = useInView(stepRefs.current[1], { once: true });
  const step2InView = useInView(stepRefs.current[2], { once: true });
  const step3InView = useInView(stepRefs.current[3], { once: true });
  
  const stepInViews = [step0InView, step1InView, step2InView, step3InView];

  return (
    <section className="relative py-40 px-4 text-gray-200">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Title */}
        <motion.div
          ref={titleRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          <p>How it Works</p>
          </h2>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">  
          {steps.map((step, index) => {
            const stepRef = stepRefs.current[index];
            const stepInView = stepInViews[index];

            return (
              <motion.div
                key={index}
                ref={stepRef}
                className="relative group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  stepInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 h-full hover:border-white/20 transition-all duration-300 hover:scale-[1.02] relative z-10">
                  {/* Default State - Icon, Step, and Title */}
                  <div className="transition-all duration-300">
                    <div className="mb-6">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-400 transition-colors duration-300">
                        <step.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-sm text-blue-400 font-medium">
                        {step.step}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-100 transition-colors duration-300">
                      {step.title}
                    </h3>
                  </div>

                  {/* Hover State - Description Overlay */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center p-6 bg-gray-900/95 backdrop-blur-sm rounded-xl"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-center text-gray-300 leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                </div>

                {/* Connection Line to Next Card (except for last step) */}
                {index < steps.length - 1 && (
                  <motion.div 
                    className="hidden lg:block absolute top-1/2 left-full w-6 h-0.5 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 transform -translate-y-1/2 z-20"
                    initial={{ scaleX: 0 }}
                    animate={stepInView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 + (index * 0.2) }}
                  >
                    {/* Arrow head */}
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-blue-400 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Final CTA Section Component
export const FinalCTASection = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);

  const titleInView = useInView(titleRef, { once: true });
  const subtitleInView = useInView(subtitleRef, { once: true });
  const buttonsInView = useInView(buttonsRef, { once: true });

  // Motion value for animating the gradient color
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    // Animate through all colors in an infinite loop
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 7,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  // Create dynamic CSS properties using motion templates
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  return (
    <section className="relative pt-40 pb-60 px-4 text-gray-200">
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Main CTA Title */}
        <motion.h2
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          Ready to Experience Fair Ticketing?
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          ref={subtitleRef}
          className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={subtitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          
          No more bots, no more scams, no more scalpers.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={buttonsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Primary CTA Button */}
          <motion.button
            style={{
              border,
              boxShadow,
            }}
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            className="group relative flex w-fit items-center gap-2 rounded-full bg-blue-600 hover:bg-blue-700 px-8 py-4 text-white font-semibold transition-all duration-300 shadow-lg"
          >
            <Link href="/" className="flex items-center gap-2">
              Try it now
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.button>

          {/* Secondary CTA Button */}
          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            className="group relative flex w-fit items-center gap-2 rounded-full border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 px-8 py-4 text-white font-semibold transition-all duration-300 backdrop-blur-sm"
          >
            <Link href="/" className="flex items-center gap-2">
              <FiCalendar className="transition-transform group-hover:scale-110" />
              View Events
            </Link>
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
};

// Footer Component
export const Footer = () => {
  const footerRef = useRef(null);
  const footerInView = useInView(footerRef, { once: true });

  // Footer links data
  const footerLinks = [
    { name: "About", href: "/about", icon: FiUsers },
    { name: "Contact", href: "/contact", icon: FiMail },
    { name: "Privacy", href: "/privacy", icon: FiShield },
    { name: "Docs", href: "/docs", icon: FiBook },
  ];

  // Social media links
  const socialLinks = [
    { 
      name: "Twitter", 
      href: "https://twitter.com/ticketwave", 
      icon: FiTwitter,
      color: "hover:text-blue-400"
    },
    { 
      name: "Discord", 
      href: "https://discord.gg/ticketwave", 
      icon: FiMessageSquare,
      color: "hover:text-purple-400"
    },
    { 
      name: "LinkedIn", 
      href: "https://linkedin.com/company/ticketwave", 
      icon: FiLinkedin,
      color: "hover:text-blue-500"
    },
  ];

  return (
    <footer className="relative border-t border-white/10 bg-gray-950/50 backdrop-blur-sm">
      <motion.div
        ref={footerRef}
        className="max-w-7xl mx-auto px-4 py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={footerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Logo and Branding */}
          <div className="text-center md:text-left">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110">
                <span className="text-white font-bold text-lg">TW</span>
              </div>
              <span className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                TicketWave
              </span>
            </Link>
            <p className="text-gray-400 mt-2 text-sm">
              Fair ticketing for real fans
            </p>
          </div>

          {/* Footer Links */}
          <div className="flex justify-center">
            <nav className="grid grid-cols-2 gap-4">
              {footerLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={footerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link 
                    href={link.href}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 text-sm group"
                  >
                    <link.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div className="flex justify-center md:justify-end">
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <motion.div
                  key={social.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={footerInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, delay: 0.2 + (index * 0.1) }}
                >
                  <Link
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 ${social.color} transition-all duration-300 hover:scale-110 group border border-white/10 hover:border-white/20`}
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          animate={footerInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-gray-400 text-sm text-center md:text-left">
            © 2024 TicketWave. All rights reserved. Built with love for real fans.
          </p>
          
          {/* Additional Trust Badges */}
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <FiShield className="w-3 h-3 text-green-400" />
              <span>Blockchain Secured</span>
            </div>
            <div className="flex items-center gap-1">
              <FiUsers className="w-3 h-3 text-blue-400" />
              <span>WorldCoin Verified</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

// Main Landing Page Container with Fixed Background
export default function LandingPage() {
  // Motion value for animating the gradient color
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    // Animate through all colors in an infinite loop
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 7,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  // Create dynamic CSS properties using motion templates
  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;

  return (
    <div className="relative">
      {/* Fixed Background Layer */}
      <motion.div
        style={{
          backgroundImage,
        }}
        className="fixed inset-0 bg-gray-950 z-0"
      />

      {/* Scrollable Content Layer */}
      <div className="relative z-20">
        <AuroraHero />
        <ProblemStatsSection />
        <SolutionSection />
        <FeatureShowcase />
        <HowItWorksSection />
        <TestimonialsSection />
        <FinalCTASection />
        <Footer />
      </div>
    </div>
  );
}
