import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    // Solo conectar a MongoDB si está disponible, sino usar modo desarrollo
    if (process.env.NODE_ENV === 'production') {
      const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mindmapmaster')
      console.log(`MongoDB Connected: ${conn.connection.host}`)
    } else {
      console.log('Running in development mode - MongoDB connection skipped')
    }
  } catch (error) {
    console.log('MongoDB not available - running in development mode')
    console.log('Note: Data will not persist without MongoDB')
  }
}

export default connectDB
