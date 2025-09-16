import mongoose from 'mongoose'
import MindMap from '../models/MindMap.js'
import User from '../models/User.js'
import connectDB from '../config/database.js'

const templates = [
  {
    title: 'Project Planning',
    description: 'Perfect for organizing project tasks and milestones',
    category: 'Business',
    template: true,
    isPublic: true,
    nodes: [
      { id: '1', x: 400, y: 200, text: 'Project Name', color: '#ec4899', size: 'large' },
      { id: '2', x: 200, y: 100, text: 'Planning', color: '#3b82f6', size: 'medium' },
      { id: '3', x: 600, y: 100, text: 'Execution', color: '#10b981', size: 'medium' },
      { id: '4', x: 200, y: 300, text: 'Resources', color: '#f59e0b', size: 'medium' },
      { id: '5', x: 600, y: 300, text: 'Timeline', color: '#ef4444', size: 'medium' }
    ],
    connections: [
      { id: '1', from: '1', to: '2' },
      { id: '2', from: '1', to: '3' },
      { id: '3', from: '1', to: '4' },
      { id: '4', from: '1', to: '5' }
    ],
    tags: ['project', 'planning', 'business', 'management']
  },
  {
    title: 'Study Notes',
    description: 'Ideal for students to organize their learning materials',
    category: 'Education',
    template: true,
    isPublic: true,
    nodes: [
      { id: '1', x: 400, y: 200, text: 'Subject', color: '#8b5cf6', size: 'large' },
      { id: '2', x: 200, y: 100, text: 'Key Concepts', color: '#3b82f6', size: 'medium' },
      { id: '3', x: 600, y: 100, text: 'Examples', color: '#10b981', size: 'medium' },
      { id: '4', x: 200, y: 300, text: 'Practice', color: '#f59e0b', size: 'medium' },
      { id: '5', x: 600, y: 300, text: 'Resources', color: '#ef4444', size: 'medium' }
    ],
    connections: [
      { id: '1', from: '1', to: '2' },
      { id: '2', from: '1', to: '3' },
      { id: '3', from: '1', to: '4' },
      { id: '4', from: '1', to: '5' }
    ],
    tags: ['education', 'study', 'learning', 'notes']
  },
  {
    title: 'Brainstorming',
    description: 'Creative template for idea generation sessions',
    category: 'Creative',
    template: true,
    isPublic: true,
    nodes: [
      { id: '1', x: 400, y: 200, text: 'Main Topic', color: '#ec4899', size: 'large' },
      { id: '2', x: 150, y: 100, text: 'Idea 1', color: '#3b82f6', size: 'medium' },
      { id: '3', x: 300, y: 50, text: 'Idea 2', color: '#10b981', size: 'medium' },
      { id: '4', x: 500, y: 50, text: 'Idea 3', color: '#f59e0b', size: 'medium' },
      { id: '5', x: 650, y: 100, text: 'Idea 4', color: '#ef4444', size: 'medium' },
      { id: '6', x: 200, y: 300, text: 'Implementation', color: '#8b5cf6', size: 'medium' },
      { id: '7', x: 600, y: 300, text: 'Next Steps', color: '#06b6d4', size: 'medium' }
    ],
    connections: [
      { id: '1', from: '1', to: '2' },
      { id: '2', from: '1', to: '3' },
      { id: '3', from: '1', to: '4' },
      { id: '4', from: '1', to: '5' },
      { id: '5', from: '1', to: '6' },
      { id: '6', from: '1', to: '7' }
    ],
    tags: ['brainstorming', 'creative', 'ideas', 'innovation']
  }
]

const seedTemplates = async () => {
  try {
    await connectDB()
    
    // Create a default user for templates
    let defaultUser = await User.findOne({ email: 'admin@mindmapmaster.com' })
    
    if (!defaultUser) {
      defaultUser = new User({
        username: 'admin',
        email: 'admin@mindmapmaster.com',
        password: 'admin123',
        firstName: 'Admin',
        lastName: 'User'
      })
      await defaultUser.save()
    }
    
    // Clear existing templates
    await MindMap.deleteMany({ template: true })
    
    // Create templates
    for (const template of templates) {
      const mindMap = new MindMap({
        ...template,
        author: defaultUser._id
      })
      await mindMap.save()
    }
    
    console.log('Templates seeded successfully!')
    process.exit(0)
  } catch (error) {
    console.error('Error seeding templates:', error)
    process.exit(1)
  }
}

seedTemplates()



