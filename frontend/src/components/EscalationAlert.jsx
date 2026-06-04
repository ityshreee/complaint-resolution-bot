export default function EscalationAlert({ onClose }) {
  return (
    <div className="bg-red-50 border border-red-300 rounded-xl p-4 mb-4 flex justify-between items-start">
      <div>
        <p className="text-red-700 font-medium text-sm">🚨 Escalated to Human Agent</p>
        <p className="text-red-500 text-xs mt-1">A human agent has been notified and will contact you shortly.</p>
      </div>
      <button onClick={onClose} className="text-red-400 hover:text-red-600 text-lg leading-none">✕</button>
    </div>
  )
}