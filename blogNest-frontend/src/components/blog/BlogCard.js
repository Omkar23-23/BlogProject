import { Link } from 'react-router-dom'
import { Calendar, User, Eye, Heart, MessageCircle } from 'lucide-react'
import { format } from 'date-fns'

function BlogCard({ blog }) {
  if (!blog) return null

  return (
    <div className="card p-6">
      <div className="flex items-start space-x-4">
        {blog.coverImage && (
          <img src={blog.coverImage} alt={blog.title} className="w-24 h-24 object-cover rounded-lg flex-shrink-0" />
        )}
        <div className="flex-1 min-w-0">
          <Link to={`/blog/${blog.slug}`} className="text-xl font-semibold text-gray-900 hover:text-primary-600 transition-colors">
            {blog.title}
          </Link>
          <p className="text-gray-600 mt-1 line-clamp-2">{blog.summary}</p>
          <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <User className="h-4 w-4" />
              <span>{blog.author?.username}</span>
            </div>
            {blog.createdAt && (
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{format(new Date(blog.createdAt), 'MMM d, yyyy')}</span>
              </div>
            )}
            <div className="flex items-center space-x-1"><Eye className="h-4 w-4" /><span>{blog.viewCount || 0}</span></div>
            <div className="flex items-center space-x-1"><Heart className="h-4 w-4" /><span>{blog.likeCount || 0}</span></div>
            <div className="flex items-center space-x-1"><MessageCircle className="h-4 w-4" /><span>{blog.commentCount || 0}</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogCard


