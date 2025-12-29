"use client";

import Link from "next/link";
import Image from "next/image";

export default function ProTradingPage() {
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
                Pro Trading
              </h1>
              <p className="auth-subtitle">
                Advanced trading tools for experienced traders.
              </p>
            </div>

            <div className="auth-form">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bp-card p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Advanced Charting</h3>
                  <p className="text-gray-500 mb-4">
                    Professional-grade charting tools with technical indicators and drawing tools.
                  </p>
                  <button className="bp-button bp-button-secondary">
                    View Charts
                  </button>
                </div>
                
                <div className="bp-card p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Order Types</h3>
                  <p className="text-gray-500 mb-4">
                    Place limit, stop-loss, and other advanced order types for precise trading.
                  </p>
                  <button className="bp-button bp-button-secondary">
                    Place Order
                  </button>
                </div>
              </div>
              
              <div className="bp-card p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Pro Trading Features</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Real-time market data feeds</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Advanced order execution</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Customizable trading interface</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Margin trading options</span>
                  </li>
                </ul>
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