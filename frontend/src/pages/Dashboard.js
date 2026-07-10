import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

function Dashboard() {
  const [counts, setCounts] = useState({ students: 0, faculty: 4, subjects: 0, news: 0, placements: 0 });

  useEffect(() => {
    fetch('https://mca-backendd.onrender.com/api/students').then(r => r.json()).then(d => setCounts(c => ({...c, students: Array.isArray(d) ? d.length : 0})));
    fetch('https://mca-backendd.onrender.com/api/subjects').then(r => r.json()).then(d => setCounts(c => ({...c, subjects: Array.isArray(d) ? d.length : 0})));
    fetch('https://mca-backendd.onrender.com/api/news').then(r => r.json()).then(d => setCounts(c => ({...c, news: Array.isArray(d) ? d.length : 0})));
    fetch('https://mca-backendd.onrender.com/api/placements').then(r => r.json()).then(d => setCounts(c => ({...c, placements: Array.isArray(d) ? d.length : 0})));
  }, []);

  const cards = [
    { label: 'Students', count: counts.students, icon: '👨‍🎓', color: '#1a2a5e' },
    { label: 'Faculty', count: counts.faculty, icon: '👨‍🏫', color: '#1a2a5e' },
    { label: 'Subjects', count: counts.subjects, icon: '📚', color: '#1a2a5e' },
    { label: 'News & Events', count: counts.news, icon: '📰', color: '#cc0000' },
    { label: 'Placements', count: counts.placements, icon: '💼', color: '#cc0000' },
  ];

  return (
    <div style={{ display: 'flex' }}>
      <Navbar />
      <div style={{ marginLeft: '220px', padding: '40px', width: '100%', backgroundColor: '#f5f7fb', minHeight: '100vh' }}>

        {/* Page Header */}
        <div style={{ marginBottom: '35px' }}>
          <p style={{ color: '#cc0000', fontWeight: 'bold', fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 6px' }}>Admin Panel</p>
          <h2 style={{ color: '#1a2a5e', fontSize: '28px', margin: '0 0 10px' }}>Dashboard</h2>
          <div style={{ width: '50px', height: '4px', backgroundColor: '#cc0000', borderRadius: '2px' }} />
        </div>

        {/* Stats Cards */}
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '40px' }}>
          {cards.map((card, i) => (
            <div key={i} style={{
              backgroundColor: 'white',
              borderRadius: '10px',
              padding: '25px 30px',
              minWidth: '160px',
              textAlign: 'center',
              boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
              borderTop: `4px solid ${card.color}`,
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(26,42,94,0.15)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.08)'; }}
            >
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>{card.icon}</div>
              <h2 style={{ color: card.color, fontSize: '36px', margin: '0 0 5px', fontWeight: 'bold' }}>{card.count}</h2>
              <p style={{ color: '#777', margin: 0, fontSize: '14px', fontWeight: '500' }}>{card.label}</p>
            </div>
          ))}
        </div>

        {/* Welcome Message */}
        <div style={{
          backgroundColor: 'white', borderRadius: '10px',
          padding: '30px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
          borderLeft: '5px solid #1a2a5e'
        }}>
          <h3 style={{ color: '#1a2a5e', marginBottom: '10px' }}>👋 Welcome to MCA Admin Panel</h3>
          <p style={{ color: '#555', fontSize: '15px', lineHeight: '1.8', margin: 0 }}>
            Manage students, faculty, subjects, news, placements and gallery from the sidebar.
            All changes will reflect on the public website immediately.
          </p>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
