"use client";

import dynamic from "next/dynamic";

const PricingPage = dynamic(() => import("./pricing-client"), { ssr: false });

export default function PricingWrapper() {
  return <PricingPage />;
}
