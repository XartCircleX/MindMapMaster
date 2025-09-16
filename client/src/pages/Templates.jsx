import { useState } from 'react'
import { motion } from 'framer-motion'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Download, Star, Users } from 'lucide-react'

const Templates = () => {
  const [templates] = useState([
    {
      id: 1,
      title: 'Project Planning',
      description: 'Perfect for organizing project tasks and milestones',
      category: 'Business',
      downloads: 1250,
      rating: 4.8,
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: 2,
      title: 'Study Notes',
      description: 'Ideal for students to organize their learning materials',
      category: 'Education',
      downloads: 890,
      rating: 4.6,
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: 3,
      title: 'Brainstorming',
      description: 'Creative template for idea generation sessions',
      category: 'Creative',
      downloads: 2100,
      rating: 4.9,
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: 4,
      title: 'Meeting Notes',
      description: 'Structure your meeting discussions effectively',
      category: 'Business',
      downloads: 750,
      rating: 4.5,
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: 5,
      title: 'Goal Setting',
      description: 'Plan and track your personal and professional goals',
      category: 'Personal',
      downloads: 1500,
      rating: 4.7,
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: 6,
      title: 'Research Paper',
      description: 'Organize your research and findings systematically',
      category: 'Education',
      downloads: 650,
      rating: 4.4,
      thumbnail: '/api/placeholder/300/200'
    }
  ])

  const categories = ['All', 'Business', 'Education', 'Creative', 'Personal']

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Mind Map Templates</h1>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((category) => (
                <button
                  key={category}
                  className="px-4 py-2 rounded-full border border-gray-300 text-gray-600 hover:bg-primary-50 hover:border-primary-300 hover:text-primary-600 transition-colors duration-200"
                >
                  {category}
                </button>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="h-48 bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                    <div className="text-6xl text-primary-500">📋</div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded">
                        {template.category}
                      </span>
                      <div className="flex items-center space-x-1 text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm text-gray-600">{template.rating}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {template.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {template.description}
                    </p>
                    
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <Users className="w-4 h-4 mr-1" />
                      <span>{template.downloads} downloads</span>
                    </div>
                    
                    <button className="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
                      <Download className="w-4 h-4" />
                      <span>Use Template</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Templates



