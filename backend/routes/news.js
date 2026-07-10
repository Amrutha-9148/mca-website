const express = require('express');
const router = express.Router();
const db = require('../db');
const multer = require('multer');
const path = require('path');

// Multer setup for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Get all news
router.get('/', (req, res) => {
  db.query('SELECT * FROM news ORDER BY date DESC', (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching news' });
    res.json(results);
  });
});

// Add news with photo and venue
router.post('/add', upload.single('image'), (req, res) => {
  const { title, description, date, venue } = req.body;
  const image = req.file ? req.file.filename : null;
  const sql = 'INSERT INTO news (title, description, date, venue, image) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [title, description, date, venue, image], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error adding news' });
    res.json({ message: 'News added successfully!' });
  });
});

// Delete news
router.delete('/delete/:id', (req, res) => {
  db.query('DELETE FROM news WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error deleting news' });
    res.json({ message: 'News deleted successfully!' });
  });
});

module.exports = router;