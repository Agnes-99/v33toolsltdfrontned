import React from 'react';

const Contact = () => {
  return (
    <div style={styles.page}>
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.badgeContainer}>
            <span style={styles.topLabel}>DIRECT UPLINK</span>
          </div>
          <h1 style={styles.mainHeading}>COMMAND <span style={{ color: '#6EC1E4' }}>CENTER.</span></h1>
        </div>
      </section>

      <main style={styles.content}>
        <div style={styles.formContainer}>
          <h2 style={styles.sectionTitle}>INITIATE INQUIRY</h2>
          <div style={styles.formRow}>
            <input placeholder="NAME" style={styles.input} />
            <input placeholder="ORGANIZATION" style={styles.input} />
          </div>
          <input placeholder="EMAIL ADDRESS" style={styles.input} />
          <textarea placeholder="PROJECT SPECIFICATIONS" style={styles.textarea}></textarea>
          <button style={styles.btn}>TRANSMIT MESSAGE</button>
        </div>

        <div style={styles.infoColumn}>
          <div style={styles.infoBlock}>
            <h4 style={styles.infoLabel}>HEADQUARTERS</h4>
            <p style={styles.infoText}>128 Industrial Loop, Sandton<br />Johannesburg, ZA</p>
          </div>
          <div style={styles.infoBlock}>
            <h4 style={styles.infoLabel}>TECH SUPPORT</h4>
            <p style={{ color: '#6EC1E4', fontWeight: 'bold', fontSize: '0.9rem' }}>+27 (0) 11 345 6789</p>
          </div>
        </div>
      </main>
    </div>
  );
};

const styles = {
  page: { backgroundColor: '#050505', color: '#E5E5E5', minHeight: '100vh', paddingTop: '90px', fontFamily: 'sans-serif' },
  hero: { height: '20vh', display: 'flex', alignItems: 'center', padding: '0 8%', background: '#0A0A0A', borderBottom: '1px solid #111' },
  heroContent: { maxWidth: '800px' },
  badgeContainer: { borderLeft: '2px solid #6EC1E4', paddingLeft: '12px' },
  topLabel: { color: '#6EC1E4', fontSize: '0.65rem', fontWeight: 'bold', letterSpacing: '2px' },
  mainHeading: { fontSize: '2.2rem', margin: '5px 0 0 0', fontWeight: '900', letterSpacing: '-1px' },
  
  content: { padding: '40px 8%', display: 'grid', gridTemplateColumns: '1fr 250px', gap: '60px', maxWidth: '1200px' },
  sectionTitle: { fontSize: '0.7rem', letterSpacing: '3px', marginBottom: '20px', color: '#444' },
  formRow: { display: 'flex', gap: '15px' },
  input: { width: '100%', padding: '12px', backgroundColor: '#0F0F0F', border: '1px solid #222', color: '#FFF', outline: 'none', marginBottom: '15px', fontSize: '0.8rem' },
  textarea: { width: '100%', padding: '12px', backgroundColor: '#0F0F0F', border: '1px solid #222', color: '#FFF', outline: 'none', minHeight: '100px', marginBottom: '20px', fontSize: '0.8rem', resize: 'none' },
  btn: { backgroundColor: '#6EC1E4', color: '#000', border: 'none', padding: '12px 30px', fontWeight: 'bold', cursor: 'pointer', letterSpacing: '1px', fontSize: '0.75rem' },
  
  infoBlock: { marginBottom: '30px' },
  infoLabel: { fontSize: '0.6rem', color: '#6EC1E4', letterSpacing: '2px', marginBottom: '8px' },
  infoText: { fontSize: '0.85rem', lineHeight: '1.4', opacity: 0.8 }
};

export default Contact;