import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { BookOpen, TrendingUp } from 'lucide-react'
import api from '../config/api'
import LoadingSpinner from '../components/common/LoadingSpinner'

function Categories() {
  const { data: categoriesData, isLoading } = useQuery(
    'categories',
    () => api.get('/categories'),
    {
      staleTime: 10 * 60 * 1000,
    }
  )

  const categories = categoriesData?.data?.data || []

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Categories</h1>
        <p className="text-gray-600">Explore blogs by category</p>
      </div>

      {categories.length === 0 ? (
        <div className="card p-12 text-center">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No categories available</h3>
          <p className="text-gray-600">Categories will appear here once they're created.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      )}
    </div>
  )
}

function CategoryCard({ category }) {
  return (
    <Link
      to={`/search?category=${category.id}`}
      className="group card p-6 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary-100 rounded-lg">
            <BookOpen className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
              {category.name}
            </h3>
            {category.description && (
              <p className="text-sm text-gray-600 mt-1">{category.description}</p>
            )}
          </div>
        </div>
        <TrendingUp className="h-5 w-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span>{category.blogCount || 0} blogs</span>
          {category.followersCount && (
            <span>{category.followersCount} followers</span>
          )}
        </div>
        <span className="text-sm text-primary-600 font-medium group-hover:text-primary-700">
          Explore →
        </span>
      </div>
    </Link>
  )
}

export default Categories
