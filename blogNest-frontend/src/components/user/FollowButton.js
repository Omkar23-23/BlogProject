import { useState } from 'react'

function FollowButton({ initialFollowing = false, onToggle }) {
  const [isFollowing, setIsFollowing] = useState(initialFollowing)

  const handleClick = async () => {
    const next = !isFollowing
    setIsFollowing(next)
    await onToggle?.(next)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`px-3 py-1 rounded-md text-sm font-medium border ${
        isFollowing ? 'bg-gray-100 text-gray-800 border-gray-300' : 'bg-primary-600 text-white border-primary-600'
      }`}
    >
      {isFollowing ? 'Following' : 'Follow'}
    </button>
  )
}

export default FollowButton


