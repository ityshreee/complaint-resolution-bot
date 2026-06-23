const express = require('express');
const router = express.Router();
const statsStore = require('../services/statsStore');

router.get('/analytics', (req, res) => {
  res.json(statsStore.getAnalytics());
});

module.exports = router;