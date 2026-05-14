import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 968;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus('Please fill in all required fields.');
      return;
    }

    setStatus('Sending your message...');

    const templateParams = {
      from_name: form.name,
      company: form.company || 'N/A',
      email: form.email,
      message: form.message
    };

    Promise.all([
      emailjs.send('service_n9cx83w', 'template_s96p8bh', templateParams, '4tVID8nz0Nq51PPd1'),
      emailjs.send('service_n9cx83w', 'template_t3qjoz8', templateParams, '4tVID8nz0Nq51PPd1')
    ])
      .then(() => {
        setStatus('Thank you! Your message has been sent.');
        setForm({ name: '', company: '', email: '', message: '' });
      })
      .catch(() => setStatus('Sorry, something went wrong. Please try again.'));
  };

  return (
    <div style={styles.page}>
      {/* Hero Header */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.badgeContainer}>
            <span style={styles.topLabel}>HELP & SUPPORT</span>
          </div>
          <h1 style={styles.mainHeading}>
            CONTACT <span style={{ color: '#6EC1E4' }}>US.</span>
          </h1>
          <p style={styles.heroSubtext}>
            Have questions about our equipment or your order? Our team is here to help you 
            with everything from technical details to global shipping.
          </p>
        </div>
      </section>

      {/* Main Layout */}
      <main style={{
        ...styles.content,
        gridTemplateColumns: isMobile ? '1fr' : '1fr 350px',
        gap: isMobile ? '60px' : '100px'
      }}>
        
        {/* Left Side: Form & Map */}
        <div style={styles.leftColumn}>
          <form style={styles.formContainer} onSubmit={handleSubmit}>
            <h2 style={styles.sectionTitle}>SEND US A MESSAGE</h2>
            <div style={{...styles.formRow, flexDirection: isMobile ? 'column' : 'row'}}>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="YOUR NAME"
                style={styles.input}
              />
              <input
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="COMPANY NAME (OPTIONAL)"
                style={styles.input}
              />
            </div>

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="YOUR EMAIL ADDRESS"
              style={styles.input}
            />

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="HOW CAN WE HELP YOU?"
              style={styles.textarea}
            />

            <button type="submit" style={styles.btn}>
              SEND MESSAGE
            </button>

            {status && <p style={styles.statusMsg}>{status}</p>}
          </form>

          {/* Real Google Map Integration */}
          <div style={styles.mapContainer}>
            <h4 style={styles.infoLabel}>FIND OUR OFFICE</h4>
            <div style={styles.mapFrameWrapper}>
              <iframe
                title="V33 Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2489.378943719008!2d-2.9926839!3d51.5613303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4871e6992d9f459f%3A0x633f82298c47489!2sAlexandra%20Dock%2C%20Newport%20NP20%202NQ%2C%20UK!5e0!3m2!1sen!2sza!4v1715694200000!5m2!1sen!2sza"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Right Side: Sidebar Info */}
        <aside style={styles.infoColumn}>
          <div style={styles.infoBlock}>
            <h4 style={styles.infoLabel}>OUR ADDRESS</h4>
            <p style={styles.infoText}>
              Newport Point,<br />
              Alexandra Docks,<br />
              NP20 2NQ, Newport,<br />
              United Kingdom.
            </p>
          </div>

          <div style={styles.infoBlock}>
            <h4 style={styles.infoLabel}>CALL US</h4>
            <p style={styles.phoneNum}>+44 7933 631159</p>
            <span style={styles.availability}>OPEN MON - FRI: 08:00 - 18:00</span>
          </div>

          <div style={styles.infoBlock}>
            <h4 style={styles.infoLabel}>EMAIL US</h4>
            <p style={styles.infoText}>enquiriesvn@v33tools.com</p>
          </div>

          {/* FAQ & Support Section */}
          <div style={styles.quickHelpBox}>
            <h4 style={styles.helpTitle}>FREQUENTLY ASKED QUESTIONS</h4>
            
            <div style={styles.maintenanceNotice}>
              <span style={styles.maintenanceIcon}>🛠️</span>
              <p style={styles.maintenanceText}>
                Our full FAQ portal is currently under maintenance. 
                Please contact us directly for immediate support.
              </p>
            </div>

            <h4 style={{...styles.helpTitle, marginTop: '30px'}}>QUICK LINKS</h4>
            <ul style={styles.helpList}>
              <li style={styles.helpItem}>Track your shipping</li>
              <li style={styles.helpItem}>Request a price quote</li>
              <li style={styles.helpItem}>Technical support</li>
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
};

