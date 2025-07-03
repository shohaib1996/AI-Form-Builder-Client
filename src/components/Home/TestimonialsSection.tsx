"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect, useCallback } from "react"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Marketing Director",
    company: "TechCorp",
    content:
      "This AI form builder saved us weeks of development time. The forms it generates are incredibly professional and exactly what we needed.",
    rating: 5,
    avatar: "SC",
  },
  {
    name: "Mike Rodriguez",
    role: "HR Manager",
    company: "StartupXYZ",
    content:
      "The best form builder I've used. The AI understands exactly what we need and creates perfect forms every time. Highly recommended!",
    rating: 5,
    avatar: "MR",
  },
  {
    name: "Emily Johnson",
    role: "Product Manager",
    company: "InnovateLab",
    content:
      "Game-changer for our team. We can now create complex surveys and forms without any technical knowledge. The AI is incredibly intuitive.",
    rating: 5,
    avatar: "EJ",
  },
  {
    name: "David Kim",
    role: "CEO",
    company: "GrowthTech",
    content:
      "Absolutely revolutionary! Our conversion rates improved by 40% after switching to AI-generated forms. The customization options are endless.",
    rating: 5,
    avatar: "DK",
  },
  {
    name: "Lisa Wang",
    role: "UX Designer",
    company: "DesignStudio",
    content:
      "As a designer, I'm impressed by the aesthetic quality of the generated forms. They're not just functional, but beautiful too.",
    rating: 5,
    avatar: "LW",
  },
  {
    name: "James Thompson",
    role: "Operations Manager",
    company: "LogisticsPro",
    content:
      "The automation features are incredible. We've streamlined our entire data collection process and saved countless hours of manual work.",
    rating: 5,
    avatar: "JT",
  },
  {
    name: "Maria Garcia",
    role: "Sales Director",
    company: "SalesForce Pro",
    content:
      "Our lead generation has never been better. The AI creates forms that actually convert visitors into customers. ROI has been amazing.",
    rating: 5,
    avatar: "MG",
  },
  {
    name: "Alex Turner",
    role: "CTO",
    company: "DevSolutions",
    content:
      "The technical implementation is flawless. Integration was seamless, and the performance is outstanding. Our developers love it too.",
    rating: 5,
    avatar: "AT",
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [cardsPerView, setCardsPerView] = useState(3)

  // Responsive cards per view
  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth >= 1024) {
        setCardsPerView(3) // Desktop: 3 cards
      } else if (window.innerWidth >= 768) {
        setCardsPerView(2) // Tablet: 2 cards
      } else {
        setCardsPerView(1) // Mobile: 1 card
      }
    }

    updateCardsPerView()
    window.addEventListener("resize", updateCardsPerView)
    return () => window.removeEventListener("resize", updateCardsPerView)
  }, [])

  // Auto-slide functionality
  useEffect(() => {
    if (!isHovered) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const maxIndex = testimonials.length - cardsPerView
          return prevIndex >= maxIndex ? 0 : prevIndex + 1
        })
      }, 4000)

      return () => clearInterval(timer)
    }
  }, [isHovered, cardsPerView])

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const maxIndex = testimonials.length - cardsPerView
      return prevIndex >= maxIndex ? 0 : prevIndex + 1
    })
  }, [cardsPerView])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const maxIndex = testimonials.length - cardsPerView
      return prevIndex <= 0 ? maxIndex : prevIndex - 1
    })
  }, [cardsPerView])

  const goToSlide = (index: number) => {
    const maxIndex = testimonials.length - cardsPerView
    setCurrentIndex(Math.min(index, maxIndex))
  }


  return (
    <section id="testimonials" className="py-20 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-xl text-muted-foreground">
            Join thousands of satisfied customers who&apos;ve transformed their form creation process
          </p>
        </motion.div>

        <div
          className="relative container mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Slider container */}
          <div className="overflow-hidden">
            <motion.div
              className="flex transition-transform duration-200 ease-in-out"
              style={{
                transform: `translateX(-${(currentIndex * 100) / cardsPerView}%)`,
              }}
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="flex-shrink-0 px-4"
                  style={{
                    width: `${100 / cardsPerView}%`,
                  }}
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 group">
                    <CardContent className="p-6 h-full flex flex-col">
                      <div className="flex mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          </motion.div>
                        ))}
                      </div>
                      <p className="text-muted-foreground mb-6 italic flex-grow leading-relaxed">
                        &quot;{testimonial.content}&quot;
                      </p>
                      <div className="flex items-center space-x-3 mt-auto">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {testimonial.avatar}
                        </div>
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.role} at {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Navigation arrows */}
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-background/90 backdrop-blur-sm border rounded-full p-3 hover:bg-background transition-all duration-200 shadow-lg z-10"
            onClick={prevSlide}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-background/90 backdrop-blur-sm border rounded-full p-3 hover:bg-background transition-all duration-200 shadow-lg z-10"
            onClick={nextSlide}
            disabled={currentIndex >= testimonials.length - cardsPerView}
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {Array.from({ length: testimonials.length - cardsPerView + 1 }).map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-primary scale-110"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>

      
      </div>
    </section>
  )
}
