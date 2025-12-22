"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function RegisterSuccessPage() {
  const [isResending, setIsResending] = useState(false);
  const [resendStatus, setResendStatus] = useState('');

  const handleResendEmail = async () => {
    setIsResending(true);
    setResendStatus('');
    
    try {
      // Get the user's email from localStorage or other storage mechanism
      const userEmail = localStorage.getItem('userEmailForVerification') || '';
      
      if (!userEmail) {
        setResendStatus('Unable to resend email. Please contact support.');
        setIsResending(false);
        return;
      }
      
      // Call the API route to resend the verification email
      const response = await fetch('/api/email/send-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
        }),
      });
      
      if (response.ok) {
        setResendStatus('Verification email resent successfully. Please check your inbox.');
      } else {
        setResendStatus('Failed to resend email. Please try again later.');
      }
    } catch (error) {
      setResendStatus('Failed to resend email. Please try again later.');
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
                Account created successfully
              </h1>
              <p className="auth-subtitle">
                Your account has been created. Please check your email to verify your account before logging in.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                If you don't receive the email within a few minutes, check your spam folder or click "resend email" below.
              </p>
            </div>

            <div className="auth-form">
              <div className="text-center py-8">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-[#d5fbeb]">
                  <svg className="h-6 w-6 text-[#16764d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="mt-6">
                  <Link href="/auth/login" className="bp-button bp-button-lg w-full">
                    Continue to login
                  </Link>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">
                    Didn't receive the email? Check your spam folder or{' '}
                    <button 
                      onClick={handleResendEmail}
                      disabled={isResending}
                      className="bp-link disabled:opacity-50"
                    >
                      {isResending ? 'Sending...' : 'resend email'}
                    </button>
                  </p>
                  {resendStatus && (
                    <p className={`mt-2 text-sm ${resendStatus.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
                      {resendStatus}
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Gmail Setup Instructions */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold text-blue-800 mb-2">Email Setup Required</h3>
              <p className="text-sm text-blue-700 mb-3">
                To enable email sending functionality, you need to configure Gmail SMTP settings:
              </p>
              <ol className="list-decimal list-inside text-sm text-blue-700 space-y-1">
                <li>Enable 2-Factor Authentication on your Gmail account</li>
                <li>Generate an App Password in your Google Account settings</li>
                <li>Update the <code className="bg-white px-1 rounded">.env</code> file with your Gmail credentials</li>
              </ol>
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