import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

function News() {
  const [news, setNews] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '', date: '', venue: '' });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const fetchNews = async () => {
    const response = await fetch('https://mca-backendd.onrender.com/api/news');
    const data = await response.json();
    setNews(data);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('title', formData.title);
    form.append('description', formData.description);
    form.append('date', formData.date);
    form.append('venue', formData.venue);
    if (image) form.append('image', image);

    const response = await fetch('https://mca-backendd.onrender.com/api/news/add', {
      method: 'POST',
      body: form
    });
    const data = await response.json();
    setMessage(data.message);
    setFormData({ title: '', description: '', date: '', venue: '' });
    setImage(null);
    fetchNews();
  };

  const handleDelete = async (id) => {
    await fetch(`https://mca-backendd.onrender.com/api/news/delete/${id}`, { method: 'DELETE' });
    fetchNews();
  };

  return (
    <div style={{ display: 'flex' }}>
      <Navbar />
      <div style={{ marginLeft: '220px', padding: '40px', width: '100%', backgroundColor: '#f5f7fb', minHeight: '100vh' }}>

        {/* Page Header */}
        <div style={{ marginBottom: '30px' }}>
          <p style={{ color: '#cc0000', fontWeight: 'bold', fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 6px' }}>Admin Panel</p>
          <h2 style={{ color: '#1a2a5e', fontSize: '28px', margin: '0 0 10px' }}>News & Events</h2>
          <div style={{ width: '50px', height: '4px', backgroundColor: '#cc0000', borderRadius: '2px' }} />
        </div>

        {/* Add News Form */}
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', marginBottom: '30px', borderTop: '4px solid #1a2a5e' }}>
          <h3 style={{ color: '#1a2a5e', marginBottom: '20px' }}>➕ Add News / Event</h3>
          <form onSubmit={handleAdd}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '550px' }}>
              <input placeholder="Title" value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '14px' }} required />
              <textarea placeholder="Description" value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                style={{ padding: '10px', height: '100px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '14px', resize: 'vertical' }} required />
              <input placeholder="Venue (e.g. Seminar Hall, MCE)" value={formData.venue}
                onChange={(e) => setFormData({...formData, venue: e.target.value})}
                style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '14px' }} />
              <input type="date" value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '14px' }} required />

              {/* Photo Upload */}
              <div style={{ border: '2px dashed #1a2a5e', borderRadius: '8px', padding: '20px', textAlign: 'center', backgroundColor: '#f5f7fb' }}>
                <p style={{ color: '#1a2a5e', fontWeight: 'bold', marginBottom: '10px' }}>📷 Upload Event Photo (optional)</p>
                <input type="file" accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  style={{ fontSize: '14px' }} />
                {image && <p style={{ color: 'green', marginTop: '8px', fontSize: '13px' }}>✅ {image.name} selected</p>}
              </div>

              <button type="submit" style={{
                padding: '10px 25px', backgroundColor: '#1a2a5e',
                color: 'white', border: 'none', cursor: 'pointer',
                borderRadius: '5px', fontSize: '14px', fontWeight: 'bold',
                width: 'fit-content'
              }}>
                ➕ Add News / Event
              </button>
            </div>
            {message && <p style={{ color: 'green', marginTop: '10px' }}>{message}</p>}
          </form>
        </div>

        {/* News List */}
        <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h3 style={{ color: '#1a2a5e', margin: 0 }}>All News & Events</h3>
          <span style={{ backgroundColor: '#1a2a5e', color: 'white', borderRadius: '20px', padding: '2px 12px', fontSize: '13px' }}>{news.length}</span>
        </div>

        {news.map((item) => (
          <div key={item.id} style={{
            backgroundColor: 'white',
            padding: '20px 25px',
            marginBottom: '15px',
            borderRadius: '10px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.07)',
            borderLeft: '5px solid #1a2a5e',
            transition: 'transform 0.2s'
          }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateX(5px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0)'}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '15px' }}>
              <div style={{ display: 'flex', gap: '20px', flex: 1 }}>
                {/* Event Image */}
                {item.image && (
                  <img src={item.image} alt={item.title}
                    style={{ width: '100px', height: '80px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }} />
                )}
                <div>
                  <h4 style={{ color: '#1a2a5e', marginBottom: '6px', fontSize: '16px' }}>{item.title}</h4>
                  <p style={{ color: '#555', marginBottom: '6px', lineHeight: '1.6', fontSize: '14px' }}>{item.description}</p>
                  {item.venue && <p style={{ color: '#555', fontSize: '13px', marginBottom: '5px' }}>📍 {item.venue}</p>}
                  <p style={{ color: '#cc0000', fontSize: '13px', fontWeight: 'bold', margin: 0 }}>📅 {new Date(item.date).toDateString()}</p>
                </div>
              </div>
              <button onClick={() => handleDelete(item.id)} style={{
                padding: '7px 15px', backgroundColor: '#cc0000',
                color: 'white', border: 'none', cursor: 'pointer',
                borderRadius: '5px', fontSize: '13px', fontWeight: 'bold',
                whiteSpace: 'nowrap', flexShrink: 0
              }}>
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default News;
