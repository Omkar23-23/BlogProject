import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { 
  Bell, 
  Heart, 
  MessageCircle, 
  User, 
  BookOpen, 
  Calendar,
  Check,
  X
} from 'lucide-react'
import { format } from 'date-fns'
import api from '../config/api'
import LoadingSpinner from '../components/common/LoadingSpinner'

function Notifications() {
  const { user } = useAuth()

  // Fetch notifications
  const { data: notificationsData, isLoading, refetch } = useQuery(
    'notifications',
    () => api.get('/notifications'),
    {
      enabled: !!user?.id,
      refetchInterval: 30000, // Refetch every 30 seconds
    }
  )

  // Mark all as read
  const markAllAsRead = async () => {
    try {
      await api.post('/notifications/mark-all-read')
      refetch()
    } catch (error) {
      console.error('Error marking notifications as read:', error)
    }
  }

  // Mark notification as read
  const markAsRead = async (notificationId) => {
    try {
      await api.post(`/notifications/${notificationId}/mark-read`)
      refetch()
    } catch (error) {
      console.error('Error marking notification as read:', error)
    }
  }

  // Delete notification
  const deleteNotification = async (notificationId) => {
    try {
      await api.delete(`/notifications/${notificationId}`)
      refetch()
    } catch (error) {
      console.error('Error deleting notification:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  const notifications = notificationsData?.data?.data || []
  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
            <p className="text-gray-600 mt-2">
              {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
            </p>
          </div>
          
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="btn-primary btn-sm flex items-center space-x-1"
            >
              <Check className="h-4 w-4" />
              <span>Mark All Read</span>
            </button>
          )}
        </div>
      </div>

      {notifications.length === 0 ? (
        <div className="card p-12 text-center">
          <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
          <p className="text-gray-600">You're all caught up! New notifications will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onMarkAsRead={markAsRead}
              onDelete={deleteNotification}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function NotificationItem({ notification, onMarkAsRead, onDelete }) {
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'blog_liked':
        return <Heart className="h-5 w-5 text-red-600" />
      case 'comment_added':
        return <MessageCircle className="h-5 w-5 text-blue-600" />
      case 'user_followed':
        return <User className="h-5 w-5 text-green-600" />
      case 'blog_published':
        return <BookOpen className="h-5 w-5 text-purple-600" />
      default:
        return <Bell className="h-5 w-5 text-gray-600" />
    }
  }

  const getNotificationText = (notification) => {
    switch (notification.type) {
      case 'blog_liked':
        return `${notification.actor?.username} liked your blog "${notification.blog?.title}"`
      case 'comment_added':
        return `${notification.actor?.username} commented on your blog "${notification.blog?.title}"`
      case 'user_followed':
        return `${notification.actor?.username} started following you`
      case 'blog_published':
        return `Your blog "${notification.blog?.title}" has been published`
      default:
        return notification.message || 'You have a new notification'
    }
  }

  const getNotificationLink = (notification) => {
    if (notification.blog) {
      return `/blog/${notification.blog.slug}`
    }
    if (notification.actor) {
      return `/user/${notification.actor.username}`
    }
    return '#'
  }

  return (
    <div className={`card p-6 ${!notification.read ? 'bg-blue-50 border-blue-200' : ''}`}>
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          {getNotificationIcon(notification.type)}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-900">
                {getNotificationText(notification)}
              </p>
              
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-xs text-gray-500">
                  {format(new Date(notification.createdAt), 'MMM d, yyyy h:mm a')}
                </span>
                {!notification.read && (
                  <span className="inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-2 ml-4">
              {!notification.read && (
                <button
                  onClick={() => onMarkAsRead(notification.id)}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  title="Mark as read"
                >
                  <Check className="h-4 w-4" />
                </button>
              )}
              
              <button
                onClick={() => onDelete(notification.id)}
                className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                title="Delete notification"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          {notification.blog && (
            <div className="mt-3 p-3 bg-white rounded-lg border border-gray-200">
              <Link
                to={getNotificationLink(notification)}
                className="text-sm font-medium text-gray-900 hover:text-primary-600 transition-colors"
              >
                {notification.blog.title}
              </Link>
              {notification.blog.summary && (
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {notification.blog.summary}
                </p>
              )}
            </div>
          )}
          
          {notification.actor && (
            <div className="mt-3 flex items-center space-x-2">
              <img
                src={notification.actor.avatar || '/images/placeholder-avatar.png'}
                alt={notification.actor.username}
                className="h-6 w-6 rounded-full object-cover"
              />
              <Link
                to={getNotificationLink(notification)}
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                View Profile
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Notifications
