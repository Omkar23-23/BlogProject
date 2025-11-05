function UserSettings({ settings = {}, onChange }) {
  return (
    <div className="space-y-4">
    {/* Example toggles; adapt keys to your settings model */}
      <label className="flex items-center justify-between p-4 border rounded-lg">
        <span className="text-gray-800">Dark mode</span>
        <input
          type="checkbox"
          checked={!!settings.darkMode}
          onChange={(e) => onChange?.({ ...settings, darkMode: e.target.checked })}
        />
      </label>
      <label className="flex items-center justify-between p-4 border rounded-lg">
        <span className="text-gray-800">Email notifications</span>
        <input
          type="checkbox"
          checked={!!settings.emailNotifications}
          onChange={(e) => onChange?.({ ...settings, emailNotifications: e.target.checked })}
        />
      </label>
    </div>
  )
}

export default UserSettings


