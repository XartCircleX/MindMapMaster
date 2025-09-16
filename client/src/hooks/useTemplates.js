import { useState, useEffect } from 'react'
import api from '../utils/api'

export const useTemplates = () => {
  const [templates, setTemplates] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchTemplates = async () => {
    try {
      setLoading(true)
      const response = await api.get('/mindmaps/templates/all')
      setTemplates(response.data || [])
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching templates')
      // For demo purposes, set empty array if API fails
      setTemplates([])
    } finally {
      setLoading(false)
    }
  }

  const useTemplate = async (templateId) => {
    try {
      setLoading(true)
      const response = await api.get(`/mindmaps/${templateId}`)
      return response.data
    } catch (err) {
      setError(err.response?.data?.message || 'Error using template')
      throw err
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTemplates()
  }, [])

  return {
    templates,
    loading,
    error,
    useTemplate,
    refetch: fetchTemplates
  }
}

