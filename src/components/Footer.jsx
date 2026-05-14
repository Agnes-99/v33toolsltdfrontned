import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        
        {/* Brand & Mission */}
        <div style={styles.section}>
          <h3 style={styles.logo}>V33 <span style={{ color: '#6EC1E4' }}>TOOLS</span></h3>
          <p style={styles.description}>
            Global leaders in high-pressure brick manufacturing technology and automated industrial solutions. 
            Engineered for durability. Built for dominance.
          </p>
        </div>

        {/* Quick Links */}
        <div style={styles.section}>
          <h4 style={styles.heading}>NAVIGATION</h4>
          <div style={styles.linkGrid}>
            <Link to="/" style={styles.link}>Inventory</Link>
            <Link to="/logistics" style={styles.link}>Logistics</Link>
            <Link to="/contact" style={styles.link}>Support</Link>
            <Link to="/login" style={styles.link}>Client Portal</Link>
          </div>
        </div>

        {/* Newsletter / Tactical Updates */}
        <div style={styles.section}>
          <h4 style={styles.heading}>TACTICAL UPDATES</h4>
          <p style={styles.subtext}>Receive technical specs and fleet arrivals.</p>
          <div style={styles.inputGroup}>
            <input placeholder="EMAIL ADDRESS" style={styles.input} />
            <button style={styles.button}>JOIN</button>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div style={styles.bottomBar}>
        <div style={styles.bottomContainer}>
          <span style={styles.copyright}>© 2026 V33 TOOLS LTD. ALL RIGHTS RESERVED.</span>
          <div style={styles.legalLinks}>
            <span style={styles.legal}>PRIVACY POLICY</span>
            <span style={styles.legal}>TERMS OF DEPLOYMENT</span>
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
    paddingTop: '60px',
    marginTop: 'auto',
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 8% 60px 8%',
    display: 'grid',
    gridTemplateColumns: '1.5fr 1fr 1.5fr',
    gap: '60px',
  },
  section: { display: 'flex', flexDirection: 'column' },
  logo: { fontSize: '1.2rem', fontWeight: '900', letterSpacing: '2px', color: '#FFF', margin: '0 0 20px 0' },
  description: { fontSize: '0.8rem', color: '#666', lineHeight: '1.6', maxWidth: '300px' },
  heading: { fontSize: '0.7rem', fontWeight: '800', color: '#6EC1E4', letterSpacing: '2px', margin: '0 0 25px 0' },
  linkGrid: { display: 'flex', flexDirection: 'column', gap: '12px' },
  link: { color: '#AAA', textDecoration: 'none', fontSize: '0.8rem', transition: '0.3s', fontWeight: '500' },
  subtext: { fontSize: '0.75rem', color: '#666', marginBottom: '15px' },
  inputGroup: { display: 'flex', height: '40px' },
  input: { 
    backgroundColor: '#0F0F0F', 
    border: '1px solid #222', 
    color: '#FFF', 
    padding: '0 15px', 
    fontSize: '0.7rem', 
    width: '100%',
    outline: 'none'
  },
  button: { 
    backgroundColor: '#6EC1E4', 
    border: 'none', 
    color: '#000', 
    padding: '0 20px', 
    fontSize: '0.7rem', 
    fontWeight: '900', 
    cursor: 'pointer' 
  },
  bottomBar: { borderTop: '1px solid #111', padding: '25px 0' },
  bottomContainer: { 
    maxWidth: '1400px', 
    margin: '0 auto', 
    padding: '0 8%', 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  copyright: { fontSize: '0.6rem', color: '#333', letterSpacing: '1px' },
  legalLinks: { display: 'flex', gap: '20px' },
  legal: { fontSize: '0.6rem', color: '#333', cursor: 'pointer', letterSpacing: '1px' }
};

export default Footer;