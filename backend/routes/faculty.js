const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM faculty', (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching faculty' });
    res.json(results);
  });
});

router.post('/add', (req, res) => {
  const { name, designation, qualification, experience, email } = req.body;
  const sql = 'INSERT INTO faculty (name, designation, qualification, experience, email) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [name, designation, qualification, experience, email], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error adding faculty' });
    res.json({ message: 'Faculty added successfully!' });
  });
});

router.delete('/delete/:id', (req, res) => {
  db.query('DELETE FROM faculty WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error deleting faculty' });
    res.json({ message: 'Faculty deleted successfully!' });
  });
});

module.exports = router;