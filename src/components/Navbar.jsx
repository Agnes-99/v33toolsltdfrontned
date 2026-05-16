import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { logout } from '../api/authService';
import primaryLogo from '../assets/Logos/png/Color_logo_no_background.png';

const Navbar = () => {
  const { itemCount, refreshCart } = useCart();
  const { currency, setCurrency, CURRENCIES } = useCurrency();
  const location = useLocation();
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1150);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [shouldBump, setShouldBump] = useState(false);

  // NEW: A React reference tied to the nav element block to check click footprints
  const navRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth < 1150;
      setIsMobile(mobileView);
      if (!mobileView) setIsMenuOpen(false);
    };

    // MODIFIED: Closes the drawer immediately if a scroll action triggers while open
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setIsMenuOpen(false);
    };

    // NEW: Closes the menu if the user touches anywhere outside the nav boundary wrapper
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("User session corrupted");
      }
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [location]);

  useEffect(() => {
    if (itemCount === 0) return;
    setShouldBump(true);
    const timer = setTimeout(() => setShouldBump(false), 300);
    return () => clearTimeout(timer);
  }, [itemCount]);

  const handleLogout = () => {
    logout();
    setUser(null);
    refreshCart();
    setIsMenuOpen(false);
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav 
      ref={navRef} // NEW: Reference assignment locks click detection calculations to this navbar layout space
      style={{
        ...styles.nav,
        backgroundColor: (isScrolled || isMenuOpen) ? 'rgba(5, 5, 5, 0.98)' : '#000000',
        borderBottom: (isScrolled || isMenuOpen) ? '1px solid #6EC1E4' : '1px solid #111',
        height: isMenuOpen ? 'auto' : '90px',
      }}
    >
      <div style={styles.navContainer}>
        
        <div style={styles.headerRow}>
          <Link to="/" style={styles.logoWrapper} onClick={() => setIsMenuOpen(false)}>
            <img src={primaryLogo} alt="V33 TOOLS LTD" style={styles.logoImg} />
          </Link>

          {isMobile ? (
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} style={styles.hamburger}>
              <div style={{ ...styles.bar, transform: isMenuOpen ? 'rotate(45deg) translate(5px, 6px)' : 'none' }}></div>
              <div style={{ ...styles.bar, opacity: isMenuOpen ? 0 : 1 }}></div>
              <div style={{ ...styles.bar, transform: isMenuOpen ? 'rotate(-45deg) translate(5px, -6px)' : 'none' }}></div>
            </button>
          ) : (
            <div style={styles.desktopLinks}>
              {[
                { name: 'Machinery', path: '/' },
                { name: 'Logistics', path: '/logistics' },
                { name: 'Contact', path: '/contact' }
              ].map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  style={{
                    ...styles.link,
                    color: isActive(link.path) ? '#6EC1E4' : '#E5E5E5',
                  }}
                >
                  {link.name}
                  {isActive(link.path) && <div style={styles.activeDot}></div>}
                </Link>
              ))}
            </div>
          )}

          {!isMobile && (
            <div style={styles.desktopActions}>
              <div style={styles.actionDivider}></div>
              
              {user ? (
                <div style={styles.userProfile}>
                  <Link to="/account" style={styles.accountLink}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6EC1E4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <div style={styles.nameWrapper}>
                      <span style={styles.accountLabel}>ACCOUNT</span>
                      <span style={styles.userName}>{user.firstName?.toUpperCase()}</span>
                    </div>
                  </Link>
                  <div style={styles.smallDivider}></div>
                  <button onClick={handleLogout} style={styles.logoutBtn}>LOGOUT</button>
                </div>
              ) : (
                <div style={styles.authContainer}>
                  <Link to="/login" style={styles.loginLink}>SIGN IN</Link>
                  <Link to="/register" style={styles.registerBtn}>SIGN UP</Link>
                </div>
              )}

              <select 
                value={currency} 
                onChange={(e) => setCurrency(e.target.value)}
                style={styles.currencySelector}
              >
                {Object.keys(CURRENCIES).map(code => (
                  <option key={code} value={code}>{code}</option>
                ))}
              </select>

              <Link 
                to="/cart" 
                style={{ 
                  ...styles.cartBtn, 
                  borderColor: itemCount > 0 ? '#6EC1E4' : '#222',
                  transform: shouldBump ? 'scale(1.08)' : 'scale(1)',
                }}
              >
                <span style={styles.cartText}>CART</span>
                <div style={{ 
                  ...styles.badge, 
                  backgroundColor: itemCount > 0 ? '#6EC1E4' : '#333',
                  transform: shouldBump ? 'scale(1.2)' : 'scale(1)',
                }}>
                  {itemCount}
                </div>
              </Link>
            </div>
          )}
        </div>

        {isMobile && isMenuOpen && (
          <div style={styles.mobileMenu}>
            <div style={styles.mobileLinks}>
              {[{ name: 'Machinery', path: '/' }, { name: 'Logistics', path: '/logistics' }, { name: 'Contact', path: '/contact' }].map((link) => (
                <Link key={link.name} to={link.path} onClick={() => setIsMenuOpen(false)} style={{ ...styles.link, padding: '20px 0', borderBottom: '1px solid #111' }}>
                  {link.name}
                </Link>
              ))}
            </div>
            
            <div style={styles.mobileActions}>
               {user ? (
                <div style={styles.mobileUser}>
                  <Link to="/account" onClick={() => setIsMenuOpen(false)} style={styles.accountLink}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6EC1E4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <span style={styles.userName}>{user.firstName?.toUpperCase()}</span>
                  </Link>
                  <button onClick={handleLogout} style={styles.logoutBtn}>SIGN OUT</button>
                </div>
              ) : (
                <div style={styles.mobileAuth}>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} style={styles.loginLink}>SIGN IN</Link>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)} style={styles.registerBtn}>SIGN UP</Link>
                </div>
              )}
              
              <div style={styles.mobileSecondary}>
                <select value={currency} onChange={(e) => setCurrency(e.target.value)} style={styles.currencySelector}>
                  {Object.keys(CURRENCIES).map(code => <option key={code} value={code}>{code}</option>)}
                </select>
                <Link to="/cart" onClick={() => setIsMenuOpen(false)} style={{
                   ...styles.cartBtn,
                   transform: shouldBump ? 'scale(1.05)' : 'scale(1)'
                }}>
                  <span style={styles.cartText}>CART ({itemCount})</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: { position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)', display: 'flex', justifyContent: 'center' },
  navContainer: { width: '90%', maxWidth: '1600px', display: 'flex', flexDirection: 'column' },
  headerRow: { height: '90px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  logoWrapper: { display: 'flex', alignItems: 'center', textDecoration: 'none' },
  logoImg: { height: '65px', width: 'auto', borderRadius: '2px' },
  desktopLinks: { display: 'flex', gap: '40px', alignItems: 'center' },
  desktopActions: { display: 'flex', alignItems: 'center', gap: '20px' },
  link: { textDecoration: 'none', fontSize: '0.75rem', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase', position: 'relative', color: '#E5E5E5' },
  activeDot: { position: 'absolute', bottom: '-8px', left: '50%', transform: 'translateX(-50%)', width: '4px', height: '4px', backgroundColor: '#6EC1E4', borderRadius: '50%' },
  actionDivider: { width: '1px', height: '25px', backgroundColor: '#222', marginRight: '10px' },
  
  userProfile: { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '15px',
    backgroundColor: '#0A0A0A',
    padding: '5px 15px',
    border: '1px solid #111',
    borderRadius: '4px'
  },
  accountLink: { 
    textDecoration: 'none', 
    display: 'flex', 
    alignItems: 'center', 
    gap: '12px',
    transition: '0.2s opacity'
  },
  nameWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  accountLabel: {
    fontSize: '0.5rem',
    color: '#444',
    fontWeight: '900',
    letterSpacing: '1px',
    marginBottom: '-2px'
  },
  userName: { color: '#FFF', fontSize: '0.75rem', fontWeight: '900', letterSpacing: '1px' },
  smallDivider: { width: '1px', height: '20px', backgroundColor: '#222' },
  logoutBtn: { background: 'none', border: 'none', color: '#888', fontSize: '0.6rem', fontWeight: '900', cursor: 'pointer', letterSpacing: '1px', padding: '0' },
  
  authContainer: { display: 'flex', alignItems: 'center', gap: '20px' },
  loginLink: { textDecoration: 'none', color: '#888', fontSize: '0.7rem', fontWeight: '800', letterSpacing: '1px' },
  registerBtn: { textDecoration: 'none', color: '#6EC1E4', fontSize: '0.7rem', fontWeight: '900', border: '1px solid #6EC1E4', padding: '10px 20px', letterSpacing: '1px' },
  cartBtn: { display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#0A0A0A', padding: '10px 18px', border: '1px solid #222', textDecoration: 'none', transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)' },
  cartText: { color: '#E5E5E5', fontSize: '0.7rem', fontWeight: '900', letterSpacing: '1px' },
  badge: { color: '#000', fontSize: '0.7rem', fontWeight: '900', padding: '2px 8px', minWidth: '20px', textAlign: 'center', borderRadius: '2px', transition: 'transform 0.2s ease' },
  currencySelector: { backgroundColor: 'transparent', color: '#6EC1E4', border: '1px solid #222', fontSize: '0.65rem', fontWeight: '900', padding: '5px', cursor: 'pointer', outline: 'none' },
  hamburger: { background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '5px' },
  bar: { width: '25px', height: '2px', backgroundColor: '#6EC1E4', transition: 'all 0.3s ease' },
  mobileMenu: { display: 'flex', flexDirection: 'column', padding: '20px 0 40px 0', borderTop: '1px solid #111' },
  mobileLinks: { display: 'flex', flexDirection: 'column', marginBottom: '30px' },
  mobileActions: { display: 'flex', flexDirection: 'column', gap: '20px' },
  mobileUser: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  mobileAuth: { display: 'flex', flexDirection: 'column', gap: '15px' },
  mobileSecondary: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }
};

export default Navbar;