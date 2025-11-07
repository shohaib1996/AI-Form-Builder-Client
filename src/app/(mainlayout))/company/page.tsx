import type { Metadata } from "next";
import SchemaMarkup from "./SchemaMarkup";
import CompanyWrapper from "./CompanyWrapper";

export const metadata: Metadata = {
  title: "Our Mission | AI Form Builder",
  description: "Learn about the mission, values, and story of AI Form Builder. We are dedicated to making form building accessible, intuitive, and powerful for creators everywhere.",
};

export default function Page() {
  return (
    <>
      <SchemaMarkup />
      <CompanyWrapper />
    </>
  );
}