const styles = {
  page: { backgroundColor: '#FFFFFF', color: '#000', minHeight: '100vh', paddingTop: '120px', paddingBottom: '100px', fontFamily: '"Inter", sans-serif' },
  
  hero: { padding: '0 8%', marginBottom: '60px' },
  heroContent: { maxWidth: '1400px', margin: '0 auto' },
  badgeContainer: { borderLeft: '2px solid #6EC1E4', paddingLeft: '15px', marginBottom: '15px' },
  topLabel: { color: '#6EC1E4', fontSize: '0.65rem', fontWeight: '900', letterSpacing: '3px' },
  mainHeading: { fontSize: '2.4rem', margin: '0 0 20px 0', fontWeight: '900', letterSpacing: '-1px' },
  heroSubtext: { fontSize: '0.85rem', color: '#666', lineHeight: '1.7', maxWidth: '600px' },

  content: { maxWidth: '1400px', margin: '0 auto', padding: '0 8%', display: 'grid' },
  leftColumn: { display: 'flex', flexDirection: 'column', gap: '60px' },
  formContainer: { width: '100%' },
  sectionTitle: { fontSize: '0.65rem', letterSpacing: '3px', marginBottom: '35px', color: '#AAA', fontWeight: '900' },
  
  formRow: { display: 'flex', gap: '20px' },
  input: {
    width: '100%',
    padding: '16px',
    backgroundColor: '#FAFAFA',
    border: '1px solid #EEE',
    color: '#000',
    outline: 'none',
    marginBottom: '20px',
    fontSize: '0.75rem',
    fontWeight: '500',
  },
  textarea: {
    width: '100%',
    padding: '16px',
    backgroundColor: '#FAFAFA',
    border: '1px solid #EEE',
    color: '#000',
    outline: 'none',
    minHeight: '180px',
    marginBottom: '30px',
    fontSize: '0.75rem',
    resize: 'none',
    fontFamily: 'inherit'
  },
  btn: {
    backgroundColor: '#000',
    color: '#FFF',
    border: 'none',
    padding: '20px 45px',
    fontWeight: '900',
    cursor: 'pointer',
    letterSpacing: '2px',
    fontSize: '0.7rem'
  },
  statusMsg: { marginTop: '20px', fontSize: '0.7rem', color: '#6EC1E4', fontWeight: '800' },

  mapContainer: { width: '100%' },
  mapFrameWrapper: {
    width: '100%',
    height: '350px',
    backgroundColor: '#F5F5F5',
    border: '1px solid #EEE',
    overflow: 'hidden'
  },

  infoColumn: { display: 'flex', flexDirection: 'column' },
  infoBlock: { marginBottom: '45px' },
  infoLabel: { fontSize: '0.65rem', color: '#AAA', letterSpacing: '2px', marginBottom: '15px', fontWeight: '900' },
  infoText: { fontSize: '0.85rem', lineHeight: '1.8', color: '#333', fontWeight: '500' },
  phoneNum: { fontSize: '1.2rem', fontWeight: '900', margin: '0 0 5px 0' },
  availability: { fontSize: '0.6rem', color: '#6EC1E4', fontWeight: '800' },

  quickHelpBox: {
    backgroundColor: '#000',
    padding: '35px',
    color: '#FFF',
    marginTop: '20px'
  },
  helpTitle: { fontSize: '0.65rem', fontWeight: '900', letterSpacing: '2px', marginBottom: '20px', color: '#6EC1E4' },
  maintenanceNotice: {
    backgroundColor: '#111',
    padding: '20px',
    borderLeft: '2px solid #6EC1E4',
    marginTop: '10px'
  },
  maintenanceIcon: {
    fontSize: '1.2rem',
    display: 'block',
    marginBottom: '10px'
  },
  maintenanceText: {
    fontSize: '0.7rem',
    color: '#888',
    lineHeight: '1.5',
    margin: 0,
    fontWeight: '500'
  },
  helpList: { listStyle: 'none', padding: 0, margin: 0 },
  helpItem: { fontSize: '0.75rem', marginBottom: '12px', color: '#AAA', borderBottom: '1px solid #222', paddingBottom: '10px' }
};

export default Contact;