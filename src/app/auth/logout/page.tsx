"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function LogoutPage() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);
    // Handle logout logic
    console.log("Logging out");
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, you would clear the user session and redirect
      window.location.href = "/";
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#f4f4f4] flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="bp-container">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center">
              <div className="flex items-center space-x-2">
                <Image 
                  src="https://sbcdn.bitpanda.com/300x88/e191121310/website_header-logo-01.svg" 
                  alt="Bitpanda logo" 
                  width={150}
                  height={44}
                  className="h-11 w-auto" style={{ width: 'auto', height: 'auto' }}
                />
              </div>
            </Link>
            <Link href="/" className="bp-link">
              Back to home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center py-12">
        <div className="bp-container">
          <div className="max-w-md w-full mx-auto">
            <div className="auth-header">
              <h1 className="auth-title">
                Log out
              </h1>
              <p className="auth-subtitle">
                Are you sure you want to log out of your Bitpanda Pro account?
              </p>
            </div>

            <div className="auth-form">
              <div className="py-6">
                <div className="flex flex-col space-y-3">
                  <button
                    onClick={handleLogout}
                    className="bp-button bp-button-lg w-full"
                    disabled={isLoggingOut}
                  >
                    {isLoggingOut ? "Logging out..." : "Log out"}
                  </button>
                  <Link href="/dashboard" className="bp-button bp-button-secondary bp-button-lg">
                    Cancel
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="bp-container">
          <div className="text-center text-sm text-gray-500">
            <p>© 2024 BITPANDA PRO. All rights reserved.</p>
            <div className="footer-links">
              <Link href="/terms" className="footer-link">Terms</Link>
              <Link href="/privacy" className="footer-link">Privacy</Link>
              <Link href="/security" className="footer-link">Security</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}