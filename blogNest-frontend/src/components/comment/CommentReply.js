import CommentForm from './CommentForm'

function CommentReply({ onSubmit, isLoading }) {
  return (
    <div className="ml-10">
      <CommentForm onSubmit={onSubmit} isLoading={isLoading} placeholder="Write a reply..." />
    </div>
  )
}

export default CommentReply


