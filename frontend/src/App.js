import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Faculty from './pages/Faculty';
import Subjects from './pages/Subjects';
import News from './pages/News';
import Placements from './pages/Placements';
import Gallery from './pages/Gallery';
import Queries from './pages/Queries';
import Home from './public/Home';
import PublicFaculty from './public/PublicFaculty';
import PublicSubjects from './public/PublicSubjects';
import PublicNews from './public/PublicNews';
import PublicPlacements from './public/PublicPlacements';
import PublicGallery from './public/PublicGallery';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/faculty" element={<Faculty />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/news" element={<News />} />
        <Route path="/placements" element={<Placements />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/queries" element={<Queries />} />
        <Route path="/public-faculty" element={<PublicFaculty />} />
        <Route path="/public-subjects" element={<PublicSubjects />} />
        <Route path="/public-news" element={<PublicNews />} />
        <Route path="/public-placements" element={<PublicPlacements />} />
        <Route path="/public-gallery" element={<PublicGallery />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
