import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useQuery } from 'react-query'
import { Save, Eye, Send } from 'lucide-react'
import api from '../config/api'
import LoadingSpinner from '../components/common/LoadingSpinner'

function CreateBlog() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  // ✅ Fetch categories
  const { data: categoriesData } = useQuery(
    'categories',
    async () => await api.get('/categories'),
    { staleTime: 10 * 60 * 1000 }
  )

  const categories = categoriesData?.data?.data || []

  // ✅ Submit handler
  const onSubmit = async (data) => {
    setIsSubmitting(true)
    setErrorMessage('')

    try {
      const formattedData = {
        ...data,
        categoryId: data.categoryId ? Number(data.categoryId) : null,
        tags: data.tags
          ? data.tags
              .split(',')
              .map((tag) => tag.trim())
              .filter((tag) => tag.length > 0)
          : [],
      }

      console.log('Submitting blog data:', formattedData)

      const response = await api.post('/blogs', formattedData)
      const blog = response.data.data

      console.log('✅ Blog created:', blog)
      navigate(`/blog/${blog.slug}`)
    } catch (error) {
      console.error('❌ Error creating blog:', error)
      setErrorMessage(
        error.data?.message ||
          'Something went wrong while publishing the blog. Check console for details.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create New Blog</h1>
        <p className="text-gray-600 mt-2">Share your thoughts with the world</p>
      </div>

      {errorMessage && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4 border border-red-300">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Information */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Basic Information
          </h2>

          <div className="space-y-6">
            <div>
              <label className="label">Title *</label>
              <input
                {...register('title', {
                  required: 'Title is required',
                  minLength: {
                    value: 10,
                    message: 'Title must be at least 10 characters',
                  },
                })}
                type="text"
                className="input"
                placeholder="Enter a compelling title for your blog"
              />
              {errors.title && (
                <p className="error-text">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label className="label">Summary *</label>
              <textarea
                {...register('summary', {
                  required: 'Summary is required',
                  minLength: {
                    value: 50,
                    message: 'Summary must be at least 50 characters',
                  },
                })}
                rows={3}
                className="textarea"
                placeholder="Write a brief summary of your blog"
              />
              {errors.summary && (
                <p className="error-text">{errors.summary.message}</p>
              )}
            </div>

            <div>
              <label className="label">Category</label>
              <select {...register('categoryId')} className="input">
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">Tags</label>
              <input
                {...register('tags')}
                type="text"
                className="input"
                placeholder="react, javascript, web-development"
              />
              <p className="text-sm text-gray-500 mt-1">
                Separate multiple tags with commas
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Content</h2>
          <textarea
            {...register('content', {
              required: 'Content is required',
              minLength: {
                value: 100,
                message: 'Content must be at least 100 characters',
              },
            })}
            rows={20}
            className="textarea"
            placeholder="Write your blog content here..."
          />
          {errors.content && (
            <p className="error-text">{errors.content.message}</p>
          )}
        </div>

        {/* SEO */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            SEO Settings
          </h2>
          <div className="space-y-6">
            <div>
              <label className="label">Meta Title</label>
              <input
                {...register('metaTitle')}
                type="text"
                className="input"
                placeholder="SEO title for search engines"
              />
            </div>

            <div>
              <label className="label">Meta Description</label>
              <textarea
                {...register('metaDescription')}
                rows={3}
                className="textarea"
                placeholder="SEO description for search engines"
              />
            </div>

            <div>
              <label className="label">Meta Keywords</label>
              <input
                {...register('metaKeywords')}
                type="text"
                className="input"
                placeholder="Keywords separated by commas"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <button type="button" className="btn-secondary flex items-center space-x-2">
            <Eye className="h-4 w-4" />
            <span>Preview</span>
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary flex items-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <LoadingSpinner size="sm" />
                <span>Publishing...</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>Publish Blog</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateBlog
