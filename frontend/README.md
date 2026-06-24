# ResolvBot — Frontend

React-based chat interface for the AI Complaint Resolution Bot.

## Tech Stack
- React + Vite
- Tailwind CSS
- Google Gemini API (via backend)

## Features
- Real-time AI chat interface
- Sentiment & urgency badges on bot replies
- Ticket history with filter tabs (All / Pending / Escalated / Resolved)
- Persistent tickets using localStorage
- Analytics dashboard with live data
- Premium dark glassmorphism UI

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Run locally
```bash
npm run dev
```

Open **http://localhost:5173**

## Folder Structure
```
src/
├── pages/
│   ├── ChatPage.jsx       # Main chat interface
│   └── DashboardPage.jsx  # Analytics dashboard
├── components/
│   ├── MessageBubble.jsx  # Chat message component
│   ├── ChatBox.jsx        # Input bar
│   └── EscalationAlert.jsx
└── App.jsx
```

---
*Built by Mahi Ruhela for FlowZint AI Hackathon 2026*
