"use client";

import dynamic from "next/dynamic";

const CompanyPage = dynamic(() => import("./company-client"), { ssr: false });

export default function CompanyWrapper() {
  return <CompanyPage />;
}
