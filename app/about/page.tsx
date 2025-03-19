"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Twitter } from "lucide-react";
import Navbar from "@/components/Navbar";
import { sponsors } from "@/components/SponsorsSection";
import Image from "next/image";

const teamMembers = [
  { name: "KP", twitter: "thisiskp_", role: "Visionary" },
  { name: "bolt.new team", twitter: "boltdotnew", role: "Platform" },
  { name: "Eric Simons", twitter: "ericsimons", role: "Collaborator" },
  { name: "Paul Copplestone", twitter: "kiwicopple", role: "Domain Sponsor" },
  { name: "Greg Isenberg", twitter: "gregisenberg", role: "Host" }
];

// Renamed from 'sponsors' to 'teamSponsors' to avoid conflict
const teamSponsors = [
  "Supabase",
  "Netlify",
  "CloudflareDev",
  "Sentry",
  "Loops",
  "AlgoFoundation"
];

export default function AboutPage() {
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
          >
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mb-6">
                About The World's Largest Hackathon
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                A global movement uniting developers, designers, and dreamers in the pursuit of innovation
              </p>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto space-y-16">
              {/* Our Story */}
              <section>
                <h2 className="text-2xl font-bold text-purple-400 mb-4">Our Story</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed">
                    The World's Largest Hackathon emerged from a brilliant spark of collaboration among tech visionaries. 
                    What began as a bold idea quickly transformed into reality when the bolt.new team, creators of an 
                    AI-powered web development platform, stepped in to bring this vision to life. In just 48 hours, 
                    this virtual event took shape, demonstrating the power of rapid execution and shared vision.
                  </p>
                </div>
                
                {/* Team Members */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                  {teamMembers.map((member) => (
                    <a
                      key={member.twitter}
                      href={`https://twitter.com/${member.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all"
                    >
                      <div className="flex items-center space-x-3">
                        <Twitter className="h-5 w-5 text-blue-400" />
                        <div>
                          <p className="font-medium text-white">{member.name}</p>
                          <p className="text-sm text-gray-400">{member.role}</p>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </section>

              {/* The Vision */}
              <section>
                <h2 className="text-2xl font-bold text-purple-400 mb-4">The Vision</h2>
                <p className="text-gray-300 leading-relaxed">
                  This isn't just another hackathon—it's a movement to unite creators worldwide in a virtual sprint 
                  of creativity and problem-solving. With a prize pool exceeding $1 million, we're building an event 
                  that pushes boundaries and celebrates the power of collaborative ingenuity.
                </p>
              </section>

              {/* Current Sponsors */}
              <section>
                <h2 className="text-2xl font-bold text-purple-400 mb-4">Current Sponsors</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                  {sponsors.map((sponsor) => (
                    <div key={sponsor.name} className="flex flex-col items-center">
                      <Link href={sponsor.website} target="_blank" rel="noopener noreferrer">
                        <motion.div 
                          whileHover={{ y: -5 }}
                          className="bg-white/5 rounded-full p-4 flex items-center justify-center h-40 w-40 transition-all overflow-hidden"
                        >
                          <div className="relative w-full h-full">
                            <Image 
                              src={sponsor.logo} 
                              alt={sponsor.name} 
                              fill
                              className="object-cover rounded-full"
                              style={{ objectFit: 'cover' }}
                            />
                          </div>
                        </motion.div>
                      </Link>
                      <span className="mt-4 text-white font-medium">{sponsor.name}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Community Focus */}
              <section>
                <h2 className="text-2xl font-bold text-purple-400 mb-4">Community at the Core</h2>
                <p className="text-gray-300 leading-relaxed">
                  What sets us apart is our commitment to the community from day one. We kicked things off with 
                  a $3,000 competition to design this very website, inviting coders and designers to shape the 
                  hackathon's digital home. This is more than a contest—it's a call to action for everyone to 
                  contribute, whether through building, brainstorming, or simply vibing with the global tech scene.
                </p>
              </section>

              {/* Join the Movement */}
              <section className="text-center">
                <h2 className="text-2xl font-bold text-purple-400 mb-4">Join the History</h2>
                <p className="text-gray-300 leading-relaxed mb-8">
                  The World's Largest Hackathon is still in its early stages, but the energy is electric. 
                  With a theme open to creative freedom, a virtual stage for global participation, and a prize 
                  structure designed for multiple winners, this is your chance to be part of something legendary.
                </p>
                <Link 
                  href="#register" 
                  className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  Register Now
                </Link>
              </section>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}