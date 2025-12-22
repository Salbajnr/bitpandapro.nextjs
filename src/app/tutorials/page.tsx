"use client";

import Link from "next/link";
import Image from "next/image";

export default function TutorialsPage() {
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
      <main className="flex-grow py-12">
        <div className="bp-container">
          <div className="max-w-4xl mx-auto">
            <div className="auth-header mb-8">
              <h1 className="auth-title">
                Tutorials
              </h1>
              <p className="auth-subtitle">
                Step-by-step guides to help you get started with Bitpanda Pro.
              </p>
            </div>

            <div className="auth-form">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: "Getting Started", duration: "5 min", level: "Beginner" },
                  { title: "How to Trade Cryptocurrencies", duration: "10 min", level: "Beginner" },
                  { title: "Understanding Market Orders", duration: "8 min", level: "Intermediate" },
                  { title: "Setting Up Stop Loss Orders", duration: "12 min", level: "Intermediate" },
                  { title: "Advanced Charting Techniques", duration: "15 min", level: "Advanced" },
                  { title: "Risk Management Strategies", duration: "20 min", level: "Advanced" },
                ].map((tutorial, index) => (
                  <div key={index} className="bp-card p-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12 flex items-center justify-center mr-3">
                        <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{tutorial.title}</h3>
                        <div className="flex text-sm text-gray-500 mt-1">
                          <span>{tutorial.duration}</span>
                          <span className="mx-2">•</span>
                          <span>{tutorial.level}</span>
                        </div>
                      </div>
                    </div>
                    <button className="bp-button bp-button-secondary w-full">
                      Watch Tutorial
                    </button>
                  </div>
                ))}
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