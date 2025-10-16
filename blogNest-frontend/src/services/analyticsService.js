import api from '../config/api'

export const analyticsService = {
  // Get dashboard statistics
  getDashboardStats: async () => {
    const response = await api.get('/analytics/dashboard/general')
    return response.data
  },

  // Get user analytics
  getUserAnalytics: async (userId, params = {}) => {
    const queryParams = new URLSearchParams({
      period: params.period || '30d',
      ...(params.startDate && { startDate: params.startDate }),
      ...(params.endDate && { endDate: params.endDate }),
    })
    
    const response = await api.get(`/analytics/users/${userId}?${queryParams}`)
    return response.data
  },

  // Get blog analytics
  getBlogAnalytics: async (blogId, params = {}) => {
    const queryParams = new URLSearchParams({
      period: params.period || '30d',
      ...(params.startDate && { startDate: params.startDate }),
      ...(params.endDate && { endDate: params.endDate }),
    })
    
    const response = await api.get(`/analytics/blogs/${blogId}?${queryParams}`)
    return response.data
  },

  // Get content performance
  getContentPerformance: async (params = {}) => {
    const queryParams = new URLSearchParams({
      period: params.period || '30d',
      sortBy: params.sortBy || 'views',
      sortDirection: params.sortDirection || 'desc',
      page: params.page || 0,
      size: params.size || 10,
    })
    
    const response = await api.get(`/analytics/content/performance?${queryParams}`)
    return response.data
  },

  // Get audience insights
  getAudienceInsights: async (params = {}) => {
    const queryParams = new URLSearchParams({
      period: params.period || '30d',
      ...(params.startDate && { startDate: params.startDate }),
      ...(params.endDate && { endDate: params.endDate }),
    })
    
    const response = await api.get(`/analytics/audience/insights?${queryParams}`)
    return response.data
  },

  // Get engagement metrics
  getEngagementMetrics: async (params = {}) => {
    const queryParams = new URLSearchParams({
      period: params.period || '30d',
      ...(params.startDate && { startDate: params.startDate }),
      ...(params.endDate && { endDate: params.endDate }),
    })
    
    const response = await api.get(`/analytics/engagement/metrics?${queryParams}`)
    return response.data
  },

  // Get trending content
  getTrendingContent: async (params = {}) => {
    const queryParams = new URLSearchParams({
      period: params.period || '7d',
      type: params.type || 'all',
      limit: params.limit || 10,
    })
    
    const response = await api.get(`/analytics/trending/content?${queryParams}`)
    return response.data
  },

  // Get system health
  getSystemHealth: async () => {
    const response = await api.get('/analytics/system/health')
    return response.data
  },

  // Export analytics data
  exportAnalytics: async (params = {}) => {
    const queryParams = new URLSearchParams({
      format: params.format || 'csv',
      period: params.period || '30d',
      ...(params.startDate && { startDate: params.startDate }),
      ...(params.endDate && { endDate: params.endDate }),
    })
    
    const response = await api.get(`/analytics/export?${queryParams}`, {
      responseType: 'blob',
    })
    return response.data
  },
}
