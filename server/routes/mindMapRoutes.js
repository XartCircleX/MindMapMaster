import express from 'express'
import MindMap from '../models/MindMap.js'
import auth from '../middleware/auth.js'

const router = express.Router()

// Get all public mind maps
router.get('/public', async (req, res) => {
  try {
    const { page = 1, limit = 10, category, search } = req.query
    
    const query = { isPublic: true }
    
    if (category && category !== 'All') {
      query.category = category
    }
    
    if (search) {
      query.$text = { $search: search }
    }
    
    const mindMaps = await MindMap.find(query)
      .populate('author', 'username firstName lastName')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
    
    const total = await MindMap.countDocuments(query)
    
    res.json({
      mindMaps,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get user's mind maps
router.get('/my', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query
    
    const mindMaps = await MindMap.find({ author: req.user.id })
      .sort({ updatedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
    
    const total = await MindMap.countDocuments({ author: req.user.id })
    
    res.json({
      mindMaps,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get single mind map
router.get('/:id', async (req, res) => {
  try {
    const mindMap = await MindMap.findById(req.params.id)
      .populate('author', 'username firstName lastName')
    
    if (!mindMap) {
      return res.status(404).json({ message: 'Mind map not found' })
    }
    
    // Check if user can access this mind map
    if (!mindMap.isPublic && (!req.user || mindMap.author._id.toString() !== req.user.id)) {
      return res.status(403).json({ message: 'Access denied' })
    }
    
    res.json(mindMap)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create new mind map
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, nodes, connections, isPublic, tags, category } = req.body
    
    const mindMap = new MindMap({
      title,
      description,
      nodes: nodes || [],
      connections: connections || [],
      author: req.user.id,
      isPublic: isPublic || false,
      tags: tags || [],
      category: category || 'Other'
    })
    
    await mindMap.save()
    await mindMap.populate('author', 'username firstName lastName')
    
    res.status(201).json(mindMap)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Update mind map
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, description, nodes, connections, isPublic, tags, category } = req.body
    
    const mindMap = await MindMap.findById(req.params.id)
    
    if (!mindMap) {
      return res.status(404).json({ message: 'Mind map not found' })
    }
    
    // Check if user owns this mind map
    if (mindMap.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' })
    }
    
    mindMap.title = title || mindMap.title
    mindMap.description = description || mindMap.description
    mindMap.nodes = nodes || mindMap.nodes
    mindMap.connections = connections || mindMap.connections
    mindMap.isPublic = isPublic !== undefined ? isPublic : mindMap.isPublic
    mindMap.tags = tags || mindMap.tags
    mindMap.category = category || mindMap.category
    
    await mindMap.save()
    await mindMap.populate('author', 'username firstName lastName')
    
    res.json(mindMap)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Delete mind map
router.delete('/:id', auth, async (req, res) => {
  try {
    const mindMap = await MindMap.findById(req.params.id)
    
    if (!mindMap) {
      return res.status(404).json({ message: 'Mind map not found' })
    }
    
    // Check if user owns this mind map
    if (mindMap.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' })
    }
    
    await MindMap.findByIdAndDelete(req.params.id)
    
    res.json({ message: 'Mind map deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get templates
router.get('/templates/all', async (req, res) => {
  try {
    const templates = await MindMap.find({ template: true, isPublic: true })
      .populate('author', 'username firstName lastName')
      .sort({ createdAt: -1 })
    
    res.json(templates)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router



