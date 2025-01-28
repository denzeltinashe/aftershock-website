"use client";

import React, { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, motion, useMotionValue, useMotionTemplate } from "framer-motion";
import Image from "next/image";
import { cn } from "@/app/utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HeroSection from "./components/HeroSection";
import { Carousel, Card } from "./components/ui/apple-cards-carousel";
import HeroVideoDialog from "./components/ui/hero-video-dialog"; // Adjust path if needed
import {TextRevealCard, TextRevealCardDescription, TextRevealCardTitle } from "./components/ui/text-reveal-card";
const cards = [
  {
    id: 1,
    content: <p className="font-bold text-lg text-white">Worship Nights</p>,
    className: "md:col-span-2",
    thumbnail: "/image1.jpg", // Ensure this path matches the actual image
  },
  {
    id: 2,
    content: <p className="font-bold text-lg text-white">Community Service</p>,
    className: "col-span-1",
    thumbnail: "/image2.jpg",
  },
  {
    id: 3,
    content: <p className="font-bold text-lg text-white">Bible Study Groups</p>,
    className: "col-span-1",
    thumbnail: "/image3.jpg",
  },
  {
    id: 4,
    content: <p className="font-bold text-lg text-white">Leadership Training</p>,
    className: "md:col-span-2",
    thumbnail: "/image4.jpg",
  },
];



// Main Home Component
export default function Home() {
  useEffect(() => {
    document.documentElement.classList.remove("dark"); // Force light mode
  }, []);

  return (
    <DotBackground>
      <MainContent />
    </DotBackground>
  );
}
function MainContent() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <SocialLinks />
      <AboutMissionSection />
      <TextRevealSection />
      <CarouselSection />
      <OrganizationIconsSection /> {/* Add this new section */}
      <Footer />
    </div>
  );
}

function OrganizationIconsSection() {
  return (
    <section className="py-6">
      {/* Moderate Horizontal Line for Subtle Distinction */}
      <hr className="border-t border-gray-300 mb-6 mx-auto w-48" />
      <div className="flex justify-center items-center gap-12">
        {/* Organization Icons */}
        <IconCard src="/wsu.png" alt="Wichita State University" />
        <IconCard src="/cmi.png" alt="Campus Ministries International" />
        <IconCard src="/fpc.png" alt="First Pentecostal Church" />
      </div>
    </section>
  );
}

// Reusable IconCard component
function IconCard({ src, alt }) {
  return (
    <div className="flex items-center justify-center h-16 w-32 md:h-20 md:w-40">
      <Image
        src={src}
        alt={alt}
        width={100}
        height={50}
        className="object-contain"
        draggable={false}
      />
    </div>
  );
}


// Define the new TextRevealSection
function TextRevealSection() {
  return (
    <section className="py-20 px-6 flex justify-center items-center bg-[#0E0E10]">
      <TextRevealCard
        text="God Is Good"
        revealText="All The Time"
      >
        <TextRevealCardTitle>
          Discover the Heart of Aftershock
        </TextRevealCardTitle>
        <TextRevealCardDescription>
          Hover over the card to reveal what makes Aftershock unique. If on mobile, press the last letter in the phrase below.
        </TextRevealCardDescription>
      </TextRevealCard>
    </section>
  );
}

function AboutMissionSection() {
  return (
    <section className="py-12 px-6 md:px-20 relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-7xl mx-auto">
      {/* Text Content */}
      <div className="text-left space-y-6">
        <h2 className="text-3xl md:text-5xl font-bold leading-snug text-gray-800 mb-4">
          About <span className="bg-gradient-to-r from-yellow-400 to-red-500 text-white px-2 rounded">Aftershock</span>
        </h2>
        <p className="text-lg text-gray-600">
          <span className="bg-gradient-to-r from-yellow-400 to-red-500 text-white px-1 rounded">Aftershock</span> is a vibrant campus ministry at Wichita State University. 
          Our mission is to offer a place of <span className="bg-gradient-to-r from-yellow-400 to-red-500 text-white px-1 rounded">safety</span>, <span className="bg-gradient-to-r from-yellow-400 to-red-500 text-white px-1 rounded">security</span>, and <span className="bg-gradient-to-r from-yellow-400 to-red-500 text-white px-1 rounded">comfort</span> for others of like faith to explore the Word of God and openly seek guidance and instruction while doing so.
        </p>
        <p className="text-lg text-gray-600">
          Through <span className="bg-gradient-to-r from-yellow-400 to-red-500 text-white px-1 rounded">Christian fellowship</span>, Aftershock empowers students to grow in faith, build <span className="bg-gradient-to-r from-yellow-400 to-red-500 text-white px-1 rounded">Godly character</span>, and discover their purpose. Join a community that fosters <span className="bg-gradient-to-r from-yellow-400 to-red-500 text-white px-1 rounded">spiritual growth</span>, meaningful connections, and Christ-centered lives.
        </p>
      </div>

      {/* Hero Video Dialog */}
      <div className="flex justify-center">
        <HeroVideoDialog
          className="block max-w-md"
          animationStyle="from-center"
          videoSrc="/video.mp4" // Set the video source to video.mp4
          thumbnailSrc="thumbnail.jpg"
          thumbnailAlt="Aftershock Video"
        />
      </div>
    </section>
  );
}



