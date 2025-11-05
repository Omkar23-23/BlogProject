import { useForm } from 'react-hook-form'
import LoadingSpinner from '../common/LoadingSpinner'

function BlogForm({ onSubmit, defaultValues = {}, isLoading = false }) {
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues })

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="label">Title</label>
        <input
          {...register('title', { required: 'Title is required' })}
          type="text"
          className="input"
          placeholder="Enter blog title"
        />
        {errors.title && <p className="error-text">{errors.title.message}</p>}
      </div>

      <div>
        <label className="label">Summary</label>
        <textarea
          {...register('summary', { required: 'Summary is required' })}
          className="input min-h-[80px]"
          placeholder="Brief summary of your blog"
        />
        {errors.summary && <p className="error-text">{errors.summary.message}</p>}
      </div>

      <div>
        <label className="label">Content (HTML)</label>
        <textarea
          {...register('content', { required: 'Content is required' })}
          className="input min-h-[220px]"
          placeholder="Write your blog content..."
        />
        {errors.content && <p className="error-text">{errors.content.message}</p>}
      </div>

      <button type="submit" disabled={isLoading} className="btn-primary w-full flex justify-center items-center">
        {isLoading ? (
          <>
            <LoadingSpinner size="sm" className="mr-2" />
            Saving...
          </>
        ) : (
          'Save blog'
        )}
      </button>
    </form>
  )
}

export default BlogForm


