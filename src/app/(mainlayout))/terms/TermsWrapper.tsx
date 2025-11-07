"use client";

import dynamic from "next/dynamic";

const TermsPage = dynamic(() => import("./terms-client"), { ssr: false });

export default function TermsWrapper() {
  return <TermsPage />;
}
