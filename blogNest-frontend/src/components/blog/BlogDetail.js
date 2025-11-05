import { Heart, MessageCircle, Share2, Bookmark, Eye } from 'lucide-react'
import { format } from 'date-fns'

function BlogDetail({ blog }) {
  if (!blog) return null

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>
        <p className="text-xl text-gray-600 mb-6">{blog.summary}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src={blog.author?.avatar || '/images/placeholder-avatar.png'} alt={blog.author?.username} className="h-12 w-12 rounded-full object-cover" />
            <div>
              <p className="font-medium text-gray-900">{blog.author?.username}</p>
              {blog.createdAt && (
                <p className="text-sm text-gray-500">{format(new Date(blog.createdAt), 'MMM d, yyyy')}</p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4 text-gray-600">
            <button className="flex items-center space-x-1 hover:text-red-600 transition-colors"><Heart className="h-5 w-5" /><span>{blog.likeCount || 0}</span></button>
            <button className="flex items-center space-x-1 hover:text-blue-600 transition-colors"><MessageCircle className="h-5 w-5" /><span>{blog.commentCount || 0}</span></button>
            <button className="hover:text-gray-900 transition-colors"><Bookmark className="h-5 w-5" /></button>
            <button className="hover:text-gray-900 transition-colors"><Share2 className="h-5 w-5" /></button>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none">
        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
      </div>

      <div className="pt-8 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-2"><Eye className="h-5 w-5 text-gray-400" /><span>{blog.viewCount || 0} views</span></div>
            <div className="flex items-center space-x-2"><Heart className="h-5 w-5 text-gray-400" /><span>{blog.likeCount || 0} likes</span></div>
            <div className="flex items-center space-x-2"><MessageCircle className="h-5 w-5 text-gray-400" /><span>{blog.commentCount || 0} comments</span></div>
          </div>
          <div className="flex items-center space-x-2">
            {blog.tags?.map(tag => (
              <span key={tag.id} className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">#{tag.name}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogDetail


