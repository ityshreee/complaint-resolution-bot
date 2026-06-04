export default function MessageBubble({ msg }) {
  const isBot = msg.role === 'bot'
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${isBot ? 'bg-gray-100 text-gray-800' : 'bg-blue-600 text-white'}`}>
        <p>{msg.text}</p>
        {msg.sentiment && (
          <div className="flex gap-2 mt-1.5 flex-wrap">
            <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">😤 {msg.sentiment}</span>
            <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">⚡ {msg.urgency}</span>
          </div>
        )}
      </div>
    </div>
  )
}