import mongoose from 'mongoose'

const nodeSchema = new mongoose.Schema({
  id: { type: String, required: true },
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  text: { type: String, required: true },
  color: { type: String, default: '#ec4899' },
  size: { type: String, enum: ['small', 'medium', 'large'], default: 'medium' }
})

const connectionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true }
})

const mindMapSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  nodes: [nodeSchema],
  connections: [connectionSchema],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String,
    trim: true
  }],
  template: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    enum: ['Business', 'Education', 'Creative', 'Personal', 'Other'],
    default: 'Other'
  }
}, {
  timestamps: true
})

// Index for better search performance
mindMapSchema.index({ title: 'text', description: 'text', tags: 'text' })
mindMapSchema.index({ author: 1 })
mindMapSchema.index({ isPublic: 1 })
mindMapSchema.index({ category: 1 })

export default mongoose.model('MindMap', mindMapSchema)



