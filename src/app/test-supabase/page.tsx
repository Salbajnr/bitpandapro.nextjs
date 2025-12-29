"use client";

import { useEffect, useState } from 'react';

export default function TestSupabasePage() {
  const [envStatus, setEnvStatus] = useState<string>('Checking...');
  const [urlStatus, setUrlStatus] = useState<string>('Checking...');
  const [keyStatus, setKeyStatus] = useState<string>('Checking...');

  useEffect(() => {
    // Check environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (supabaseUrl) {
      setEnvStatus('✅ NEXT_PUBLIC_SUPABASE_URL is set');
      setUrlStatus(supabaseUrl);
    } else {
      setEnvStatus('❌ NEXT_PUBLIC_SUPABASE_URL is NOT set');
      setUrlStatus('Not available');
    }
    
    if (supabaseAnonKey) {
      setKeyStatus('✅ NEXT_PUBLIC_SUPABASE_ANON_KEY is set');
    } else {
      setKeyStatus('❌ NEXT_PUBLIC_SUPABASE_ANON_KEY is NOT set');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Supabase Environment Test</h1>
        
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Environment Variables Status</h2>
            <p className="text-gray-700">{envStatus}</p>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Supabase URL</h2>
            <p className="text-gray-700 font-mono break-all">{urlStatus}</p>
          </div>
          
          <div className="p-4 bg-yellow-50 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Supabase Anon Key</h2>
            <p className="text-gray-700">{keyStatus}</p>
          </div>
          
          <div className="p-4 bg-purple-50 rounded-lg mt-6">
            <h2 className="text-lg font-semibold mb-2">Troubleshooting Steps</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Ensure your .env file has the correct format with proper line endings</li>
              <li>Restart the development server after making changes to .env</li>
              <li>Check that environment variables start with NEXT_PUBLIC_ to be available in browser</li>
              <li>Verify the Supabase URL is accessible in your browser</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}