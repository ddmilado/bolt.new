"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
}

export default function AnimatedText({ 
  text, 
  className = "", 
  speed = 40, 
  delay = 0 
}: AnimatedTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const index = useRef(0);
  
  useEffect(() => {
    if (delay > 0) {
      const delayTimer = setTimeout(() => {
        startAnimation();
      }, delay);
      return () => clearTimeout(delayTimer);
    } else {
      startAnimation();
    }
  }, []);
  
  const startAnimation = () => {
    const timer = setInterval(() => {
      if (index.current < text.length) {
        setDisplayedText(prev => prev + text.charAt(index.current));
        index.current += 1;
      } else {
        clearInterval(timer);
        setIsComplete(true);
      }
    }, speed);
    
    return () => clearInterval(timer);
  };
  
  return (
    <span className={className}>
      {displayedText}
      {!isComplete && (
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block ml-1"
        >
          |
        </motion.span>
      )}
    </span>
  );
}