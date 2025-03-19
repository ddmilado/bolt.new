"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Twitter } from "lucide-react";

// Judge data with images, names, titles, and short bios
const judges = [
  {
    id: "greg-isenberg",
    name: "Greg Isenberg",
    title: "Host & CEO of Late Checkout",
    shortBio: "Building community-based internet businesses",
    image: "https://res.cloudinary.com/dzh8mryxw/image/upload/v1742351622/greg_zg5byk.jpg",
    twitter: "gregisenberg",
    isHost: true,
    fullBio: "Greg Isenberg is the CEO and co-founder of Late Checkout, a holding company focused on building community-based internet businesses. With a history of starting and selling three venture-backed community companies, he has established himself as a successful entrepreneur. Based in Miami Beach, Greg serves as an advisor to major platforms like TikTok and Reddit. He runs Greg's Letter, a newsletter with over 124,235 subscribers, offering weekly startup ideas and business insights since 2020."
  },
  {
    id: "pieter-levels",
    name: "Pieter Levels",
    title: "Entrepreneur & Founder",
    shortBio: "Creator of Nomad List and Remote OK",
    image: "https://res.cloudinary.com/dzh8mryxw/image/upload/v1742351622/7150848_rwzkrz.jpg",
    twitter: "levelsio",
    fullBio: "Pieter Levels is a Dutch entrepreneur and programmer who has made significant contributions to the tech community. He is best known for creating Nomad List and Remote OK, platforms that support digital nomads and remote workers by providing resources and community connections. Levels is recognized for his indie hacking approach, building multiple successful startups on his own, which has influenced the digital nomad movement."
  },
  {
    id: "logan-kilpatrick",
    name: "Logan Kilpatrick",
    title: "AI Expert at Google DeepMind",
    shortBio: "Former OpenAI & Apple ML Engineer",
    image: "https://res.cloudinary.com/dzh8mryxw/image/upload/v1742351806/YHL9uBk0_400x400_vihz2v.jpg",
    twitter: "OfficialLoganK",
    fullBio: "Logan Kilpatrick is a prominent figure in artificial intelligence and machine learning. He holds a Bachelor of Liberal Arts in Computer Science from Harvard University (cum laude) and is pursuing a Master of Liberal Arts in Digital Media Design at Harvard and a Master in Law from Northwestern University. Logan has held notable roles at OpenAI, Apple, and currently at Google DeepMind, where he leads product for Google AI Studio and the Gemini API. He's invested in over 50 startups including Cursor and Cognition."
  },
  {
    id: "sarah-chen",
    name: "Sarah Chen",
    title: "AI Research Director",
    shortBio: "Leading AI ethics researcher",
    image: "https://randomuser.me/api/portraits/women/1.jpg"
  },
];

export default function JudgesSection() {
  // Put host at the top for featured display
  const featuredJudges = [...judges].sort((a, b) => {
    if (a.isHost) return -1;
    if (b.isHost) return 1;
    return 0;
  });

  return (
    <section id="judges" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mb-4">
            Meet Our Host & Judges
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Industry leaders and experts who will evaluate your projects
          </p>
        </div>
        
        {/* Featured Host */}
        <div className="mb-12">
          {featuredJudges.filter(j => j.isHost).map((host) => (
            <Link href={`/judges#${host.id}`} key={host.id}>
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-black/80 to-purple-950/20 backdrop-blur-sm border border-purple-500/30 rounded-xl overflow-hidden transition-all max-w-4xl mx-auto relative"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full -mr-16 -mt-16 z-0"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/10 rounded-full -ml-12 -mb-12 z-0"></div>
                
                <div className="flex flex-col md:flex-row relative z-10">
                  <div className="relative md:w-1/3 h-64 md:h-auto">
                    <Image 
                      src={host.image} 
                      alt={host.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      HOST
                    </div>
                  </div>
                  <div className="p-6 md:w-2/3 flex flex-col justify-center">
                    <h3 className="text-2xl font-semibold text-white">{host.name}</h3>
                    <p className="text-purple-400 text-md mb-3">{host.title}</p>
                    <p className="text-gray-400">{host.shortBio}</p>
                    {host.twitter && (
                      <p className="text-blue-400 text-sm mt-3 flex items-center">
                        <Twitter className="w-4 h-4 mr-1" />
                        @{host.twitter}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
        
        {/* Judges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredJudges.filter(j => !j.isHost).map((judge) => (
            <Link href={`/judges#${judge.id}`} key={judge.id}>
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-black/80 to-purple-950/20 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-purple-500/30 transition-all h-full relative"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-full -mr-10 -mt-10 z-0"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-blue-500/10 rounded-full -ml-8 -mb-8 z-0"></div>
                
                <div className="relative z-10">
                  <div className="relative h-64 w-full">
                    <Image 
                      src={judge.image} 
                      alt={judge.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white">{judge.name}</h3>
                    <p className="text-purple-400 text-sm mb-2">{judge.title}</p>
                    <p className="text-gray-400 text-sm">{judge.shortBio}</p>
                    {judge.twitter && (
                      <p className="text-blue-400 text-sm mt-2 flex items-center">
                        <Twitter className="w-4 h-4 mr-1" />
                        @{judge.twitter}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Link 
            href="/judges" 
            className="inline-flex items-center text-purple-400 hover:text-purple-300"
          >
            View all judges <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}