import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { Heart, MessageCircle, Share2, Bookmark, Eye } from 'lucide-react'
import { format } from 'date-fns'
import api from '../config/api'
import LoadingSpinner from '../components/common/LoadingSpinner'

function BlogDetail() {
  const { slug } = useParams()

  const { data: blogData, isLoading } = useQuery(
    ['blog', slug],
    () => api.get(`/blogs/${slug}`),
    {
      enabled: !!slug,
    }
  )

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  const blog = blogData?.data?.data

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Not Found</h1>
          <p className="text-gray-600">The blog you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Blog Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>
        <p className="text-xl text-gray-600 mb-6">{blog.summary}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={blog.author?.avatar || '/images/placeholder-avatar.png'}
              alt={blog.author?.username}
              className="h-12 w-12 rounded-full object-cover"
            />
            <div>
              <p className="font-medium text-gray-900">{blog.author?.username}</p>
              <p className="text-sm text-gray-500">
                {format(new Date(blog.createdAt), 'MMM d, yyyy')}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors">
              <Heart className="h-5 w-5" />
              <span>{blog.likeCount || 0}</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors">
              <MessageCircle className="h-5 w-5" />
              <span>{blog.commentCount || 0}</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors">
              <Bookmark className="h-5 w-5" />
            </button>
            <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors">
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="prose prose-lg max-w-none">
        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
      </div>

      {/* Blog Footer */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Eye className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-600">{blog.viewCount || 0} views</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-600">{blog.likeCount || 0} likes</span>
            </div>
            <div className="flex items-center space-x-2">
              <MessageCircle className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-600">{blog.commentCount || 0} comments</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {blog.tags?.map((tag) => (
              <span
                key={tag.id}
                className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogDetail
