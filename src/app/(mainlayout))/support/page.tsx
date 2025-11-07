import type { Metadata } from "next";
import SchemaMarkup from "./SchemaMarkup";
import SupportWrapper from "./SupportWrapper";

export const metadata: Metadata = {
  title: "Support | AI Form Builder",
  description: "Get in touch with our support team or visit our community forums for help and guidance.",
};

export default function Page() {
  return (
    <>
      <SchemaMarkup />
      <SupportWrapper />
    </>
  );
}