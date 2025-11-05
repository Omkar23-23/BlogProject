import BlogCard from './BlogCard'

function BlogList({ blogs = [] }) {
  if (!blogs.length) {
    return <div className="card p-8 text-center text-gray-600">No blogs found.</div>
  }
  return (
    <div className="space-y-6">
      {blogs.map((b) => (
        <BlogCard key={b.id || b.slug} blog={b} />
      ))}
    </div>
  )
}

export default BlogList


