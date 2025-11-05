import FollowButton from './FollowButton'

function UserProfile({ user, onToggleFollow }) {
  if (!user) return null
  return (
    <div className="card p-6">
      <div className="flex items-center space-x-4">
        <img src={user.avatar || '/images/placeholder-avatar.png'} alt={user.username} className="h-16 w-16 rounded-full object-cover" />
        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-gray-900">{user.username}</h2>
          {user.bio && <p className="text-gray-600">{user.bio}</p>}
        </div>
        <FollowButton initialFollowing={user.isFollowing} onToggle={onToggleFollow} />
      </div>
    </div>
  )
}

export default UserProfile


