import express from 'express'
import User from '../models/User.js'
import auth from '../middleware/auth.js'
import jwt from 'jsonwebtoken'

const router = express.Router()

// Register user
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, firstName, lastName } = req.body
    
    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    })
    
    if (existingUser) {
      return res.status(400).json({ 
        message: 'User with this email or username already exists' 
      })
    }
    
    // Create new user
    const user = new User({
      username,
      email,
      password,
      firstName,
      lastName
    })
    
    await user.save()
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '7d' }
    )
    
    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    
    // Find user by email
    const user = await User.findOne({ email })
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }
    
    // Check password
    const isMatch = await user.comparePassword(password)
    
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }
    
    // Update last login
    user.lastLogin = new Date()
    await user.save()
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '7d' }
    )
    
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get current user
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { firstName, lastName, avatar } = req.body
    
    const user = await User.findById(req.user.id)
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    
    user.firstName = firstName || user.firstName
    user.lastName = lastName || user.lastName
    user.avatar = avatar || user.avatar
    
    await user.save()
    
    res.json(user)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Change password
router.put('/password', auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body
    
    const user = await User.findById(req.user.id)
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    
    // Check current password
    const isMatch = await user.comparePassword(currentPassword)
    
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' })
    }
    
    // Update password
    user.password = newPassword
    await user.save()
    
    res.json({ message: 'Password updated successfully' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

export default router



