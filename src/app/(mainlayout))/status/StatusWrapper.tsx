"use client";

import dynamic from "next/dynamic";

const StatusPage = dynamic(() => import("./status-client"), { ssr: false });

export default function StatusWrapper() {
  return <StatusPage />;
}