// Logo Component
function Logo() {
  return (
    <div className="w-40 md:w-60 mx-auto mb-6">
      <Image
        src="/logo.png" // Replace with your actual logo path
        alt="Aftershock Logo"
        height={240}
        width={240}
        className="object-contain"
        draggable={false}
      />
    </div>
  );
}

// Container Scroll for Hero Section
const ContainerScroll = ({ titleComponent, children }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scaleDimensions = () => (isMobile ? [0.7, 0.9] : [1.05, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      className="h-[60rem] md:h-[80rem] flex items-center justify-center relative p-2 md:p-20"
      ref={containerRef}
    >
      <div className="py-10 md:py-40 w-full relative" style={{ perspective: "1000px" }}>
        <Header translate={translate} titleComponent={titleComponent} />
        <iCard rotate={rotate} translate={translate} scale={scale}>
          {children}
        </iCard>
      </div>
    </div>
  );
};

// Header Component
export const Header = ({ translate, titleComponent }) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

// Grid Background Component
function DotBackground({ children }) {
  return (
    <div className="min-h-screen w-full bg-white relative">
      {/* Dot Pattern */}
      <div className="absolute inset-0 pointer-events-none bg-dot-pattern bg-repeat"></div>
      {/* Page Content */}
      <div className="relative">{children}</div>
    </div>
  );
}

// HeroHighlight Component
export const HeroHighlight = ({ children, className, containerClassName }) => {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    if (!currentTarget) return;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={cn(
        "relative h-[40rem] flex items-center bg-white justify-center w-full group",
        containerClassName
      )}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="absolute inset-0 bg-dot-thick-neutral-300 pointer-events-none"
        style={{
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
          maskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
        }}
      />
      <div className={cn("relative z-20", className)}>{children}</div>
    </div>
  );
};

// Highlight Component
export const Highlight = ({ children, className }) => {
  return (
    <motion.span
      initial={{ backgroundSize: "0% 100%" }}
      animate={{ backgroundSize: "100% 100%" }}
      transition={{ duration: 2, ease: "linear", delay: 0.5 }}
      className={cn(
        `relative inline-block pb-1 px-1 rounded-lg bg-gradient-to-r from-indigo-300 to-purple-300`,
        className
      )}
    >
      {children}
    </motion.span>
  );
};




const ImageComponent = ({ card }) => {
  return (
    <Image
      src={card.thumbnail}
      layout="fill" // Use fill to ensure the image covers the card
      objectFit="cover" // Ensures the image fits within the container
      alt="thumbnail"
    />
  );
};

const SelectedCard = ({ selected }) => {
  return (
    <div className="bg-transparent h-full w-full flex flex-col justify-end rounded-lg shadow-2xl relative z-[60]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        className="absolute inset-0 h-full w-full bg-black opacity-60 z-10"
      />
      <motion.div
        layoutId={`content-${selected?.id}`}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative px-8 pb-4 z-[70]"
      >
        {selected?.content}
      </motion.div>
    </div>
  );
};

