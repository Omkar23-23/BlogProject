import { Link } from 'react-router-dom'

function FollowList({ users = [] }) {
  if (!users.length) {
    return <div className="text-sm text-gray-600">No users to show.</div>
  }
  return (
    <ul className="space-y-3">
      {users.map((u) => (
        <li key={u.id} className="flex items-center space-x-3">
          <img src={u.avatar || '/images/placeholder-avatar.png'} alt={u.username} className="h-8 w-8 rounded-full object-cover" />
          <Link to={`/user/${u.username}`} className="font-medium text-gray-900 hover:text-primary-600">{u.username}</Link>
        </li>
      ))}
    </ul>
  )
}

export default FollowList


