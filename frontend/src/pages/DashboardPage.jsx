export default function DashboardPage() {
  const stats = [
    { label: 'Total Complaints', value: '128', color: 'bg-blue-50 text-blue-700' },
    { label: 'Auto Resolved', value: '94', color: 'bg-green-50 text-green-700' },
    { label: 'Escalated', value: '18', color: 'bg-red-50 text-red-700' },
    { label: 'Pending', value: '16', color: 'bg-yellow-50 text-yellow-700' },
  ]
  return (
    <div className="max-w-3xl mx-auto mt-8 px-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Analytics Dashboard</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map(s => (
          <div key={s.label} className={`rounded-xl p-4 ${s.color}`}>
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-xs mt-1">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <p className="text-sm text-gray-500">Live stats will appear here once the backend is connected.</p>
      </div>
    </div>
  )
}