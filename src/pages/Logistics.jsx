import React, { useState, useEffect } from 'react';

const About = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 768;

  return (
    <div style={styles.page}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.badgeContainer}>
            <span style={styles.topLabel}>V33 TOOLS LTD</span>
          </div>
          <h1 style={styles.mainHeading}>
            WE SELL IT. <span style={{ color: '#6EC1E4' }}>WE SHIP IT.</span>
          </h1>
          <p style={styles.heroSubtext}>
            Our mission is simple: To provide high-quality industrial tools and machinery 
            to anyone, anywhere in the world. From our warehouse in the UK to your 
            site, we handle the hard part.
          </p>
        </div>
      </section>

      {/* How It Works / Buying Process */}
      <main style={styles.content}>
        <h2 style={styles.sectionTitle}>OUR PROCESS</h2>
        <div style={styles.grid}>
          {[
            { 
              step: "01",
              title: "CHOOSE YOUR TOOLS", 
              desc: "Browse our live inventory of heavy-duty equipment. Everything you see is ready for purchase." 
            },
            { 
              step: "02",
              title: "SECURE PAYMENT", 
              desc: "Complete your order through our secure checkout. We accept global currencies and bank transfers." 
            },
            { 
              step: "03",
              title: "WORLDWIDE SHIPPING", 
              desc: "We ship from Alexandra Docks, Newport. We handle all export paperwork and customs for you." 
            },
            { 
              step: "04",
              title: "DOOR-TO-DOOR DELIVERY", 
              desc: "Whether it's a small tool or a 15-ton excavator, we deliver it directly to your job site." 
            }
          ].map((item, i) => (
            <div key={i} style={styles.card}>
              <span style={styles.stepNum}>{item.step}</span>
              <h3 style={styles.cardTitle}>{item.title}</h3>
              <p style={styles.cardText}>{item.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Global Shipping Note */}
      <section style={styles.shippingSection}>
        <div style={{...styles.content, display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', gap: '40px'}}>
            <div style={{flex: 1}}>
                <h2 style={styles.sectionTitle}>GLOBAL REACH</h2>
                <p style={styles.shippingText}>
                    Distance is not an issue. We have successfully shipped heavy machinery to 
                    clients across Europe, Africa, and Asia. Our logistics team specializes in 
                    moving large items across borders quickly and safely.
                </p>
            </div>
            <div style={styles.locationBox}>
                <h4 style={styles.locationTitle}>MAIN HUB</h4>
                <p style={styles.locationInfo}>Alexandra Docks, Newport, UK</p>
                <div style={styles.statusBadge}>ACTIVE EXPORTS</div>
            </div>
        </div>
      </section>

      {/* Final Mission Note */}
      <div style={styles.footerNote}>
        <p style={styles.missionFinal}>"Building the world by moving the tools that do the work."</p>
        <button style={styles.shopBtn} onClick={() => window.location.href='/'}>
            START SHOPPING
        </button>
      </div>
    </div>
  );
};

const styles = {
  page: { backgroundColor: '#FFFFFF', color: '#000', minHeight: '100vh', paddingTop: '120px', paddingBottom: '100px', fontFamily: '"Inter", sans-serif' },
  
  hero: { padding: '0 8%', marginBottom: '80px' },
  heroContent: { maxWidth: '1400px', margin: '0 auto' },
  badgeContainer: { borderLeft: '2px solid #6EC1E4', paddingLeft: '15px', marginBottom: '15px' },
  topLabel: { color: '#6EC1E4', fontSize: '0.65rem', fontWeight: '900', letterSpacing: '3px' },
  mainHeading: { fontSize: '3rem', margin: '0 0 20px 0', fontWeight: '900', letterSpacing: '-1.5px' },
  heroSubtext: { fontSize: '1rem', color: '#555', lineHeight: '1.6', maxWidth: '700px' },

  content: { maxWidth: '1400px', margin: '0 auto', padding: '0 8%' },
  sectionTitle: { fontSize: '0.65rem', letterSpacing: '3px', marginBottom: '40px', color: '#AAA', fontWeight: '900' },
  
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' },
  card: { padding: '40px 30px', backgroundColor: '#FAFAFA', border: '1px solid #EEE' },
  stepNum: { display: 'block', fontSize: '0.7rem', color: '#6EC1E4', fontWeight: '900', marginBottom: '15px' },
  cardTitle: { fontSize: '0.85rem', fontWeight: '900', marginBottom: '15px', letterSpacing: '1px' },
  cardText: { fontSize: '0.85rem', lineHeight: '1.6', color: '#666' },

  shippingSection: { marginTop: '100px', padding: '80px 0', borderTop: '1px solid #EEE', borderBottom: '1px solid #EEE', backgroundColor: '#FFF' },
  shippingText: { fontSize: '1.1rem', lineHeight: '1.8', color: '#333', maxWidth: '600px' },
  
  locationBox: { padding: '40px', backgroundColor: '#000', color: '#FFF', flexShrink: 0, minWidth: '300px' },
  locationTitle: { fontSize: '0.6rem', color: '#6EC1E4', letterSpacing: '2px', fontWeight: '900', marginBottom: '10px' },
  locationInfo: { fontSize: '1rem', fontWeight: '700', marginBottom: '20px' },
  statusBadge: { fontSize: '0.6rem', padding: '5px 10px', border: '1px solid #6EC1E4', display: 'inline-block', fontWeight: '900' },

  footerNote: { marginTop: '100px', textAlign: 'center', padding: '0 8%' },
  missionFinal: { fontSize: '1.2rem', fontStyle: 'italic', color: '#AAA', marginBottom: '40px' },
  shopBtn: { backgroundColor: '#000', color: '#FFF', border: 'none', padding: '20px 40px', fontWeight: '900', fontSize: '0.7rem', letterSpacing: '2px', cursor: 'pointer' }
};

export default About;