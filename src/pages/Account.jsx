import React from 'react';
import { useNavigate } from 'react-router-dom';

const Account = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        
        {/* Page Header */}
        <header style={styles.header}>
          <h1 style={styles.title}>Account Settings</h1>
          <p style={styles.subtitle}>Manage your profile and shipping endpoints.</p>
        </header>

        <div style={styles.mainGrid}>
          
          {/* PROFILE SECTION (Locked) */}
          <div style={styles.column}>
            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>Profile Information</h2>
              <div style={styles.card}>
                <div style={styles.maintenanceOverlay}>
                  <p style={styles.maintenanceText}>
                    <strong>System Update</strong><br />
                    Profile editing is temporarily disabled.
                  </p>
                </div>
                <div style={{ opacity: 0.3 }}>
                  <div style={styles.infoGroup}>
                    <label style={styles.label}>Full Name</label>
                    <p style={styles.text}>Loading...</p>
                  </div>
                  <div style={styles.infoGroup}>
                    <label style={styles.label}>Email Address</label>
                    <p style={styles.text}>Loading...</p>
                  </div>
                </div>
              </div>
            </section>

            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>Security</h2>
              <div style={styles.card}>
                <div style={styles.maintenanceBox}>
                  <p style={styles.maintenanceText}>
                    <strong>Notice:</strong> The account dashboard and password reset tools are under maintenance to improve data security.
                  </p>
                </div>
                <button style={styles.disabledBtn} disabled>Change Password</button>
              </div>
            </section>
          </div>

          {/* ADDRESS SECTION (Locked) */}
          <div style={styles.column}>
            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>Shipping Addresses</h2>
              <div style={styles.card}>
                <div style={styles.maintenanceOverlay}>
                   <p style={styles.maintenanceText}>Updating address systems...</p>
                </div>
                <div style={{ opacity: 0.3 }}>
                  <p style={styles.text}>123 Fleet Street</p>
                  <p style={styles.smallText}>Cape Town, Western Cape</p>
                </div>
              </div>
            </section>

            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>Order History</h2>
              <div style={styles.card}>
                <div style={styles.emptyState}>
                  <p style={styles.smallText}>Order tracking will return shortly.</p>
                  <button onClick={() => navigate('/')} style={styles.primaryBtn}>
                    Return to Store
                  </button>
                </div>
              </div>
            </section>
          </div>

        </div>

        <footer style={styles.footer}>
          <button onClick={() => navigate('/')} style={styles.backBtn}>
            ← Back to Home
          </button>
        </footer>
      </div>
    </div>
  );
};

const styles = {
  page: { 
    backgroundColor: '#FFFFFF', 
    minHeight: '100vh', 
    padding: '140px 20px 80px 20px', 
    color: '#000', 
    fontFamily: 'sans-serif' 
  },
  container: { 
    maxWidth: '1100px', 
    margin: '0 auto' 
  },
  header: { 
    borderBottom: '1px solid #EAEAEA', 
    paddingBottom: '30px', 
    marginBottom: '40px' 
  },
  title: { 
    fontSize: '32px', 
    fontWeight: '700', 
    margin: '0 0 8px 0', 
    letterSpacing: '-0.5px' 
  },
  subtitle: { 
    fontSize: '16px', 
    color: '#666' 
  },
  mainGrid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
    gap: '40px' 
  },
  column: { 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '40px' 
  },
  section: { 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '15px' 
  },
  sectionTitle: { 
    fontSize: '12px', 
    fontWeight: '800', 
    textTransform: 'uppercase', 
    letterSpacing: '1px', 
    color: '#999' 
  },
  card: { 
    position: 'relative',
    border: '1px solid #EAEAEA', 
    padding: '30px', 
    borderRadius: '2px', 
    backgroundColor: '#FFF',
    overflow: 'hidden'
  },
  maintenanceOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '20px'
  },
  infoGroup: { 
    marginBottom: '20px' 
  },
  label: { 
    display: 'block', 
    fontSize: '11px', 
    fontWeight: '700', 
    color: '#CCC', 
    marginBottom: '4px', 
    textTransform: 'uppercase' 
  },
  text: { 
    fontSize: '16px', 
    fontWeight: '500', 
    margin: '2px 0', 
    color: '#111' 
  },
  smallText: { 
    fontSize: '14px', 
    color: '#666', 
    margin: '1px 0' 
  },
  maintenanceBox: { 
    backgroundColor: '#F9F9F9', 
    padding: '15px', 
    borderLeft: '3px solid #6EC1E4', 
    marginBottom: '20px' 
  },
  maintenanceText: { 
    fontSize: '13px', 
    lineHeight: '1.6', 
    color: '#444',
    margin: 0
  },
  disabledBtn: { 
    backgroundColor: '#FFF', 
    color: '#CCC', 
    border: '1px solid #EEE', 
    padding: '12px', 
    width: '100%', 
    cursor: 'not-allowed',
    fontWeight: '700'
  },
  primaryBtn: { 
    backgroundColor: '#000', 
    color: '#FFF', 
    border: 'none', 
    padding: '14px', 
    fontWeight: '700', 
    width: '100%', 
    cursor: 'pointer' 
  },
  emptyState: { 
    textAlign: 'center' 
  },
  footer: { 
    marginTop: '60px', 
    paddingTop: '30px', 
    borderTop: '1px solid #EAEAEA' 
  },
  backBtn: { 
    background: 'none', 
    border: 'none', 
    color: '#000', 
    fontSize: '14px', 
    fontWeight: '600', 
    cursor: 'pointer' 
  }
};

export default Account;