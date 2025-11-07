import type { Metadata } from "next";
import Home from "./home";

export const metadata: Metadata = {
  title: "AI Form Builder | Create Custom Forms with AI",
  description: "Build powerful, custom forms for your business with our AI-powered form builder. Create job applications, surveys, and more with natural language.",
};

export default function Page() {
  return <Home />;
}