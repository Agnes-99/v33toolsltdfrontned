import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth <= 1024;

  const handleSubscribe = async () => {
    if (!email) {
      setStatus('Please enter your email address');
      return;
    }
    try {
      setStatus('Sending...');
      await addDoc(collection(db, 'subscribers'), {
        email,
        createdAt: new Date()
      });
      setEmail('');
      setStatus('Thank you for subscribing!');
    } catch (err) {
      console.error(err);
      setStatus('Something went wrong. Please try again.');
    }
  };

  return (
    <footer style={styles.footer}>
      <div style={{
        ...styles.container,
        gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1.5fr 1fr' : '1.5fr 1fr 1fr 1.5fr',
        gap: isMobile ? '40px' : '60px'
      }}>
        
        {/* Brand Section */}
        <div style={styles.section}>
          <h3 style={styles.logo}>
            V33 <span style={{ color: '#6EC1E4' }}>TOOLS</span>
          </h3>
          <p style={styles.description}>
            The global leader in high-pressure brick machines and industrial equipment. 
            Reliable, durable, and built to get the job done.
          </p>
          <div style={styles.paymentContainer}>
            <span style={styles.paymentTitle}>WE ACCEPT:</span>
            <div style={styles.paymentGrid}>
               <img src="https://cdn-icons-png.flaticon.com/512/349/349221.png" alt="Visa" style={styles.paymentIcon}/>
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" style={styles.paymentIcon}/>
              <img src="https://cdn-icons-png.flaticon.com/512/349/349225.png" alt="Amex" style={styles.paymentIcon}/>
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="Paypal" style={styles.paymentIcon}/>
              <div style={styles.eftBadge}>EFT</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div style={styles.section}>
          <h4 style={styles.heading}>QUICK LINKS</h4>
          <div style={styles.linkGrid}>
            <Link to="/" style={styles.link}>View Catalog</Link>
            <Link to="/logistics" style={styles.link}>Shipping & Logistics</Link>
            <Link to="/contact" style={styles.link}>Customer Support</Link>
          </div>
        </div>

        {/* Contact/Support */}
        {!isMobile && (
          <div style={styles.section}>
            <h4 style={styles.heading}>CONTACT US</h4>
            <div style={styles.linkGrid}>
              <span style={styles.contactItem}>Newport Point, Alexandra Docks, NP20 2NQ, UK</span>
              <span style={styles.contactItem}>Phone: +44 7933 631159</span>
              <span style={styles.contactItem}>Email: enquiriesvn@v33tools.com</span>
            </div>
          </div>
        )}

        {/* Newsletter */}
        <div style={styles.section}>
          <h4 style={styles.heading}>NEWS & UPDATES</h4>
          <p style={styles.subtext}>
            Get the latest equipment news and arrivals sent to your inbox.
          </p>

          <div style={styles.inputGroup}>
            <input
              placeholder="ENTER YOUR EMAIL"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
            <button onClick={handleSubscribe} style={styles.button}>
              SIGN UP
            </button>
          </div>

          {status && <p style={styles.status}>{status}</p>}
        </div>

      </div>

      {/* Bottom Bar */}
      <div style={styles.bottomBar}>
        <div style={{
          ...styles.bottomContainer,
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '20px' : '0'
        }}>
          <span style={styles.copyright}>
            © 2026 V33 TOOLS LTD. ALL RIGHTS RESERVED.
          </span>

          <div style={styles.legalLinks}>
            <span style={styles.legal}>PRIVACY POLICY</span>
            <span style={styles.legal}>TERMS & CONDITIONS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#050505',
    borderTop: '1px solid #111',
    paddingTop: '80px',
    marginTop: 'auto',
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 8% 80px 8%',
    display: 'grid',
  },
  section: { display: 'flex', flexDirection: 'column' },
  logo: {
    fontSize: '1.2rem',
    fontWeight: '900',
    letterSpacing: '2px',
    color: '#FFF',
    margin: '0 0 20px 0'
  },
  description: {
    fontSize: '0.8rem',
    color: '#777',
    lineHeight: '1.7',
    maxWidth: '320px',
    marginBottom: '30px'
  },
  paymentContainer: { marginTop: '10px' },
  paymentTitle: { fontSize: '0.6rem', color: '#555', fontWeight: '900', letterSpacing: '1px', marginBottom: '12px', display: 'block' },
  paymentGrid: { display: 'flex', gap: '18px', alignItems: 'center' },
  paymentIcon: { height: '20px', width: 'auto', display: 'block' }, // Increased height for visibility
  eftBadge: { fontSize: '0.6rem', fontWeight: '900', color: '#FFF', border: '1px solid #444', padding: '3px 7px', borderRadius: '2px' },
  heading: {
    fontSize: '0.7rem',
    fontWeight: '900',
    color: '#6EC1E4',
    letterSpacing: '1.5px',
    margin: '0 0 25px 0'
  },
  linkGrid: { display: 'flex', flexDirection: 'column', gap: '14px' },
  link: {
    color: '#999',
    textDecoration: 'none',
    fontSize: '0.8rem',
    fontWeight: '500',
    transition: 'color 0.2s ease'
  },
  contactItem: { color: '#666', fontSize: '0.75rem', fontWeight: '400', lineHeight: '1.5' },
  subtext: { fontSize: '0.75rem', color: '#666', marginBottom: '15px' },
  inputGroup: { display: 'flex', height: '48px' },
  input: {
    backgroundColor: '#0F0F0F',
    border: '1px solid #222',
    color: '#FFF',
    padding: '0 15px',
    fontSize: '0.75rem',
    width: '100%',
    outline: 'none'
  },
  button: {
    backgroundColor: '#6EC1E4',
    border: 'none',
    color: '#000',
    padding: '0 25px',
    fontSize: '0.7rem',
    fontWeight: '900',
    cursor: 'pointer',
    letterSpacing: '1px'
  },
  status: { marginTop: '12px', fontSize: '0.7rem', color: '#6EC1E4' },
  bottomBar: { borderTop: '1px solid #111', padding: '35px 0' },
  bottomContainer: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 8%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  copyright: { fontSize: '0.65rem', color: '#444', letterSpacing: '0.5px' },
  legalLinks: { display: 'flex', gap: '30px' },
  legal: { fontSize: '0.65rem', color: '#444', cursor: 'pointer', letterSpacing: '0.5px' }
};

export default Footer;