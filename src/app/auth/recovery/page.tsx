"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function RecoveryPage() {
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    
    // Handle recovery code verification
    console.log("Verifying recovery code:", code);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // For demo purposes, we'll assume the code is correct
      // In a real app, you would redirect based on the API response
      window.location.href = "/auth/setup-2fa";
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
                Account recovery
              </h1>
              <p className="auth-subtitle">
                Enter one of your recovery codes to regain access to your account.
              </p>
            </div>

            <div className="auth-form">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="code" className="form-label">
                    Recovery code
                  </label>
                  <input
                    id="code"
                    name="code"
                    type="text"
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    className="form-input"
                    placeholder="ABCD-1234-EFGH"
                  />
                  {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </div>

                <div className="form-group">
                  <button
                    type="submit"
                    className="bp-button bp-button-lg w-full"
                    disabled={isSubmitting || code.length < 4}
                  >
                    {isSubmitting ? "Verifying..." : "Recover account"}
                  </button>
                </div>
              </form>

              <div className="text-center mt-6">
                <p className="text-sm text-gray-500">
                  <Link href="/auth/login" className="bp-link">
                    Return to login
                  </Link>
                </p>
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