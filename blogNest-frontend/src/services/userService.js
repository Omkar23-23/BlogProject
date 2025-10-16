import api from '../config/api'

export const userService = {
  // Get user profile by username
  getUserProfile: async (username) => {
    const response = await api.get(`/users/${username}`)
    return response.data
  },

  // Update user profile
  updateProfile: async (userData) => {
    const response = await api.put('/users/profile', userData)
    return response.data
  },

  // Upload avatar
  uploadAvatar: async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    
    const response = await api.post('/users/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  // Follow user
  followUser: async (userId) => {
    const response = await api.post(`/users/${userId}/follow`)
    return response.data
  },

  // Unfollow user
  unfollowUser: async (userId) => {
    const response = await api.delete(`/users/${userId}/follow`)
    return response.data
  },

  // Get user's followers
  getFollowers: async (userId, params = {}) => {
    const queryParams = new URLSearchParams({
      page: params.page || 0,
      size: params.size || 20,
    })
    
    const response = await api.get(`/users/${userId}/followers?${queryParams}`)
    return response.data
  },

  // Get user's following
  getFollowing: async (userId, params = {}) => {
    const queryParams = new URLSearchParams({
      page: params.page || 0,
      size: params.size || 20,
    })
    
    const response = await api.get(`/users/${userId}/following?${queryParams}`)
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

  // Get user's liked blogs
  getUserLikedBlogs: async (userId, params = {}) => {
    const queryParams = new URLSearchParams({
      page: params.page || 0,
      size: params.size || 10,
    })
    
    const response = await api.get(`/users/${userId}/liked-blogs?${queryParams}`)
    return response.data
  },

  // Search users
  searchUsers: async (query, params = {}) => {
    const searchParams = new URLSearchParams({
      q: query,
      page: params.page || 0,
      size: params.size || 20,
    })
    
    const response = await api.get(`/search/users?${searchParams}`)
    return response.data
  },

  // Get user statistics
  getUserStats: async (userId) => {
    const response = await api.get(`/users/${userId}/stats`)
    return response.data
  },
}
