import CategoryCard from './CategoryCard'

function CategoryList({ categories = [] }) {
  if (!categories.length) {
    return <div className="card p-8 text-center text-gray-600">No categories found.</div>
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((c) => (
        <CategoryCard key={c.id} category={c} />
      ))}
    </div>
  )
}

export default CategoryList


