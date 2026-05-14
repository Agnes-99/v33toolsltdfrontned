import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { login, register } from '../api/authService';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    emailAddress: '',
    password: ''
  });

  // 1. LIVE VALIDATION STATE
  const [validation, setValidation] = useState({
    password: { min: false, digit: false, letter: false },
    phone: false
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/register') setIsLogin(false);
    else if (location.pathname === '/login') setIsLogin(true);
  }, [location.pathname]);

  // 2. LIVE DIAGNOSTIC LOGIC
  const handleInputChange = (e, field) => {
    const val = e.target.value;
    setFormData({ ...formData, [field]: val });

    if (field === 'password') {
      setValidation(prev => ({
        ...prev,
        password: {
          min: val.length >= 8,
          digit: /\d/.test(val),
          letter: /[A-Za-z]/.test(val)
        }
      }));
    }

    if (field === 'phoneNumber') {
      // Matches Helper.java SA Regex: ^(\+27|0)[6-8][0-9]{8}$
      setValidation(prev => ({
        ...prev,
        phone: /^(\+27|0)[6-8][0-9]{8}$/.test(val)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent submission if registration requirements are not met
    if (!isLogin) {
      const { min, digit, letter } = validation.password;
      if (!min || !digit || !letter || !validation.phone) {
        setError("SYSTEM_REJECTION: ENCRYPTION REQUIREMENTS NOT MET.");
        return;
      }
    }

    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        await login(formData.emailAddress, formData.password);
        navigate('/');
      } else {
        await register(formData);
        alert("REGISTRATION COMPLETE. ACCESS GRANTED.");
        setIsLogin(true);
      }
    } catch (err) {
      setError(err?.response?.data?.message || "AUTHENTICATION FAILURE.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.landscapeContainer}>
        
        {/* LEFT: TECH SPECS SIDE */}
        <div style={styles.brandingSide}>
          <div style={styles.statusBadge}>
            <div style={styles.pulseDot}></div>
            <span>V33 SECURE NODE // 2026</span>
          </div>
          
          <div style={styles.heroText}>
            <h1 style={styles.logoText}>V33 <span style={{ color: '#6EC1E4' }}>PORTAL</span></h1>
            <p style={styles.description}>
              {isLogin 
                ? "AUTHORIZED PERSONNEL ONLY. ENTER CREDENTIALS TO ACCESS GLOBAL INVENTORY."
                : "INITIALIZE CLIENT PROFILE. ALL DATA FIELDS MUST MEET SYSTEM STANDARDS."}
            </p>
          </div>

          <div style={styles.techReadout}>
            <div style={styles.readoutItem}>
              <span style={styles.readoutLabel}>SYSTEM</span>
              <span style={styles.readoutValue}>ACTIVE</span>
            </div>
            <div style={styles.readoutItem}>
              <span style={styles.readoutLabel}>VALIDATION</span>
              <span style={{...styles.readoutValue, color: error ? '#FF4D4D' : '#6EC1E4'}}>
                {error ? "FAIL_401" : "STANDBY"}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT: INTERFACE SIDE */}
        <div style={styles.interfaceSide}>
          <div style={styles.tabHeader}>
            <button 
              type="button"
              onClick={() => setIsLogin(true)} 
              style={{...styles.tab, color: isLogin ? '#6EC1E4' : '#444'}}
            >
              01_LOGIN {isLogin && <div style={styles.activeLine} />}
            </button>
            <button 
              type="button"
              onClick={() => setIsLogin(false)} 
              style={{...styles.tab, color: !isLogin ? '#6EC1E4' : '#444'}}
            >
              02_REGISTER {!isLogin && <div style={styles.activeLine} />}
            </button>
          </div>

          <form style={styles.form} onSubmit={handleSubmit}>
            {error && <div style={styles.errorBanner}>{error}</div>}

            <div style={styles.inputGrid}>
              {!isLogin && (
                <>
                  <div style={styles.inputWrapper}>
                    <label style={styles.label}>FIRST_NAME</label>
                    <input type="text" required style={styles.input} onChange={(e) => handleInputChange(e, 'firstName')} />
                  </div>
                  <div style={styles.inputWrapper}>
                    <label style={styles.label}>LAST_NAME</label>
                    <input type="text" required style={styles.input} onChange={(e) => handleInputChange(e, 'lastName')} />
                  </div>
                </>
              )}

              <div style={{...styles.inputWrapper, gridColumn: 'span 2'}}>
                <label style={styles.label}>EMAIL_ADDRESS</label>
                <input type="email" required style={styles.input} onChange={(e) => handleInputChange(e, 'emailAddress')} />
              </div>

              {!isLogin && (
                <div style={{...styles.inputWrapper, gridColumn: 'span 2'}}>
                  <label style={styles.label}>PHONE_NUMBER</label>
                  <input type="tel" required style={styles.input} onChange={(e) => handleInputChange(e, 'phoneNumber')} />
                  <div style={styles.rulesContainer}>
                    <span style={{...styles.rule, color: validation.phone ? '#6EC1E4' : '#333'}}>
                       {validation.phone ? "[VALID_FORMAT]" : "[EXPECT_0xx_OR_+27]"}
                    </span>
                  </div>
                </div>
              )}

              <div style={{...styles.inputWrapper, gridColumn: 'span 2'}}>
                <label style={styles.label}>SECURITY_KEY</label>
                <input type="password" required style={styles.input} onChange={(e) => handleInputChange(e, 'password')} />
                
                {!isLogin && (
                <div style={styles.rulesContainer}>
                  <span style={{...styles.rule, color: validation.password.min ? '#6EC1E4' : '#333'}}>[8_CHARS]</span>
                  <span style={{...styles.rule, color: validation.password.letter ? '#6EC1E4' : '#333'}}>[LETTERS]</span>
                  <span style={{...styles.rule, color: validation.password.digit ? '#6EC1E4' : '#333'}}>[NUMBERS]</span>
                </div>
                )}
              </div>
            </div>

            <button type="submit" disabled={loading} style={styles.submitBtn}>
              {loading ? "INITIALIZING..." : (isLogin ? "EXECUTE LOGIN" : "INITIALIZE ACCOUNT")}
            </button>

            {isLogin && <Link to="/reset" style={styles.forgot}>RECOVER ACCESS_</Link>}
          </form>
        </div>

      </div>
    </div>
  );
};

// 3. COMPLETE STYLE OBJECT
const styles = {
  page: { backgroundColor: '#000', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Inter", sans-serif', padding: '20px' },
  landscapeContainer: { display: 'grid', gridTemplateColumns: '1fr 1.2fr', width: '100%', maxWidth: '1100px', height: '620px', backgroundColor: '#050505', border: '1px solid #111' },
  brandingSide: { padding: '60px', backgroundColor: '#080808', borderRight: '1px solid #111', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
  statusBadge: { display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.6rem', color: '#444', letterSpacing: '2px', fontWeight: '800' },
  pulseDot: { width: '6px', height: '6px', backgroundColor: '#6EC1E4', borderRadius: '50%', boxShadow: '0 0 8px #6EC1E4' },
  logoText: { fontSize: '1.8rem', fontWeight: '900', color: '#FFF', letterSpacing: '3px', margin: '0 0 20px 0' },
  description: { fontSize: '0.75rem', color: '#666', lineHeight: '1.8', maxWidth: '300px', textTransform: 'uppercase' },
  techReadout: { display: 'flex', gap: '40px' },
  readoutItem: { display: 'flex', flexDirection: 'column', gap: '5px' },
  readoutLabel: { fontSize: '0.55rem', color: '#333', fontWeight: '900' },
  readoutValue: { fontSize: '0.7rem', color: '#6EC1E4', fontWeight: '700', fontFamily: 'monospace' },
  interfaceSide: { padding: '40px 80px', display: 'flex', flexDirection: 'column' },
  tabHeader: { display: 'flex', gap: '40px', marginBottom: '40px' },
  tab: { background: 'none', border: 'none', fontSize: '0.7rem', fontWeight: '900', letterSpacing: '2px', cursor: 'pointer', padding: '0 0 10px 0', position: 'relative' },
  activeLine: { position: 'absolute', bottom: 0, left: 0, width: '100%', height: '2px', backgroundColor: '#6EC1E4' },
  form: { display: 'flex', flexDirection: 'column', gap: '20px' },
  inputGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' },
  inputWrapper: { display: 'flex', flexDirection: 'column', gap: '8px' },
  label: { fontSize: '0.6rem', fontWeight: '900', color: '#333', letterSpacing: '1px' },
  input: { backgroundColor: '#0F0F0F', border: '1px solid #222', color: '#FFF', padding: '12px 15px', fontSize: '0.8rem', outline: 'none', fontFamily: 'monospace' },
  submitBtn: { backgroundColor: '#6EC1E4', color: '#000', border: 'none', padding: '16px', fontSize: '0.75rem', fontWeight: '900', letterSpacing: '2px', cursor: 'pointer', marginTop: '10px', transition: '0.3s' },
  errorBanner: { fontSize: '0.7rem', color: '#FF4D4D', borderLeft: '2px solid #FF4D4D', paddingLeft: '10px', fontWeight: 'bold' },
  forgot: { textAlign: 'center', fontSize: '0.6rem', color: '#333', textDecoration: 'none', fontWeight: '800', letterSpacing: '1px', marginTop: '10px' },
  rulesContainer: { display: 'flex', gap: '12px', marginTop: '4px' },
  rule: { fontSize: '0.55rem', fontWeight: '900', fontFamily: 'monospace', letterSpacing: '1px', transition: 'color 0.3s ease' }
};

export default Auth;