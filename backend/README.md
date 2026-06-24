# Complaint Resolution Bot — Backend

AI-powered complaint resolution system built for FlowZint AI Hackathon 2026.

## Tech Stack
- Node.js + Express
- Google Gemini API
- UUID for ticket management
- JSON file-based storage

## Features
- Natural Language Understanding of complaints
- Emotion Detection (angry, frustrated, neutral, calm, satisfied)
- Urgency Classification (Low, Medium, High, Critical)
- Auto Escalation to human agent with full conversation summary
- Complaint ticket storage
- Analytics dashboard data
- Customer feedback collection

## Setup Instructions

### 1. Install dependencies
```bash
npm install
```

### 2. Create .env file
Copy .env.example to .env and fill in your keys:                                                                                                                                    PORT=5000
GEMINI_API_KEY=your_key_here  ### 3. Run the server
```bash
npm run dev
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/chat | Send message, get AI response |
| GET | /api/tickets | Get all complaint tickets |
| GET | /api/tickets/:id | Get single ticket |
| POST | /api/feedback | Submit feedback |
| GET | /api/analytics | Get dashboard statistics |
| GET | /api/escalation-summary/:sessionId | Get escalation summary for agent |

## Chat Request Format
```json
POST /api/chat
{
  "message": "customer complaint here",
  "sessionId": "optional-for-continuing-conversation"
}
```

## Chat Response Format
```json
{
  "sessionId": "unique-session-id",
  "botResponse": "AI response text",
  "emotion": "angry | frustrated | neutral | calm | satisfied",
  "urgency": "Low | Medium | High | Critical",
  "category": "order | refund | payment | delivery | account | product | other",
  "escalate": true | false,
  "escalationReason": "reason or null",
  "resolved": true | false
}
```

---
*Built by Ity Shree for FlowZint AI Hackathon 2026*
