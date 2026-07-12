import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PublicNews() {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch('https://mca-backendd.onrender.com/api/news')
      .then(r => r.json())
      .then(d => setNews(Array.isArray(d) ? d : []));
  }, []);

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif" }}>

      {/* Top Bar */}
      <div style={{ backgroundColor: '#1a2a5e', padding: '8px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ color: 'white', margin: 0, fontSize: '13px' }}>📞 08172-268371 &nbsp;&nbsp; ✉️ office@mcehassan.ac.in</p>
        <p style={{ color: 'white', margin: 0, fontSize: '13px' }}>🕐 Mon - Sat: 9:00 AM to 4:30 PM</p>
      </div>

      {/* Navbar */}
      <nav style={{
        backgroundColor: 'white',
        padding: '12px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 15px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <img src="/images/deptlogo.jpeg" alt="Logo" style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
          <div>
            <h2 style={{ color: '#1a2a5e', margin: 0, fontSize: '18px', fontWeight: 'bold' }}>Malnad College of Engineering</h2>
            <p style={{ color: '#555', margin: 0, fontSize: '12px' }}>Department of MCA — Hassan | Estd. 1960</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '5px' }}>
          {['Home', 'Faculty', 'Subjects', 'News & Events', 'Placements', 'Gallery'].map((item, i) => {
            const paths = ['/home', '/public-faculty', '/public-subjects', '/public-news', '/public-placements', '/public-gallery'];
            const isActive = window.location.pathname === paths[i];
            return (
              <button key={i} onClick={() => navigate(paths[i])} style={{
                backgroundColor: isActive ? '#1a2a5e' : 'transparent',
                color: isActive ? 'white' : '#1a2a5e',
                border: 'none',
                cursor: 'pointer', fontSize: '14px', padding: '8px 14px', borderRadius: '5px',
                fontWeight: '600', transition: 'all 0.3s'
              }}
                onMouseEnter={e => { if (!isActive) { e.target.style.backgroundColor = '#1a2a5e'; e.target.style.color = 'white'; } }}
                onMouseLeave={e => { if (!isActive) { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#1a2a5e'; } }}>
                {item}
              </button>
            );
          })}
          <button onClick={() => navigate('/login')} style={{
            backgroundColor: '#cc0000', color: 'white', border: 'none',
            cursor: 'pointer', fontSize: '14px', padding: '8px 20px',
            borderRadius: '5px', fontWeight: 'bold', marginLeft: '10px'
          }}>Admin Login</button>
        </div>
      </nav>

      {/* Page Header Banner */}
      <div style={{ backgroundColor: '#1a2a5e', padding: '40px 100px' }}>
        <p style={{ color: '#c8d4f0', fontWeight: 'bold', fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 8px' }}>Stay Updated</p>
        <h2 style={{ color: 'white', fontSize: '32px', margin: '0 0 10px' }}>News & Events</h2>
        <div style={{ width: '50px', height: '4px', backgroundColor: '#cc0000', borderRadius: '2px' }} />
      </div>

      {/* News Section */}
      <div style={{ padding: '50px 100px', backgroundColor: '#f5f7fb', minHeight: '60vh' }}>
        {news.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#555' }}>No news or events at the moment.</p>
        ) : (
          news.map((item) => (
            <div key={item.id} style={{
              backgroundColor: 'white',
              padding: '25px 30px',
              marginBottom: '20px',
              borderRadius: '10px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.07)',
              borderLeft: '5px solid #1a2a5e',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateX(5px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(26,42,94,0.15)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateX(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.07)'; }}
            >
              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                {item.image && (
                  <img src={item.image} alt={item.title}
                    style={{ width: '180px', height: '140px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }} />
                )}
                <div>
                  <h3 style={{ color: '#1a2a5e', marginBottom: '10px', fontSize: '18px' }}>{item.title}</h3>
                  <p style={{ color: '#555', marginBottom: '12px', lineHeight: '1.7' }}>{item.description}</p>
                  {item.venue && <p style={{ color: '#555', fontSize: '13px', marginBottom: '8px' }}>📍 {item.venue}</p>}
                  <p style={{ color: '#cc0000', fontSize: '13px', fontWeight: 'bold', margin: 0 }}>📅 {new Date(item.date).toDateString()}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <footer style={{ backgroundColor: '#1a2a5e', color: 'white', padding: '30px 100px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
          <div>
            <h4 style={{ margin: '0 0 5px', borderBottom: '2px solid #cc0000', paddingBottom: '5px', display: 'inline-block' }}>MCA Department</h4>
            <p style={{ color: '#c8d4f0', fontSize: '13px', margin: '8px 0 0' }}>Malnad College of Engineering, Hassan</p>
          </div>
          <p style={{ color: '#c8d4f0', margin: 0, fontSize: '13px' }}>© 2025 Department of MCA, Malnad College of Engineering, Hassan. All Rights Reserved.</p>
        </div>
      </footer>

    </div>
  );
}

export default PublicNews;