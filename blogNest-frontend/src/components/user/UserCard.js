import { Link } from 'react-router-dom'

function UserCard({ user }) {
  if (!user) return null
  return (
    <div className="card p-5 flex items-center space-x-4">
      <img src={user.avatar || '/images/placeholder-avatar.png'} alt={user.username} className="h-12 w-12 rounded-full object-cover" />
      <div className="flex-1">
        <Link to={`/user/${user.username}`} className="font-semibold text-gray-900 hover:text-primary-600">{user.username}</Link>
        {user.bio && <p className="text-sm text-gray-600">{user.bio}</p>}
      </div>
    </div>
  )
}

export default UserCard


