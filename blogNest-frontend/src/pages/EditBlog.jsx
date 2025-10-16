import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useQuery } from 'react-query'
import { Save, Eye, Send } from 'lucide-react'
import api from '../config/api'
import LoadingSpinner from '../components/common/LoadingSpinner'

function EditBlog() {
  const { id } = useParams()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  // Fetch blog data
  const { data: blogData, isLoading } = useQuery(
    ['blog-edit', id],
    () => api.get(`/blogs/${id}`),
    {
      enabled: !!id,
    }
  )

  // Fetch categories
  const { data: categoriesData } = useQuery(
    'categories',
    () => api.get('/categories'),
    {
      staleTime: 10 * 60 * 1000,
    }
  )

  useEffect(() => {
    if (blogData?.data?.data) {
      const blog = blogData.data.data
      reset({
        title: blog.title,
        summary: blog.summary,
        content: blog.content,
        categoryId: blog.category?.id,
        tags: blog.tags?.map(tag => tag.name).join(', '),
        metaTitle: blog.metaTitle,
        metaDescription: blog.metaDescription,
        metaKeywords: blog.metaKeywords,
      })
    }
  }, [blogData, reset])

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      await api.put(`/blogs/${id}`, data)
      // Navigate to blog detail or dashboard
    } catch (error) {
      console.error('Error updating blog:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  const categories = categoriesData?.data?.data || []

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Edit Blog</h1>
        <p className="text-gray-600 mt-2">Update your blog content</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Information */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="label">
                Title *
              </label>
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
              <label htmlFor="summary" className="label">
                Summary *
              </label>
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
              <label htmlFor="categoryId" className="label">
                Category
              </label>
              <select
                {...register('categoryId')}
                className="input"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="tags" className="label">
                Tags
              </label>
              <input
                {...register('tags')}
                type="text"
                className="input"
                placeholder="Enter tags separated by commas"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Content</h2>
          
          <div>
            <label htmlFor="content" className="label">
              Blog Content *
            </label>
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
              placeholder="Write your blog content here"
            />
            {errors.content && (
              <p className="error-text">{errors.content.message}</p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              type="button"
              className="btn-secondary flex items-center space-x-2"
            >
              <Eye className="h-4 w-4" />
              <span>Preview</span>
            </button>
            
            <button
              type="button"
              className="btn-secondary flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>Save Draft</span>
            </button>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary flex items-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <LoadingSpinner size="sm" />
                <span>Updating...</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>Update Blog</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditBlog
