"use client";

import Link from "next/link";
import { useState, Suspense } from "react";
import Image from "next/image";

function Setup2FAContent() {
  const [isSetup, setIsSetup] = useState(false);
  const [backupCodes, setBackupCodes] = useState<string[]>([]);

  const handleEnable2FA = () => {
    // Simulate 2FA setup
    console.log("Enabling 2FA");
    // Generate mock backup codes
    const codes = [
      "ABCD-1234-EFGH",
      "EFGH-5678-IJKL",
      "IJKL-9012-MNOP",
      "MNOP-3456-QRST"
    ];
    setBackupCodes(codes);
    setIsSetup(true);
  };

  const handleDownloadCodes = () => {
    console.log("Downloading backup codes");
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
                  priority
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
                {isSetup ? "Two-factor authentication enabled" : "Set up two-factor authentication"}
              </h1>
              <p className="auth-subtitle">
                {isSetup 
                  ? "Two-factor authentication has been enabled for your account. Store your backup codes in a safe place." 
                  : "Add an extra layer of security to your account by enabling two-factor authentication."}
              </p>
            </div>

            <div className="auth-form">
              {isSetup ? (
                <div className="py-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Backup codes</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Store these backup codes in a secure location. You can use them to access your account if you lose your phone.
                    </p>
                    <div className="grid grid-cols-2 gap-2 bg-gray-50 p-4 rounded">
                      {backupCodes.map((code) => (
                        <div key={`backup-code-${code}`} className="font-mono text-sm p-2 bg-white rounded border">
                          {code}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-3">
                    <button
                      onClick={handleDownloadCodes}
                      className="bp-button bp-button-secondary bp-button-lg"
                    >
                      Download backup codes
                    </button>
                    <Link href="/dashboard" className="bp-button bp-button-lg">
                      Continue to dashboard
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="py-6">
                  <div className="mb-6">
                    <div className="flex justify-center mb-4">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-48 h-48 flex items-center justify-center">
                        <span className="text-gray-500">QR Code</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 text-center mb-4">
                      Scan this QR code with your authenticator app, or enter the code manually.
                    </p>
                    <div className="bg-gray-50 p-3 rounded text-center font-mono text-sm">
                      BITPANDA-PRO-A1B2C3D4E5F6
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <button
                      onClick={handleEnable2FA}
                      className="bp-button bp-button-lg w-full"
                    >
                      Enable two-factor authentication
                    </button>
                  </div>
                  
                  <div className="text-center mt-4">
                    <Link href="/dashboard" className="bp-link">
                      Skip for now
                    </Link>
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
            <p> 2024 BITPANDA PRO. All rights reserved.</p>
            <div className="flex justify-center space-x-4 mt-2">
              <Link href="/terms" className="hover:underline">Terms</Link>
              <Link href="/privacy" className="hover:underline">Privacy</Link>
              <Link href="/security" className="hover:underline">Security</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function Setup2FAPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <Setup2FAContent />
    </Suspense>
  );
}