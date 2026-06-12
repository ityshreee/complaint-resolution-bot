export default function EscalationAlert({ onClose }) {
  return (
    <div style={{
      background: 'rgba(255,50,50,0.1)',
      border: '1px solid rgba(255,50,50,0.3)',
      borderRadius: '16px', padding: '14px 18px',
      marginBottom: '16px', display: 'flex',
      justifyContent: 'space-between', alignItems: 'flex-start',
      boxShadow: '0 0 20px rgba(255,50,50,0.15)'
    }}>
      <div>
        <p style={{ color: '#ff4d6d', fontWeight: 600, fontSize: '14px' }}>🚨 Escalated to Human Agent</p>
        <p style={{ color: 'rgba(255,100,100,0.7)', fontSize: '12px', marginTop: '4px' }}>
          A human agent has been notified and will contact you shortly.
        </p>
      </div>
      <button onClick={onClose} style={{
        background: 'none', border: 'none', color: 'rgba(255,100,100,0.6)',
        cursor: 'pointer', fontSize: '18px', lineHeight: 1
      }}>✕</button>
    </div>
  )
}