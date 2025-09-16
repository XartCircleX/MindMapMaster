import { useState, useCallback, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { 
  Plus, 
  Link as LinkIcon, 
  Palette, 
  Type, 
  Save, 
  Download,
  Undo,
  Redo,
  Move,
  Trash2,
  Edit3,
  Check,
  X
} from 'lucide-react'

const MindMapCanvas = () => {
  const [nodes, setNodes] = useState([
    { id: '1', x: 400, y: 200, text: 'Central Idea', color: '#ec4899', size: 'large' }
  ])
  const [connections, setConnections] = useState([])
  const [selectedNode, setSelectedNode] = useState(null)
  const [selectedColor, setSelectedColor] = useState('#ec4899')
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectionStart, setConnectionStart] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [isMoving, setIsMoving] = useState(false)
  const [editingNode, setEditingNode] = useState(null)
  const [tempText, setTempText] = useState('')
  const canvasRef = useRef(null)
  const inputRef = useRef(null)

  const colors = ['#ec4899', '#6b7280', '#000000', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

  const addNode = useCallback((x, y) => {
    const newNode = {
      id: Date.now().toString(),
      x: x - 50,
      y: y - 25,
      text: 'New Node',
      color: selectedColor,
      size: 'medium'
    }
    setNodes(prev => [...prev, newNode])
  }, [selectedColor])

  const handleCanvasClick = (e) => {
    if (e.target === canvasRef.current && !isMoving && !editingNode) {
      const rect = canvasRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      addNode(x, y)
    }
  }

  const handleNodeClick = (nodeId, e) => {
    e.stopPropagation()
    setSelectedNode(nodeId)
    
    if (isConnecting && connectionStart && connectionStart !== nodeId) {
      // Create connection
      setConnections(prev => [...prev, {
        id: Date.now().toString(),
        from: connectionStart,
        to: nodeId
      }])
      setIsConnecting(false)
      setConnectionStart(null)
    } else if (isConnecting) {
      setConnectionStart(nodeId)
    }
  }

  // Funciones para arrastrar y soltar
  const handleNodeMouseDown = (nodeId, e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (isConnecting || editingNode) return
    
    const node = nodes.find(n => n.id === nodeId)
    if (!node) return
    
    setIsDragging(true)
    setIsMoving(true)
    setSelectedNode(nodeId)
    
    const rect = canvasRef.current.getBoundingClientRect()
    setDragOffset({
      x: e.clientX - rect.left - node.x,
      y: e.clientY - rect.top - node.y
    })
  }

  const handleMouseMove = useCallback((e) => {
    if (!isDragging || !selectedNode) return
    
    const rect = canvasRef.current.getBoundingClientRect()
    const newX = e.clientX - rect.left - dragOffset.x
    const newY = e.clientY - rect.top - dragOffset.y
    
    setNodes(prev => prev.map(node => 
      node.id === selectedNode 
        ? { ...node, x: Math.max(0, Math.min(rect.width - 100, newX)), y: Math.max(0, Math.min(rect.height - 50, newY)) }
        : node
    ))
  }, [isDragging, selectedNode, dragOffset])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
    setIsMoving(false)
  }, [])

  // Event listeners para arrastrar
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  const updateNodeText = (nodeId, newText) => {
    setNodes(prev => prev.map(node => 
      node.id === nodeId ? { ...node, text: newText } : node
    ))
  }

  const updateNodeColor = (nodeId, color) => {
    setNodes(prev => prev.map(node => 
      node.id === nodeId ? { ...node, color } : node
    ))
  }

  const updateNodeSize = (nodeId, size) => {
    setNodes(prev => prev.map(node => 
      node.id === nodeId ? { ...node, size } : node
    ))
  }

  const deleteNode = (nodeId) => {
    setNodes(prev => prev.filter(node => node.id !== nodeId))
    setConnections(prev => prev.filter(conn => 
      conn.from !== nodeId && conn.to !== nodeId
    ))
    if (selectedNode === nodeId) {
      setSelectedNode(null)
    }
    if (editingNode === nodeId) {
      setEditingNode(null)
    }
  }

  const deleteConnection = (connectionId) => {
    setConnections(prev => prev.filter(conn => conn.id !== connectionId))
  }

  const clearCanvas = () => {
    setNodes([{ id: '1', x: 400, y: 200, text: 'Central Idea', color: '#ec4899', size: 'large' }])
    setConnections([])
    setSelectedNode(null)
    setEditingNode(null)
  }

  const startConnection = () => {
    setIsConnecting(true)
    setConnectionStart(null)
    setEditingNode(null)
  }

  const cancelConnection = () => {
    setIsConnecting(false)
    setConnectionStart(null)
  }

  const startEditing = (nodeId) => {
    const node = nodes.find(n => n.id === nodeId)
    if (node) {
      setEditingNode(nodeId)
      setTempText(node.text)
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus()
          inputRef.current.select()
        }
      }, 100)
    }
  }

  const saveEdit = () => {
    if (editingNode && tempText.trim()) {
      updateNodeText(editingNode, tempText.trim())
    }
    setEditingNode(null)
    setTempText('')
  }

  const cancelEdit = () => {
    setEditingNode(null)
    setTempText('')
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      saveEdit()
    } else if (e.key === 'Escape') {
      cancelEdit()
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <div className="flex-1 flex">
        {/* Left Sidebar - Tools */}
        <div className="w-64 bg-pink-50 p-6 border-r border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Tools</h2>
          
          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
              onClick={() => addNode(400, 300)}
            >
              <Plus className="w-5 h-5" />
              <span>Add Node</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 ${
                isConnecting 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-pink-500 hover:bg-pink-600 text-white'
              }`}
              onClick={isConnecting ? cancelConnection : startConnection}
            >
              <LinkIcon className="w-5 h-5" />
              <span>{isConnecting ? 'Cancel Connection' : 'Connect Nodes'}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 ${
                isMoving 
                  ? 'bg-green-500 hover:bg-green-600 text-white' 
                  : 'bg-pink-500 hover:bg-pink-600 text-white'
              }`}
              onClick={() => setIsMoving(!isMoving)}
            >
              <Move className="w-5 h-5" />
              <span>{isMoving ? 'Moving Mode ON' : 'Move Nodes'}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
              onClick={clearCanvas}
            >
              <Trash2 className="w-5 h-5" />
              <span>Clear Canvas</span>
            </motion.button>
          </div>

          {/* Instructions */}
          <div className="mt-8 p-4 bg-white rounded-lg border border-gray-200">
            <h3 className="font-medium text-gray-900 mb-2">Instructions:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Click canvas to add nodes</li>
              <li>• Drag nodes to move them</li>
              <li>• Double-click node to edit text</li>
              <li>• Click "Connect Nodes" then click two nodes</li>
              <li>• Select a node to customize it</li>
              <li>• Use color palette to change colors</li>
            </ul>
          </div>

          {/* Action buttons */}
          <div className="mt-6 space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </motion.button>
          </div>
        </div>

        {/* Main Canvas */}
        <div className="flex-1 relative">
          <div className="absolute inset-0 bg-white">
            {/* Background illustration */}
            <div className="absolute inset-0 opacity-5">
              <div className="w-full h-full bg-gradient-to-br from-pink-100 to-purple-100"></div>
            </div>
            
            {/* Canvas */}
            <div
              ref={canvasRef}
              className="relative w-full h-full cursor-crosshair"
              onClick={handleCanvasClick}
            >
              {/* Connections */}
              <svg className="absolute inset-0 w-full h-full pointer-events-auto">
                {connections.map(connection => {
                  const fromNode = nodes.find(n => n.id === connection.from)
                  const toNode = nodes.find(n => n.id === connection.to)
                  if (!fromNode || !toNode) return null
                  
                  const fromX = fromNode.x + (fromNode.size === 'large' ? 60 : fromNode.size === 'small' ? 40 : 50)
                  const fromY = fromNode.y + (fromNode.size === 'large' ? 30 : fromNode.size === 'small' ? 20 : 25)
                  const toX = toNode.x + (toNode.size === 'large' ? 60 : toNode.size === 'small' ? 40 : 50)
                  const toY = toNode.y + (toNode.size === 'large' ? 30 : toNode.size === 'small' ? 20 : 25)
                  
                  // Calculate control points for curved line
                  const midX = (fromX + toX) / 2
                  const midY = (fromY + toY) / 2
                  const controlOffset = 50
                  
                  return (
                    <g key={connection.id}>
                      <path
                        d={`M ${fromX} ${fromY} Q ${midX} ${midY - controlOffset} ${toX} ${toY}`}
                        stroke="#ec4899"
                        strokeWidth="3"
                        fill="none"
                        strokeDasharray="8,4"
                        className="hover:stroke-pink-600 transition-colors"
                      />
                      {/* Connection midpoint for deletion */}
                      <circle
                        cx={midX}
                        cy={midY - controlOffset/2}
                        r="8"
                        fill="transparent"
                        stroke="transparent"
                        className="cursor-pointer hover:fill-red-100 hover:stroke-red-300"
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteConnection(connection.id)
                        }}
                        title="Click to delete connection"
                      />
                    </g>
                  )
                })}
              </svg>

              {/* Nodes */}
              {nodes.map(node => (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  className={`absolute cursor-move ${
                    selectedNode === node.id ? 'ring-2 ring-pink-500 ring-offset-2' : ''
                  } ${isDragging && selectedNode === node.id ? 'z-50' : 'z-10'}`}
                  style={{
                    left: node.x,
                    top: node.y,
                  }}
                  onMouseDown={(e) => handleNodeMouseDown(node.id, e)}
                  onClick={(e) => handleNodeClick(node.id, e)}
                  onDoubleClick={(e) => {
                    e.stopPropagation()
                    startEditing(node.id)
                  }}
                >
                  <div 
                    className="rounded-lg shadow-lg p-3 min-w-[100px] text-center border-2 border-white relative"
                    style={{ 
                      backgroundColor: node.color,
                      minWidth: node.size === 'large' ? '120px' : node.size === 'small' ? '80px' : '100px',
                      fontSize: node.size === 'large' ? '16px' : node.size === 'small' ? '12px' : '14px'
                    }}
                  >
                    {editingNode === node.id ? (
                      <div className="flex items-center space-x-1">
                        <input
                          ref={inputRef}
                          type="text"
                          value={tempText}
                          onChange={(e) => setTempText(e.target.value)}
                          onKeyDown={handleKeyPress}
                          onBlur={saveEdit}
                          className="flex-1 text-center font-medium bg-transparent border-none outline-none text-white placeholder-white placeholder-opacity-70"
                          style={{ color: 'white' }}
                          autoFocus
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            saveEdit()
                          }}
                          className="text-white hover:text-green-200"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            cancelEdit()
                          }}
                          className="text-white hover:text-red-200"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <span className="text-white font-medium">
                        {node.text}
                      </span>
                    )}
                  </div>
                  
                  {/* Node controls */}
                  {selectedNode === node.id && !editingNode && (
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 flex space-x-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          startEditing(node.id)
                        }}
                        className="bg-blue-500 hover:bg-blue-600 text-white p-1 rounded-full"
                        title="Edit text"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteNode(node.id)
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white p-1 rounded-full"
                        title="Delete node"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Canvas label and status */}
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center">
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">Mind Map Canvas</h2>
                <div className="flex items-center justify-center space-x-4 text-sm">
                  <div className={`px-3 py-1 rounded-full ${
                    isConnecting 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : isMoving 
                        ? 'bg-green-100 text-green-800'
                        : editingNode
                          ? 'bg-blue-100 text-blue-800'
                        : 'bg-pink-100 text-pink-800'
                  }`}>
                    {isConnecting 
                      ? '🔗 Connection Mode' 
                      : isMoving 
                        ? '✋ Move Mode'
                        : editingNode
                          ? '✏️ Edit Mode'
                        : '➕ Add Mode'
                    }
                  </div>
                  <div className="text-gray-500">
                    {nodes.length} nodes, {connections.length} connections
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Palette */}
        <div className="w-64 bg-pink-50 p-6 border-l border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Palette</h2>
          
          <div className="space-y-6">
            {/* Color Palette */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Colors</h3>
              <div className="grid grid-cols-4 gap-2">
                {colors.map(color => (
                  <motion.button
                    key={color}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-10 h-10 rounded-full border-2 ${
                      selectedColor === color ? 'border-gray-800' : 'border-gray-300'
                    } shadow-sm`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Node Size Options */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Node Size</h3>
              <div className="space-y-2">
                {['small', 'medium', 'large'].map(size => (
                  <button
                    key={size}
                    className={`w-full text-left px-3 py-2 rounded-lg border transition-colors ${
                      nodes.find(n => n.id === selectedNode)?.size === size
                        ? 'bg-pink-500 text-white border-pink-500'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => selectedNode && updateNodeSize(selectedNode, size)}
                    disabled={!selectedNode}
                  >
                    {size.charAt(0).toUpperCase() + size.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Node Settings */}
            {selectedNode && (
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-900 mb-3">Selected Node</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Change Color</label>
                    <div className="grid grid-cols-3 gap-2">
                      {colors.slice(0, 6).map(color => (
                        <button
                          key={color}
                          className={`w-8 h-8 rounded-full border-2 ${
                            nodes.find(n => n.id === selectedNode)?.color === color 
                              ? 'border-gray-800' 
                              : 'border-gray-300'
                          }`}
                          style={{ backgroundColor: color }}
                          onClick={() => updateNodeColor(selectedNode, color)}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t border-gray-200">
                    <button
                      onClick={() => startEditing(selectedNode)}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 px-3 rounded transition-colors flex items-center justify-center space-x-2 mb-2"
                    >
                      <Edit3 className="w-4 h-4" />
                      <span>Edit Text</span>
                    </button>
                    <button
                      onClick={() => deleteNode(selectedNode)}
                      className="w-full bg-red-500 hover:bg-red-600 text-white text-sm py-2 px-3 rounded transition-colors flex items-center justify-center space-x-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete Node</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Connection Info */}
            {isConnecting && (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h3 className="font-medium text-yellow-800 mb-2">Connection Mode</h3>
                <p className="text-sm text-yellow-700">
                  {connectionStart 
                    ? 'Click another node to connect' 
                    : 'Click a node to start connection'
                  }
                </p>
                <button
                  onClick={cancelConnection}
                  className="mt-2 text-sm text-yellow-600 hover:text-yellow-800 underline"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default MindMapCanvas


