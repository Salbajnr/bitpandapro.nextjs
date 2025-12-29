// Simple test script to verify OAuth endpoints
async function testOAuthEndpoints() {
  try {
    // Test authorize endpoint
    console.log('Testing OAuth Authorize Endpoint...');
    const authorizeResponse = await fetch('http://localhost:3000/api/oauth/authorize?client_id=test_client&redirect_uri=http://localhost:3001/callback&response_type=code&state=xyz');
    const authorizeData = await authorizeResponse.json();
    console.log('Authorize Response:', authorizeData);
    
    // Test token endpoint
    console.log('\nTesting OAuth Token Endpoint...');
    const tokenResponse = await fetch('http://localhost:3000/api/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        code: 'test_code',
        redirect_uri: 'http://localhost:3001/callback',
        client_id: 'test_client'
      })
    });
    const tokenData = await tokenResponse.json();
    console.log('Token Response:', tokenData);
    
    // Test userinfo endpoint
    console.log('\nTesting OAuth Userinfo Endpoint...');
    const userinfoResponse = await fetch('http://localhost:3000/api/oauth/userinfo', {
      headers: {
        'Authorization': 'Bearer test_token'
      }
    });
    const userinfoData = await userinfoResponse.json();
    console.log('Userinfo Response:', userinfoData);
    
  } catch (error) {
    console.error('Error testing OAuth endpoints:', error);
  }
}

testOAuthEndpoints();