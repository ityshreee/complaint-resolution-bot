import { useState, useRef, useEffect } from 'react'
import MessageBubble from '../components/MessageBubble'
import ChatBox from '../components/ChatBox'
import EscalationAlert from '../components/EscalationAlert'

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hi! I\'m ResolvBot 👋 Please describe your issue and I\'ll help you resolve it.' }
  ])
  const [escalated, setEscalated] = useState(false)
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async (text) => {
    if (!text.trim()) return
    const updated = [...messages, { role: 'user', text }]
    setMessages(updated)
    setLoading(true)

    try {
      const res = await fetch('http://localhost:4000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: updated })
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'bot', text: data.reply, sentiment: data.sentiment, urgency: data.urgency }])
      if (data.escalate) setEscalated(true)
    } catch {
      setMessages(prev => [...prev, { role: 'bot', text: '⚠️ Could not connect to server. Make sure the backend is running.' }])
    }
    setLoading(false)
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 px-4">
      {escalated && <EscalationAlert onClose={() => setEscalated(false)} />}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 flex flex-col h-[70vh]">
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          {messages.map((msg, i) => <MessageBubble key={i} msg={msg} />)}
          {loading && <div className="text-sm text-gray-400 ml-2">ResolvBot is typing...</div>}
          <div ref={bottomRef} />
        </div>
        <ChatBox onSend={handleSend} disabled={loading} />
      </div>
    </div>
  )
}