import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { login, register } from '../api/authService';
import { useCart } from '../context/CartContext';

// Sorted alphabetically by label
const countryCodes = [
  { code: '+61', label: '🇦🇺 Australia' },
  { code: '+1',  label: '🇨🇦 Canada' },
  { code: '+33', label: '🇫🇷 France' },
  { code: '+49', label: '🇩🇪 Germany' },
  { code: '+91', label: '🇮🇳 India' },
  { code: '+353', label: '🇮🇪 Ireland' },
  { code: '+254', label: '🇰🇪 Kenya' },
  { code: '+264', label: '🇳🇦 Namibia' },
  { code: '+31', label: '🇳🇱 Netherlands' },
  { code: '+64', label: '🇳🇿 New Zealand' },
  { code: '+234', label: '🇳🇬 Nigeria' },
  { code: '+27', label: '🇿🇦 South Africa' },
  { code: '+971', label: '🇦🇪 UAE' },
  { code: '+44', label: '🇬🇧 United Kingdom' },
  { code: '+1',  label: '🇺🇸 USA' },
  { code: '+263', label: '🇿🇼 Zimbabwe' },
].sort((a, b) => a.label.localeCompare(b.label));

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('+27');
  const { refreshCart } = useCart();
  
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', phoneNumber: '', emailAddress: '', password: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (location.pathname === '/register') setIsLogin(false);
    else if (location.pathname === '/login') setIsLogin(true);
  }, [location.pathname]);

  const handleInputChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

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
        setIsLogin(true);
        navigate('/login');
      }
    } catch (err) {
      setError("AUTHENTICATION FAILED. PLEASE VERIFY YOUR CREDENTIALS.");
    } finally {
      setLoading(false);
    }
  };

  const isMobile = windowWidth <= 850;

  return (
    <div style={styles.page}>
      <div style={{
        ...styles.container,
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1.3fr',
        maxWidth: isMobile ? '450px' : '1150px',
      }}>
        
        {/* BRANDING SIDE */}
        {!isMobile && (
          <div style={styles.brandingSide}>
            <div style={styles.statusBadge}>
              <div style={styles.pulseDot}></div>
              <span>SECURE ACCESS HUB</span>
            </div>
            
            <div>
              <h1 style={styles.logoText}>V33 <span style={{ color: '#6EC1E4' }}>TOOLS</span></h1>
              <p style={styles.description}>
                Manage your industrial fleet, track global logistics, and access your 
                professional inventory from any location.
              </p>
            </div>

            <div style={styles.techReadout}>
              <div>
                <span style={styles.readoutLabel}>SUPPORT</span>
                <span style={styles.readoutValue}>24/7 LIVE</span>
              </div>
              <div>
                <span style={styles.readoutLabel}>SYSTEM</span>
                <span style={styles.readoutValue}>VERIFIED</span>
              </div>
            </div>
          </div>
        )}

        {/* INTERFACE SIDE */}
        <div style={{...styles.interfaceSide, padding: isMobile ? '40px 20px' : '60px 80px'}}>
          <div style={styles.tabHeader}>
            <button onClick={() => { setIsLogin(true); navigate('/login'); }} 
              style={{...styles.tab, color: isLogin ? '#FFF' : '#444'}}>
              LOG IN {isLogin && <div style={styles.activeLine} />}
            </button>
            <button onClick={() => { setIsLogin(false); navigate('/register'); }} 
              style={{...styles.tab, color: !isLogin ? '#FFF' : '#444'}}>
              REGISTER {!isLogin && <div style={styles.activeLine} />}
            </button>
          </div>

          <form style={styles.form} onSubmit={handleSubmit}>
            {error && <div style={styles.errorBanner}>{error}</div>}

            <div style={{...styles.inputGrid, gridTemplateColumns: (isMobile || isLogin) ? '1fr' : '1fr 1fr'}}>
              {!isLogin && (
                <>
                  <div style={styles.inputWrapper}>
                    <label style={styles.label}>FIRST NAME</label>
                    <input type="text" required style={styles.input} onChange={(e) => handleInputChange(e, 'firstName')} />
                  </div>
                  <div style={styles.inputWrapper}>
                    <label style={styles.label}>LAST NAME</label>
                    <input type="text" required style={styles.input} onChange={(e) => handleInputChange(e, 'lastName')} />
                  </div>
                </>
              )}

              <div style={{...styles.inputWrapper, gridColumn: (isMobile || isLogin) ? 'auto' : 'span 2'}}>
                <label style={styles.label}>EMAIL ADDRESS</label>
                <input type="email" required style={styles.input} onChange={(e) => handleInputChange(e, 'emailAddress')} />
              </div>

              {!isLogin && (
                <div style={{...styles.inputWrapper, gridColumn: (isMobile || isLogin) ? 'auto' : 'span 2'}}>
                  <label style={styles.label}>PHONE NUMBER</label>
                  <div style={styles.phoneInputRow}>
                    <select 
                      value={selectedCountry} 
                      onChange={(e) => setSelectedCountry(e.target.value)}
                      style={styles.countrySelect}
                    >
                      {countryCodes.map(c => (
                        <option key={c.label} value={c.code}>{c.label} ({c.code})</option>
                      ))}
                    </select>
                    <input 
                      type="tel" 
                      placeholder="72 123 4567" 
                      required 
                      style={{...styles.input, flex: 1}} 
                      onChange={(e) => handleInputChange(e, 'phoneNumber')} 
                    />
                  </div>
                </div>
              )}

              <div style={{...styles.inputWrapper, gridColumn: (isMobile || isLogin) ? 'auto' : 'span 2', position: 'relative'}}>
                <label style={styles.label}>PASSWORD</label>
                <input type={showPassword ? "text" : "password"} required style={styles.input} onChange={(e) => handleInputChange(e, 'password')} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
                  {showPassword ? "HIDE" : "VIEW"}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} style={styles.submitBtn}>
              {loading ? "COMMUNICATING..." : (isLogin ? "AUTHORIZE ACCESS" : "CREATE ACCOUNT")}
            </button>

            {isLogin && (
              <div style={styles.maintenanceBox}>
                <span style={styles.maintenanceText}>FORGOT PASSWORD? [SYSTEM MAINTENANCE]</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: { backgroundColor: '#000', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', padding: '100px 20px 40px 20px', boxSizing: 'border-box' },
  container: { display: 'grid', width: '100%', backgroundColor: '#070707', border: '1px solid #151515', overflow: 'hidden' },
  brandingSide: { padding: '60px', backgroundColor: '#0A0A0A', borderRight: '1px solid #151515', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
  statusBadge: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.6rem', color: '#444', fontWeight: '900', letterSpacing: '1px' },
  pulseDot: { width: '6px', height: '6px', backgroundColor: '#6EC1E4', borderRadius: '50%' },
  logoText: { fontSize: '2.4rem', fontWeight: '900', color: '#FFF', margin: '0 0 20px 0' },
  description: { fontSize: '0.85rem', color: '#666', lineHeight: '1.7', maxWidth: '320px' },
  techReadout: { display: 'flex', gap: '35px' },
  readoutLabel: { fontSize: '0.55rem', color: '#333', fontWeight: '900', display: 'block' },
  readoutValue: { fontSize: '0.7rem', color: '#6EC1E4', fontWeight: '700' },
  interfaceSide: { display: 'flex', flexDirection: 'column', justifyContent: 'center' },
  tabHeader: { display: 'flex', gap: '35px', marginBottom: '40px' },
  tab: { background: 'none', border: 'none', fontSize: '0.8rem', fontWeight: '900', cursor: 'pointer', paddingBottom: '10px', position: 'relative', letterSpacing: '1px' },
  activeLine: { position: 'absolute', bottom: 0, left: 0, width: '100%', height: '2px', backgroundColor: '#6EC1E4' },
  form: { display: 'flex', flexDirection: 'column', gap: '25px' },
  inputGrid: { display: 'grid', gap: '20px' },
  inputWrapper: { display: 'flex', flexDirection: 'column', gap: '10px' },
  label: { fontSize: '0.7rem', fontWeight: '900', color: '#444' },
  input: { backgroundColor: '#000', border: '1px solid #222', color: '#FFF', padding: '16px', fontSize: '0.9rem', outline: 'none', width: '100%', boxSizing: 'border-box' },
  phoneInputRow: { display: 'flex', gap: '10px', alignItems: 'stretch' },
  countrySelect: { 
    backgroundColor: '#000', 
    border: '1px solid #222', 
    color: '#FFF', 
    padding: '0 30px 0 12px', 
    fontSize: '0.75rem', 
    outline: 'none', 
    minWidth: '175px', // Guaranteed width to fit "United Kingdom"
    cursor: 'pointer',
    appearance: 'none',
    backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%236EC1E4%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22/%3E%3C/svg%3E")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px top 50%',
    backgroundSize: '10px auto'
  },
  eyeBtn: { position: 'absolute', right: '15px', top: '40px', background: 'none', border: 'none', color: '#6EC1E4', fontSize: '0.65rem', fontWeight: '900', cursor: 'pointer' },
  submitBtn: { backgroundColor: '#FFF', color: '#000', border: 'none', padding: '20px', fontSize: '0.85rem', fontWeight: '900', cursor: 'pointer', marginTop: '10px' },
  errorBanner: { fontSize: '0.8rem', color: '#FF4D4D', borderLeft: '3px solid #FF4D4D', padding: '12px', backgroundColor: 'rgba(255, 77, 77, 0.05)' },
  maintenanceBox: { textAlign: 'center', marginTop: '15px' },
  maintenanceText: { fontSize: '0.65rem', color: '#333', fontWeight: '800' }
};

export default Auth;