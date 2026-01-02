"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function VerifyEmailPage() {
  const [isVerified, setIsVerified] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendStatus, setResendStatus] = useState("");

  const handleResend = async () => {
    setIsResending(true);
    setResendStatus("");

    try {
      // Get the user's email from localStorage or other storage mechanism
      const userEmail = localStorage.getItem("userEmailForVerification") || "";

      if (!userEmail) {
        setResendStatus("Unable to resend email. Please contact support.");
        setIsResending(false);
        return;
      }

      // Call the API route to resend the verification email
      const response = await fetch("/api/email/send-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
        }),
      });

      if (response.ok) {
        setResendStatus(
          "Verification email resent successfully. Please check your inbox."
        );
      } else {
        setResendStatus("Failed to resend email. Please try again later.");
      }
    } catch (error) {
      setResendStatus("Failed to resend email. Please try again later.");
    } finally {
      setIsResending(false);
    }
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
                  className="h-11 w-auto"
                  style={{ width: "auto", height: "auto" }}
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
                {isVerified ? "Email verified" : "Verify your email"}
              </h1>
              <p className="auth-subtitle">
                {isVerified
                  ? "Your email has been successfully verified."
                  : "We've sent a verification link to your email address. Please check your inbox and click the link to verify your account."}
              </p>
              {!isVerified && (
                <p className="text-sm text-gray-500 mt-2">
                  If you don't receive the email within a few minutes, check
                  your spam folder or click "resend email" below.
                </p>
              )}
            </div>

            <div className="auth-form">
              {isVerified ? (
                <div className="text-center py-8">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-[#d5fbeb]">
                    <svg
                      className="h-6 w-6 text-[#16764d]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div className="mt-6">
                    <Link
                      href="/auth/login"
                      className="bp-button bp-button-lg w-full"
                    >
                      Continue to login
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-[#f4f4f4]">
                    <svg
                      className="h-6 w-6 text-[#7e7e7e]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="mt-6">
                    <p className="text-sm text-gray-500">
                      Didn't receive the email? Check your spam folder or{" "}
                      <button
                        onClick={handleResend}
                        disabled={isResending}
                        className="bp-link disabled:opacity-50"
                      >
                        {isResending ? "Sending..." : "resend email"}
                      </button>
                    </p>
                    {resendStatus && (
                      <p
                        className={`mt-2 text-sm ${
                          resendStatus.includes("successfully")
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {resendStatus}
                      </p>
                    )}
                  </div>
                </div>
              )}
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
              <Link href="/terms" className="footer-link">
                Terms
              </Link>
              <Link href="/privacy" className="footer-link">
                Privacy
              </Link>
              <Link href="/security" className="footer-link">
                Security
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
