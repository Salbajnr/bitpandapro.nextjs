"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function OAuthCallbackPage() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    // After OAuth authentication, the user should be redirected here
    // If the user is authenticated, redirect to dashboard
    if (user) {
      router.push("/dashboard");
    } else {
      // If for some reason the user isn't authenticated, redirect to login
      router.push("/auth/login");
    }
  }, [user, router]);

  return (
    <div className="min-h-screen bg-[#f4f4f4] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#103e36] mx-auto"></div>
        <p className="mt-4 text-gray-600">Completing authentication...</p>
      </div>
    </div>
  );
}