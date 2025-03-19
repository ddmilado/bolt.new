"use client";

import { motion } from "framer-motion";
import { Trophy, Code, Lightbulb, Heart, Zap, Globe } from "lucide-react";

const prizes = [
  {
    name: "Grand Prize",
    amount: "$250,000",
    description: "Awarded to the overall best project that demonstrates exceptional innovation, technical execution, and potential impact.",
    icon: Trophy
  },
  {
    name: "Best AI Implementation",
    amount: "$150,000",
    description: "For the project that showcases the most impressive and effective use of artificial intelligence.",
    icon: Code
  },
  {
    name: "Most Innovative Solution",
    amount: "$100,000",
    description: "Recognizing the most creative and groundbreaking approach to solving a problem.",
    icon: Lightbulb
  },
  {
    name: "Best Social Impact",
    amount: "$100,000",
    description: "For projects addressing important social challenges with potential for significant positive impact.",
    icon: Heart
  },
  {
    name: "Best Performance & Scalability",
    amount: "$75,000",
    description: "Awarded to the project demonstrating exceptional technical performance and ability to scale.",
    icon: Zap
  },
  {
    name: "Best Global Solution",
    amount: "$75,000",
    description: "For projects that address challenges with global relevance and applicability.",
    icon: Globe
  },
];

export default function PrizesSection() {
  return (
    <section id="prizes" className="py-20 bg-gradient-to-b from-black to-purple-950/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mb-4">
            $1M+ in Prizes
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Compete for substantial rewards across multiple categories
          </p>
        </div>
        
        
      
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {prizes.map((prize, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gradient-to-br from-black to-purple-950/30 border border-white/10 rounded-xl p-8 hover:border-purple-500/30 transition-all overflow-hidden relative"
              whileHover={{ y: -5 }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full -mr-12 -mt-12 z-0"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-blue-500/10 rounded-full -ml-8 -mb-8 z-0"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-full mb-6 p-4">
                  <prize.icon className="w-8 h-8 text-purple-300" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{prize.name}</h3>
                <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-4">{prize.amount}</p>
                <p className="text-gray-400">{prize.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}