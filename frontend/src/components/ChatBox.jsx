import { useState } from 'react'

export default function ChatBox({ onSend, disabled }) {
  const [text, setText] = useState('')

  const handleSubmit = () => {
    if (!text.trim() || disabled) return
    onSend(text)
    setText('')
  }

  return (
    <div style={{
      borderTop: '1px solid rgba(255,255,255,0.07)',
      padding: '14px 16px', display: 'flex', gap: '10px', alignItems: 'center'
    }}>
      <input
        className="input-dark"
        placeholder="Describe your issue..."
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleSubmit()}
        disabled={disabled}
      />
      <button onClick={handleSubmit} disabled={disabled} className="btn-gradient"
        style={{ padding: '10px 22px', fontSize: '14px', whiteSpace: 'nowrap', opacity: disabled ? 0.5 : 1 }}>
        Send
      </button>
    </div>
  )
}