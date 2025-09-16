import dotenv from 'dotenv'

dotenv.config()

export const config = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/mindmapmaster',
  JWT_SECRET: process.env.JWT_SECRET || 'fallback_secret_key_for_development',
  NODE_ENV: process.env.NODE_ENV || 'development',
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000'
}



