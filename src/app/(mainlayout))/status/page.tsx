import type { Metadata } from "next";
import SchemaMarkup from "./SchemaMarkup";
import StatusWrapper from "./StatusWrapper";

export const metadata: Metadata = {
  title: "System Status | AI Form Builder",
  description:
    "Check the current status of our services and APIs in real-time. Get insights into uptime, response time, and recent incidents.",
};

export default function Page() {
  return (
    <>
      <SchemaMarkup />
      <StatusWrapper />
    </>
  );
}
