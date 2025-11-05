import { Eye, Heart, MessageCircle } from 'lucide-react'

function BlogStats({ views = 0, likes = 0, comments = 0 }) {
  return (
    <div className="flex items-center space-x-6 text-sm text-gray-600">
      <div className="flex items-center space-x-2"><Eye className="h-5 w-5 text-gray-400" /><span>{views} views</span></div>
      <div className="flex items-center space-x-2"><Heart className="h-5 w-5 text-gray-400" /><span>{likes} likes</span></div>
      <div className="flex items-center space-x-2"><MessageCircle className="h-5 w-5 text-gray-400" /><span>{comments} comments</span></div>
    </div>
  )
}

export default BlogStats


