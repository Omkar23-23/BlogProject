import api from '../config/api'

export const commentService = {
  // Get comments for a blog
  getBlogComments: async (blogId, params = {}) => {
    const queryParams = new URLSearchParams({
      page: params.page || 0,
      size: params.size || 20,
      sortBy: params.sortBy || 'createdAt',
      sortDirection: params.sortDirection || 'asc',
    })
    
    const response = await api.get(`/blogs/${blogId}/comments?${queryParams}`)
    return response.data
  },

  // Get top-level comments for a blog
  getTopLevelComments: async (blogId, params = {}) => {
    const queryParams = new URLSearchParams({
      page: params.page || 0,
      size: params.size || 20,
    })
    
    const response = await api.get(`/blogs/${blogId}/comments/top-level?${queryParams}`)
    return response.data
  },

  // Get replies for a comment
  getCommentReplies: async (commentId, params = {}) => {
    const queryParams = new URLSearchParams({
      page: params.page || 0,
      size: params.size || 10,
    })
    
    const response = await api.get(`/comments/${commentId}/replies?${queryParams}`)
    return response.data
  },

  // Create comment
  createComment: async (blogId, commentData) => {
    const response = await api.post(`/blogs/${blogId}/comments`, commentData)
    return response.data
  },

  // Reply to comment
  replyToComment: async (commentId, replyData) => {
    const response = await api.post(`/comments/${commentId}/replies`, replyData)
    return response.data
  },

  // Update comment
  updateComment: async (commentId, commentData) => {
    const response = await api.put(`/comments/${commentId}`, commentData)
    return response.data
  },

  // Delete comment
  deleteComment: async (commentId) => {
    const response = await api.delete(`/comments/${commentId}`)
    return response.data
  },

  // Like comment
  likeComment: async (commentId) => {
    const response = await api.post(`/comments/${commentId}/like`)
    return response.data
  },

  // Unlike comment
  unlikeComment: async (commentId) => {
    const response = await api.delete(`/comments/${commentId}/like`)
    return response.data
  },

  // Get comment by ID
  getCommentById: async (commentId) => {
    const response = await api.get(`/comments/${commentId}`)
    return response.data
  },

  // Get user's comments
  getUserComments: async (userId, params = {}) => {
    const queryParams = new URLSearchParams({
      page: params.page || 0,
      size: params.size || 20,
    })
    
    const response = await api.get(`/users/${userId}/comments?${queryParams}`)
    return response.data
  },

  // Report comment
  reportComment: async (commentId, reason) => {
    const response = await api.post(`/comments/${commentId}/report`, { reason })
    return response.data
  },
}
