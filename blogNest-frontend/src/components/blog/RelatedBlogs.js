import { Link } from 'react-router-dom'

function RelatedBlogs({ blogs = [] }) {
  if (!blogs.length) return null
  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Related</h3>
      <ul className="space-y-3">
        {blogs.map((b) => (
          <li key={b.id || b.slug}>
            <Link to={`/blog/${b.slug}`} className="text-primary-600 hover:text-primary-700">
              {b.title}
            </Link>
            {b.author?.username && (
              <span className="text-sm text-gray-500 ml-2">by {b.author.username}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RelatedBlogs


