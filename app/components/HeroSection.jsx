"use client";

import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Smooch_Sans } from "next/font/google";
import { HeroHighlight, Highlight } from "@/app/components/ui/HeroHighlight"; // Update the path as necessary

const smoochSans = Smooch_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Add the weights you want to use
});

export default function HeroSection() {
  return (
    <div>
      <Section
        imageSrc="/hero.jpg" // Replace with your actual image path
        logoSrc="/logo_white.png" // Replace with your logo path
      />
    </div>
  );
}

const Section = ({ imageSrc, logoSrc }) => {
  return (
    <div className="px-0">
      <div className="relative h-[150vh]">
        <StickyImage imageSrc={imageSrc} />
        <OverlayContent logoSrc={logoSrc} />
      </div>
    </div>
  );
};

const StickyImage = ({ imageSrc }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], ["0px", "30px"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.5, 0]);

  return (
    <motion.div
      style={{ scale, borderRadius }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden h-[calc(100vh)] top-0 w-full"
    >
      {/* Hero Image */}
      <div className="relative z-10 h-full w-full">
        <Image
          src={imageSrc}
          alt="Hero Image"
          fill
          className="w-full h-full object-cover"
        />
      </div>
      {/* Radial Overlay */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-black/50 z-10 pointer-events-none"
      />
    </motion.div>
  );
};

const OverlayContent = ({ logoSrc }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail("");
      }, 3000);
    }
  };

  return (
    <div className="absolute inset-0 flex h-screen w-full flex-col items-center justify-center text-center space-y-4 translate-y-[-10%]">
      {/* Logo */}
      <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80">
        <Image
          src={logoSrc}
          alt="Aftershock Logo"
          fill
          className="object-contain"
        />
      </div>

      {/* Highlighted Paragraph */}
      <HeroHighlight>
        <motion.p
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: [20, -5, 0],
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          className={`max-w-2xl text-lg md:text-2xl lg:text-3xl font-semibold text-white ${smoochSans.className}`}
        >
          <Highlight>Aftershock</Highlight> is a vibrant campus ministry at{" "}
          <Highlight>Wichita State University</Highlight>, designed to help
          students grow in faith, build connections, and discover their purpose.
        </motion.p>
      </HeroHighlight>

      {/* Input and Button */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-center gap-2"
      >
        <div className="relative">
          <motion.input
            type="email"
            placeholder="Enter your WSU email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-5 py-3 w-72 sm:w-96 md:w-[32rem] rounded-lg shadow-lg focus:outline-none border border-gray-300 text-black backdrop-blur-md bg-white/70 placeholder-gray-700 placeholder-opacity-80"
            whileFocus={{
              scale: 1.05,
              boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)",
            }}
            transition={{ duration: 0.3 }}
          />
          {submitted && (
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full mt-2 left-0 text-sm text-green-500 font-semibold"
            >
              Thank you for joining Aftershock!
            </motion.span>
          )}
        </div>
        <motion.button
          type="submit"
          disabled={!email}
          className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-red-500 text-white font-bold text-lg rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
        >
          Join
        </motion.button>
      </form>
    </div>
  );
};