function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-700 py-8 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h3 className="text-lg font-bold mb-4">About Aftershock</h3>
          <p className="text-sm text-gray-600">
            Aftershock is a vibrant campus ministry at Wichita State University.
            We aim to foster faith, build community, and inspire service among students.
          </p>
        </div>

        {/* Quick Links Section */}
        <div>
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>
              <a href="#" className="hover:text-yellow-500">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-500">
                Sessions
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-500">
                Gallery
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-500">
                Ambassadors
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-lg font-bold mb-4">Get in Touch</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>
              E:{" "}
              <a
                href="mailto:npleonard@shockers.wichita.edu"
                className="hover:text-yellow-500"
              >
                npleonard@shockers.wichita.edu
              </a>
            </li>
            <li>
              <a href="tel:+13166330276" className="hover:text-yellow-500">
                (316) 633-0276
              </a>
            </li>
            <li>Location: Woolsey Hall, AGH Conference Room</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-8 border-t border-gray-200 pt-4 text-center">
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} Aftershock. All rights reserved.
        </p>
      </div>
    </footer>
  );
}


import { faFacebook, faInstagram, faWhatsapp, fa42Group } from "@fortawesome/free-brands-svg-icons";

function SocialLinks() {
  return (
    <section className="py-8 flex justify-center px-4 sm:px-6 md:px-8">
      <div className="bg-white/70 backdrop-blur-lg shadow-lg rounded-2xl px-6 md:px-12 py-6 max-w-7xl w-full">
        <h3 className="text-center text-lg md:text-2xl font-bold text-gray-800 mb-4">
          Official Social Channels
        </h3>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6">
          {/* Facebook */}
          <SocialItem
            icon={faFacebook}
            text="Facebook"
            link="https://www.facebook.com/100087175924444"
            color="text-blue-600"
          />
          <Divider />
          {/* Instagram */}
          <SocialItem
            icon={faInstagram}
            text="Instagram"
            link="https://instagram.com/wsuaftershock"
            color="text-pink-600"
          />
          <Divider />
          {/* WhatsApp */}
          <SocialItem
            icon={faWhatsapp}
            text="WhatsApp"
            link="https://chat.whatsapp.com/JZw8cloNR0R7z9BhZnds8v"
            color="text-green-600"
          />
          <Divider />
          {/* GroupMe */}
          <SocialItem
            icon={fa42Group}
            text="GroupMe"
            link="https://groupme.com/join_group/71684550/CvldvIfD"
            color="text-blue-500"
          />
        </div>
      </div>
    </section>
  );
}


function SocialItem({ icon, text, link, color }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-gray-700 hover:text-black transition duration-300"
    >
      <FontAwesomeIcon icon={icon} className={`text-2xl ${color}`} />
      <span className="text-sm md:text-base font-medium">{text}</span>
    </a>
  );
}

function Divider() {
  return (
    <div className="hidden md:block h-6 w-px bg-gray-300"></div>
  );
}
export const iCard = ({ rotate, scale, children }) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full border-4 border-[#6C6C6C] p-2 md:p-6 bg-[#f9f9f9] rounded-[30px] shadow-2xl"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-gray-100 md:rounded-2xl md:p-4">
        {children}
      </div>
    </motion.div>
  );
};

function CarouselSection() {
  const data = [
    {
      category: "Bible Study",
      title: "Every Thursday @ 7 PM | Woolsey Hall AGH Conference Room",
      src: "/carousel1.jpg",
      content: (
        <p>
          Join us for Bible Study every Thursday evening! Dive deep into the Word of God, engage in meaningful discussions, and grow in your faith alongside a vibrant community of students.
        </p>
      ),
    },
    {
      category: "FPC Shuttle",
      title: "Pickups for Everyone On and Around WSU Campus",
      src: "/carousel2.jpg",
      content: (
        <p>
          Enjoy free shuttle service provided for WSU students and faculty. Convenient pickups are available on and around the campus to make your commute easier and stress-free.
        </p>
      ),
    },
    {
      category: "Ambassador Program",
      title: "Serve God and Join Outreach",
      src: "/carousel3.jpg",
      content: (
        <p>
          Be a part of our Ambassador Program and take a step towards serving God and spreading His Word. Join us in community outreach initiatives to make a lasting impact.
        </p>
      ),
    },
    {
      category: "Worship Night",
      title: "Nights of Worship and Intercession",
      src: "/carousel4.jpg",
      content: (
        <p>
          Experience powerful nights of worship and prayer! Join us as we lift our voices in praise and intercede for our campus and community in the presence of God.
        </p>
      ),
    },
  ];
  

  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full py-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 font-sans">
        Aftershock Activities
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

