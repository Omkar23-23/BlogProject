import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'

function SearchBar({ placeholder = 'Search blogs, authors...', className = '' }) {
  const navigate = useNavigate()

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      navigate(`/search?q=${e.target.value}`)
    }
  }

  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      <input
        type="text"
        placeholder={placeholder}
        onKeyPress={handleSearch}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
      />
    </div>
  )
}

export default SearchBar

