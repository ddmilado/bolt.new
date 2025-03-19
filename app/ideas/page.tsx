"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

// Project ideas data
const projectIdeas = [
  {
    id: 1,
    title: "AI-Powered Personal Learning Assistant",
    description: "Create an AI assistant that helps users learn new skills by adapting to their learning style, providing personalized resources, and tracking progress.",
    difficulty: "Medium",
    category: "Education",
    techStack: ["AI/ML", "Web/Mobile App", "Natural Language Processing"],
    potentialFeatures: [
      "Personalized learning paths",
      "Progress tracking and analytics",
      "Content recommendation engine",
      "Interactive quizzes and exercises"
    ]
  },
  {
    id: 2,
    title: "Community-Based Carbon Footprint Tracker",
    description: "Build a platform that helps communities track and reduce their collective carbon footprint through gamification and social incentives.",
    difficulty: "Medium",
    category: "Climate Tech",
    techStack: ["Web App", "Mobile App", "Data Visualization", "Gamification"],
    potentialFeatures: [
      "Personal and community carbon tracking",
      "Achievement system and leaderboards",
      "Actionable recommendations for reducing emissions",
      "Integration with smart home devices"
    ]
  },
  {
    id: 3,
    title: "AI Content Moderation Tool",
    description: "Develop an AI-powered content moderation system that can detect and filter inappropriate content across multiple languages and formats.",
    difficulty: "Hard",
    category: "Content Moderation",
    techStack: ["AI/ML", "Computer Vision", "Natural Language Processing"],
    potentialFeatures: [
      "Multi-language support",
      "Image, video, and text analysis",
      "Customizable moderation policies",
      "Real-time monitoring dashboard"
    ]
  },
  {
    id: 4,
    title: "Decentralized Marketplace for Digital Creators",
    description: "Create a decentralized platform where digital creators can sell their work directly to consumers without intermediaries.",
    difficulty: "Hard",
    category: "Web3",
    techStack: ["Blockchain", "Smart Contracts", "Web Development"],
    potentialFeatures: [
      "Direct creator-to-consumer transactions",
      "Smart contract-based royalties",
      "Creator verification system",
      "Integrated digital wallet"
    ]
  },
  {
    id: 5,
    title: "Accessibility Checker for Web Applications",
    description: "Build a tool that helps developers identify and fix accessibility issues in their web applications.",
    difficulty: "Medium",
    category: "Accessibility",
    techStack: ["Web Development", "Browser Extension", "Automation"],
    potentialFeatures: [
      "Automated accessibility audits",
      "Real-time suggestions for improvements",
      "WCAG compliance checking",
      "Visual highlighting of issues"
    ]
  },
  {
    id: 6,
    title: "Mental Health Support Chatbot",
    description: "Develop an AI chatbot that provides mental health support, resources, and coping strategies for users experiencing stress, anxiety, or depression.",
    difficulty: "Medium",
    category: "Healthcare",
    techStack: ["AI/ML", "Natural Language Processing", "Web/Mobile App"],
    potentialFeatures: [
      "Mood tracking and analysis",
      "Personalized coping strategies",
      "Resource recommendations",
      "Crisis intervention protocols"
    ]
  },
  {
    id: 7,
    title: "Augmented Reality Language Learning App",
    description: "Create an AR app that helps users learn new languages by overlaying translations and information on real-world objects.",
    difficulty: "Hard",
    category: "Education",
    techStack: ["AR/VR", "Mobile Development", "AI/ML"],
    potentialFeatures: [
      "Object recognition and translation",
      "Interactive pronunciation practice",
      "Gamified learning experiences",
      "Progress tracking"
    ]
  },
  {
    id: 8,
    title: "Smart Home Energy Optimization System",
    description: "Build a system that uses AI to optimize energy usage in smart homes based on user behavior, weather conditions, and energy prices.",
    difficulty: "Hard",
    category: "Energy",
    techStack: ["IoT", "AI/ML", "Data Analysis"],
    potentialFeatures: [
      "Predictive energy usage modeling",
      "Automated device control",
      "Cost-saving recommendations",
      "Integration with smart home platforms"
    ]
  }
];

export default function IdeasPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <Link href="/" className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to home
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mb-6">
              Project Ideas
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Need inspiration? Browse these project ideas to kickstart your hackathon journey.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectIdeas.map((idea) => (
              <motion.div
                key={idea.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-xl overflow-hidden hover:border-purple-500/50 transition-all"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white">{idea.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      idea.difficulty === "Easy" ? "bg-green-500/20 text-green-400" :
                      idea.difficulty === "Medium" ? "bg-yellow-500/20 text-yellow-400" :
                      "bg-red-500/20 text-red-400"
                    }`}>
                      {idea.difficulty}
                    </span>
                  </div>
                  
                  <p className="text-gray-400 mb-4">{idea.description}</p>
                  
                  <div className="mb-4">
                    <span className="text-sm font-semibold text-purple-400">Category:</span>
                    <span className="ml-2 text-sm text-gray-300">{idea.category}</span>
                  </div>
                  
                  <div className="mb-4">
                    <span className="text-sm font-semibold text-purple-400">Tech Stack:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {idea.techStack.map((tech, index) => (
                        <span key={index} className="px-2 py-1 bg-white/10 rounded-md text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-sm font-semibold text-purple-400">Potential Features:</span>
                    <ul className="mt-1 space-y-1">
                      {idea.potentialFeatures.map((feature, index) => (
                        <li key={index} className="text-sm text-gray-300 flex items-start">
                          <span className="text-purple-400 mr-2">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-gray-400 mb-6">
              Don't see something that inspires you? Get creative and build your own unique project!
            </p>
            <Link 
              href="/submissions" 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
            >
              Submit Your Project <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}