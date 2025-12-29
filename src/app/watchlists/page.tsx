"use client";

import Link from "next/link";
import Image from "next/image";

export default function WatchlistsPage() {
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
                Watchlists
              </h1>
              <p className="auth-subtitle">
                Track your favorite assets in one place.
              </p>
            </div>

            <div className="auth-form">
              <div className="text-center py-12">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-[#f4f4f4] mb-6">
                  <svg className="h-8 w-8 text-[#7e7e7e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5v-5zM4 19h6v-6H4v6zM16 3h5v5h-5V3zM4 3h6v6H4V3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Create Your First Watchlist</h3>
                <p className="text-gray-500 mb-6">
                  Watchlists help you track the assets you're interested in. Add assets to your watchlist to monitor their prices and performance.
                </p>
                <button className="bp-button bp-button-lg">
                  Create Watchlist
                </button>
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