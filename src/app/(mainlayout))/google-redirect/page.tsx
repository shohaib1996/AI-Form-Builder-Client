"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/auth/authContext";

export default function GoogleRedirectPage() {
  const router = useRouter();
  const { setUserFromToken } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      setUserFromToken(token);
      toast.success("Google sign-in successful! Welcome back.");
      window.history.replaceState({}, document.title, window.location.pathname);
      setTimeout(() => router.push("/"), 100);
    } else {
      // toast.error("No token found in URL");
      router.push("/signin");
    }
  }, [router, setUserFromToken]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p>Processing login...</p>
    </div>
  );
}