function CategoryFilter({ categories = [], value = '', onChange }) {
  return (
    <select
      className="input text-sm"
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
    >
      <option value="">All Categories</option>
      {categories.map((c) => (
        <option key={c.id} value={c.id}>{c.name}</option>
      ))}
    </select>
  )
}

export default CategoryFilter


