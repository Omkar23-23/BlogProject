import CommentItem from './CommentItem'

function CommentList({ comments = [], renderActions }) {
  if (!comments.length) {
    return <div className="text-sm text-gray-600">No comments yet.</div>
  }
  return (
    <div className="space-y-4">
      {comments.map((c) => (
        <CommentItem key={c.id} comment={c} actions={renderActions?.(c)} />
      ))}
    </div>
  )
}

export default CommentList


