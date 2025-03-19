"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Twitter, Globe } from "lucide-react";
import Navbar from "@/components/Navbar";

// Judge data with images, names, titles, and full bios
const judges = [
  {
    id: "greg-isenberg",
    name: "Greg Isenberg",
    title: "Host & CEO of Late Checkout",
    shortBio: "Building community-based internet businesses",
    image: "https://pbs.twimg.com/profile_images/1613230890867920897/HuTMGKI__400x400.jpg",
    fullBio: "Greg Isenberg is the CEO and co-founder of Late Checkout, a holding company focused on building community-based internet businesses. With a history of starting and selling three venture-backed community companies, he has established himself as a successful entrepreneur. Based in Miami Beach, Greg serves as an advisor to major platforms like TikTok and Reddit. He runs Greg's Letter, a newsletter with over 124,235 subscribers, offering weekly startup ideas and business insights since 2020. Greg's influence extends to his YouTube channel where he shares startup ideas, and he's been featured on podcasts like 'My First Million.'",
    twitter: "gregisenberg",
    website: "https://www.gregisenberg.com",
    isHost: true
  },
  {
    id: "pieter-levels",
    name: "Pieter Levels",
    title: "Entrepreneur & Founder",
    shortBio: "Creator of Nomad List and Remote OK",
    image: "https://pbs.twimg.com/profile_images/1701300145553154048/3zJJK3yT_400x400.jpg",
    fullBio: "Pieter Levels is a Dutch entrepreneur and programmer who has made significant contributions to the tech community. He is best known for creating Nomad List and Remote OK, platforms that support digital nomads and remote workers by providing resources and community connections. Levels is recognized for his indie hacking approach, building multiple successful startups on his own, which has influenced the digital nomad movement. His tech stack is notably lean, running his entire operation on a single VPS, reflecting his no-nonsense, unpretentious product-building philosophy.",
    twitter: "levelsio",
    website: "https://levels.io"
  },
  {
    id: "logan-kilpatrick",
    name: "Logan Kilpatrick",
    title: "AI Expert at Google DeepMind",
    shortBio: "Former OpenAI & Apple ML Engineer",
    image: "https://pbs.twimg.com/profile_images/1593041004231507968/GYIOsoTW_400x400.jpg",
    fullBio: "Logan Kilpatrick is a prominent figure in artificial intelligence and machine learning. He holds a Bachelor of Liberal Arts in Computer Science from Harvard University (cum laude) and is pursuing a Master of Liberal Arts in Digital Media Design at Harvard and a Master in Law from Northwestern University. Logan has held notable roles at OpenAI, Apple, and currently at Google DeepMind, where he leads product for Google AI Studio and the Gemini API. His work focuses on developer advocacy, helping developers build with AI tools. Logan has invested in over 50 startups including Cursor and Cognition, and runs a YouTube channel where he shares content to assist developers in the AI community.",
    twitter: "OfficialLoganK",
    website: "https://logank.ai"
  },
  {
    id: "sarah-chen",
    name: "Sarah Chen",
    title: "AI Research Director",
    shortBio: "Leading AI ethics researcher",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    fullBio: "Dr. Sarah Chen leads AI ethics research at a major tech company, focusing on responsible AI development. With over 15 years of experience in machine learning and computational linguistics, she has published numerous papers on bias mitigation in large language models. She received her Ph.D. from MIT and has been recognized with multiple industry awards for her contributions to ethical AI practices.",
  },
  {
    id: "marcus-johnson",
    name: "Marcus Johnson",
    title: "Tech Entrepreneur",
    shortBio: "Serial founder with 3 successful exits",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    fullBio: "Marcus Johnson is a serial entrepreneur who has founded and sold three successful tech startups. His most recent venture in AI-powered healthcare solutions was acquired for $200M. Marcus now mentors early-stage founders and invests in AI startups through his venture fund. He's particularly interested in AI applications that solve real-world problems and create meaningful social impact.",
  },
  {
    id: "aisha-patel",
    name: "Aisha Patel",
    title: "CTO, InnovateAI",
    shortBio: "Former ML lead at Google",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    fullBio: "Aisha Patel serves as the CTO of InnovateAI, where she leads a team of 200+ engineers building next-generation AI tools. Previously, she was a Machine Learning Lead at Google, where she worked on breakthrough NLP models. Aisha holds multiple patents in AI and distributed systems. She's passionate about creating AI tools that augment human creativity and productivity rather than replacing human work.",
  },
  {
    id: "david-kim",
    name: "David Kim",
    title: "Open Source Advocate",
    shortBio: "Creator of popular AI frameworks",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    fullBio: "David Kim is the creator of several widely-used open source AI frameworks that have been adopted by millions of developers worldwide. His work on democratizing access to AI tools has earned him numerous industry awards. David is passionate about making AI accessible to developers of all skill levels. He regularly speaks at conferences about the importance of open source in advancing AI technology and ensuring it benefits everyone.",
  },
];

export default function JudgesPage() {
  // Put host at the top
  const sortedJudges = [...judges].sort((a, b) => {
    if (a.isHost) return -1;
    if (b.isHost) return 1;
    return 0;
  });

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <Link href="/#judges" className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to home
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mb-6">
              Meet Our Judges & Host
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Industry leaders and experts who will evaluate your projects
            </p>
          </motion.div>
          
          <div className="space-y-16">
            {sortedJudges.map((judge) => (
              <motion.div 
                key={judge.id}
                id={judge.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`flex flex-col md:flex-row gap-8 border border-white/10 rounded-lg p-8 bg-black/40 backdrop-blur-sm ${judge.isHost ? 'border-purple-500/30' : ''}`}
              >
                <div className="md:w-1/3 relative">
                  <div className="relative h-80 w-full rounded-lg overflow-hidden">
                    <Image 
                      src={judge.image} 
                      alt={judge.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {judge.isHost && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-bold px-4 py-2 rounded-full">
                      HOST
                    </div>
                  )}
                </div>
                <div className="md:w-2/3">
                  <h2 className="text-2xl font-bold text-white mb-2">{judge.name}</h2>
                  <p className="text-purple-400 text-lg mb-4">{judge.title}</p>
                  <p className="text-gray-400 mb-6">{judge.fullBio}</p>
                  <div className="flex space-x-4">
                    {judge.twitter && (
                      <a 
                        href={`https://twitter.com/${judge.twitter}`}
                        target="_blank"
                        rel="noopener noreferrer" 
                        className="inline-flex items-center text-blue-400 hover:text-blue-300"
                      >
                        <Twitter className="w-5 h-5 mr-2" />
                        @{judge.twitter}
                      </a>
                    )}
                    {judge.website && (
                      <a 
                        href={judge.website}
                        target="_blank"
                        rel="noopener noreferrer" 
                        className="inline-flex items-center text-purple-400 hover:text-purple-300"
                      >
                        <Globe className="w-5 h-5 mr-2" />
                        Website
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-gray-400 mb-6">Want to join our panel of judges?</p>
            <a 
              href="mailto:judges@worldslargestbackathon.com" 
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
            >
              Apply to be a Judge
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}