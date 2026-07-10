import React from 'react';
import { useNavigate } from 'react-router-dom';

function PublicFaculty() {
  const navigate = useNavigate();

  const faculty = [
    {
      id: 1,
      name: 'Mrs. Margaret R.E.',
      designation: 'HOD & Assistant Professor',
      qualification: 'MCA',
      email: 'rem@mcehassan.ac.in',
      phone: '9448006138',
      photo: '/images/margret mam.jpeg'
    },
    {
      id: 2,
      name: 'Mr. Prasanna K S',
      designation: 'Assistant Professor',
      qualification: 'MCA',
      email: 'ksp@mcehassan.ac.in',
      phone: '9945877723',
      photo: '/images/prasanna sir.jpeg'
    },
    {
      id: 3,
      name: 'Mr. Vasanth Kumar N.T.',
      designation: 'Assistant Professor',
      qualification: 'MCA',
      email: 'ntv@mcehassan.ac.in',
      phone: '9741429929',
      photo: '/images/vasanthsir.jpeg'
    },
    {
      id: 4,
      name: 'Mr. Chandra Shekar C S',
      designation: 'Assistant Professor',
      qualification: 'Bsc, MCA',
      email: 'csc@mcehassan.ac.in',
      phone: '9731341220',
      photo: '/images/chnrashekarsir.jpeg'
    }
  ];

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
        <p style={{ color: '#c8d4f0', fontWeight: 'bold', fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 8px' }}>Department of MCA</p>
        <h2 style={{ color: 'white', fontSize: '32px', margin: '0 0 10px' }}>Our Faculty</h2>
        <div style={{ width: '50px', height: '4px', backgroundColor: '#cc0000', borderRadius: '2px' }} />
      </div>

      {/* Faculty Section */}
      <div style={{ padding: '50px 100px', backgroundColor: '#f5f7fb', minHeight: '60vh' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '25px', justifyContent: 'center' }}>
          {faculty.map((f) => (
            <div key={f.id} style={{
              backgroundColor: 'white',
              borderRadius: '10px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
              padding: '30px 20px',
              width: '220px',
              textAlign: 'center',
              borderTop: '4px solid #1a2a5e',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(26,42,94,0.18)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.08)'; }}
            >
              <img src={f.photo} alt={f.name}
                style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', marginBottom: '15px', border: '4px solid #1a2a5e' }} />
              <h3 style={{ color: '#1a2a5e', fontSize: '16px', marginBottom: '6px', fontWeight: 'bold' }}>{f.name}</h3>
              <p style={{ color: '#cc0000', fontSize: '13px', fontWeight: '600', marginBottom: '5px' }}>{f.designation}</p>
              <p style={{ color: '#777', fontSize: '13px', marginBottom: '10px' }}>{f.qualification}</p>
              <div style={{ borderTop: '1px solid #eee', paddingTop: '12px' }}>
                <p style={{ color: '#555', fontSize: '12px', marginBottom: '5px' }}>📧 {f.email}</p>
                <p style={{ color: '#555', fontSize: '12px', margin: 0 }}>📞 {f.phone}</p>
              </div>
            </div>
          ))}
        </div>
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

export default PublicFaculty;
