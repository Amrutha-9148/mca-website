const express = require('express');
const router = express.Router();
const db = require('../db');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.get('/', (req, res) => {
  db.query('SELECT * FROM gallery ORDER BY created_at DESC', (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching gallery' });
    res.json(results);
  });
});

router.post('/add', upload.single('image'), (req, res) => {
  const { title } = req.body;
  const image_name = req.file.filename;
  const sql = 'INSERT INTO gallery (title, image_name) VALUES (?, ?)';
  db.query(sql, [title, image_name], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error adding image' });
    res.json({ message: 'Image uploaded successfully!' });
  });
});

router.delete('/delete/:id', (req, res) => {
  db.query('DELETE FROM gallery WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error deleting image' });
    res.json({ message: 'Image deleted successfully!' });
  });
});

module.exports = router;