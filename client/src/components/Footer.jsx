import { Mail } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          {/* Left side - About */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">About MindMapMaster</h3>
            <p className="text-gray-600 text-sm max-w-md">
              MindMapMaster is a leading tool in mind mapping, helping users unleash their creativity 
              and organize their thoughts efficiently.
            </p>
          </div>

          {/* Right side - Contact and Links */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-primary-500" />
              <span className="text-sm text-gray-600">Contact Us:</span>
              <a 
                href="mailto:info@mindmapmaster.com" 
                className="text-sm text-primary-600 hover:text-primary-700 transition-colors"
              >
                info@mindmapmaster.com
              </a>
            </div>
            
            <div className="flex space-x-6">
              <a 
                href="/privacy" 
                className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
              >
                Privacy Policy
              </a>
              <a 
                href="/terms" 
                className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

