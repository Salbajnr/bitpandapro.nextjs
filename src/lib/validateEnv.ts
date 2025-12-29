// Utility to validate required environment variables
export function validateEnvironmentVariables() {
  const requiredEnvVars = [
    'DATABASE_URL',
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY',
  ];
  
  const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
  
  if (missingEnvVars.length > 0) {
    console.warn('Missing required environment variables:', missingEnvVars);
    return {
      isValid: false,
      missing: missingEnvVars,
    };
  }
  
  return {
    isValid: true,
    missing: [],
  };
}

// Validate environment variables on server-side
export function validateServerEnvironmentVariables() {
  const serverEnvVars = [
    'DATABASE_URL',
    'NEXT_PUBLIC_SUPABASE_URL',
    'SUPABASE_SERVICE_ROLE_KEY',
  ];
  
  const missingEnvVars = serverEnvVars.filter(envVar => !process.env[envVar]);
  
  if (missingEnvVars.length > 0) {
    console.error('Missing required server environment variables:', missingEnvVars);
    return {
      isValid: false,
      missing: missingEnvVars,
    };
  }
  
  return {
    isValid: true,
    missing: [],
  };
}