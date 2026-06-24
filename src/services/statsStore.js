const fs = require('fs');
const path = require('path');

const STATS_FILE = path.join(__dirname, '..', 'data', 'stats.json');

function ensureFile() {
  const dir = path.dirname(STATS_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(STATS_FILE)) {
    fs.writeFileSync(STATS_FILE, JSON.stringify({
      total: 0, resolved: 0, escalated: 0,
      urgencyCounts: { Low: 0, Medium: 0, High: 0, Critical: 0 },
      sentimentCounts: {}
    }, null, 2));
  }
}

function readStats() {
  ensureFile();
  return JSON.parse(fs.readFileSync(STATS_FILE, 'utf-8'));
}

function writeStats(stats) {
  fs.writeFileSync(STATS_FILE, JSON.stringify(stats, null, 2));
}

function recordInteraction({ sentiment, urgency, escalate }) {
  const stats = readStats();
  stats.total += 1;
  escalate ? stats.escalated++ : stats.resolved++;
  if (stats.urgencyCounts[urgency] !== undefined) stats.urgencyCounts[urgency]++;
  if (sentiment) stats.sentimentCounts[sentiment] = (stats.sentimentCounts[sentiment] || 0) + 1;
  writeStats(stats);
}

function getAnalytics() {
  const stats = readStats();
  return {
    total: stats.total,
    resolved: stats.resolved,
    escalated: stats.escalated,
    pending: 0,
    resolutionRate: stats.total ? Math.round((stats.resolved / stats.total) * 100) : 0,
    urgencyCounts: stats.urgencyCounts,
    sentimentCounts: stats.sentimentCounts
  };
}

module.exports = { recordInteraction, getAnalytics };