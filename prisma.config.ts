// Prisma configuration
// This configuration uses environment variables for database connection

export default {
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    }
  }
}