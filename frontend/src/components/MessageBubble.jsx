import { useState } from 'react'

export default function MessageBubble({ msg }) {
  const isBot = msg.role === 'bot'
  const [feedback, setFeedback] = useState(null)

  const sentimentColor = {
    'Angry': 'rgba(255,77,109,0.2)', 'Frustrated': 'rgba(255,160,50,0.2)',
    'Calm': 'rgba(50,200,130,0.2)', 'Neutral': 'rgba(255,255,255,0.1)',
  }
  const sentimentText = {
    'Angry': '#ff4d6d', 'Frustrated': '#ffa032',
    'Calm': '#32c882', 'Neutral': '#aaa',
  }
  const urgencyColor = {
    'Low': 'rgba(50,200,130,0.2)', 'Medium': 'rgba(255,200,50,0.2)',
    'High': 'rgba(255,130,50,0.2)', 'Critical': 'rgba(255,50,50,0.2)',
  }
  const urgencyText = {
    'Low': '#32c882', 'Medium': '#ffc832', 'High': '#ff8232', 'Critical': '#ff3232',
  }
  const sentimentEmoji = { 'Angry': '😤', 'Frustrated': '😟', 'Calm': '😊', 'Neutral': '😐' }
  const urgencyEmoji = { 'Low': '🟢', 'Medium': '🟡', 'High': '🟠', 'Critical': '🔴' }

  return (
    <div style={{ display: 'flex', justifyContent: isBot ? 'flex-start' : 'flex-end', marginBottom: '4px' }}>
      <div style={{ maxWidth: '75%', display: 'flex', flexDirection: 'column', gap: '8px' }}>

        <div className={isBot ? 'bot-bubble' : 'user-bubble'}>
          {msg.text}
        </div>

        {msg.sentiment && msg.urgency && (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', paddingLeft: '4px' }}>
            <span style={{
              background: sentimentColor[msg.sentiment] || 'rgba(255,255,255,0.1)',
              color: sentimentText[msg.sentiment] || '#aaa',
              padding: '4px 12px', borderRadius: '999px',
              fontSize: '12px', fontWeight: 600,
              border: `1px solid ${sentimentText[msg.sentiment] || '#aaa'}33`
            }}>
              {sentimentEmoji[msg.sentiment] || '😐'} {msg.sentiment}
            </span>
            <span style={{
              background: urgencyColor[msg.urgency] || 'rgba(255,255,255,0.1)',
              color: urgencyText[msg.urgency] || '#aaa',
              padding: '4px 12px', borderRadius: '999px',
              fontSize: '12px', fontWeight: 600,
              border: `1px solid ${urgencyText[msg.urgency] || '#aaa'}33`
            }}>
              {urgencyEmoji[msg.urgency] || '⚪'} {msg.urgency}
            </span>
          </div>
        )}

        {isBot && msg.sentiment && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingLeft: '4px' }}>
            {feedback === null ? (
              <>
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>Was this helpful?</span>
                <button onClick={() => setFeedback('yes')} style={{
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '999px', padding: '3px 12px', cursor: 'pointer', fontSize: '13px'
                }}>👍</button>
                <button onClick={() => setFeedback('no')} style={{
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '999px', padding: '3px 12px', cursor: 'pointer', fontSize: '13px'
                }}>👎</button>
              </>
            ) : feedback === 'yes' ? (
              <span style={{ fontSize: '12px', color: '#32c882', fontWeight: 500 }}>✅ Glad it helped!</span>
            ) : (
              <span style={{ fontSize: '12px', color: '#ff4d6d', fontWeight: 500 }}>🔁 Escalating to a human agent...</span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}