import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import { Calendar, User, Eye, Heart, MessageCircle } from 'lucide-react'
import { format } from 'date-fns'
import api from '../config/api'
import LoadingSpinner from '../components/common/LoadingSpinner'

function Home() {
  const [featuredBlogs, setFeaturedBlogs] = useState([])
  const [recentBlogs, setRecentBlogs] = useState([])
  const [categories, setCategories] = useState([])

  // Fetch blogs
  const { data: blogsData, isLoading: blogsLoading } = useQuery(
    'blogs',
    () => api.get('/blogs?page=0&size=10&sortBy=createdAt&sortDirection=desc'),
    {
      staleTime: 5 * 60 * 1000,
    }
  )

  // Fetch categories
  const { data: categoriesData, isLoading: categoriesLoading } = useQuery(
    'categories',
    () => api.get('/categories'),
    {
      staleTime: 10 * 60 * 1000,
    }
  )

  useEffect(() => {
    if (blogsData?.data?.data) {
      const blogs = blogsData.data.data.content
      setFeaturedBlogs(blogs.slice(0, 3))
      setRecentBlogs(blogs.slice(3, 9))
    }
  }, [blogsData])

  useEffect(() => {
    if (categoriesData?.data?.data) {
      setCategories(categoriesData.data.data.slice(0, 6))
    }
  }, [categoriesData])

  if (blogsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Welcome to <span className="text-primary-600">BlogNest</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Discover amazing stories, share your thoughts, and connect with a community of writers and readers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/search" className="btn-primary btn-lg">
            Explore Blogs
          </Link>
          <Link to="/create" className="btn-secondary btn-lg">
            Start Writing
          </Link>
        </div>
      </div>

      {/* Featured Blogs */}
      {featuredBlogs.length > 0 && (
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBlogs.map((blog) => (
              <FeaturedBlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Blogs */}
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Stories</h2>
          <div className="space-y-6">
            {recentBlogs.map((blog) => (
              <RecentBlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Categories */}
          {categories.length > 0 && (
            <div className="card p-6 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/search?category=${category.id}`}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-gray-700">{category.name}</span>
                    <span className="text-sm text-gray-500">{category.blogCount || 0}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Quick Stats */}
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Platform Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Blogs</span>
                <span className="font-semibold">{blogsData?.data?.data?.totalElements || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Active Writers</span>
                <span className="font-semibold">1,234</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Categories</span>
                <span className="font-semibold">{categories.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FeaturedBlogCard({ blog }) {
  return (
    <Link to={`/blog/${blog.slug}`} className="group">
      <div className="card overflow-hidden hover:shadow-lg transition-shadow">
        {blog.coverImage && (
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-48 object-cover"
          />
        )}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
            {blog.title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-3">{blog.summary}</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>{blog.author?.username}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{format(new Date(blog.createdAt), 'MMM d, yyyy')}</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Eye className="h-4 w-4" />
                <span>{blog.viewCount || 0}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Heart className="h-4 w-4" />
                <span>{blog.likeCount || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

function RecentBlogCard({ blog }) {
  return (
    <Link to={`/blog/${blog.slug}`} className="group">
      <div className="card p-6 hover:shadow-md transition-shadow">
        <div className="flex items-start space-x-4">
          {blog.coverImage && (
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
            />
          )}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
              {blog.title}
            </h3>
            <p className="text-gray-600 mb-3 line-clamp-2">{blog.summary}</p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>{blog.author?.username}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{format(new Date(blog.createdAt), 'MMM d')}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
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
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Home
