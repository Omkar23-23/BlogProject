import { useState } from 'react'

function BlogEditor({ initialValue = '', onChange }) {
  const [value, setValue] = useState(initialValue)

  const handleChange = (e) => {
    const next = e.target.value
    setValue(next)
    onChange && onChange(next)
  }

  return (
    <textarea
      className="input w-full min-h-[200px]"
      placeholder="Write your blog content here..."
      value={value}
      onChange={handleChange}
    />
  )
}

export default BlogEditor


