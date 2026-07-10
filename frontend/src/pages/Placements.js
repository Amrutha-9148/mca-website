import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

function Placements() {
  const [placements, setPlacements] = useState([]);
  const [formData, setFormData] = useState({ student_name: '', company: '', package: '', year: '' });
  const [message, setMessage] = useState('');

  const fetchPlacements = async () => {
    const response = await fetch('http://localhost:5000/api/placements');
    const data = await response.json();
    setPlacements(data);
  };

  useEffect(() => {
    fetchPlacements();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/placements/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const data = await response.json();
    setMessage(data.message);
    setFormData({ student_name: '', company: '', package: '', year: '' });
    fetchPlacements();
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/placements/delete/${id}`, { method: 'DELETE' });
    fetchPlacements();
  };

  return (
    <div style={{ display: 'flex' }}>
      <Navbar />
      <div style={{ marginLeft: '220px', padding: '30px', width: '100%' }}>
        <h2 style={{ color: '#8B0000' }}>Placements</h2>

        {/* Add Placement Form */}
        <form onSubmit={handleAdd} style={{ marginBottom: '30px', backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
          <h3>Add Placement</h3>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <input placeholder="Student Name" value={formData.student_name}
              onChange={(e) => setFormData({...formData, student_name: e.target.value})}
              style={{ padding: '8px', width: '200px' }} required />
            <input placeholder="Company" value={formData.company}
              onChange={(e) => setFormData({...formData, company: e.target.value})}
              style={{ padding: '8px', width: '200px' }} required />
            <input placeholder="Package (e.g. 6 LPA)" value={formData.package}
              onChange={(e) => setFormData({...formData, package: e.target.value})}
              style={{ padding: '8px', width: '150px' }} required />
            <input placeholder="Year (e.g. 2025)" value={formData.year}
              onChange={(e) => setFormData({...formData, year: e.target.value})}
              style={{ padding: '8px', width: '120px' }} required />
            <button type="submit" style={{ padding: '8px 20px', backgroundColor: '#8B0000', color: 'white', border: 'none', cursor: 'pointer' }}>
              Add Placement
            </button>
          </div>
          {message && <p style={{ color: 'green', marginTop: '10px' }}>{message}</p>}
        </form>

        {/* Placements Table */}
        <h3>All Placements ({placements.length})</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#8B0000', color: 'white' }}>
              <th style={{ padding: '10px', textAlign: 'left' }}>Student Name</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Company</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Package</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Year</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {placements.map((p) => (
              <tr key={p.id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '10px' }}>{p.student_name}</td>
                <td style={{ padding: '10px' }}>{p.company}</td>
                <td style={{ padding: '10px' }}>{p.package}</td>
                <td style={{ padding: '10px' }}>{p.year}</td>
                <td style={{ padding: '10px' }}>
                  <button onClick={() => handleDelete(p.id)}
                    style={{ padding: '5px 10px', backgroundColor: 'red', color: 'white', border: 'none', cursor: 'pointer' }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Placements;