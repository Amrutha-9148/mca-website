import React from 'react';
import Navbar from '../components/Navbar';

function Faculty() {
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
    <div style={{ display: 'flex' }}>
      <Navbar />
      <div style={{ marginLeft: '220px', padding: '40px', width: '100%', backgroundColor: '#f5f7fb', minHeight: '100vh' }}>

        {/* Page Header */}
        <div style={{ marginBottom: '35px' }}>
          <p style={{ color: '#cc0000', fontWeight: 'bold', fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 6px' }}>Department of MCA</p>
          <h2 style={{ color: '#1a2a5e', fontSize: '28px', margin: '0 0 10px' }}>Our Faculty</h2>
          <div style={{ width: '50px', height: '4px', backgroundColor: '#cc0000', borderRadius: '2px' }} />
        </div>

        {/* Faculty Cards */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '25px' }}>
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
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(26,42,94,0.15)'; }}
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
    </div>
  );
}

export default Faculty;
