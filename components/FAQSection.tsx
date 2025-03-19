"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Updated FAQ data for the hackathon
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
    question: "How will the prizes be distributed?",
    answer: "The $1M+ prize pool will be distributed across various categories including Grand Prize, Best AI Implementation, Most Innovative Solution, Best Social Impact, and many other category-specific awards. Full prize details will be announced closer to the event."
  }
];

export default function FAQSection() {
  return (
    <section id="faq" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Get answers to common questions about the World's Largest Hackathon, from participation details to prize distribution.
          </p>
        </div>
        
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
            <Link 
              href="/faq" 
              className="inline-flex items-center text-purple-400 hover:text-purple-300"
            >
              View all FAQs <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}