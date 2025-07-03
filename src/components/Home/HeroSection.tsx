"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Globe } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const scaleOnHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
};

export function HeroSection() {
  const [prompt, setPrompt] = useState("");
  const [animatedPlaceholder, setAnimatedPlaceholder] = useState("");

  const fullPlaceholder =
    "Describe your form... e.g., 'Create a job application form!'";

  useEffect(() => {
    let currentIndex = 0;
    let timeout: NodeJS.Timeout;

    const type = () => {
      if (currentIndex <= fullPlaceholder.length) {
        setAnimatedPlaceholder(fullPlaceholder.slice(0, currentIndex));
        currentIndex++;
        timeout = setTimeout(type, 50); // Adjust speed here
      } else {
        // Restart typing after pause
        setTimeout(() => {
          currentIndex = 0;
          type();
        }, 2000); // Pause before restarting
      }
    };

    type();

    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="py-2 px-4 relative overflow-visible">
      {/* Corner Blinking Effects */}
      <motion.div
        className="absolute top-0 left-0 w-32 h-32 rounded-full blur-3xl opacity-80"
        animate={{
          backgroundColor: [
            "rgba(221, 22, 128, 0.8)",
            "rgba(255, 105, 180, 0.8)",
            "rgba(147, 112, 219, 0.8)",
            "rgba(255, 165, 0, 0.8)",
            "rgba(0, 191, 255, 0.8)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-0 right-0 w-44 h-44 rounded-full blur-3xl opacity-80"
        animate={{
          backgroundColor: [
            "rgba(221, 22, 128, 0.8)",
            "rgba(255, 105, 180, 0.8)",
            "rgba(147, 112, 219, 0.8)",
            "rgba(255, 165, 0, 0.8)",
            "rgba(0, 191, 255, 0.8)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      />

      {/* Floating SVG Elements */}
      <motion.div
        className="absolute top-20 left-10 text-purple-300 opacity-30"
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute top-32 right-20 text-pink-300 opacity-30"
        animate={{
          y: [0, 20, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="10" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute top-40 left-1/4 text-blue-300 opacity-30"
        animate={{
          x: [0, -15, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="12,2 22,20 2,20" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute top-60 right-1/4 text-green-300 opacity-30"
        animate={{
          x: [0, 15, 0],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
          <rect x="3" y="3" width="18" height="18" rx="2" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-40 left-20 text-indigo-300 opacity-30"
        animate={{
          x: [0, 10, 0],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7v10l10 5 10-5V7l-10-5z" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-32 right-16 text-yellow-300 opacity-30"
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute top-1/2 left-8 text-rose-300 opacity-30"
        animate={{
          y: [0, 20, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute top-1/2 right-8 text-teal-300 opacity-30"
        animate={{
          x: [0, 15, 0],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-20 left-1/3 text-purple-300 opacity-30"
        animate={{
          x: [0, -15, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute top-16 right-1/3 text-orange-300 opacity-30"
        animate={{
          x: [0, 10, 0],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l2.09 6.26L22 10l-5 4.87 1.18 6.88L12 18.5l-6.18 3.25L7 15.87 2 11l7.91-1.74L12 2z" />
        </svg>
      </motion.div>

      <div className="container mx-auto relative z-10">

        <motion.div
          className="text-center space-y-8 py-24"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div variants={fadeInUp}>
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Form Generation
            </Badge>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent"
            variants={fadeInUp}
          >
            Build Any Form in
            <br />
            <span className="relative text-black">
              Seconds with AI
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              />
            </span>
          </motion.h1>

          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            variants={fadeInUp}
          >
            Create professional forms, surveys, and quizzes instantly with our
            AI-powered form builder. Just describe what you need, and watch the
            magic happen.
          </motion.p>

          <motion.div className="max-w-2xl mx-auto" variants={fadeInUp}>
            <div className="flex flex-col items-center sm:flex-row gap-4 p-2 bg-muted rounded-lg">
              <div className="flex-1 relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Textarea
                  placeholder={animatedPlaceholder}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="pl-10 border-0 bg-background"
                />
              </div>
              <motion.div {...scaleOnHover}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate Form
                </Button>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="flex items-center justify-center space-x-2 text-sm text-muted-foreground"
            variants={fadeInUp}
          >
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-background"
                />
              ))}
            </div>
            <span>Join 1,000+ businesses building better forms</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
