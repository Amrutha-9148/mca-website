import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

function Subjects() {
  const [subjects, setSubjects] = useState([]);

  const fetchSubjects = async () => {
    const response = await fetch('http://localhost:5000/api/subjects');
    const data = await response.json();
    setSubjects(data);
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const sem1 = subjects.filter(s => s.semester === 1);
  const sem2 = subjects.filter(s => s.semester === 2);

  return (
    <div style={{ display: 'flex' }}>
      <Navbar />
      <div style={{ marginLeft: '220px', padding: '30px', width: '100%' }}>
        <h2 style={{ color: '#8B0000' }}>Subjects</h2>

        {/* Semester 1 */}
        <h3 style={{ color: '#8B0000', marginTop: '20px' }}>Semester 1</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
          <thead>
            <tr style={{ backgroundColor: '#8B0000', color: 'white' }}>
              <th style={{ padding: '10px', textAlign: 'left' }}>Course Code</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Course Title</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Credits</th>
            </tr>
          </thead>
          <tbody>
            {sem1.map((s) => (
              <tr key={s.id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '10px' }}>{s.course_code}</td>
                <td style={{ padding: '10px' }}>{s.course_title}</td>
                <td style={{ padding: '10px' }}>{s.credits}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Semester 2 */}
        <h3 style={{ color: '#8B0000' }}>Semester 2</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#8B0000', color: 'white' }}>
              <th style={{ padding: '10px', textAlign: 'left' }}>Course Code</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Course Title</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Credits</th>
            </tr>
          </thead>
          <tbody>
            {sem2.map((s) => (
              <tr key={s.id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '10px' }}>{s.course_code}</td>
                <td style={{ padding: '10px' }}>{s.course_title}</td>
                <td style={{ padding: '10px' }}>{s.credits}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Subjects;