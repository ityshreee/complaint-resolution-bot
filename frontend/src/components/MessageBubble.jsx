import { useState } from 'react'

export default function MessageBubble({ msg }) {
  const isBot = msg.role === 'bot'
  const [feedback, setFeedback] = useState(null)

  const sentimentStyle = {
    'Angry':      'bg-red-100 text-red-700',
    'Frustrated': 'bg-orange-100 text-orange-700',
    'Calm':       'bg-green-100 text-green-700',
    'Neutral':    'bg-gray-100 text-gray-600',
  }

  const urgencyStyle = {
    'Low':      'bg-green-100 text-green-700',
    'Medium':   'bg-yellow-100 text-yellow-700',
    'High':     'bg-orange-100 text-orange-700',
    'Critical': 'bg-red-100 text-red-700',
  }

  const sentimentEmoji = {
    'Angry': '😤', 'Frustrated': '😟', 'Calm': '😊', 'Neutral': '😐',
  }

  const urgencyEmoji = {
    'Low': '🟢', 'Medium': '🟡', 'High': '🟠', 'Critical': '🔴',
  }

  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div className="max-w-[75%] flex flex-col gap-2">

        <div className={`px-4 py-2.5 rounded-2xl text-sm ${isBot ? 'bg-gray-100 text-gray-800' : 'bg-blue-600 text-white'}`}>
          {msg.text}
        </div>

        {msg.sentiment && msg.urgency && (
          <div className="flex gap-2 flex-wrap px-1">
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${sentimentStyle[msg.sentiment] || 'bg-gray-100 text-gray-600'}`}>
              {sentimentEmoji[msg.sentiment] || '😐'} {msg.sentiment}
            </span>
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${urgencyStyle[msg.urgency] || 'bg-gray-100 text-gray-600'}`}>
              {urgencyEmoji[msg.urgency] || '⚪'} {msg.urgency}
            </span>
          </div>
        )}

        {isBot && msg.sentiment && (
          <div className="flex items-center gap-2 px-1">
            {feedback === null ? (
              <>
                <span className="text-xs text-gray-400">Was this helpful?</span>
                <button
                  onClick={() => setFeedback('yes')}
                  className="text-sm px-3 py-1 rounded-full border border-gray-200 hover:bg-green-50 hover:border-green-300 transition-colors"
                >
                  👍
                </button>
                <button
                  onClick={() => setFeedback('no')}
                  className="text-sm px-3 py-1 rounded-full border border-gray-200 hover:bg-red-50 hover:border-red-300 transition-colors"
                >
                  👎
                </button>
              </>
            ) : feedback === 'yes' ? (
              <span className="text-xs text-green-600 font-medium">✅ Glad it helped!</span>
            ) : (
              <span className="text-xs text-red-500 font-medium">🔁 Escalating to a human agent...</span>
            )}
          </div>
        )}

      </div>
    </div>
  )
}