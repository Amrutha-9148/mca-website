const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all queries
router.get('/', (req, res) => {
  db.query('SELECT * FROM queries ORDER BY created_at DESC', (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching queries' });
    res.json(results);
  });
});

// Add new query
router.post('/add', (req, res) => {
  const { name, email, subject, query } = req.body;
  const sql = 'INSERT INTO queries (name, email, subject, query) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, email, subject, query], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error sending query' });
    res.json({ message: 'Query sent successfully! We will get back to you soon.' });
  });
});

// Mark as read
router.put('/read/:id', (req, res) => {
  db.query('UPDATE queries SET is_read = TRUE WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error updating query' });
    res.json({ message: 'Marked as read' });
  });
});

// Delete query
router.delete('/delete/:id', (req, res) => {
  db.query('DELETE FROM queries WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error deleting query' });
    res.json({ message: 'Query deleted successfully!' });
  });
});

module.exports = router;