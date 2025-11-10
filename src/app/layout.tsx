import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider/theme-provider";
import Providers from "./Providers";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/auth/authContext";
import { setupPostHog } from "@/lib/posthog";
import { CSPostHogProvider } from "./CSPostHogProvider";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Form Generator: Create Custom Forms with AI in Seconds",
  description:
    "Build powerful, custom forms for your business with our AI-powered form builder. Create job applications, surveys, and more with natural language.",
  keywords: [
    "AI form builder",
    "online form generator",
    "custom forms",
    "AI forms",
    "survey builder",
    "quiz maker",
    "form automation",
    "natural language forms",
  ],
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "AI Form Builder: Create Custom Forms with AI in Seconds",
    description:
      "Build powerful, custom forms for your business with our AI-powered form builder. Create job applications, surveys, and more with natural language.",
    url: "https://aiformbuilder.com",
    siteName: "AI Form Builder",
    images: [
      {
        url: "https://res.cloudinary.com/dsn66l0iv/image/upload/v1762440335/Untitled_1200_x_630_px_h5petq.png", // Replace with your actual OG image
        width: 1200,
        height: 630,
        alt: "AI Form Builder",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Form Builder: Create Custom Forms with AI in Seconds",
    description:
      "Build powerful, custom forms for your business with our AI-powered form builder. Create job applications, surveys, and more with natural language.",
    images: [
      "https://res.cloudinary.com/dsn66l0iv/image/upload/v1762440335/Untitled_1200_x_630_px_h5petq.png",
    ], // Replace with your actual Twitter image
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  setupPostHog();
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense fallback={null}>
            <CSPostHogProvider>
              <Providers>
                <AuthProvider>
                  <main className="min-h-screen">{children}</main>
                </AuthProvider>
                <Toaster />
              </Providers>
            </CSPostHogProvider>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
