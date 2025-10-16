import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { User, Calendar, Eye, Heart, MessageCircle, Plus } from 'lucide-react'
import { format } from 'date-fns'
import api from '../config/api'
import LoadingSpinner from '../components/common/LoadingSpinner'

function UserProfile() {
  const { username } = useParams()

  const { data: userData, isLoading: userLoading } = useQuery(
    ['user', username],
    () => api.get(`/users/${username}`),
    {
      enabled: !!username,
    }
  )

  const { data: blogsData, isLoading: blogsLoading } = useQuery(
    ['user-blogs', username],
    () => api.get(`/users/${username}/blogs`),
    {
      enabled: !!username,
    }
  )

  if (userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  const user = userData?.data?.data
  const blogs = blogsData?.data?.data || []

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">User Not Found</h1>
          <p className="text-gray-600">The user you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* User Header */}
      <div className="card p-8 mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
          <img
            src={user.avatar || '/images/placeholder-avatar.png'}
            alt={user.username}
            className="h-24 w-24 rounded-full object-cover"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">{user.username}</h1>
            {user.bio && (
              <p className="text-gray-600 mt-2">{user.bio}</p>
            )}
            <div className="flex items-center space-x-4 mt-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>Joined {format(new Date(user.createdAt), 'MMMM yyyy')}</span>
              </div>
              {user.location && (
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>{user.location}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="btn-primary">Follow</button>
            <button className="btn-secondary">Message</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User's Blogs */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Blogs by {user.username}</h2>
            <span className="text-sm text-gray-500">{blogs.length} blogs</span>
          </div>

          {blogsLoading ? (
            <div className="flex items-center justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : blogs.length === 0 ? (
            <div className="card p-12 text-center">
              <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No blogs yet</h3>
              <p className="text-gray-600">This user hasn't published any blogs yet.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {blogs.map((blog) => (
                <div key={blog.id} className="card p-6">
                  <Link
                    to={`/blog/${blog.slug}`}
                    className="text-xl font-semibold text-gray-900 hover:text-primary-600 transition-colors"
                  >
                    {blog.title}
                  </Link>
                  <p className="text-gray-600 mt-2 line-clamp-2">{blog.summary}</p>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{format(new Date(blog.createdAt), 'MMM d, yyyy')}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{blog.viewCount || 0}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4" />
                        <span>{blog.likeCount || 0}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="h-4 w-4" />
                        <span>{blog.commentCount || 0}</span>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      blog.status === 'PUBLISHED' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {blog.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Stats */}
          <div className="card p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Blogs</span>
                <span className="font-semibold">{blogs.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Followers</span>
                <span className="font-semibold">{user.followersCount || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Following</span>
                <span className="font-semibold">{user.followingCount || 0}</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="text-sm text-gray-600">
                Published a new blog
                <span className="text-gray-400 block">2 days ago</span>
              </div>
              <div className="text-sm text-gray-600">
                Liked a blog post
                <span className="text-gray-400 block">5 days ago</span>
              </div>
              <div className="text-sm text-gray-600">
                Followed a new user
                <span className="text-gray-400 block">1 week ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
