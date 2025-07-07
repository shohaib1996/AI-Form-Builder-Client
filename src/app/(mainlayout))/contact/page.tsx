"use client";

import type React from "react";
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import {
  Sunset,
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function ContactPage() {
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (form.current) {
        await emailjs.sendForm(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
          form.current,
          {
            publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
          }
        );

        setIsSubmitted(true);
        toast.success("Message sent successfully! We'll get back to you soon.");

        // Reset form
        if (form.current) {
          form.current.reset();
        }
      }
    } catch (error) {
      console.log("Failed:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Send us an email anytime",
      value: "support@formbuilder.com",
      color: "blue",
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Mon-Fri from 8am to 5pm",
      value: "+1 (555) 123-4567",
      color: "green",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Come say hello at our office",
      value: "123 Innovation St, Tech City, TC 12345",
      color: "purple",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-orange-900/10 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 dark:from-purple-400/5 dark:to-pink-400/5" />

        <div className="relative max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl mb-8 shadow-xl"
          >
            <Sunset className="h-10 w-10 text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Get in{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Touch
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto"
          >
            We are here to help you with any questions you have. Reach out and
            we&apos;ll respond as soon as possible.
          </motion.p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              const colorClasses = {
                blue: "from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30",
                green:
                  "from-pink-100 to-pink-200 dark:from-pink-900/30 dark:to-pink-800/30",
                purple:
                  "from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30",
              };

              return (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Card className="h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-8 text-center">
                      <div
                        className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${
                          colorClasses[info.color as keyof typeof colorClasses]
                        } rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <IconComponent className="h-8 w-8 text-gray-600 dark:text-gray-300" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {info.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {info.description}
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {info.value}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800/50 dark:to-purple-900/20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Send us a Message
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Fill out the form below and we&apos;ll get back to you within 24 hours.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white text-center">
                  Contact Form
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center py-12"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-6">
                      <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Thank you for reaching out. We&apos;ll get back to you within
                      24 hours.
                    </p>
                    <Button
                      onClick={() => setIsSubmitted(false)}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <form
                    ref={form}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label
                          htmlFor="user_name"
                          className="text-gray-700 dark:text-gray-300"
                        >
                          Full Name *
                        </Label>
                        <Input
                          id="user_name"
                          name="user_name"
                          required
                          className="border-2 border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-400 bg-white/50 dark:bg-gray-800/50"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="user_email"
                          className="text-gray-700 dark:text-gray-300"
                        >
                          Email Address *
                        </Label>
                        <Input
                          id="user_email"
                          name="user_email"
                          type="email"
                          required
                          className="border-2 border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-400 bg-white/50 dark:bg-gray-800/50"
                          placeholder="Enter your email address"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="subject"
                        className="text-gray-700 dark:text-gray-300"
                      >
                        Subject *
                      </Label>
                      <Input
                        id="subject"
                        name="to_subject"
                        required
                        className="border-2 border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-400 bg-white/50 dark:bg-gray-800/50"
                        placeholder="What's this about?"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="message"
                        className="text-gray-700 dark:text-gray-300"
                      >
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        className="border-2 border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-400 bg-white/50 dark:bg-gray-800/50 resize-none"
                        placeholder="Tell us more about your question or feedback..."
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Sending Message...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Send className="h-5 w-5" />
                          Send Message
                        </div>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
