const express = require('express');
const router = express.Router();
const { analyzeComplaint } = require('../services/geminiService');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

// Path where complaint tickets will be saved
const ticketsPath = path.join(__dirname, '../data/tickets.json');

// Helper: Read tickets from file
const readTickets = () => {
  if (!fs.existsSync(ticketsPath)) return [];
  const data = fs.readFileSync(ticketsPath, 'utf-8');
  return JSON.parse(data);
};

// Helper: Save tickets to file
const saveTickets = (tickets) => {
  fs.writeFileSync(ticketsPath, JSON.stringify(tickets, null, 2));
};

// Store active conversations in memory
const conversations = {};

// ─────────────────────────────────────────
// POST /api/chat  — main chat endpoint
// ─────────────────────────────────────────
router.post('/chat', async (req, res) => {
  const { message, sessionId } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  // Create or continue a session
  const currentSessionId = sessionId || uuidv4();
  if (!conversations[currentSessionId]) {
    conversations[currentSessionId] = [];
  }

  const history = conversations[currentSessionId];

  try {
    // Send message to Gemini
    const aiResponse = await analyzeComplaint(message, history);

    // Add to conversation history
    history.push({ role: 'customer', content: message });
    history.push({ role: 'bot', content: aiResponse.botResponse });

    // Save ticket to file
    const tickets = readTickets();
    const existingTicket = tickets.find(t => t.sessionId === currentSessionId);

    if (existingTicket) {
      // Update existing ticket
      existingTicket.emotion = aiResponse.emotion;
      existingTicket.urgency = aiResponse.urgency;
      existingTicket.category = aiResponse.category;
      existingTicket.resolved = aiResponse.resolved;
      existingTicket.escalated = aiResponse.escalate;
      existingTicket.updatedAt = new Date().toISOString();
      existingTicket.messages.push(
        { role: 'customer', content: message, time: new Date().toISOString() },
        { role: 'bot', content: aiResponse.botResponse, time: new Date().toISOString() }
      );
    } else {
      // Create new ticket
      tickets.push({
        id: uuidv4(),
        sessionId: currentSessionId,
        emotion: aiResponse.emotion,
        urgency: aiResponse.urgency,
        category: aiResponse.category,
        resolved: aiResponse.resolved,
        escalated: aiResponse.escalate,
        escalationReason: aiResponse.escalationReason,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        messages: [
          { role: 'customer', content: message, time: new Date().toISOString() },
          { role: 'bot', content: aiResponse.botResponse, time: new Date().toISOString() }
        ]
      });
    }

    saveTickets(tickets);

    // Send response back to frontend
    res.json({
      sessionId: currentSessionId,
      botResponse: aiResponse.botResponse,
      emotion: aiResponse.emotion,
      urgency: aiResponse.urgency,
      category: aiResponse.category,
      escalate: aiResponse.escalate,
      escalationReason: aiResponse.escalationReason,
      resolved: aiResponse.resolved
    });

  } catch (error) {
    console.error('Chat route error:', error);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

// ─────────────────────────────────────────
// GET /api/tickets  — get all tickets (for dashboard)
// ─────────────────────────────────────────
router.get('/tickets', (req, res) => {
  const tickets = readTickets();
  res.json(tickets);
});

// ─────────────────────────────────────────
// GET /api/tickets/:id  — get one ticket
// ─────────────────────────────────────────
router.get('/tickets/:id', (req, res) => {
  const tickets = readTickets();
  const ticket = tickets.find(t => t.id === req.params.id);
  if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
  res.json(ticket);
});

// ─────────────────────────────────────────
// POST /api/feedback  — save customer feedback
// ─────────────────────────────────────────
router.post('/feedback', (req, res) => {
  const { sessionId, rating, comment } = req.body;
  const tickets = readTickets();
  const ticket = tickets.find(t => t.sessionId === sessionId);
  if (ticket) {
    ticket.feedback = { rating, comment, givenAt: new Date().toISOString() };
    saveTickets(tickets);
  }
  res.json({ message: 'Feedback saved successfully!' });
});
// ─────────────────────────────────────────
// GET /api/analytics  — dashboard stats
// ─────────────────────────────────────────
router.get('/analytics', (req, res) => {
  const tickets = readTickets();

  const total = tickets.length;
  const resolved = tickets.filter(t => t.resolved).length;
  const escalated = tickets.filter(t => t.escalated).length;
  const unresolved = total - resolved;

  // Count by emotion
  const emotionCounts = { angry: 0, frustrated: 0, neutral: 0, calm: 0, satisfied: 0 };
  tickets.forEach(t => {
    if (emotionCounts[t.emotion] !== undefined) emotionCounts[t.emotion]++;
  });

  // Count by urgency
  const urgencyCounts = { Low: 0, Medium: 0, High: 0, Critical: 0 };
  tickets.forEach(t => {
    if (urgencyCounts[t.urgency] !== undefined) urgencyCounts[t.urgency]++;
  });

  // Count by category
  const categoryCounts = {};
  tickets.forEach(t => {
    categoryCounts[t.category] = (categoryCounts[t.category] || 0) + 1;
  });

  // Recent 5 tickets
  const recentTickets = tickets.slice(-5).reverse();

  res.json({
    total,
    resolved,
    unresolved,
    escalated,
    resolutionRate: total > 0 ? ((resolved / total) * 100).toFixed(1) : 0,
    emotionCounts,
    urgencyCounts,
    categoryCounts,
    recentTickets
  });
});
// ─────────────────────────────────────────
// GET /api/escalation-summary/:sessionId
// ─────────────────────────────────────────
router.get('/escalation-summary/:sessionId', (req, res) => {
  const tickets = readTickets();
  const ticket = tickets.find(t => t.sessionId === req.params.sessionId);

  if (!ticket) return res.status(404).json({ error: 'Ticket not found' });

  const summary = {
    ticketId: ticket.id,
    sessionId: ticket.sessionId,
    createdAt: ticket.createdAt,
    emotion: ticket.emotion,
    urgency: ticket.urgency,
    category: ticket.category,
    escalationReason: ticket.escalationReason,
    conversationSummary: ticket.messages.map(m =>
      `[${m.role.toUpperCase()}]: ${m.content}`
    ).join('\n'),
    totalMessages: ticket.messages.length
  };

  res.json(summary);
});
module.exports = router;