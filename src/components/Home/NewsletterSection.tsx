"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isSubscribing, setIsSubscribing] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubscribing(true)
// Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsSubscribing(false)
    if (email) {
      toast.success("Successfully subscribed to our newsletter!")
      setEmail("") // Clear email input
    } else {
      toast.error("Please enter a valid email address.")
    }
  }

  return (
    <section
      className={cn(
        "w-full py-16 transition-all duration-1000 ease-in-out bg-gradient-to-r from-[#A322E6] to-[#E2007E] text-white",
      )}
    >
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Stay Updated with Our Newsletter
            </h2>
            <p className="max-w-[700px] text-muted md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Subscribe to get the latest news, updates, and exclusive offers delivered directly to your inbox.
            </p>
          </div>
          <div className="w-full max-w-sm space-y-2">
            <form className="flex space-x-2" onSubmit={handleSubmit}>
              <Input
                type="email"
                placeholder="Enter your email"
                className="max-w-lg flex-1 placeholder:text-muted"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubscribing}
                required
              />
              <Button type="submit" disabled={isSubscribing}>
                {isSubscribing ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
            <p className="text-xs text-muted">
              By subscribing, you agree to our{" "}
              <Link className="underline underline-offset-2" href="/terms">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
