function Pagination({ currentPage = 1, totalPages = 1, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      <button disabled={currentPage === 1} onClick={() => onPageChange?.(currentPage - 1)} className="btn-secondary btn-sm">
        Prev
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange?.(p)}
          className={`btn-sm ${p === currentPage ? 'bg-primary-600 text-white' : 'btn-secondary'}`}
        >
          {p}
        </button>
      ))}
      <button disabled={currentPage === totalPages} onClick={() => onPageChange?.(currentPage + 1)} className="btn-secondary btn-sm">
        Next
      </button>
    </div>
  )
}

export default Pagination

