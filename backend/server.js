const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const db = require('./db');
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students');
const subjectRoutes = require('./routes/subjects');
const facultyRoutes = require('./routes/faculty');
const newsRoutes = require('./routes/news');
const placementRoutes = require('./routes/placements');
const galleryRoutes = require('./routes/gallery');
const queryRoutes = require('./routes/queries');

const app = express();
app.use(cors());
app.use(express.json());

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.send('MCA Backend is running!');
});

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/placements', placementRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/queries', queryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});