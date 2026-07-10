import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', query: '' });
  const [message, setMessage] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [news, setNews] = useState([]);

  const slides = [
    { image: '/images/collegemaingate.jpeg', title: 'Welcome to MCA Department', subtitle: 'Malnad College of Engineering, Hassan' },
    { image: '/images/mainblock.jpg', title: 'Excellence in Education', subtitle: 'Shaping Future Technology Leaders' },
    { image: '/images/sports.jpg', title: 'Beyond Academics', subtitle: 'Holistic Development of Students' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  },[slides.length]);

  useEffect(() => {
    fetch('https://mca-backendd.onrender.com/api/news')
      .then(res => res.json())
      .then(data => setNews(Array.isArray(data) ? data.slice(0, 3) : []))
      .catch(() => setNews([]));
  }, []);

  const handleQuery = async (e) => {
    e.preventDefault();
    const response = await fetch('https://mca-backendd.onrender.com/api/queries/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const data = await response.json();
    setMessage(data.message);
    setFormData({ name: '', email: '', subject: '', query: '' });
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", margin: 0, padding: 0 }}>

      {/* Top Bar */}
      <div style={{ backgroundColor: '#1a2a5e', padding: '8px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ color: 'white', margin: 0, fontSize: '13px' }}>📞 08172-268371 &nbsp;&nbsp; ✉️ office@mcehassan.ac.in</p>
        <p style={{ color: 'white', margin: 0, fontSize: '13px' }}>🕐 Mon - Fri: 8:30 AM to 5:30 PM &nbsp;|&nbsp; Sat: 8:30 AM to 1:30 PM</p>
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
            return (
              <button key={i} onClick={() => navigate(paths[i])} style={{
                backgroundColor: 'transparent', color: '#1a2a5e', border: 'none',
                cursor: 'pointer', fontSize: '14px', padding: '8px 14px', borderRadius: '5px',
                fontWeight: '600', transition: 'all 0.3s'
              }}
                onMouseEnter={e => { e.target.style.backgroundColor = '#1a2a5e'; e.target.style.color = 'white'; }}
                onMouseLeave={e => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#1a2a5e'; }}>
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

      {/* Hero Slider */}
      <div style={{ position: 'relative', height: '550px', overflow: 'hidden' }}>
        {slides.map((slide, i) => (
          <div key={i} style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${slide.image})`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            opacity: currentSlide === i ? 1 : 0,
            transition: 'opacity 1s ease-in-out'
          }}>
            <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(26,42,94,0.65)' }} />
            <div style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: 'white', padding: '20px' }}>
              <div>
                <p style={{ color: '#c8d4f0', fontSize: '14px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '15px' }}>Visvesvaraya Technological University</p>
                <h1 style={{ fontSize: '46px', fontWeight: 'bold', marginBottom: '15px', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>{slide.title}</h1>
                <h3 style={{ fontSize: '20px', color: '#c8d4f0', marginBottom: '25px' }}>{slide.subtitle}</h3>
                <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                  <button onClick={() => navigate('/public-faculty')} style={{
                    backgroundColor: '#cc0000', color: 'white', border: 'none',
                    padding: '12px 30px', borderRadius: '5px', fontSize: '15px',
                    cursor: 'pointer', fontWeight: 'bold'
                  }}>Meet Our Faculty</button>
                  <button onClick={() => navigate('/public-subjects')} style={{
                    backgroundColor: 'transparent', color: 'white',
                    border: '2px solid white', padding: '12px 30px',
                    borderRadius: '5px', fontSize: '15px', cursor: 'pointer'
                  }}>View Subjects</button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slide Dots */}
        <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '10px' }}>
          {slides.map((_, i) => (
            <div key={i} onClick={() => setCurrentSlide(i)} style={{
              width: currentSlide === i ? '30px' : '10px', height: '10px',
              backgroundColor: currentSlide === i ? '#cc0000' : 'white',
              borderRadius: '5px', cursor: 'pointer', transition: 'all 0.3s'
            }} />
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={{ backgroundColor: '#1a2a5e', padding: '30px 40px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '60px', flexWrap: 'wrap' }}>
          {[
            { number: '4+', label: 'Expert Faculty' },
            { number: '47', label: 'Students (2025)' },
            { number: '2', label: 'Year Program' },
            { number: '50+', label: 'Placements' },
            { number: '1960', label: 'Estd. Year' }
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: 'center', color: 'white' }}>
              <h2 style={{ fontSize: '36px', margin: 0, fontWeight: 'bold' }}>{stat.number}</h2>
              <p style={{ margin: '5px 0 0', fontSize: '14px', color: '#c8d4f0' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <div style={{ padding: '60px 100px', backgroundColor: '#f9f9f9', display: 'flex', gap: '50px', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src="/images/deptlogo.jpeg" alt="MCA Dept Logo" style={{
            width: '280px', height: '280px', objectFit: 'contain',
            borderRadius: '10px', boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
            padding: '20px', backgroundColor: 'white'
          }} />
        </div>
        <div style={{ flex: 1, minWidth: '300px' }}>
          <p style={{ color: '#cc0000', fontWeight: 'bold', fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase' }}>About Us</p>
          <h2 style={{ fontSize: '32px', color: '#1a2a5e', marginBottom: '20px' }}>MCA Department</h2>
          <div style={{ width: '50px', height: '4px', backgroundColor: '#1a2a5e', marginBottom: '20px', borderRadius: '2px' }} />
          <p style={{ fontSize: '15px', lineHeight: '1.9', color: '#555', marginBottom: '15px' }}>
            The Department of Master of Computer Applications (MCA) at Malnad College of Engineering, Hassan,
            was established with the vision of producing skilled computer professionals.
          </p>
          <p style={{ fontSize: '15px', lineHeight: '1.9', color: '#555', marginBottom: '25px' }}>
            The department offers a 2-year MCA program affiliated to Visvesvaraya Technological University (VTU).
            Our focus is on providing quality education with strong industry connections and practical training.
          </p>
          <button onClick={() => navigate('/public-faculty')} style={{
            backgroundColor: '#1a2a5e', color: 'white', border: 'none',
            padding: '12px 25px', borderRadius: '5px', fontSize: '15px',
            cursor: 'pointer', fontWeight: 'bold'
          }}>Know More →</button>
        </div>
      </div>

      {/* Vision & Mission */}
      <div style={{ padding: '60px 100px', backgroundColor: 'white' }}>
        <p style={{ color: '#cc0000', fontWeight: 'bold', fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase', textAlign: 'center' }}>Our Direction</p>
        <h2 style={{ fontSize: '32px', color: '#1a2a5e', textAlign: 'center', marginBottom: '10px' }}>Vision & Mission</h2>
        <div style={{ width: '50px', height: '4px', backgroundColor: '#cc0000', margin: '0 auto 40px', borderRadius: '2px' }} />
        <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <div style={{ backgroundColor: '#1a2a5e', color: 'white', padding: '35px', borderRadius: '10px', maxWidth: '450px', flex: 1, boxShadow: '0 10px 30px rgba(26,42,94,0.25)' }}>
            <h3 style={{ fontSize: '22px', marginBottom: '15px', textAlign: 'center' }}>🎯 Vision</h3>
            <p style={{ fontSize: '15px', lineHeight: '1.9', textAlign: 'center' }}>
              To be a premier department to produce competent professionals to develop sustainable
              computer based applications for the industrial and societal needs.
            </p>
          </div>
          <div style={{ backgroundColor: '#f9f9f9', padding: '35px', borderRadius: '10px', maxWidth: '450px', flex: 1, border: '2px solid #1a2a5e' }}>
            <h3 style={{ fontSize: '22px', marginBottom: '15px', textAlign: 'center', color: '#1a2a5e' }}>🚀 Mission</h3>
            <ol style={{ fontSize: '15px', lineHeight: '2.2', color: '#555' }}>
              <li>Facilitate effective learning environment by providing industry focused technical education.</li>
              <li>Make students to acquire the necessary skills to continue independent learning and research.</li>
              <li>To inculcate professional ethics driven by social concerns.</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Latest News */}
      <div style={{ padding: '60px 100px', backgroundColor: '#f9f9f9' }}>
        <p style={{ color: '#cc0000', fontWeight: 'bold', fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase', textAlign: 'center' }}>Stay Updated</p>
        <h2 style={{ fontSize: '32px', color: '#1a2a5e', textAlign: 'center', marginBottom: '10px' }}>Latest News & Events</h2>
        <div style={{ width: '50px', height: '4px', backgroundColor: '#cc0000', margin: '0 auto 40px', borderRadius: '2px' }} />
        <div style={{ display: 'flex', gap: '25px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {news.length > 0 ? news.map((item, i) => (
            <div key={i} style={{
              backgroundColor: 'white', borderRadius: '10px', overflow: 'hidden',
              boxShadow: '0 5px 20px rgba(0,0,0,0.08)', maxWidth: '320px', flex: 1,
              borderTop: '4px solid #1a2a5e'
            }}>
              <div style={{ padding: '25px' }}>
                <p style={{ color: '#cc0000', fontSize: '12px', fontWeight: 'bold', marginBottom: '10px' }}>
                  📅 {new Date(item.created_at).toDateString()}
                </p>
                <h4 style={{ color: '#1a2a5e', fontSize: '16px', marginBottom: '10px' }}>{item.title}</h4>
                <p style={{ color: '#555', fontSize: '14px', lineHeight: '1.7' }}>{item.description?.substring(0, 100)}...</p>
              </div>
            </div>
          )) : (
            <p style={{ color: '#888' }}>No news added yet. Admin can add news from the admin panel.</p>
          )}
        </div>
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <button onClick={() => navigate('/public-news')} style={{
            backgroundColor: '#1a2a5e', color: 'white', border: 'none',
            padding: '12px 30px', borderRadius: '5px', fontSize: '15px',
            cursor: 'pointer', fontWeight: 'bold'
          }}>View All News →</button>
        </div>
      </div>

      {/* Accreditation Bar */}
      <div style={{ backgroundColor: '#1a2a5e', padding: '30px 40px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '60px', flexWrap: 'wrap', alignItems: 'center' }}>
          {[
            { icon: '🏛️', label: 'Autonomous College', sub: 'Permanently Affiliated to VTU' },
            { icon: '✅', label: 'Approved by AICTE & UGC', sub: '' },
            { icon: '🏅', label: 'Accredited by NBA', sub: '' },
            { icon: '⭐', label: 'Accredited by NAAC', sub: "with 'A' Grade" }
          ].map((item, i) => (
            <div key={i} style={{ textAlign: 'center', color: 'white' }}>
              <div style={{ fontSize: '30px', marginBottom: '8px' }}>{item.icon}</div>
              <p style={{ margin: 0, fontWeight: 'bold', fontSize: '14px' }}>{item.label}</p>
              {item.sub && <p style={{ margin: '4px 0 0', color: '#c8d4f0', fontSize: '12px' }}>{item.sub}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div style={{ padding: '60px 100px', backgroundColor: 'white' }}>
        <p style={{ color: '#cc0000', fontWeight: 'bold', fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase', textAlign: 'center' }}>Reach Us</p>
        <h2 style={{ fontSize: '32px', color: '#1a2a5e', textAlign: 'center', marginBottom: '10px' }}>Contact Us</h2>
        <div style={{ width: '50px', height: '4px', backgroundColor: '#cc0000', margin: '0 auto 40px', borderRadius: '2px' }} />
        <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <div style={{ flex: 1, maxWidth: '350px' }}>
            {[
              { icon: '📍', label: 'Location', value: 'No 21, Salagame Rd, Rangoli Halla, Hassan, Karnataka 573202' },
              { icon: '📞', label: 'Phone', value: '08172-268371' },
              { icon: '✉️', label: 'Email', value: 'office@mcehassan.ac.in' },
              { icon: '🕐', label: 'Working Hours', value: 'Monday to Friday: 8:30 AM to 5:30 PM | Saturday: 8:30 AM to 1:30 PM' }
            ].map((item, i) => (
              <div key={i} style={{
                backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px',
                marginBottom: '15px', borderLeft: '4px solid #1a2a5e'
              }}>
                <p style={{ margin: 0, color: '#1a2a5e', fontWeight: 'bold' }}>{item.icon} {item.label}</p>
                <p style={{ margin: '5px 0 0', color: '#555', fontSize: '14px' }}>{item.value}</p>
              </div>
            ))}
          </div>
          <div style={{ flex: 1, maxWidth: '500px', backgroundColor: '#f9f9f9', padding: '35px', borderRadius: '10px' }}>
            <h3 style={{ color: '#1a2a5e', marginBottom: '20px' }}>Send Us a Query</h3>
            <form onSubmit={handleQuery}>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                <input placeholder="Your name" value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ padding: '10px', flex: 1, border: '1px solid #ddd', borderRadius: '5px' }} required />
                <input placeholder="Your email" value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{ padding: '10px', flex: 1, border: '1px solid #ddd', borderRadius: '5px' }} required />
              </div>
              <select value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                style={{ padding: '10px', width: '100%', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '5px' }} required>
                <option value="">Select Subject</option>
                <option value="Admissions">Admissions</option>
                <option value="Academics">Academics</option>
                <option value="Placements">Placements</option>
                <option value="Faculty">Faculty</option>
                <option value="Other">Other</option>
              </select>
              <textarea placeholder="Enter your query" value={formData.query}
                onChange={(e) => setFormData({ ...formData, query: e.target.value })}
                style={{ padding: '10px', width: '100%', height: '120px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '5px', resize: 'vertical' }} required />
              <button type="submit" style={{
                width: '100%', padding: '12px', backgroundColor: '#cc0000',
                color: 'white', border: 'none', borderRadius: '5px',
                fontSize: '16px', cursor: 'pointer', fontWeight: 'bold'
              }}>Send Query ✉️</button>
            </form>
            {message && <p style={{ color: 'green', marginTop: '15px', textAlign: 'center' }}>{message}</p>}
          </div>
        </div>
        <div style={{ marginTop: '40px', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 5px 20px rgba(0,0,0,0.1)' }}>
          <iframe
            title="MCE Hassan Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.9!2d76.0993!3d13.0074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba54f2a5555c065%3A0x9d0f7f7e7f7e7f7e!2sMalnad%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1234567890"
            width="100%" height="350"
            style={{ border: 0 }} allowFullScreen="" loading="lazy" />
        </div>
      </div>

      {/* Footer */}
      <footer style={{ backgroundColor: '#1a2a5e', color: 'white', padding: '40px 100px' }}>
        <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: '30px' }}>
          <div style={{ maxWidth: '300px' }}>
            <h3 style={{ marginBottom: '15px', borderBottom: '2px solid #cc0000', paddingBottom: '10px' }}>MCA Department</h3>
            <p style={{ color: '#c8d4f0', fontSize: '14px', lineHeight: '1.8' }}>
              Malnad College of Engineering, Hassan. Affiliated to VTU, Belagavi. Producing skilled
              computer professionals since 1960.
            </p>
          </div>
          <div>
            <h3 style={{ marginBottom: '15px', borderBottom: '2px solid #cc0000', paddingBottom: '10px' }}>Quick Links</h3>
            {['Home', 'Faculty', 'Subjects', 'News & Events', 'Placements', 'Gallery'].map((item, i) => {
              const paths = ['/home', '/public-faculty', '/public-subjects', '/public-news', '/public-placements', '/public-gallery'];
              return (
                <p key={i} onClick={() => navigate(paths[i])} style={{ color: '#c8d4f0', fontSize: '14px', cursor: 'pointer', marginBottom: '8px' }}>→ {item}</p>
              );
            })}
          </div>
          <div>
            <h3 style={{ marginBottom: '15px', borderBottom: '2px solid #cc0000', paddingBottom: '10px' }}>Contact</h3>
            <p style={{ color: '#c8d4f0', fontSize: '14px', marginBottom: '8px' }}>📍 No 21, Salagame Rd, Hassan</p>
            <p style={{ color: '#c8d4f0', fontSize: '14px', marginBottom: '8px' }}>📞 08172-268371</p>
            <p style={{ color: '#c8d4f0', fontSize: '14px', marginBottom: '8px' }}>✉️ office@mcehassan.ac.in</p>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '20px', textAlign: 'center' }}>
          <p style={{ color: '#c8d4f0', margin: 0, fontSize: '14px' }}>© 2025 Department of MCA, Malnad College of Engineering, Hassan. All Rights Reserved.</p>
        </div>
      </footer>

    </div>
  );
}

export default Home;
