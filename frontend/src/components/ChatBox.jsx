import { useState } from 'react'

export default function ChatBox({ onSend, disabled }) {
  const [text, setText] = useState('')

  const handleSubmit = () => {
    onSend(text)
    setText('')
  }

  return (
    <div className="border-t border-gray-200 p-3 flex gap-2">
      <input
        className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm outline-none focus:border-blue-400"
        placeholder="Describe your issue..."
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && !disabled && handleSubmit()}
        disabled={disabled}
      />
      <button
        onClick={handleSubmit}
        disabled={disabled}
        className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-700 disabled:opacity-50"
      >
        Send
      </button>
    </div>
  )
}