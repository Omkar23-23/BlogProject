import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { Search, Filter, Calendar, User, Eye, Heart, MessageCircle } from 'lucide-react'
import { format } from 'date-fns'
import api from '../config/api'
import LoadingSpinner from '../components/common/LoadingSpinner'

function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    sortBy: searchParams.get('sortBy') || 'createdAt',
    sortDirection: searchParams.get('sortDirection') || 'desc',
  })

  // Fetch search results
  const { data: searchData, isLoading } = useQuery(
    ['search', query, filters],
    () => {
      const params = new URLSearchParams({
        q: query,
        page: '0',
        size: '20',
        sortBy: filters.sortBy,
        sortDirection: filters.sortDirection,
        ...(filters.category && { category: filters.category }),
      })
      return api.get(`/search/blogs?${params}`)
    },
    {
      enabled: !!query,
    }
  )

  // Fetch categories for filter
  const { data: categoriesData } = useQuery(
    'categories',
    () => api.get('/categories'),
    {
      staleTime: 10 * 60 * 1000,
    }
  )

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      setSearchParams({ q: query.trim() })
    }
  }

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    setSearchParams({
      q: query,
      ...newFilters,
    })
  }

  const results = searchData?.data?.data || []
  const categories = categoriesData?.data?.data || []

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Search</h1>
        
        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search blogs, authors, topics..."
              className="input pl-10 pr-4 w-full"
            />
          </div>
        </form>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>
          
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="input text-sm"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className="input text-sm"
          >
            <option value="createdAt">Date</option>
            <option value="viewCount">Views</option>
            <option value="likeCount">Likes</option>
            <option value="title">Title</option>
          </select>

          <select
            value={filters.sortDirection}
            onChange={(e) => handleFilterChange('sortDirection', e.target.value)}
            className="input text-sm"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>

      {/* Search Results */}
      {query ? (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {isLoading ? 'Searching...' : `${results.length} results for "${query}"`}
            </h2>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : results.length === 0 ? (
            <div className="card p-12 text-center">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600">Try adjusting your search terms or filters.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {results.map((blog) => (
                <div key={blog.id} className="card p-6">
                  <div className="flex items-start space-x-4">
                    {blog.coverImage && (
                      <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/blog/${blog.slug}`}
                        className="text-xl font-semibold text-gray-900 hover:text-primary-600 transition-colors"
                      >
                        {blog.title}
                      </Link>
                      <p className="text-gray-600 mt-1 line-clamp-2">{blog.summary}</p>
                      
                      <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{blog.author?.username}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{format(new Date(blog.createdAt), 'MMM d, yyyy')}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{blog.viewCount || 0}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="h-4 w-4" />
                          <span>{blog.likeCount || 0}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="h-4 w-4" />
                          <span>{blog.commentCount || 0}</span>
                        </div>
                      </div>

                      {blog.tags && blog.tags.length > 0 && (
                        <div className="flex items-center space-x-2 mt-3">
                          {blog.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag.id}
                              className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full"
                            >
                              #{tag.name}
                            </span>
                          ))}
                          {blog.tags.length > 3 && (
                            <span className="text-xs text-gray-500">
                              +{blog.tags.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="card p-12 text-center">
          <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Start your search</h3>
          <p className="text-gray-600">Enter a search term to find blogs, authors, and topics.</p>
        </div>
      )}
    </div>
  )
}

export default Search
