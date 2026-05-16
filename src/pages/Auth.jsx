import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { login, register } from '../api/authService';
import { useCart } from '../context/CartContext';

const countryCodes = [
  { code: '+27', label: 'South Africa 🇿🇦' },
  { code: '+44', label: 'United Kingdom 🇬🇧' },
  { code: '+1',  label: 'USA 🇺🇸' },
  { code: '+61', label: 'Australia 🇦🇺' },
  { code: '+91', label: 'India 🇮🇳' },
  { code: '+234', label: 'Nigeria 🇳🇬' },
  { code: '+254', label: 'Kenya 🇰🇪' },
  { code: '+263', label: 'Zimbabwe 🇿🇼' },
].sort((a, b) => a.label.localeCompare(b.label));

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('+27');
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);
  const { refreshCart } = useCart();
  
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', phoneNumber: '', emailAddress: '', password: ''
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const navigate = useNavigate();
  const location = useLocation();

  // Safely check if the user was just redirected here from a successful registration attempt
  const isAccountCreated = location.state?.accountCreated;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setIsLogin(location.pathname !== '/register');
    setValidationErrors({});
    setServerError(null);
  }, [location.pathname]);

  const validateField = (name, value) => {
    let error = "";
    if (name === 'emailAddress') {
      const regex = /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/;
      if (!regex.test(value)) error = "Invalid email";
    }
    if (name === 'password') {
      const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      if (!regex.test(value)) error = "Requires 8+ characters, letters and numbers only (no symbols)";
    }
    if (!isLogin && (name === 'firstName' || name === 'lastName')) {
      if (!value.trim()) error = "Required";
    }
    if (!isLogin && name === 'phoneNumber') {
      if (value.length < 7) error = "Invalid number";
    }
    return error;
  };

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
    const error = validateField(field, value);
    setValidationErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    Object.keys(formData).forEach(key => {
      if (isLogin && (key === 'firstName' || key === 'lastName' || key === 'phoneNumber')) return;
      const error = validateField(key, formData[key]);
      if (error) errors[key] = error;
    });

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setLoading(true);
    setServerError(null);

    try {
      if (isLogin) {
        const response = await login(formData.emailAddress, formData.password);
        if (response?.token) {
          await refreshCart(); 
          navigate('/');
        }
      } else {
        const finalData = {
          ...formData,
          phoneNumber: `${selectedCountry}${formData.phoneNumber}`
        };
        await register(finalData);
        
        // Pass temporary state flags during the programmatic switch over to the login pathing
        navigate('/login', { state: { accountCreated: true } });
      }
    } catch (err) {
      setServerError("Account check failed. Verify your details and try again.");
    } finally {
      setLoading(false);
    }
  };

  const isMobile = windowWidth <= 850;

  return (
    <div style={styles.page}>
      <div style={{
        ...styles.container,
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1.35fr',
        maxWidth: isMobile ? '430px' : '1020px', // Zoomed in slightly to feel more balanced and present
      }}>
        
        {/* LEFT PANEL */}
        {!isMobile && (
          <div style={styles.brandingSide}>
            <div style={styles.statusBadge}>
              <div style={styles.pulseDot}></div>
              <span>OFFICIAL V33 PORTAL</span>
            </div>
            
            <div style={styles.brandingContent}>
              <h1 style={styles.logoText}>V33 <span style={{ color: '#6EC1E4' }}>TOOLS</span></h1>
              <div style={styles.accentLine} />
              <p style={styles.description}>
                Access the professional fleet management dashboard and manage your industrial orders.
              </p>
            </div>

            <div style={styles.footerReadout}>
              <div style={styles.readoutItem}>
                <span style={styles.readoutLabel}>SUPPORT</span>
                <span style={styles.readoutValue}>24/7 LIVE</span>
              </div>
              <div style={styles.readoutItem}>
                <span style={styles.readoutLabel}>SYSTEM</span>
                <span style={styles.readoutValue}>VERIFIED</span>
              </div>
            </div>
          </div>
        )}

        {/* RIGHT PANEL */}
        <div style={{...styles.interfaceSide, padding: isMobile ? '45px 30px' : '60px 80px'}}>
          <div style={styles.tabHeader}>
            <button onClick={() => navigate('/login')} 
              style={{...styles.tab, color: isLogin ? '#FFF' : '#444'}}>
              SIGN IN {isLogin && <div style={styles.activeLine} />}
            </button>
            <button onClick={() => navigate('/register')} 
              style={{...styles.tab, color: !isLogin ? '#FFF' : '#444'}}>
              REGISTER {!isLogin && <div style={styles.activeLine} />}
            </button>
          </div>

          <form style={styles.form} onSubmit={handleSubmit} noValidate>
            
            {/* DYNAMIC SUCCESS BANNER */}
            {isLogin && isAccountCreated && !serverError && (
              <div style={styles.successBanner}>
                Registration successful. Please use your registered email and password below to log in.
              </div>
            )}

            {serverError && <div style={styles.serverError}>{serverError}</div>}

            <div style={{...styles.inputGrid, gridTemplateColumns: (isMobile || isLogin) ? '1fr' : '1fr 1fr'}}>
              {!isLogin && (
                <>
                  <div style={styles.inputWrapper}>
                    <label style={styles.label}>FIRST NAME <span style={styles.errorSpan}>{validationErrors.firstName}</span></label>
                    <input type="text" placeholder="John" style={{...styles.input, borderColor: validationErrors.firstName ? '#FF4D4D' : '#222'}} onChange={(e) => handleInputChange(e, 'firstName')} />
                  </div>
                  <div style={styles.inputWrapper}>
                    <label style={styles.label}>LAST NAME <span style={styles.errorSpan}>{validationErrors.lastName}</span></label>
                    <input type="text" placeholder="Doe" style={{...styles.input, borderColor: validationErrors.lastName ? '#FF4D4D' : '#222'}} onChange={(e) => handleInputChange(e, 'lastName')} />
                  </div>
                </>
              )}

              <div style={{...styles.inputWrapper, gridColumn: (isMobile || isLogin) ? 'auto' : 'span 2'}}>
                <label style={styles.label}>EMAIL ADDRESS <span style={styles.errorSpan}>{validationErrors.emailAddress}</span></label>
                <input type="email" placeholder="name@domain.com" style={{...styles.input, borderColor: validationErrors.emailAddress ? '#FF4D4D' : '#222'}} onChange={(e) => handleInputChange(e, 'emailAddress')} />
              </div>

              {!isLogin && (
                <div style={{...styles.inputWrapper, gridColumn: (isMobile || isLogin) ? 'auto' : 'span 2'}}>
                  <label style={styles.label}>PHONE NUMBER <span style={styles.errorSpan}>{validationErrors.phoneNumber}</span></label>
                  <div style={styles.phoneGroup}>
                    <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} style={styles.countryDropdown}>
                      {countryCodes.map(c => <option key={c.label} value={c.code}>{c.label}</option>)}
                    </select>
                    <input type="tel" placeholder="72 123 4567" style={{...styles.input, flex: 1, borderColor: validationErrors.phoneNumber ? '#FF4D4D' : '#222'}} onChange={(e) => handleInputChange(e, 'phoneNumber')} />
                  </div>
                </div>
              )}

              <div style={{...styles.inputWrapper, gridColumn: (isMobile || isLogin) ? 'auto' : 'span 2', position: 'relative'}}>
                <label style={styles.label}>PASSWORD <span style={styles.errorSpan}>{validationErrors.password}</span></label>
                <input type={showPassword ? "text" : "password"} placeholder="••••••••" style={{...styles.input, borderColor: validationErrors.password ? '#FF4D4D' : '#222'}} onChange={(e) => handleInputChange(e, 'password')} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={styles.showBtn}>{showPassword ? "HIDE" : "SHOW"}</button>
              </div>
            </div>

            {isLogin && (
              <div style={styles.forgotContainer}>
                <button type="button" onClick={() => setShowMaintenanceModal(true)} style={styles.forgotBtn}>
                  Forgot Password?
                </button>
              </div>
            )}

            <button type="submit" disabled={loading} style={styles.submitBtn}>
              {loading ? "PROCESSING..." : (isLogin ? "SIGN IN" : "CREATE ACCOUNT")}
            </button>
          </form>
        </div>
      </div>

      {/* INLINE MAINTENANCE MODAL */}
      {showMaintenanceModal && (
        <div style={styles.modalOverlay} onClick={() => setShowMaintenanceModal(false)}>
          <div style={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <h4 style={styles.modalTitle}>System Maintenance</h4>
            <p style={styles.modalText}>
              The password reset module is currently offline for scheduled updates. Please reach out directly to your account representative or system administrator for login recovery support.
            </p>
            <button onClick={() => setShowMaintenanceModal(false)} style={styles.modalCloseBtn}>
              Acknowledge
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  page: { 
    backgroundColor: '#000', 
    minHeight: '100vh', 
    display: 'flex', 
    alignItems: 'flex-start', 
    justifyContent: 'center', 
    fontFamily: 'system-ui, -apple-system, sans-serif', 
    padding: '130px 20px 60px 20px', 
    boxSizing: 'border-box'
  },
  container: { 
    display: 'grid', 
    width: '100%', 
    backgroundColor: '#070707', 
    border: '1px solid #141414', 
    boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
    overflow: 'hidden'
  },
  brandingSide: { 
    padding: '50px', 
    backgroundColor: '#090909', 
    borderRight: '1px solid #141414', 
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'space-between' 
  },
  statusBadge: { display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.75rem', color: '#444', fontWeight: 'bold', letterSpacing: '1.5px' },
  pulseDot: { width: '6px', height: '6px', backgroundColor: '#6EC1E4', borderRadius: '50%', boxShadow: '0 0 8px #6EC1E4' },
  logoText: { fontSize: '2.6rem', fontWeight: '900', color: '#FFF', margin: 0 },
  accentLine: { width: '35px', height: '2px', backgroundColor: '#6EC1E4', margin: '18px 0' },
  description: { fontSize: '1rem', color: '#666', lineHeight: '1.6', maxWidth: '250px' },
  footerReadout: { display: 'flex', gap: '30px', borderTop: '1px solid #141414', paddingTop: '25px' },
  readoutItem: { display: 'flex', flexDirection: 'column', gap: '3px' },
  readoutLabel: { fontSize: '0.65rem', color: '#2b2b2b', fontWeight: '900' },
  readoutValue: { fontSize: '0.8rem', color: '#6EC1E4', fontWeight: '600' },
  interfaceSide: { display: 'flex', flexDirection: 'column', justifyContent: 'center' },
  tabHeader: { display: 'flex', gap: '35px', marginBottom: '35px' },
  tab: { background: 'none', border: 'none', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', padding: '0 0 8px 0', position: 'relative', letterSpacing: '0.5px' },
  activeLine: { position: 'absolute', bottom: 0, left: 0, width: '100%', height: '2px', backgroundColor: '#6EC1E4' },
  form: { display: 'flex', flexDirection: 'column', gap: '22px' },
  serverError: { padding: '14px', borderLeft: '3px solid #FF4D4D', color: '#FF4D4D', fontSize: '0.85rem', backgroundColor: 'rgba(255, 77, 77, 0.03)' },
  successBanner: { padding: '14px', borderLeft: '3px solid #6EC1E4', color: '#6EC1E4', fontSize: '0.85rem', backgroundColor: 'rgba(110, 193, 228, 0.03)', lineHeight: '1.4' },
  inputGrid: { display: 'grid', gap: '18px' },
  inputWrapper: { display: 'flex', flexDirection: 'column', gap: '8px' },
  label: { fontSize: '0.8rem', fontWeight: 'bold', color: '#555', display: 'flex', justifyContent: 'space-between', letterSpacing: '0.3px' },
  errorSpan: { color: '#FF4D4D', fontSize: '0.7rem', fontWeight: 'normal' },
  input: { 
    backgroundColor: '#000', 
    border: '1px solid #222', 
    color: '#FFF', 
    padding: '16px', 
    fontSize: '1rem', 
    outline: 'none',
    transition: 'border-color 0.2s ease',
    borderRadius: '1px'
  },
  phoneGroup: { display: 'flex', gap: '8px' },
  countryDropdown: { backgroundColor: '#000', border: '1px solid #222', color: '#6EC1E4', padding: '0 10px', fontSize: '0.85rem', cursor: 'pointer', borderRadius: '1px' },
  showBtn: { position: 'absolute', right: '15px', top: '41px', background: 'none', border: 'none', color: '#6EC1E4', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer' },
  forgotContainer: { display: 'flex', justifyContent: 'flex-end', marginTop: '-4px' },
  forgotBtn: { background: 'none', border: 'none', color: '#6EC1E4', fontSize: '0.85rem', cursor: 'pointer', padding: 0, textDecoration: 'underline' },
  submitBtn: { backgroundColor: '#FFF', color: '#000', border: 'none', padding: '20px', fontSize: '1rem', fontWeight: '900', cursor: 'pointer', marginTop: '10px', borderRadius: '1px' },
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000, padding: '20px' },
  modalCard: { backgroundColor: '#0A0A0A', border: '1px solid #222', padding: '30px', maxWidth: '420px', width: '100%', borderRadius: '2px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' },
  modalTitle: { color: '#FF4D4D', margin: '0 0 15px 0', fontSize: '1.2rem', fontWeight: 'bold', letterSpacing: '0.5px' },
  modalText: { color: '#AAA', fontSize: '0.9rem', lineHeight: '1.6', margin: '0 0 25px 0' },
  modalCloseBtn: { backgroundColor: '#222', color: '#FFF', border: '1px solid #333', padding: '10px 20px', fontSize: '0.85rem', fontWeight: 'bold', cursor: 'pointer', width: '100%', borderRadius: '1px', transition: 'background-color 0.2s' }
};

export default Auth;