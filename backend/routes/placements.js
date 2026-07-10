const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all placements
router.get('/', (req, res) => {
  db.query('SELECT * FROM placements ORDER BY year DESC', (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching placements' });
    res.json(results);
  });
});

// Add new placement
router.post('/add', (req, res) => {
  const { student_name, company, package: pkg, year } = req.body;
  const sql = 'INSERT INTO placements (student_name, company, package, year) VALUES (?, ?, ?, ?)';
  db.query(sql, [student_name, company, pkg, year], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error adding placement' });
    res.json({ message: 'Placement added successfully!' });
  });
});

// Delete placement
router.delete('/delete/:id', (req, res) => {
  db.query('DELETE FROM placements WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error deleting placement' });
    res.json({ message: 'Placement deleted successfully!' });
  });
});

module.exports = router;