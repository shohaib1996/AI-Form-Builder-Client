"use client";

import dynamic from "next/dynamic";

const ContactPage = dynamic(() => import("./contact-client"), { ssr: false });

export default function ContactWrapper() {
  return <ContactPage />;
}
