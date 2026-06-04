import { useState, useRef, useEffect } from 'react'
import MessageBubble from '../components/MessageBubble'
import ChatBox from '../components/ChatBox'
import EscalationAlert from '../components/EscalationAlert'

export default function ChatPage() {
  const [messages, setMessages] = useState([
  { role: 'bot', text: 'Hi! I\'m ResolvBot 👋 Please describe your issue and I\'ll help you resolve it.' },
  { role: 'user', text: 'My order has not arrived and it has been 2 weeks!' },
  { role: 'bot', text: 'I\'m really sorry to hear that! Let me look into your order right away. Can you share your order ID?', sentiment: 'Frustrated', urgency: 'High' },
  { role: 'user', text: 'This is absolutely ridiculous I want a refund NOW' },
  { role: 'bot', text: 'I completely understand your frustration. I am escalating this to our senior team immediately.', sentiment: 'Angry', urgency: 'Critical' },
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
          {loading && (
  <div className="flex justify-start">
    <div className="bg-gray-100 rounded-2xl px-4 py-3 flex items-center gap-1.5">
      <span className="w-2 h-2 bg-gray-400 rounded-full dot-1 inline-block"></span>
      <span className="w-2 h-2 bg-gray-400 rounded-full dot-2 inline-block"></span>
      <span className="w-2 h-2 bg-gray-400 rounded-full dot-3 inline-block"></span>
    </div>
  </div>
)}
          <div ref={bottomRef} />
        </div>
        <ChatBox onSend={handleSend} disabled={loading} />
      </div>
    </div>
  )
}