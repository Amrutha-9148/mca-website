const express = require('express');
const router = express.Router();
const db = require('../db');
const multer = require('multer');
const xlsx = require('xlsx');
const path = require('path');

// Multer setup for Excel upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Get all students
router.get('/', (req, res) => {
  db.query('SELECT * FROM students', (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching students' });
    res.json(results);
  });
});

// Add single student
router.post('/add', (req, res) => {
  const { usn, student_name, father_name, mother_name, batch } = req.body;
  const sql = 'INSERT INTO students (usn, student_name, father_name, mother_name, batch) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [usn, student_name, father_name, mother_name, batch], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error adding student' });
    res.json({ message: 'Student added successfully!' });
  });
});

// Upload Excel file and add all students
router.post('/upload-excel', upload.single('file'), (req, res) => {
  try {
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    let successCount = 0;
    let errors = 0;

    data.forEach((row) => {
      const usn = row['USN'] || row['usn'] || '';
      const student_name = row['Student Name'] || row['student_name'] || '';
      const father_name = row['Father Name'] || row['father_name'] || '';
      const mother_name = row['Mother Name'] || row['mother_name'] || '';
      const batch = row['Batch'] || row['batch'] || '';

      if (usn && student_name) {
        const sql = 'INSERT INTO students (usn, student_name, father_name, mother_name, batch) VALUES (?, ?, ?, ?, ?)';
        db.query(sql, [usn, student_name, father_name, mother_name, batch], (err) => {
          if (err) errors++;
        });
        successCount++;
      }
    });

    setTimeout(() => {
      res.json({ message: `✅ ${successCount} students added successfully!` });
    }, 1000);

  } catch (error) {
    res.status(500).json({ message: 'Error reading Excel file!' });
  }
});

// Delete student
router.delete('/delete/:id', (req, res) => {
  db.query('DELETE FROM students WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error deleting student' });
    res.json({ message: 'Student deleted successfully!' });
  });
});

module.exports = router;