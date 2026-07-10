import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PublicPlacements() {
  const navigate = useNavigate();
  const [placements, setPlacements] = useState([]);

  useEffect(() => {
    fetch('https://mca-backendd.onrender.com/api/placements')
      .then(r => r.json())
      .then(d => setPlacements(Array.isArray(d) ? d : []));
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
        <p style={{ color: '#c8d4f0', fontWeight: 'bold', fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 8px' }}>Career Success</p>
        <h2 style={{ color: 'white', fontSize: '32px', margin: '0 0 10px' }}>Placements</h2>
        <div style={{ width: '50px', height: '4px', backgroundColor: '#cc0000', borderRadius: '2px' }} />
      </div>

      {/* Placements Section */}
      <div style={{ padding: '50px 100px', backgroundColor: '#f5f7fb', minHeight: '60vh' }}>
        {placements.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#555' }}>No placement records yet.</p>
        ) : (
          <div style={{ backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#1a2a5e', color: 'white' }}>
                  <th style={{ padding: '15px 20px', textAlign: 'left', fontSize: '14px', fontWeight: '600' }}>Student Name</th>
                  <th style={{ padding: '15px 20px', textAlign: 'left', fontSize: '14px', fontWeight: '600' }}>Company</th>
                  <th style={{ padding: '15px 20px', textAlign: 'left', fontSize: '14px', fontWeight: '600' }}>Package</th>
                  <th style={{ padding: '15px 20px', textAlign: 'left', fontSize: '14px', fontWeight: '600' }}>Year</th>
                </tr>
              </thead>
              <tbody>
                {placements.map((p, i) => (
                  <tr key={p.id} style={{
                    borderBottom: '1px solid #eee',
                    backgroundColor: i % 2 === 0 ? 'white' : '#f5f7fb',
                    transition: 'background-color 0.2s'
                  }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#e8edf7'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = i % 2 === 0 ? 'white' : '#f5f7fb'}
                  >
                    <td style={{ padding: '14px 20px', color: '#1a2a5e', fontWeight: '600' }}>{p.student_name}</td>
                    <td style={{ padding: '14px 20px', color: '#333' }}>{p.company}</td>
                    <td style={{ padding: '14px 20px', color: '#cc0000', fontWeight: 'bold' }}>{p.package}</td>
                    <td style={{ padding: '14px 20px', color: '#555' }}>{p.year}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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

export default PublicPlacements;
