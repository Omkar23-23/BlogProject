function BlogPreview({ title, summary, content }) {
  return (
    <div className="card p-6">
      <h2 className="text-2xl font-semibold text-gray-900">{title || 'Untitled'}</h2>
      {summary && <p className="text-gray-600 mt-2">{summary}</p>}
      <div className="prose max-w-none mt-4">
        <div dangerouslySetInnerHTML={{ __html: content || '' }} />
      </div>
    </div>
  )
}

export default BlogPreview


