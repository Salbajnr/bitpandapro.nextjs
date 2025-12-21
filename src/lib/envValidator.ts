// Environment variable validator that runs at startup
import { validateServerEnvironmentVariables } from './validateEnv';

export function initializeEnvironmentValidation() {
  // Validate environment variables on server startup
  const validationResult = validateServerEnvironmentVariables();
  
  if (!validationResult.isValid) {
    console.error('⚠️  Critical environment variables are missing:');
    validationResult.missing.forEach(envVar => {
      console.error(`   - ${envVar}`);
    });
    console.error('Application may not function correctly without these variables.');
  } else {
    console.log('✅ All required environment variables are present');
  }
  
  return validationResult;
}