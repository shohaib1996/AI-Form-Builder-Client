import type { Metadata } from "next";
import SchemaMarkup from "./SchemaMarkup";
import ContactWrapper from "./ContactWrapper";

export const metadata: Metadata = {
  title: "Contact Us | AI Form Builder",
  description:
    "We are here to help you with any questions you have. Reach out and we'll respond as soon as possible.",
};

export default function Page() {
  return (
    <>
      <SchemaMarkup />
      <ContactWrapper />
    </>
  );
}
