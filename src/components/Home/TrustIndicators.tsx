"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Marquee from "react-fast-marquee";

const companies = [
  {
    name: "Toptal",
    logo: "https://www.vectorlogo.zone/logos/toptal/toptal-icon.svg",
  },
  {
    name: "Grab",
    logo: "https://cdn.worldvectorlogo.com/logos/grab.svg",
  },
  {
    name: "IOLANI School",
    logo: "https://gw-advance-prod-us-east-1-system.s3.amazonaws.com/uploads/menu_bar/main_logo/6007a03c260c000067a7ef3e/_Iolani_Shield_Headlogo_300x300_v2.png",
  },
  {
    name: "Aramark",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/09/Aramark_logo.svg",
  },
  {
    name: "Austin Community College",
    logo: "https://offices.austincc.edu/college-relations-and-marketing/wp-content/uploads/sites/2/2022/08/ACC-District-Color-Logo-PNG.png",
  },
  {
    name: "Peabody Energy",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Peabody_Energy_Logo.svg",
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
                className="invert-75"
              />
            </motion.div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
