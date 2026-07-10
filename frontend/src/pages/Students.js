import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

function Students() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    usn: '', student_name: '', father_name: '', mother_name: '', batch: ''
  });
  const [message, setMessage] = useState('');
  const [excelFile, setExcelFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');
  const [uploading, setUploading] = useState(false);

  const fetchStudents = async () => {
    const response = await fetch('https://mca-backendd.onrender.com/api/students');
    const data = await response.json();
    setStudents(data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    const response = await fetch('https://mca-backendd.onrender.com/api/students/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const data = await response.json();
    setMessage(data.message);
    setFormData({ usn: '', student_name: '', father_name: '', mother_name: '', batch: '' });
    fetchStudents();
  };

  const handleExcelUpload = async (e) => {
    e.preventDefault();
    if (!excelFile) return setUploadMessage('Please select an Excel file!');
    setUploading(true);
    setUploadMessage('Uploading...');

    const formDataExcel = new FormData();
    formDataExcel.append('file', excelFile);

    const response = await fetch('https://mca-backendd.onrender.com/api/students/upload-excel', {
      method: 'POST',
      body: formDataExcel
    });
    const data = await response.json();
    setUploadMessage(data.message);
    setUploading(false);
    setExcelFile(null);
    fetchStudents();
  };

  const handleDelete = async (id) => {
    await fetch(`https://mca-backendd.onrender.com/api/students/delete/${id}`, { method: 'DELETE' });
    fetchStudents();
  };

  return (
    <div style={{ display: 'flex' }}>
      <Navbar />
      <div style={{ marginLeft: '220px', padding: '30px', width: '100%' }}>
        <h2 style={{ color: '#8B0000' }}>Students Management</h2>

        {/* Excel Upload Section */}
        <div style={{ backgroundColor: '#f0f7ff', padding: '20px', borderRadius: '8px', marginBottom: '25px', border: '2px dashed #2563eb' }}>
          <h3 style={{ color: '#2563eb', marginBottom: '10px' }}>📊 Upload Excel File (Bulk Add)</h3>
          <p style={{ color: '#555', fontSize: '13px', marginBottom: '15px' }}>
            Excel file must have these columns: <strong>USN, Student Name, Father Name, Mother Name, Batch</strong>
          </p>
          <form onSubmit={handleExcelUpload} style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={(e) => setExcelFile(e.target.files[0])}
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '5px', backgroundColor: 'white' }}
            />
            <button
              type="submit"
              disabled={uploading}
              style={{ padding: '8px 20px', backgroundColor: '#2563eb', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '5px', fontWeight: 'bold' }}>
              {uploading ? 'Uploading...' : '📤 Upload Excel'}
            </button>
          </form>
          {uploadMessage && (
            <p style={{ color: uploadMessage.includes('✅') ? 'green' : 'red', marginTop: '10px', fontWeight: 'bold' }}>
              {uploadMessage}
            </p>
          )}
        </div>

        {/* Manual Add Form */}
        <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '25px' }}>
          <h3 style={{ marginBottom: '15px' }}>➕ Add Single Student Manually</h3>
          <form onSubmit={handleAdd}>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <input placeholder="USN" value={formData.usn}
                onChange={(e) => setFormData({ ...formData, usn: e.target.value })}
                style={{ padding: '8px', width: '150px', border: '1px solid #ddd', borderRadius: '5px' }} required />
              <input placeholder="Student Name" value={formData.student_name}
                onChange={(e) => setFormData({ ...formData, student_name: e.target.value })}
                style={{ padding: '8px', width: '180px', border: '1px solid #ddd', borderRadius: '5px' }} required />
              <input placeholder="Father's Name" value={formData.father_name}
                onChange={(e) => setFormData({ ...formData, father_name: e.target.value })}
                style={{ padding: '8px', width: '180px', border: '1px solid #ddd', borderRadius: '5px' }} required />
              <input placeholder="Mother's Name" value={formData.mother_name}
                onChange={(e) => setFormData({ ...formData, mother_name: e.target.value })}
                style={{ padding: '8px', width: '180px', border: '1px solid #ddd', borderRadius: '5px' }} required />
              <input placeholder="Batch (e.g. 2025)" value={formData.batch}
                onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                style={{ padding: '8px', width: '130px', border: '1px solid #ddd', borderRadius: '5px' }} required />
              <button type="submit"
                style={{ padding: '8px 20px', backgroundColor: '#8B0000', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '5px' }}>
                Add Student
              </button>
            </div>
            {message && <p style={{ color: 'green', marginTop: '10px' }}>{message}</p>}
          </form>
        </div>

        {/* Students Table */}
        <h3>All Students ({students.length})</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#8B0000', color: 'white' }}>
              <th style={{ padding: '10px', textAlign: 'left' }}>USN</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Student Name</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Father's Name</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Mother's Name</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Batch</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '10px' }}>{student.usn}</td>
                <td style={{ padding: '10px' }}>{student.student_name}</td>
                <td style={{ padding: '10px' }}>{student.father_name}</td>
                <td style={{ padding: '10px' }}>{student.mother_name}</td>
                <td style={{ padding: '10px' }}>{student.batch}</td>
                <td style={{ padding: '10px' }}>
                  <button onClick={() => handleDelete(student.id)}
                    style={{ padding: '5px 10px', backgroundColor: 'red', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
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

export default Students;
