import { useForm } from 'react-hook-form'
import LoadingSpinner from '../common/LoadingSpinner'

function CommentForm({ onSubmit, isLoading = false, placeholder = 'Write a comment...' }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const handle = async (data) => {
    await onSubmit?.(data)
    reset({ content: '' })
  }

  return (
    <form className="space-y-3" onSubmit={handleSubmit(handle)}>
      <textarea
        {...register('content', { required: 'Comment cannot be empty' })}
        className="input min-h-[80px]"
        placeholder={placeholder}
      />
      {errors.content && <p className="error-text">{errors.content.message}</p>}

      <div className="flex justify-end">
        <button type="submit" disabled={isLoading} className="btn-primary px-4 py-2 flex items-center">
          {isLoading ? (
            <>
              <LoadingSpinner size="sm" className="mr-2" />
              Posting...
            </>
          ) : (
            'Post comment'
          )}
        </button>
      </div>
    </form>
  )
}

export default CommentForm


