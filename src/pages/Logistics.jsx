import React from 'react';

const Logistics = () => {
  return (
    <div style={styles.page}>
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.badgeContainer}>
            <span style={styles.topLabel}>V33 FLEET OPERATIONS</span>
          </div>
          <h1 style={styles.mainHeading}>LOGISTICS <span style={{ color: '#6EC1E4' }}>SYSTEMS.</span></h1>
        </div>
      </section>

      <main style={styles.content}>
        <div style={styles.grid}>
          {[
            { title: "HEAVY-LIFT TRANSPORT", desc: "Specialized hydraulic flatbeds for 15t+ payloads." },
            { title: "SATELLITE TRACKING", desc: "Real-time telemetry and GPS coordination." },
            { title: "SITE INTEGRATION", desc: "On-site assembly and technical calibration." },
            { title: "GLOBAL EXPORT", desc: "International shipping with customs clearance." }
          ].map((item, i) => (
            <div key={i} style={styles.card}>
              <h3 style={styles.cardTitle}>{item.title}</h3>
              <p style={styles.cardText}>{item.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

const styles = {
  page: { backgroundColor: '#050505', color: '#E5E5E5', minHeight: '100vh', paddingTop: '90px', fontFamily: 'sans-serif' },
  hero: { height: '20vh', display: 'flex', alignItems: 'center', padding: '0 8%', background: '#0A0A0A', borderBottom: '1px solid #111' },
  badgeContainer: { borderLeft: '2px solid #6EC1E4', paddingLeft: '12px' },
  topLabel: { color: '#6EC1E4', fontSize: '0.65rem', fontWeight: 'bold', letterSpacing: '2px' },
  mainHeading: { fontSize: '2.2rem', margin: '5px 0 0 0', fontWeight: '900' },
  
  content: { padding: '40px 8%', maxWidth: '1200px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' },
  card: { padding: '25px', backgroundColor: '#0F0F0F', border: '1px solid #1A1A1A' },
  cardTitle: { color: '#6EC1E4', marginBottom: '10px', fontSize: '0.9rem', fontWeight: 'bold', letterSpacing: '1px' },
  cardText: { fontSize: '0.8rem', lineHeight: '1.5', color: '#888' }
};

export default Logistics;