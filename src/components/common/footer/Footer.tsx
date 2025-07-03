"use client"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

const footerSections = [
  {
    title: "Product",
    links: [
      { name: "Features", href: "#" },
      { name: "Templates", href: "#" },
      { name: "Integrations", href: "#" },
      { name: "API", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Contact", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Help Center", href: "#" },
      { name: "Documentation", href: "#" },
      { name: "Community", href: "#" },
      { name: "Status", href: "#" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="py-12 px-4 border-t bg-muted/30">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex items-center space-x-2 mb-4">
              <motion.div
                className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Sparkles className="w-5 h-5 text-white" />
              </motion.div>
              <span className="text-xl font-bold">FormAI</span>
            </div>
            <p className="text-muted-foreground">
              The future of form building is here. Create intelligent forms with the power of AI.
            </p>
          </motion.div>

          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2 text-muted-foreground">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <motion.a
                      href={link.href}
                      className="hover:text-foreground transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="border-t mt-8 pt-8 text-center text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p>&copy; 2025 FormAI. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}
