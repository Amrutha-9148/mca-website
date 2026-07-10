import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const name = localStorage.getItem('name');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', height: '100vh', position: 'fixed', left: 0, top: 0 }}>
      <div style={{ width: '220px', backgroundColor: '#1a2a5e', color: 'white', padding: '20px 0', display: 'flex', flexDirection: 'column' }}>
        
        {/* Logo and Title */}
        <div style={{ textAlign: 'center', padding: '10px 20px', borderBottom: '1px solid rgba(255,255,255,0.2)', marginBottom: '20px' }}>
          <img src="/images/deptlogo.jpeg" alt="MCA Logo"
            style={{ width: '80px', height: '80px', objectFit: 'contain', marginBottom: '10px' }} />
          <h3 style={{ fontSize: '14px', margin: 0, color: '#c8d4f0' }}>MCE Hassan<br />MCA Department</h3>
        </div>

        {[
          { icon: '🏠', label: 'Dashboard', path: '/dashboard' },
          { icon: '👨‍🎓', label: 'Students', path: '/students' },
          { icon: '👨‍🏫', label: 'Faculty', path: '/faculty' },
          { icon: '📚', label: 'Subjects', path: '/subjects' },
          { icon: '📰', label: 'News & Events', path: '/news' },
          { icon: '💼', label: 'Placements', path: '/placements' },
          { icon: '🖼️', label: 'Gallery', path: '/gallery' },
          { icon: '📩', label: 'User Queries', path: '/queries' },
        ].map((item, i) => (
          <button key={i} onClick={() => navigate(item.path)} style={{
            padding: '12px 20px',
            backgroundColor: window.location.pathname === item.path ? '#cc0000' : 'transparent',
            color: 'white',
            border: 'none',
            textAlign: 'left',
            cursor: 'pointer',
            fontSize: '15px',
            borderLeft: window.location.pathname === item.path ? '4px solid white' : '4px solid transparent',
            transition: 'all 0.2s'
          }}
            onMouseEnter={e => { if (window.location.pathname !== item.path) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'; }}
            onMouseLeave={e => { if (window.location.pathname !== item.path) e.currentTarget.style.backgroundColor = 'transparent'; }}
          >
            {item.icon} {item.label}
          </button>
        ))}

        <div style={{ marginTop: 'auto', padding: '20px', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
          <p style={{ fontSize: '13px', marginBottom: '10px', color: '#c8d4f0' }}>{name} ({role})</p>
          <button onClick={handleLogout} style={{
            width: '100%', padding: '8px',
            backgroundColor: '#cc0000',
            color: 'white', border: 'none',
            cursor: 'pointer', fontWeight: 'bold',
            borderRadius: '5px'
          }}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
