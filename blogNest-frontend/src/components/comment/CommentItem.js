import { format } from 'date-fns'

function CommentItem({ comment, actions }) {
  if (!comment) return null

  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <div className="flex items-start space-x-3">
        <img
          src={comment.author?.avatar || '/images/placeholder-avatar.png'}
          alt={comment.author?.username}
          className="h-8 w-8 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span className="font-medium text-gray-900">{comment.author?.username}</span>
            {comment.createdAt && (
              <span>· {format(new Date(comment.createdAt), 'MMM d, yyyy')}</span>
            )}
          </div>
          <p className="mt-1 text-gray-800 whitespace-pre-wrap">{comment.content}</p>
          {actions && (
            <div className="mt-2 flex items-center space-x-3 text-sm text-gray-500">
              {actions}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CommentItem


