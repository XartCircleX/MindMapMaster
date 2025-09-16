import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/database.js'
import mindMapRoutes from './routes/mindMapRoutes.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Connect to MongoDB
connectDB()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/mindmaps', mindMapRoutes)
app.use('/api/users', userRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'MindMapMaster API is running!' })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Something went wrong!' })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
