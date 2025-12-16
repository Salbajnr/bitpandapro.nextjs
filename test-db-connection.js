const { Client } = require('pg');

// Load environment variables
require('dotenv').config();

const client = new Client({
  connectionString: process.env.DIRECT_URL,
});

async function testConnection() {
  try {
    console.log('Attempting to connect to database...');
    await client.connect();
    console.log('Successfully connected to the database!');
    
    // Test a simple query
    const res = await client.query('SELECT NOW()');
    console.log('Current time from database:', res.rows[0].now);
    
    await client.end();
  } catch (err) {
    console.error('Database connection error:', err.message);
    console.error('Stack trace:', err.stack);
  }
}

testConnection();