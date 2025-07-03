"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Marquee from "react-fast-marquee";

const companies = [
  {
    name: "Toptal",
    logo: "https://formester.com/_nuxt/image/15ea59.svg",
  },
  {
    name: "Grab",
    logo: "https://formester.com/_nuxt/image/beb948.svg",
  },
  {
    name: "IOLANI School",
    logo: "https://formester.com/_nuxt/image/d67fc8.svg",
  },
  {
    name: "Aramark",
    logo: "https://formester.com/_nuxt/image/1057c3.svg",
  },
  {
    name: "Austin Community College",
    logo: "https://formester.com/_nuxt/image/a376c5.svg",
  },
  {
    name: "Peabody Energy",
    logo: "https://formester.com/_nuxt/image/5aa3fc.svg",
  },
];

export function TrustIndicators() {
  return (
    <section className="py-12 border-y bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground">Trusted by teams at</p>
        </motion.div>
        <Marquee
          speed={60}
          gradient={false}
          className="overflow-hidden"
        >
          {companies.map((company) => (
            <motion.div
              key={company.name}
              className="mx-10 flex-shrink-0 opacity-60 hover:opacity-80 transition-opacity cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <Image
                src={company.logo}
                alt={company.name}
                width={250}
                height={250}
              />
            </motion.div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
