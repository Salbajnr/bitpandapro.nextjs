"use client";

import { useEffect, useState } from 'react';

export default function TestEnvPage() {
  const [envVars, setEnvVars] = useState<any>({});

  useEffect(() => {
    setEnvVars({
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Environment Variables Test</h1>
      <div className="bg-gray-100 p-4 rounded">
        <p>NEXT_PUBLIC_SUPABASE_URL: {envVars.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'NOT SET'}</p>
        <p>NEXT_PUBLIC_SUPABASE_ANON_KEY: {envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET' : 'NOT SET'}</p>
        {envVars.NEXT_PUBLIC_SUPABASE_URL && (
          <div className="mt-4">
            <p className="font-mono text-sm break-all">
              URL: {envVars.NEXT_PUBLIC_SUPABASE_URL}
            </p>
            <p className="font-mono text-sm break-all">
              ANON KEY: {envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 20)}...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}