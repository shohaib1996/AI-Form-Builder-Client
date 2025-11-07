import type { Metadata } from "next";
import SchemaMarkup from "./SchemaMarkup";
import PricingWrapper from "./PricingWrapper";

export const metadata: Metadata = {
  title: "Pricing Plans | AI Form Builder",
  description: "Choose the perfect plan for your needs. Get started for free or unlock advanced features with our premium plan.",
};

export default function Page() {
  return (
    <>
      <SchemaMarkup />
      <PricingWrapper />
    </>
  );
}