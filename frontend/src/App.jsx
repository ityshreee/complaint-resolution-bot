import ChatPage from './pages/ChatPage'
import DashboardPage from './pages/DashboardPage'
import { useState } from 'react'

export default function App() {
  const [page, setPage] = useState('chat')

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-6">
        <span className="font-semibold text-gray-800 text-lg">🤖 ResolvBot</span>
        <button
          onClick={() => setPage('chat')}
          className={`text-sm px-4 py-1.5 rounded-full ${page === 'chat' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-gray-800'}`}
        >
          Chat
        </button>
        <button
          onClick={() => setPage('dashboard')}
          className={`text-sm px-4 py-1.5 rounded-full ${page === 'dashboard' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-gray-800'}`}
        >
          Dashboard
        </button>
      </nav>
      {page === 'chat' ? <ChatPage /> : <DashboardPage />}
    </div>
  )
}