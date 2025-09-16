import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useMindMaps } from '../hooks/useMindMaps';

function ViewMindMaps() {
  const { mindMaps, loading, error } = useMindMaps();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMindMaps = mindMaps.filter(mindMap =>
    mindMap.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mindMap.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Mind Maps</h1>
            <p className="text-gray-600">{error}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">My Mind Maps</h1>
            <p className="text-xl text-gray-600 mb-8">
              View and manage all your created mind maps
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search mind maps..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <svg 
                  className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Mind Maps Grid */}
          {filteredMindMaps.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                {searchTerm ? 'No mind maps found' : 'No mind maps yet'}
              </h3>
              <p className="text-gray-500 mb-6">
                {searchTerm 
                  ? 'Try adjusting your search terms' 
                  : 'Create your first mind map to get started'
                }
              </p>
              {!searchTerm && (
                <Link 
                  to="/create"
                  className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                >
                  Create Mind Map
                </Link>
              )}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMindMaps.map((mindMap, index) => (
                <motion.div
                  key={mindMap._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {mindMap.title}
                    </h3>
                    {mindMap.description && (
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {mindMap.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>
                        Created: {new Date(mindMap.createdAt).toLocaleDateString()}
                      </span>
                      {mindMap.updatedAt !== mindMap.createdAt && (
                        <span>
                          Updated: {new Date(mindMap.updatedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Link
                        to={`/view/${mindMap._id}`}
                        className="flex-1 bg-indigo-600 text-white text-center py-2 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                      >
                        View
                      </Link>
                      <Link
                        to={`/edit/${mindMap._id}`}
                        className="flex-1 border border-indigo-600 text-indigo-600 text-center py-2 px-4 rounded-lg font-medium hover:bg-indigo-50 transition-colors"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}

export default ViewMindMaps;


