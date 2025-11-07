"use client";

import dynamic from "next/dynamic";

const SupportPage = dynamic(() => import("./support-client"), { ssr: false });

export default function SupportWrapper() {
  return <SupportPage />;
}
