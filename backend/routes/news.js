const express = require('express');
const router = express.Router();
const db = require('../db');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const upload = multer({ storage: multer.memoryStorage() });

router.get('/', (req, res) => {
  db.query('SELECT * FROM news ORDER BY created_at DESC', (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching news' });
    res.json(results);
  });
});

router.post('/add', upload.single('image'), (req, res) => {
  const { title, description, date, venue } = req.body;

  const saveNews = (imageUrl) => {
    const sql = 'INSERT INTO news (title, description, date, venue, image) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [title, description, date, venue, imageUrl], (err, result) => {
      if (err) return res.status(500).json({ message: 'Error adding news' });
      res.json({ message: 'News added successfully!' });
    });
  };

  if (req.file) {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'mca-news' },
      (error, result) => {
        if (error) return res.status(500).json({ message: 'Error uploading image' });
        saveNews(result.secure_url);
      }
    );
    stream.end(req.file.buffer);
  } else {
    saveNews(null);
  }
});

router.delete('/delete/:id', (req, res) => {
  db.query('DELETE FROM news WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error deleting news' });
    res.json({ message: 'News deleted successfully!' });
  });
});

module.exports = router;