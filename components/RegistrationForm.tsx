"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Loader2, ArrowRight, ArrowLeft, User, Lightbulb, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface FormField {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
  options?: Array<{value: string, label: string}>;
}

interface FormStep {
  title: string;
  label: string;
  icon: LucideIcon;
  fields: FormField[];
}

const formSteps: FormStep[] = [
  {
    title: "Personal Info",
    label: "Personal Info",
    icon: User,
    fields: [
      { name: "fullName", label: "Full Name", type: "text", placeholder: "Enter your full name", required: true },
      { name: "email", label: "Email Address", type: "email", placeholder: "Enter your email", required: true }
    ]
  },
  {
    title: "Project Details",
    label: "Project Details",
    icon: Lightbulb,
    fields: [
      { name: "projectIdea", label: "Project Idea", type: "textarea", placeholder: "Describe your project idea", required: true },
      { name: "techStack", label: "Tech Stack", type: "text", placeholder: "What technologies will you use?", required: true }
    ]
  },
  {
    title: "Team Info",
    label: "Team Info",
    icon: Users,
    fields: [
      { name: "teamSize", label: "Team Size", type: "select", placeholder: "Select team size", required: true, 
        options: [
          { value: "1", label: "Solo (1 person)" },
          { value: "2-4", label: "Small team (2-4 people)" },
          { value: "5-10", label: "Medium team (5-10 people)" },
          { value: "10+", label: "Large team (10+ people)" }
        ] 
      },
      { name: "experience", label: "Experience Level", type: "select", placeholder: "Select experience level", required: true,
        options: [
          { value: "beginner", label: "Beginner" },
          { value: "intermediate", label: "Intermediate" },
          { value: "advanced", label: "Advanced" },
          { value: "mixed", label: "Mixed levels" }
        ]
      }
    ]
  }
];

export default function RegistrationForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    projectIdea: "",
    techStack: "",
    teamSize: "",
    experience: "",
  });
  // Add validation state
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user types
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    const currentFields = formSteps[currentStep].fields;
    
    currentFields.forEach(field => {
      if (!formData[field.name as keyof typeof formData]) {
        newErrors[field.name] = `${field.label} is required`;
      }
      
      // Email validation
      if (field.name === "email" && formData.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          newErrors.email = "Please enter a valid email address";
        }
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      if (currentStep < formSteps.length - 1) {
        setCurrentStep(currentStep + 1);
        // Show success toast when moving to next step
        toast.success("Step completed successfully!", {
          position: "top-center",
          duration: 2000,
        });
      }
    } else {
      // Show error toast for validation failures
      toast.error("Please fill in all required fields correctly", {
        position: "top-center",
        duration: 3000,
      });
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep()) {
      toast.error("Please fill in all required fields correctly", {
        position: "top-center",
        duration: 3000,
      });
      return;
    }
    
    if (currentStep === formSteps.length - 1) {
      setIsSubmitting(true);
      
      try {
        // Insert registration data into Supabase
        const { data, error } = await supabase
          .from('registrations')
          .insert([
            {
              full_name: formData.fullName,
              email: formData.email,
              project_idea: formData.projectIdea,
              tech_stack: formData.techStack,
              team_size: formData.teamSize,
              experience: formData.experience,
            }
          ]);
          
        if (error) throw error;
        
        // Show success toast with confetti effect
        toast.success("Registration successful! Welcome to the World's Largest Hackathon!", {
          duration: 5000,
          icon: "🎉",
          position: "top-center",
          style: { 
            backgroundColor: "#1e1e2e",
            color: "white",
            border: "1px solid rgba(255,255,255,0.1)"
          },
        });
        
        // Reset form
        setFormData({
          fullName: "",
          email: "",
          projectIdea: "",
          techStack: "",
          teamSize: "",
          experience: "",
        });
        setCurrentStep(0);
      } catch (error: any) {
        console.error("Registration error:", error);
        // Show detailed error toast
        toast.error(`Registration failed: ${error.message || "Please try again later"}`, {
          duration: 5000,
          position: "top-center",
          style: { 
            backgroundColor: "#2d1b1b",
            color: "white",
            border: "1px solid rgba(255,0,0,0.2)"
          },
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      nextStep();
    }
  };

  return (
    <section id="register" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mb-4">
            Join the Hackathon
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Register now to secure your spot in the world's largest hackathon and compete for over $1 million in prizes.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto bg-gradient-to-br from-black/80 to-purple-950/20 backdrop-blur-sm border border-white/10 rounded-xl p-8">
          {/* Progress Steps */}
          <div className="flex justify-between mb-8 relative">
            {formSteps.map((step, index) => (
              <div key={index} className="flex flex-col items-center relative z-10">
                <motion.div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep >= index 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600' 
                      : 'bg-white/10'
                  } mb-2`}
                  initial={{ scale: 0.8 }}
                  animate={{ 
                    scale: currentStep === index ? 1.1 : 1,
                    backgroundColor: currentStep >= index ? '#6d28d9' : 'rgba(255,255,255,0.1)'
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {currentStep > index ? (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-white font-medium">{index + 1}</span>
                  )}
                </motion.div>
                <span className="text-sm text-gray-400">{step.title}</span>
              </div>
            ))}
            
            {/* Progress Line */}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-white/10 -z-0">
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
                initial={{ width: '0%' }}
                animate={{ width: `${(currentStep / (formSteps.length - 1)) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-bold text-white mb-6">{formSteps[currentStep].title}</h3>
              
              <div className="space-y-6">
                {formSteps[currentStep].fields.map((field) => (
                  <div key={field.name}>
                    <label className="block text-gray-300 mb-2">{field.label} {field.required && <span className="text-red-500">*</span>}</label>
                    {field.type === "textarea" ? (
                      <textarea
                        name={field.name}
                        value={formData[field.name as keyof typeof formData] as string}
                        onChange={handleInputChange}
                        placeholder={field.placeholder}
                        className={`w-full p-3 bg-black/50 border ${errors[field.name] ? 'border-red-500' : 'border-white/20'} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500`}
                        rows={4}
                      />
                    ) : field.type === "select" ? (
                      <select
                        name={field.name}
                        value={formData[field.name as keyof typeof formData] as string}
                        onChange={handleInputChange}
                        className={`w-full p-3 bg-black/50 border ${errors[field.name] ? 'border-red-500' : 'border-white/20'} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500`}
                      >
                        <option value="">Select {field.label}</option>
                        {field.options?.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name as keyof typeof formData] as string}
                        onChange={handleInputChange}
                        placeholder={field.placeholder}
                        className={`w-full p-3 bg-black/50 border ${errors[field.name] ? 'border-red-500' : 'border-white/20'} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500`}
                      />
                    )}
                    {errors[field.name] && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-red-500 text-sm"
                      >
                        {errors[field.name]}
                      </motion.p>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
            
            <div className="flex justify-between mt-8">
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center px-6 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </button>
              )}
              
              <button
                type={currentStep === formSteps.length - 1 ? "submit" : "button"}
                onClick={currentStep === formSteps.length - 1 ? undefined : nextStep}
                disabled={isSubmitting}
                className="ml-auto flex items-center px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : currentStep === formSteps.length - 1 ? (
                  "Complete Registration"
                ) : (
                  <>
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}