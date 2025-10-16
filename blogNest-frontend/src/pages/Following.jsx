import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { User, Calendar, Eye, Heart, MessageCircle, Users } from 'lucide-react'
import { format } from 'date-fns'
import api from '../config/api'
import LoadingSpinner from '../components/common/LoadingSpinner'

function Following() {
  const { user } = useAuth()

  // Fetch following users
  const { data: followingData, isLoading: followingLoading } = useQuery(
    'following',
    () => api.get(`/users/${user?.id}/following`),
    {
      enabled: !!user?.id,
    }
  )

  // Fetch recent activity from followed users
  const { data: activityData, isLoading: activityLoading } = useQuery(
    'following-activity',
    () => api.get(`/users/${user?.id}/following/activity`),
    {
      enabled: !!user?.id,
    }
  )

  if (followingLoading || activityLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  const following = followingData?.data?.data || []
  const activity = activityData?.data?.data || []

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Following</h1>
        <p className="text-gray-600 mt-2">Stay updated with the people you follow</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Following List */}
        <div className="lg:col-span-1">
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">People You Follow</h2>
            
            {following.length === 0 ? (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Not following anyone yet</h3>
                <p className="text-gray-600 mb-4">Start following interesting people to see their content here.</p>
                <Link to="/search" className="btn-primary">
                  Discover People
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {following.slice(0, 10).map((user) => (
                  <div key={user.id} className="flex items-center space-x-3">
                    <img
                      src={user.avatar || '/images/placeholder-avatar.png'}
                      alt={user.username}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/user/${user.username}`}
                        className="text-sm font-medium text-gray-900 hover:text-primary-600 transition-colors"
                      >
                        {user.username}
                      </Link>
                      <p className="text-xs text-gray-500">{user.followersCount} followers</p>
                    </div>
                  </div>
                ))}
                
                {following.length > 10 && (
                  <Link
                    to="/profile"
                    className="block text-sm text-primary-600 hover:text-primary-700 text-center"
                  >
                    View all {following.length} people
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
          
          {activity.length === 0 ? (
            <div className="card p-12 text-center">
              <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No recent activity</h3>
              <p className="text-gray-600">Activity from people you follow will appear here.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {activity.map((item) => (
                <ActivityItem key={item.id} activity={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ActivityItem({ activity }) {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'blog_created':
        return <User className="h-5 w-5 text-blue-600" />
      case 'blog_liked':
        return <Heart className="h-5 w-5 text-red-600" />
      case 'comment_added':
        return <MessageCircle className="h-5 w-5 text-green-600" />
      default:
        return <User className="h-5 w-5 text-gray-600" />
    }
  }

  const getActivityText = (activity) => {
    switch (activity.type) {
      case 'blog_created':
        return `published a new blog: "${activity.blog?.title}"`
      case 'blog_liked':
        return `liked "${activity.blog?.title}"`
      case 'comment_added':
        return `commented on "${activity.blog?.title}"`
      default:
        return 'performed an action'
    }
  }

  return (
    <div className="card p-6">
      <div className="flex items-start space-x-4">
        <img
          src={activity.user?.avatar || '/images/placeholder-avatar.png'}
          alt={activity.user?.username}
          className="h-10 w-10 rounded-full object-cover"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            {getActivityIcon(activity.type)}
            <Link
              to={`/user/${activity.user?.username}`}
              className="font-medium text-gray-900 hover:text-primary-600 transition-colors"
            >
              {activity.user?.username}
            </Link>
            <span className="text-gray-600">
              {getActivityText(activity)}
            </span>
          </div>
          
          {activity.blog && (
            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
              <Link
                to={`/blog/${activity.blog.slug}`}
                className="text-sm font-medium text-gray-900 hover:text-primary-600 transition-colors"
              >
                {activity.blog.title}
              </Link>
              {activity.blog.summary && (
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {activity.blog.summary}
                </p>
              )}
              <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>{format(new Date(activity.createdAt), 'MMM d, yyyy')}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="h-3 w-3" />
                  <span>{activity.blog.viewCount || 0}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Heart className="h-3 w-3" />
                  <span>{activity.blog.likeCount || 0}</span>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-gray-500">
              {format(new Date(activity.createdAt), 'MMM d, yyyy')}
            </span>
            {activity.blog && (
              <Link
                to={`/blog/${activity.blog.slug}`}
                className="text-xs text-primary-600 hover:text-primary-700"
              >
                View Blog →
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Following
