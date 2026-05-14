import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { requestPasswordReset, resetPassword } from '../api/authService';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token'); // Check if user clicked a link from their email

  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleRequest = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await requestPasswordReset(email);
      setMessage({ type: 'success', text: 'ACCESS LINK SENT. CHECK YOUR INBOX.' });
    } catch (err) {
      setMessage({ type: 'error', text: 'RECOVERY FAILED. EMAIL NOT FOUND.' });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await resetPassword(token, newPassword);
      setMessage({ type: 'success', text: 'ENCRYPTION UPDATED. REDIRECTING...' });
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setMessage({ type: 'error', text: 'LINK EXPIRED. PLEASE REQUEST A NEW ONE.' });
    } finally {
      setLoading(false);
    }
  };

  const isMobile = windowWidth <= 600;

  return (
    <div style={styles.page}>
      <div style={{...styles.container, width: isMobile ? '90%' : '450px'}}>
        <div style={styles.header}>
          <div style={styles.pulseDot}></div>
          <h2 style={styles.title}>{token ? "RESET_KEY" : "RECOVER_ACCESS"}</h2>
        </div>

        <p style={styles.desc}>
          {token 
            ? "Token verified. Enter a new security key to regain entry." 
            : "Enter your registered email address to receive a secure recovery link."}
        </p>

        {message.text && (
          <div style={{
            ...styles.banner, 
            color: message.type === 'error' ? '#FF4D4D' : '#6EC1E4',
            borderColor: message.type === 'error' ? '#FF4D4D' : '#6EC1E4'
          }}>
            {message.text}
          </div>
        )}

        <form onSubmit={token ? handleReset : handleRequest} style={styles.form}>
          {token ? (
            <div style={styles.inputGroup}>
              <label style={styles.label}>NEW_SECURITY_KEY</label>
              <input 
                type="password" 
                required 
                style={styles.input} 
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          ) : (
            <div style={styles.inputGroup}>
              <label style={styles.label}>REGISTERED_EMAIL</label>
              <input 
                type="email" 
                required 
                style={styles.input} 
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          )}

          <button type="submit" disabled={loading} style={styles.btn}>
            {loading ? "PROCESSING..." : (token ? "UPDATE KEY" : "SEND RECOVERY LINK")}
          </button>
        </form>

        <button onClick={() => navigate('/login')} style={styles.backLink}>
          RETURN TO PORTAL_
        </button>
      </div>
    </div>
  );
};

const styles = {
  page: { backgroundColor: '#000', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace' },
  container: { backgroundColor: '#0A0A0A', border: '1px solid #1A1A1A', padding: '40px' },
  header: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' },
  pulseDot: { width: '8px', height: '8px', backgroundColor: '#6EC1E4', borderRadius: '50%' },
  title: { color: '#FFF', fontSize: '1.2rem', fontWeight: '900', letterSpacing: '2px', margin: 0 },
  desc: { color: '#666', fontSize: '0.75rem', lineHeight: '1.6', marginBottom: '30px' },
  banner: { padding: '12px', borderLeft: '2px solid', fontSize: '0.7rem', fontWeight: '900', marginBottom: '25px', backgroundColor: 'rgba(255,255,255,0.02)' },
  form: { display: 'flex', flexDirection: 'column', gap: '20px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
  label: { color: '#333', fontSize: '0.65rem', fontWeight: '900' },
  input: { backgroundColor: '#111', border: '1px solid #222', color: '#FFF', padding: '14px', fontSize: '0.9rem', outline: 'none' },
  btn: { backgroundColor: '#FFF', color: '#000', border: 'none', padding: '16px', fontWeight: '900', fontSize: '0.8rem', cursor: 'pointer', letterSpacing: '1px' },
  backLink: { background: 'none', border: 'none', color: '#444', fontSize: '0.6rem', marginTop: '25px', cursor: 'pointer', fontWeight: '900', textAlign: 'center', width: '100%' }
};

export default ResetPassword;