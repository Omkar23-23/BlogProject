import api from '../config/api'

export const categoryService = {
  // Get all categories
  getCategories: async (params = {}) => {
    const queryParams = new URLSearchParams({
      includeInactive: params.includeInactive || false,
    })
    
    const response = await api.get(`/categories?${queryParams}`)
    return response.data
  },

  // Get category by ID
  getCategoryById: async (id) => {
    const response = await api.get(`/categories/${id}`)
    return response.data
  },

  // Get root categories
  getRootCategories: async () => {
    const response = await api.get('/categories/root')
    return response.data
  },

  // Get category hierarchy
  getCategoryHierarchy: async () => {
    const response = await api.get('/categories/hierarchy')
    return response.data
  },

  // Get blogs by category
  getBlogsByCategory: async (categoryId, params = {}) => {
    const queryParams = new URLSearchParams({
      page: params.page || 0,
      size: params.size || 10,
      sortBy: params.sortBy || 'createdAt',
      sortDirection: params.sortDirection || 'desc',
    })
    
    const response = await api.get(`/categories/${categoryId}/blogs?${queryParams}`)
    return response.data
  },

  // Get category statistics
  getCategoryStats: async (categoryId) => {
    const response = await api.get(`/categories/${categoryId}/stats`)
    return response.data
  },

  // Follow category
  followCategory: async (categoryId) => {
    const response = await api.post(`/categories/${categoryId}/follow`)
    return response.data
  },

  // Unfollow category
  unfollowCategory: async (categoryId) => {
    const response = await api.delete(`/categories/${categoryId}/follow`)
    return response.data
  },

  // Get user's followed categories
  getFollowedCategories: async (params = {}) => {
    const queryParams = new URLSearchParams({
      page: params.page || 0,
      size: params.size || 20,
    })
    
    const response = await api.get(`/categories/followed?${queryParams}`)
    return response.data
  },
}
