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
  db.query('SELECT * FROM gallery ORDER BY created_at DESC', (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching gallery' });
    res.json(results);
  });
});

router.post('/add', upload.single('image'), (req, res) => {
  const { title } = req.body;
  
  const stream = cloudinary.uploader.upload_stream(
    { folder: 'mca-gallery' },
    (error, result) => {
      if (error) return res.status(500).json({ message: 'Error uploading to Cloudinary' });
      
      const image_url = result.secure_url;
      const sql = 'INSERT INTO gallery (title, image_name) VALUES (?, ?)';
      db.query(sql, [title, image_url], (err, dbResult) => {
        if (err) return res.status(500).json({ message: 'Error saving to database' });
        res.json({ message: 'Image uploaded successfully!' });
      });
    }
  );
  
  stream.end(req.file.buffer);
});

router.delete('/delete/:id', (req, res) => {
  db.query('DELETE FROM gallery WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error deleting image' });
    res.json({ message: 'Image deleted successfully!' });
  });
});

module.exports = router;