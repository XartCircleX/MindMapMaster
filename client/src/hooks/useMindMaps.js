import { useState, useEffect } from 'react'
import api from '../utils/api'

export const useMindMaps = () => {
  const [mindMaps, setMindMaps] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchMindMaps = async () => {
    try {
      setLoading(true)
      const response = await api.get('/mindmaps')
      setMindMaps(response.data.mindMaps || [])
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching mind maps')
      // For demo purposes, set empty array if API fails
      setMindMaps([])
    } finally {
      setLoading(false)
    }
  }

  const createMindMap = async (mindMapData) => {
    try {
      setLoading(true)
      const response = await api.post('/mindmaps', mindMapData)
      setMindMaps(prev => [response.data, ...prev])
      return response.data
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating mind map')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateMindMap = async (id, mindMapData) => {
    try {
      setLoading(true)
      const response = await api.put(`/mindmaps/${id}`, mindMapData)
      setMindMaps(prev => 
        prev.map(mindMap => 
          mindMap._id === id ? response.data : mindMap
        )
      )
      return response.data
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating mind map')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deleteMindMap = async (id) => {
    try {
      setLoading(true)
      await api.delete(`/mindmaps/${id}`)
      setMindMaps(prev => prev.filter(mindMap => mindMap._id !== id))
    } catch (err) {
      setError(err.response?.data?.message || 'Error deleting mind map')
      throw err
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMindMaps()
  }, [])

  return {
    mindMaps,
    loading,
    error,
    createMindMap,
    updateMindMap,
    deleteMindMap,
    refetch: fetchMindMaps
  }
}

