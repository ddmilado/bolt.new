"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from 'react';

// Updated sponsors array with logo URLs
export const sponsors = [
  { 
    name: "Supabase", 
    logo: "https://res.cloudinary.com/dzh8mryxw/image/upload/v1742352478/7xkKXRGQ_400x400_knytt4.jpg", 
    website: "https://supabase.com" 
  },
  { 
    name: "Netlify", 
    logo: "https://res.cloudinary.com/dzh8mryxw/image/upload/v1742351622/netlify_zfikei.png", 
    website: "https://netlify.com" 
  },
  { 
    name: "Cloudflare", 
    logo: "https://res.cloudinary.com/dzh8mryxw/image/upload/v1742351622/cloudfare_aad8vm.jpg", 
    website: "https://cloudflare.com" 
  },
  { 
    name: "Sentry", 
    logo: "https://res.cloudinary.com/dzh8mryxw/image/upload/v1742351623/qDkInWXX_400x400_1_oupjt8.png", 
    website: "https://sentry.io" 
  },
  { 
    name: "Loops", 
    logo: "https://res.cloudinary.com/dzh8mryxw/image/upload/v1742351622/iE5EGXW3_400x400_v5akmz.jpg", 
    website: "https://theloops.io" 
  },
  { 
    name: "Algo Foundation", 
    logo: "https://res.cloudinary.com/dzh8mryxw/image/upload/v1742351622/0fI5Zrbv_400x400_rm4qtp.jpg", 
    website: "https://algofoundation.org" 
  }
];

export default function SponsorsSection() {
  return (
    <section id="sponsors" className="py-20 bg-black/80">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mb-4">
            Our Sponsors
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Leading companies supporting the world's largest hackathon
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto">
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
        
        <div className="mt-8 text-center">
          <Link 
            href="/#register" 
            className="px-8 py-4 bg-white/10 border border-white/20 rounded-xl text-lg font-semibold hover:bg-white/20 transition-all"
          >
            Become a Sponsor
          </Link>
        </div>
      </div>
    </section>
  );
}