"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import SchemaMarkup from "./SchemaMarkup";
import { HeroSection } from "@/components/Home/HeroSection";

const TrustIndicators = dynamic(() => import("@/components/Home/TrustIndicators").then(mod => mod.TrustIndicators));
const FeaturesSection = dynamic(() => import("@/components/Home/FeaturesSection").then(mod => mod.FeaturesSection));
const UseCasesSection = dynamic(() => import("@/components/Home/UseCasesSection").then(mod => mod.UseCasesSection));
const WhoIsThisForSection = dynamic(() => import("@/components/Home/WhoIsThisForSection").then(mod => mod.WhoIsThisForSection));
const TestimonialsSection = dynamic(() => import("@/components/Home/TestimonialsSection").then(mod => mod.TestimonialsSection));
const CTASection = dynamic(() => import("@/components/Home/CTASection").then(mod => mod.CTASection));
const FAQSection = dynamic(() => import("@/components/Home/FAQSection").then(mod => mod.FAQSection));
const NewsletterSection = dynamic(() => import("@/components/Home/NewsletterSection"));

const sections = [
  { Component: TrustIndicators },
  { Component: FeaturesSection },
  { Component: UseCasesSection },
  { Component: WhoIsThisForSection },
  { Component: TestimonialsSection },
  { Component: CTASection },
  { Component: FAQSection },
  { Component: NewsletterSection },
];

export default function Home() {
  return (
    <div>
      <SchemaMarkup />
      <HeroSection />
      {sections.map((section, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <section.Component />
        </motion.div>
      ))}
    </div>
  );
}
