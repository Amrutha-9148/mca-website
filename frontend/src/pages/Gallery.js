import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

function Gallery() {
  const [gallery, setGallery] = useState([]);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const fetchGallery = async () => {
    try {
      const response = await fetch('https://mca-backendd.onrender.com/api/gallery');
      const data = await response.json();
      setGallery(Array.isArray(data) ? data : []);
    } catch (error) {
      setGallery([]);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);

    const response = await fetch('https://mca-backendd.onrender.com/api/gallery/add', {
      method: 'POST',
      body: formData
    });
    const data = await response.json();
    setMessage(data.message);
    setTitle('');
    setImage(null);
    fetchGallery();
  };

  const handleDelete = async (id) => {
    await fetch(`https://mca-backendd.onrender.com/api/gallery/delete/${id}`, { method: 'DELETE' });
    fetchGallery();
  };

  return (
    <div style={{ display: 'flex' }}>
      <Navbar />
      <div style={{ marginLeft: '220px', padding: '30px', width: '100%' }}>
        <h2 style={{ color: '#8B0000' }}>Gallery</h2>

        {/* Upload Form */}
        <form onSubmit={handleAdd} style={{ marginBottom: '30px', backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
          <h3>Upload Photo</h3>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
            <input placeholder="Photo Title" value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ padding: '8px', width: '200px' }} required />
            <input type="file" accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              style={{ padding: '8px' }} required />
            <button type="submit" style={{ padding: '8px 20px', backgroundColor: '#8B0000', color: 'white', border: 'none', cursor: 'pointer' }}>
              Upload
            </button>
          </div>
          {message && <p style={{ color: 'green', marginTop: '10px' }}>{message}</p>}
        </form>

        {/* Gallery Grid */}
        <h3>All Photos ({gallery.length})</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {gallery.map((item) => (
            <div key={item.id} style={{ width: '200px', textAlign: 'center', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
              <img src={item.image_name} alt={item.title}
                style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
              <div style={{ padding: '10px' }}>
                <p style={{ fontSize: '13px', marginBottom: '8px' }}>{item.title}</p>
                <button onClick={() => handleDelete(item.id)}
                  style={{ padding: '4px 10px', backgroundColor: 'red', color: 'white', border: 'none', cursor: 'pointer', fontSize: '12px' }}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Gallery;
