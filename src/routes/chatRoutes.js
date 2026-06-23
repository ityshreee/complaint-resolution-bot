const express = require('express');
const router = express.Router();
const { analyzeComplaint } = require('../services/geminiService');
const statsStore = require('../services/statsStore');   // ← added

router.post('/chat', async (req, res) => {
  const { message, history } = req.body;   // unchanged — no ticketId

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const aiResponse = await analyzeComplaint(message, history);
    const sentiment = aiResponse.emotion || aiResponse.sentiment;

    statsStore.recordInteraction({ sentiment, urgency: aiResponse.urgency, escalate: aiResponse.escalate });   // ← added

    res.json({
      botResponse: aiResponse.botResponse,
      sentiment,
      urgency: aiResponse.urgency,
      escalate: aiResponse.escalate
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Failed to process message' });
  }
});

module.exports = router;