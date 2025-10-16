import api from '../config/api'

export const blogService = {
  // Get all blogs with pagination and filters
  getBlogs: async (params = {}) => {
    const queryParams = new URLSearchParams({
      page: params.page || 0,
      size: params.size || 10,
      sortBy: params.sortBy || 'createdAt',
      sortDirection: params.sortDirection || 'desc',
      ...(params.category && { category: params.category }),
      ...(params.tag && { tag: params.tag }),
      ...(params.author && { author: params.author }),
    })
    
    const response = await api.get(`/blogs?${queryParams}`)
    return response.data
  },

  // Get blog by slug
  getBlogBySlug: async (slug) => {
    const response = await api.get(`/blogs/${slug}`)
    return response.data
  },

  // Get blog by ID
  getBlogById: async (id) => {
    const response = await api.get(`/blogs/${id}`)
    return response.data
  },

  // Create new blog
  createBlog: async (blogData) => {
    const response = await api.post('/blogs', blogData)
    return response.data
  },

  // Update blog
  updateBlog: async (id, blogData) => {
    const response = await api.put(`/blogs/${id}`, blogData)
    return response.data
  },

  // Delete blog
  deleteBlog: async (id) => {
    const response = await api.delete(`/blogs/${id}`)
    return response.data
  },

  // Like blog
  likeBlog: async (id) => {
    const response = await api.post(`/blogs/${id}/like`)
    return response.data
  },

  // Unlike blog
  unlikeBlog: async (id) => {
    const response = await api.delete(`/blogs/${id}/like`)
    return response.data
  },

  // Get user's blogs
  getUserBlogs: async (userId, params = {}) => {
    const queryParams = new URLSearchParams({
      page: params.page || 0,
      size: params.size || 10,
      sortBy: params.sortBy || 'createdAt',
      sortDirection: params.sortDirection || 'desc',
    })
    
    const response = await api.get(`/users/${userId}/blogs?${queryParams}`)
    return response.data
  },

  // Get featured blogs
  getFeaturedBlogs: async (limit = 3) => {
    const response = await api.get(`/blogs/featured?limit=${limit}`)
    return response.data
  },

  // Get trending blogs
  getTrendingBlogs: async (limit = 10) => {
    const response = await api.get(`/blogs/trending?limit=${limit}`)
    return response.data
  },

  // Search blogs
  searchBlogs: async (query, params = {}) => {
    const searchParams = new URLSearchParams({
      q: query,
      page: params.page || 0,
      size: params.size || 20,
      sortBy: params.sortBy || 'relevance',
      sortDirection: params.sortDirection || 'desc',
      ...(params.category && { category: params.category }),
      ...(params.tag && { tag: params.tag }),
    })
    
    const response = await api.get(`/search/blogs?${searchParams}`)
    return response.data
  },
}
