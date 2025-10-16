import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { 
  Plus, 
  Eye, 
  Heart, 
  MessageCircle, 
  TrendingUp,
  Users,
  BookOpen,
  Calendar
} from 'lucide-react'
import { format } from 'date-fns'
import api from '../config/api'
import LoadingSpinner from '../components/common/LoadingSpinner'

function Dashboard() {
  const { user } = useAuth()

  // Fetch user's blogs
  const { data: blogsData, isLoading: blogsLoading } = useQuery(
    'user-blogs',
    () => api.get(`/users/${user?.id}/blogs`),
    {
      enabled: !!user?.id,
    }
  )

  // Fetch dashboard stats
  const { data: statsData, isLoading: statsLoading } = useQuery(
    'dashboard-stats',
    () => api.get('/analytics/dashboard/general'),
    {
      enabled: !!user?.id,
    }
  )

  if (blogsLoading || statsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  const blogs = blogsData?.data?.data || []
  const stats = statsData?.data?.data || {}

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome back, {user?.username}! Here's what's happening with your content.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <BookOpen className="h-8 w-8 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Blogs</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalBlogs || blogs.length}</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Eye className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Views</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalViews || 0}</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Heart className="h-8 w-8 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Likes</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalLikes || 0}</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Followers</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.followers || 0}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Blogs */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Recent Blogs</h2>
            <Link to="/create" className="btn-primary btn-sm flex items-center space-x-1">
              <Plus className="h-4 w-4" />
              <span>New Blog</span>
            </Link>
          </div>

          {blogs.length === 0 ? (
            <div className="card p-12 text-center">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No blogs yet</h3>
              <p className="text-gray-600 mb-6">Start sharing your thoughts with the world!</p>
              <Link to="/create" className="btn-primary">
                Write Your First Blog
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {blogs.slice(0, 5).map((blog) => (
                <div key={blog.id} className="card p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <Link
                        to={`/blog/${blog.slug}`}
                        className="text-lg font-semibold text-gray-900 hover:text-primary-600 transition-colors"
                      >
                        {blog.title}
                      </Link>
                      <p className="text-gray-600 mt-1 line-clamp-2">{blog.summary}</p>
                      <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{format(new Date(blog.createdAt), 'MMM d, yyyy')}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{blog.viewCount || 0} views</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="h-4 w-4" />
                          <span>{blog.likeCount || 0} likes</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="h-4 w-4" />
                          <span>{blog.commentCount || 0} comments</span>
                        </div>
                      </div>
                    </div>
                    <div className="ml-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        blog.status === 'PUBLISHED' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {blog.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Quick Actions */}
          <div className="card p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                to="/create"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Plus className="h-5 w-5 text-primary-600" />
                <span>Write New Blog</span>
              </Link>
              <Link
                to="/profile"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Users className="h-5 w-5 text-primary-600" />
                <span>Edit Profile</span>
              </Link>
            </div>
          </div>

          {/* Performance */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">This Month</span>
                  <span className="font-medium">{stats.monthlyViews || 0} views</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full" 
                    style={{ width: `${Math.min((stats.monthlyViews || 0) / 100, 1) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Engagement Rate</span>
                  <span className="font-medium">{stats.engagementRate || 0}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full" 
                    style={{ width: `${Math.min((stats.engagementRate || 0), 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
