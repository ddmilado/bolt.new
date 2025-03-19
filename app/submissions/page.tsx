"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner"; // Add toast import

// Add these missing imports
import { Loader2, Send, Twitter } from "lucide-react";
import Image from "next/image";

// Define submission type
type Submission = {
  id: number;
  project_name: string;
  description: string;
  builder_name: string;
  twitter_handle: string | null;
  project_url: string;
  image_url: string | null;
  submitted_at: string;
};

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    builderName: "",
    twitterHandle: "",
    projectUrl: "",
    imageUrl: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch submissions on component mount
  useEffect(() => {
    async function fetchSubmissions() {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('submissions')
          .select('*')
          .order('submitted_at', { ascending: false });
        
        if (error) throw error;
        
        setSubmissions(data || []);
        toast.success("Submissions loaded successfully");
      } catch (error: any) {
        console.error('Error fetching submissions:', error);
        toast.error(`Failed to load submissions: ${error.message || "Unknown error"}`);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchSubmissions();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
    // Clear error when user types
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Required fields
    if (!formData.projectName) newErrors.projectName = "Project name is required";
    if (!formData.description) newErrors.description = "Description is required";
    if (!formData.builderName) newErrors.builderName = "Builder name is required";
    
    // URL validation
    if (formData.projectUrl && !formData.projectUrl.match(/^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?$/)) {
      newErrors.projectUrl = "Please enter a valid URL";
    }
    
    // Image URL validation
    if (formData.imageUrl && !formData.imageUrl.match(/^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?$/)) {
      newErrors.imageUrl = "Please enter a valid image URL";
    }
    
    // Twitter handle validation (optional)
    if (formData.twitterHandle && !formData.twitterHandle.match(/^@?(\w){1,15}$/)) {
      newErrors.twitterHandle = "Please enter a valid Twitter handle";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Format Twitter handle
      const twitterHandle = formData.twitterHandle.startsWith('@') 
        ? formData.twitterHandle.substring(1) 
        : formData.twitterHandle;
      
      const { data, error } = await supabase
        .from('submissions')
        .insert([
          {
            project_name: formData.projectName,
            description: formData.description,
            builder_name: formData.builderName,
            twitter_handle: twitterHandle,
            project_url: formData.projectUrl,
            image_url: formData.imageUrl,
            submitted_at: new Date().toISOString()
          }
        ]);
      
      if (error) throw error;
      
      // Show success toast with confetti
      toast.success("Project submitted successfully! 🎉", {
        duration: 5000,
        icon: "🚀"
      });
      
      // Reset form
      setFormData({
        projectName: "",
        description: "",
        builderName: "",
        twitterHandle: "",
        projectUrl: "",
        imageUrl: ""
      });
      
      // Refresh submissions
      const { data: newSubmissions } = await supabase
        .from('submissions')
        .select('*')
        .order('submitted_at', { ascending: false });
      
      setSubmissions(newSubmissions || []);
      
    } catch (error: any) {
      console.error('Submission error:', error);
      toast.error(`Submission failed: ${error.message || "Please try again later"}`, {
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter submissions based on search term
  const filteredSubmissions = submissions.filter(submission => 
    submission.project_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    submission.builder_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    submission.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <Link href="/" className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to home
          </Link>
          
          {/* Search functionality */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search submissions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-12">
            {/* Submission Form */}
            <div className="w-full md:w-1/2 lg:w-2/5">
              <div className="bg-gradient-to-br from-black/80 to-purple-950/20 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                  Submit Your Project
                </h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="projectName" className="block text-sm font-medium text-gray-300 mb-1">
                        Project Name*
                      </label>
                      <input
                        type="text"
                        id="projectName"
                        name="projectName"
                        value={formData.projectName}
                        onChange={handleInputChange}
                        className={`w-full bg-black/50 border ${errors.projectName ? 'border-red-500' : 'border-white/20'} rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500`}
                        placeholder="Your amazing project"
                      />
                      {errors.projectName && <p className="mt-1 text-sm text-red-500">{errors.projectName}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                        Description*
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={4}
                        className={`w-full bg-black/50 border ${errors.description ? 'border-red-500' : 'border-white/20'} rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500`}
                        placeholder="Describe your project in a few sentences"
                      />
                      {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="builderName" className="block text-sm font-medium text-gray-300 mb-1">
                        Builder Name*
                      </label>
                      <input
                        type="text"
                        id="builderName"
                        name="builderName"
                        value={formData.builderName}
                        onChange={handleInputChange}
                        className={`w-full bg-black/50 border ${errors.builderName ? 'border-red-500' : 'border-white/20'} rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500`}
                        placeholder="Your name"
                      />
                      {errors.builderName && <p className="mt-1 text-sm text-red-500">{errors.builderName}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="twitterHandle" className="block text-sm font-medium text-gray-300 mb-1">
                        Twitter Handle (optional)
                      </label>
                      <input
                        type="text"
                        id="twitterHandle"
                        name="twitterHandle"
                        value={formData.twitterHandle}
                        onChange={handleInputChange}
                        className={`w-full bg-black/50 border ${errors.twitterHandle ? 'border-red-500' : 'border-white/20'} rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500`}
                        placeholder="@yourtwitterhandle"
                      />
                      {errors.twitterHandle && <p className="mt-1 text-sm text-red-500">{errors.twitterHandle}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="projectUrl" className="block text-sm font-medium text-gray-300 mb-1">
                        Project URL*
                      </label>
                      <input
                        type="text"
                        id="projectUrl"
                        name="projectUrl"
                        value={formData.projectUrl}
                        onChange={handleInputChange}
                        className={`w-full bg-black/50 border ${errors.projectUrl ? 'border-red-500' : 'border-white/20'} rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500`}
                        placeholder="https://yourproject.com"
                      />
                      {errors.projectUrl && <p className="mt-1 text-sm text-red-500">{errors.projectUrl}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-300 mb-1">
                        Project Image URL (optional)
                      </label>
                      <input
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleInputChange}
                        className={`w-full bg-black/50 border ${errors.imageUrl ? 'border-red-500' : 'border-white/20'} rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500`}
                        placeholder="https://example.com/image.jpg"
                      />
                      <p className="mt-1 text-xs text-gray-500">Leave empty to use a default image</p>
                      {errors.imageUrl && <p className="mt-1 text-sm text-red-500">{errors.imageUrl}</p>}
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-medium flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Submit Project
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            
            {/* Submissions List */}
            <div className="w-full md:w-1/2 lg:w-3/5">
              <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                Project Submissions
              </h2>
              
              {isLoading ? (
                <div className="flex justify-center items-center py-20 bg-gradient-to-br from-black/80 to-purple-950/20 backdrop-blur-sm border border-white/10 rounded-xl">
                  <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
                </div>
              ) : filteredSubmissions.length === 0 ? (
                <div className="text-center py-20 bg-gradient-to-br from-black/80 to-purple-950/20 backdrop-blur-sm border border-white/10 rounded-xl">
                  <p className="text-gray-400">
                    {searchTerm ? "No submissions match your search criteria." : "No submissions yet. Be the first to submit your project!"}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredSubmissions.map((submission) => (
                    <motion.div
                      key={submission.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="bg-gradient-to-br from-black/80 to-purple-950/20 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden"
                    >
                      <div className="relative h-48">
                        <Image 
                          src={submission.image_url || "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"} 
                          alt={submission.project_name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-white mb-2">{submission.project_name}</h3>
                        <p className="text-gray-300 text-sm mb-4 line-clamp-3">{submission.description}</p>
                        <div className="flex items-center text-sm text-gray-400 mb-4">
                          <span>By {submission.builder_name}</span>
                          {submission.twitter_handle && (
                            <Link href={`https://twitter.com/${submission.twitter_handle}`} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-400 hover:text-blue-300 flex items-center">
                              <Twitter className="h-3 w-3 mr-1" />
                              @{submission.twitter_handle}
                            </Link>
                          )}
                        </div>
                        <Link 
                          href={submission.project_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center text-sm text-purple-400 hover:text-purple-300"
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          View Project
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}