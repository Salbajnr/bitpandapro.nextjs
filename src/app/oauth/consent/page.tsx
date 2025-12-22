"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function OAuthConsentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // OAuth request parameters
  const clientId = searchParams.get('client_id');
  const redirectUri = searchParams.get('redirect_uri');
  const responseType = searchParams.get('response_type');
  const scope = searchParams.get('scope');
  const state = searchParams.get('state');
  
  const [loading, setLoading] = useState(true);
  const [clientInfo, setClientInfo] = useState<any>(null);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [error, setError] = useState("");
  
  // Mock data for demonstration - in a real implementation, this would come from Supabase
  useEffect(() => {
    // Simulate fetching client and user information
    setTimeout(() => {
      setClientInfo({
        name: "Sample OAuth Client",
        description: "This application is requesting access to your Bitpanda Pro account.",
        website: "https://sample-client.com"
      });
      
      setUserInfo({
        name: "John Doe",
        email: "john.doe@example.com"
      });
      
      setLoading(false);
    }, 500);
  }, []);
  
  const handleApprove = () => {
    // In a real implementation, this would call the Supabase OAuth approval API
    // For now, we'll simulate the redirect with a success parameter
    const successRedirectUri = `${redirectUri}?code=MOCK_AUTH_CODE&state=${state}`;
    window.location.href = successRedirectUri;
  };
  
  const handleDeny = () => {
    // In a real implementation, this would redirect back with an error
    const errorRedirectUri = `${redirectUri}?error=access_denied&state=${state}`;
    window.location.href = errorRedirectUri;
  };
  
  // Show loading state while fetching data
  if (loading) {
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
                  Authorize Application
                </h1>
                <p className="auth-subtitle">
                  Loading authorization request...
                </p>
              </div>

              <div className="auth-form">
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#103e36]"></div>
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
                Authorize Application
              </h1>
              <p className="auth-subtitle">
                Connect your Bitpanda Pro account
              </p>
            </div>

            <div className="auth-form">
              {error && (
                <div className="bg-red-50 text-red-700 p-3 rounded mb-4 text-sm">
                  {error}
                </div>
              )}
              
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center mb-3">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                  <div className="ml-4">
                    <h2 className="font-bold text-lg">{clientInfo?.name}</h2>
                    <p className="text-sm text-gray-600">Want to access your account</p>
                  </div>
                </div>
                
                <p className="text-sm text-gray-700">
                  {clientInfo?.description}
                </p>
                
                <div className="mt-3 text-xs">
                  <Link href={clientInfo?.website || "#"} className="bp-link" target="_blank">
                    Visit website
                  </Link>
                </div>
              </div>
              
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-2">Permissions requested:</h3>
                <ul className="text-sm space-y-1">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>View your profile information</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>View your portfolio data</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>View your trading history</span>
                  </li>
                </ul>
              </div>
              
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                  <div className="ml-3">
                    <p className="font-medium text-sm">{userInfo?.name}</p>
                    <p className="text-xs text-gray-600">{userInfo?.email}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleDeny}
                  className="bp-button bp-button-secondary bp-button-lg flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApprove}
                  className="bp-button bp-button-lg flex-1"
                >
                  Authorize
                </button>
              </div>
              
              <div className="mt-4 text-center text-xs text-gray-500">
                <p>
                  By authorizing, you agree to the Bitpanda Pro 
                  {" "}
                  <Link href="/terms" className="bp-link">Terms of Service</Link>
                  {" "}
                  and 
                  {" "}
                  <Link href="/privacy" className="bp-link">Privacy Policy</Link>.
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