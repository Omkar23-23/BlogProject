import { Link } from 'react-router-dom'

function Navigation({ links = [] }) {
  return (
    <nav className="flex items-center space-x-4">
      {links.map((l) => (
        <Link key={l.to} to={l.to} className="text-gray-700 hover:text-primary-600 transition-colors">
          {l.label}
        </Link>
      ))}
    </nav>
  )
}

export default Navigation

