"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Twitter, Github, Linkedin, Instagram, Youtube, Mail, Terminal } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const socialLinks = [
  { name: "Twitter", href: "https://x.com/hackathondev", icon: Twitter },
  { name: "GitHub", href: "https://github.com/hackathondev", icon: Github },
  { name: "LinkedIn", href: "https://linkedin.com/company/hackathondev", icon: Linkedin },
  { name: "Instagram", href: "https://instagram.com/hackathondev", icon: Instagram },
  { name: "YouTube", href: "https://youtube.com/@hackathondev", icon: Youtube },
];

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Ideas", href: "/ideas" },
  { name: "Submissions", href: "/submissions" },
  { name: "FAQ", href: "/faq" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Here you would typically send the email to your backend or newsletter service
      // For now, we'll simulate a successful subscription
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Thanks for subscribing! You'll receive updates soon.");
      setEmail("");
    } catch (error) {
      toast.error("Failed to subscribe. Please try again later.");
      console.error("Subscription error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand and Description */}
          <div>
            <Link href="/" className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-2 mr-2">
                <Terminal className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-bold text-xl">hackathon.dev</span>
            </Link>
            <p className="text-gray-400 mb-6">
              Join the world's largest hackathon with 100,000+ developers building the future with AI.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/5 hover:bg-white/10 p-2 rounded-full transition-colors"
                  whileHover={{ y: -3 }}
                  aria-label={link.name}
                >
                  <link.icon className="w-5 h-5 text-gray-300" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest updates and announcements.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 flex-grow"
                disabled={isSubmitting}
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity whitespace-nowrap disabled:opacity-70"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} hackathon.dev. All rights reserved.
          </p>
          <div className="flex items-center">
            <a 
              href="mailto:contact@hackathon.dev"
              className="text-gray-400 hover:text-purple-400 transition-colors flex items-center text-sm"
            >
              <Mail className="w-4 h-4 mr-2" />
              contact@hackathon.dev
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}