import { Link } from 'react-router-dom'

function CategoryCard({ category }) {
  if (!category) return null

  return (
    <div className="card p-5 flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
        {category.description && (
          <p className="text-gray-600 mt-1 line-clamp-2">{category.description}</p>
        )}
      </div>
      <Link
        to={`/search?category=${category.id}`}
        className="text-primary-600 hover:text-primary-700 text-sm font-medium"
      >
        View posts
      </Link>
    </div>
  )
}

export default CategoryCard


