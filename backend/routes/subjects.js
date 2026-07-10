const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM subjects ORDER BY semester, course_code', (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching subjects' });
    res.json(results);
  });
});

router.post('/add', (req, res) => {
  const { course_code, course_title, semester, credits } = req.body;
  const sql = 'INSERT INTO subjects (course_code, course_title, semester, credits) VALUES (?, ?, ?, ?)';
  db.query(sql, [course_code, course_title, semester, credits], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error adding subject' });
    res.json({ message: 'Subject added successfully!' });
  });
});

router.delete('/delete/:id', (req, res) => {
  db.query('DELETE FROM subjects WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error deleting subject' });
    res.json({ message: 'Subject deleted successfully!' });
  });
});

module.exports = router;