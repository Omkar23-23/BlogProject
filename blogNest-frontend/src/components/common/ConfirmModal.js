function ConfirmModal({ isOpen, onClose, onConfirm, title = 'Confirm', message, confirmText = 'Confirm', cancelText = 'Cancel' }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="card max-w-md" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end space-x-3">
          <button type="button" onClick={onClose} className="btn-secondary">{cancelText}</button>
          <button type="button" onClick={onConfirm} className="btn-primary bg-red-600 hover:bg-red-700">{confirmText}</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal

