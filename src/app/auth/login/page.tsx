"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { login, signInWithOAuth } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    
    // Use the auth hook to login
    try {
      const result = await login({ email, password });
      
      if (result.success) {
        // Redirect to dashboard on successful login
        router.push("/dashboard");
      } else {
        setError(result.error || "Invalid email or password");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
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
                Welcome back
              </h1>
              <p className="auth-subtitle">
                Log in to your Bitpanda Pro account
              </p>
            </div>

            <div className="auth-form">
              {error && (
                <div className="bg-red-50 text-red-700 p-3 rounded mb-4 text-sm">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                    placeholder="your@email.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input"
                    placeholder="••••••••"
                  />
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div className="form-check">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="form-check-input"
                    />
                    <label htmlFor="remember-me" className="form-check-label">
                      Remember me
                    </label>
                  </div>
                  <div>
                    <Link href="/auth/forgot-password" className="bp-link">
                      Forgot password?
                    </Link>
                  </div>
                </div>

                <div className="form-group">
                  <button
                    type="submit"
                    className="bp-button bp-button-lg w-full"
                  >
                    Log in
                  </button>
                </div>
              </form>

              <div className="divider">
                <span className="divider-text">Or continue with</span>
              </div>

              <div className="social-login">
                <button 
                  className="social-btn" 
                  aria-label="Continue with Google"
                  onClick={async () => {
                    const result = await signInWithOAuth('google');
                    if (!result.success) {
                      setError(result.error || 'Failed to login with Google');
                    }
                  }}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"/>
                  </svg>
                  <span className="sr-only">Continue with Google</span>
                </button>
                <button 
                  className="social-btn" 
                  aria-label="Continue with Facebook"
                  onClick={async () => {
                    const result = await signInWithOAuth('facebook');
                    if (!result.success) {
                      setError(result.error || 'Failed to login with Facebook');
                    }
                  }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z"/>
                  </svg>
                  <span className="sr-only">Continue with Facebook</span>
                </button>
              </div>

            </div>

            <div className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link href="/auth/register" className="bp-link">
                Register now
              </Link>
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