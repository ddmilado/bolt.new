"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is the World's Largest Hackathon?",
    answer: "The World's Largest Hackathon is a historic 24-hour virtual event aiming to break the Guinness World Record with 100,000 participants from around the globe. Participants will use AI tools to build innovative projects and compete for a share of the $1M+ prize pool."
  },
  {
    question: "When and where will the hackathon take place?",
    answer: "The hackathon will take place on December 31, 2024. It's a completely virtual event, so you can participate from anywhere in the world as long as you have an internet connection."
  },
  {
    question: "Who can participate?",
    answer: "Anyone with an interest in technology and AI can participate! Whether you're a seasoned developer, a student, or just curious about AI, this hackathon welcomes participants of all skill levels and backgrounds."
  },
  {
    question: "Do I need to know how to code?",
    answer: "While coding knowledge is helpful, this hackathon focuses on 'Vibe Coding' with AI tools, making it accessible to those with limited coding experience. We'll provide resources and support to help you get started."
  },
  {
    question: "How do teams work?",
    answer: "You can participate solo or form teams of up to 4 people. Team formation will be supported through our platform before the event, so don't worry if you don't have a team yet!"
  },
  {
    question: "How will the prizes be distributed?",
    answer: "The $1M+ prize pool will be distributed across various categories including Grand Prize, Best AI Implementation, Most Innovative Solution, Best Social Impact, and many other category-specific awards. Full prize details will be announced closer to the event."
  },
  {
    question: "What kind of projects can I build?",
    answer: "You can build any type of project that leverages AI tools. This includes web applications, mobile apps, games, data visualization tools, AI models, or any other creative solution that addresses a problem or creates something innovative."
  },
  {
    question: "What resources will be provided?",
    answer: "Participants will have access to a variety of AI tools, APIs, and computing resources from our sponsors. We'll also provide workshops, mentorship, and technical support throughout the event."
  },
  {
    question: "How will projects be judged?",
    answer: "Projects will be evaluated by our panel of industry experts based on criteria including innovation, technical implementation, use of AI, user experience, and potential impact. Each category will have specific judging criteria relevant to that award."
  },
  {
    question: "Is there a registration fee?",
    answer: "No, participation in the World's Largest Hackathon is completely free. We want to make this event accessible to everyone interested in AI and technology."
  }
];

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <Link href="/#faq" className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to home
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to know about the World's Largest Hackathon
            </p>
          </motion.div>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border border-white/10 rounded-lg overflow-hidden bg-black/50 backdrop-blur-sm"
                >
                  <AccordionTrigger className="px-6 py-4 text-left text-lg font-medium hover:bg-white/5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-2 text-gray-400">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            
            <div className="mt-12 text-center">
              <p className="text-gray-400 mb-6">Still have questions?</p>
              <a 
                href="mailto:info@worldslargestbackathon.com" 
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}