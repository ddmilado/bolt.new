"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GlobeIcon, Sparkles, Users, Code2, Trophy, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Bebas_Neue } from 'next/font/google';
import Navbar from "@/components/Navbar";
import RegistrationForm from "@/components/RegistrationForm";
import JudgesSection from "@/components/JudgesSection";
import SponsorsSection from "@/components/SponsorsSection";
import PrizesSection from "@/components/PrizesSection";
import FAQSection from "@/components/FAQSection";
import { Inter } from 'next/font/google';
import AnimatedText from "@/components/AnimatedText";
import ParticleBackground from "@/components/ParticleBackground";

// Initialize the Bebas Neue font
const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
});

const stats = [
  { icon: Users, label: "Participants", value: "100,000", target: 100000 },
  { icon: Code2, label: "Prize Pool", value: "$1M+", prefix: "$", target: 1000000 },
];

export default function Home() {
  const [mounted, setMounted] = useState(true); // Changed to true for instant loading
  const [timeLeft, setTimeLeft] = useState({
    days: 30,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  // Add registered builders count
  const [registeredCount, setRegisteredCount] = useState(42879);

  useEffect(() => {
    // Update target date to March 31, 2025
    const targetDate = new Date("2025-03-31T00:00:00");

    const timeInterval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    }, 1000);

    // Add registration count animation
    const registrationInterval = setInterval(() => {
      const randomIncrease = Math.floor(Math.random() * 6) + 5; // Random number between 5-10
      setRegisteredCount(prevCount => prevCount + randomIncrease);
    }, 1000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(registrationInterval);
    };
  }, []);

  // Removed the if (!mounted) return null; line to make buttons load instantly

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-screen">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-black/20" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-20" />
          <div className="absolute inset-0 bg-grid-white/10" />
          <ParticleBackground />
        </div>

        {/* Content - Adjusted to make content bigger while fitting in background */}
        <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto py-4" // Increased max-width, adjusted padding
          >
            {/* World Record Attempt Badge */}
            <motion.div 
              className="flex justify-center w-full mb-3" // Slightly reduced margin
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="inline-flex items-center px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
                <Sparkles className="w-4 h-4 mr-2 text-purple-400" />
                <span className="text-purple-400 text-sm font-medium">World Record Attempt</span>
              </div>
            </motion.div>

            {/* bolt.new presents text */}
            <motion.div 
              className="text-xl text-gray-300 font-medium mb-3 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span className="font-bold text-white flex items-center">
                <span className="bg-black w-5 h-5 flex items-center justify-center mr-0.5 rounded-md">
                  <span className="text-white font-bold text-md lowercase" style={{ fontFamily: 'Futura, "Trebuchet MS", Arial, sans-serif' }}>b</span>
                </span>
                olt.new
              </span>
              <span className="ml-2">presents</span>
            </motion.div>

            {/* Main Heading - Fixed rendering */}
            <div className={`${bebasNeue.className} text-5xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-tight leading-tight`}>
              <motion.div 
                className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                THE WORLD&apos;S LARGEST
              </motion.div>
              <motion.div 
                className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                HACKATHON
              </motion.div>
            </div>
            
            {/* Subheading - Fixed rendering */}
            <motion.div 
              className="text-xl md:text-2xl text-gray-300 mb-5 max-w-4xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Join 100,000 builders for a historic 24-hour virtual event with $1M+ in prizes
            </motion.div>
            
            {/* CTA Buttons - Made bigger */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center mb-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 4.5, duration: 0.8 }}
            >
              <a
                href="#register"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Register Now
              </a>
              <a 
                href="mailto:sponsors@bolt.new"
                className="px-8 py-4 bg-white/10 border border-white/20 rounded-xl text-lg font-semibold hover:bg-white/20 transition-all"
              >
                Become a Sponsor
              </a>
            </motion.div>
            
            {/* Registered Builders Count - Made bigger */}
            <motion.div 
              className="mb-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 5, duration: 1 }}
            >
              <p className="text-xl text-purple-400 font-semibold">
                {registeredCount.toLocaleString()} builders already registered
              </p>
            </motion.div>

            {/* Countdown Timer - Made bigger while still compact */}
            <motion.div 
              className="grid grid-cols-4 gap-3 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 5.5, duration: 0.8 }}
            >
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div
                  key={unit}
                  className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-xl p-4"
                >
                  <div className="text-3xl md:text-4xl font-bold text-white">{value}</div>
                  <div className="text-sm text-gray-400 capitalize">{unit}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Rest of your sections */}
      <PrizesSection />
      <JudgesSection />
      <SponsorsSection />
      <FAQSection />
      <RegistrationForm />
    </main>
  );
}

// Find the section where the registration count is displayed and update it to:
// ```typescriptreact
// <div className="flex flex-col items-center">
//   <motion.div 
//     className="text-4xl md:text-5xl font-bold text-white mb-2"
//     key={registeredCount} // Add key to force re-render on count change
//     initial={{ scale: 1 }}
//     animate={{ scale: [1, 1.05, 1] }}
//     transition={{ duration: 0.3 }}
//   >
//     {registeredCount.toLocaleString()}
//   </motion.div>
//   <p className="text-gray-400">Developers Registered</p>
// </div>
// ```