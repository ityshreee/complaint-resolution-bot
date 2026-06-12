import ChatPage from './pages/ChatPage'
import DashboardPage from './pages/DashboardPage'
import { useState } from 'react'

export default function App() {
  const [page, setPage] = useState('chat')

  const navItems = [
    { id: 'chat', label: 'Chat', icon: '💬' },
    { id: 'dashboard', label: 'Analytics', icon: '📊' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#040611', position: 'relative' }}>
      <div className="background-grid" />
      <div className="orange-glow" />
      <div className="purple-glow" />

      {/* Decorative stars */}
      <div className="star" style={{ top: '15%', left: '8%', animationDelay: '0s' }}>✦</div>
      <div className="star" style={{ top: '35%', right: '6%', animationDelay: '1s' }}>✧</div>
      <div className="star" style={{ top: '65%', left: '12%', animationDelay: '2s' }}>✦</div>
      <div className="star" style={{ top: '20%', right: '15%', animationDelay: '0.5s' }}>✧</div>
      <div className="star" style={{ top: '80%', right: '20%', animationDelay: '1.5s' }}>✦</div>

      {/* Navbar */}
      <nav style={{
        height: '80px',
        background: 'rgba(10,12,24,0.65)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        backdropFilter: 'blur(20px)',
        position: 'sticky', top: 0, zIndex: 100,
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px'
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #7c5cff, #4d7cff)',
            borderRadius: '10px', width: '42px', height: '42px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '20px', boxShadow: '0 0 20px rgba(124,92,255,0.4)'
          }}>🤖</div>
          <span style={{
            fontWeight: 700, fontSize: '26px', letterSpacing: '-0.5px',
            background: 'linear-gradient(90deg, #ffffff, #ff6b3d, #7c5cff)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
          }}>ResolvBot</span>
        </div>

        {/* Nav items */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {navItems.map(item => (
            <button key={item.id} onClick={() => setPage(item.id)} style={{
              background: page === item.id ? 'linear-gradient(135deg, #7c5cff, #4d7cff)' : 'transparent',
              border: page === item.id ? 'none' : '1px solid rgba(255,255,255,0.08)',
              color: page === item.id ? 'white' : 'rgba(255,255,255,0.5)',
              borderRadius: '10px', padding: '8px 24px', fontSize: '15px',
              cursor: 'pointer', fontWeight: 500,
              boxShadow: page === item.id ? '0 0 20px rgba(124,92,255,0.3)' : 'none',
              display: 'flex', alignItems: 'center', gap: '6px',
              transition: 'all 0.2s'
            }}>
              <span>{item.icon}</span> {item.label}
            </button>
          ))}
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '42px', height: '42px', borderRadius: '10px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', fontSize: '18px', transition: 'all 0.2s'
          }}>🔔</div>
          <div style={{
            width: '42px', height: '42px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #7c5cff, #ff4d6d)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: '16px', cursor: 'pointer',
            boxShadow: '0 0 15px rgba(124,92,255,0.3)'
          }}>M</div>
        </div>
      </nav>

      <div style={{ position: 'relative', zIndex: 1 }}>
        {page === 'chat' ? <ChatPage /> : <DashboardPage />}
      </div>
    </div>
  )
}