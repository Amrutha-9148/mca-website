import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

function Queries() {
  const [queries, setQueries] = useState([]);

  const fetchQueries = async () => {
    const response = await fetch('https://mca-backendd.onrender.com/api/queries');
    const data = await response.json();
    setQueries(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  const handleRead = async (id) => {
    await fetch(`https://mca-backendd.onrender.com/api/queries/read/${id}`, { method: 'PUT' });
    fetchQueries();
  };

  const handleDelete = async (id) => {
    await fetch(`https://mca-backendd.onrender.com/api/queries/delete/${id}`, { method: 'DELETE' });
    fetchQueries();
  };

  const unread = queries.filter(q => !q.is_read).length;

  return (
    <div style={{ display: 'flex' }}>
      <Navbar />
      <div style={{ marginLeft: '220px', padding: '30px', width: '100%' }}>
        <h2 style={{ color: '#8B0000' }}>User Queries</h2>
        <p style={{ color: '#555', marginBottom: '20px' }}>
          Total: {queries.length} | 
          <span style={{ color: 'red', fontWeight: 'bold' }}> Unread: {unread}</span>
        </p>

        {queries.length === 0 ? (
          <p style={{ color: '#555' }}>No queries yet.</p>
        ) : (
          queries.map((q) => (
            <div key={q.id} style={{
              backgroundColor: q.is_read ? 'white' : '#fff8f8',
              padding: '20px',
              marginBottom: '15px',
              borderRadius: '8px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              borderLeft: q.is_read ? '4px solid #ddd' : '4px solid #8B0000'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h4 style={{ color: '#8B0000', marginBottom: '5px' }}>{q.subject}</h4>
                  <p style={{ color: '#333', marginBottom: '5px' }}><strong>Name:</strong> {q.name}</p>
                  <p style={{ color: '#333', marginBottom: '5px' }}><strong>Email:</strong> {q.email}</p>
                  <p style={{ color: '#555', marginBottom: '5px' }}><strong>Query:</strong> {q.query}</p>
                  <p style={{ color: '#888', fontSize: '13px' }}>📅 {new Date(q.created_at).toDateString()}</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {!q.is_read && (
                    <button onClick={() => handleRead(q.id)}
                      style={{ padding: '5px 10px', backgroundColor: 'green', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
                      Mark Read
                    </button>
                  )}
                  {q.is_read && (
                    <span style={{ color: 'green', fontSize: '13px' }}>✅ Read</span>
                  )}
                  <button onClick={() => handleDelete(q.id)}
                    style={{ padding: '5px 10px', backgroundColor: 'red', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Queries;
