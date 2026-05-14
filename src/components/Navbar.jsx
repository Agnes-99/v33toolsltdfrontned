import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { logout } from '../api/authService'; // Ensure this path is correct
import primaryLogo from '../assets/Logos/logo_blackbackground.jpeg';

const Navbar = () => {
  const { cart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);

  // Sync user state with localStorage
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

    // Get user data saved during login
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]); // Re-run check on route change to catch login/logout

  const handleLogout = () => {
    logout(); // Clears storage and redirects
    setUser(null);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{
      ...styles.nav,
      backgroundColor: isScrolled ? 'rgba(5, 5, 5, 0.98)' : '#000000',
      borderBottom: isScrolled ? '1px solid #6EC1E4' : '1px solid #111',
      backdropFilter: isScrolled ? 'blur(15px)' : 'none',
    }}>
      <div style={styles.navContainer}>
        
        {/* LOGO SECTION */}
        <Link to="/" style={styles.logoWrapper}>
          <img src={primaryLogo} alt="V33 TOOLS LTD" style={styles.logoImg} />
          <div style={styles.logoDivider}></div>
        </Link>

        {/* NAVIGATION LINKS */}
        <div style={styles.navLinks}>
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

        {/* ACTIONS SECTION */}
        <div style={styles.actionsWrapper}>
          
          {/* CONDITIONAL AUTH SECTION */}
          {user ? (
            <div style={styles.userProfile}>
              <div style={styles.userInfo}>               
                <span style={styles.userName}>{user.firstName?.toUpperCase()}</span>
              </div>
              <button onClick={handleLogout} style={styles.logoutBtn}>
                LOGOUT
              </button>
            </div>
          ) : (
            <div style={styles.authContainer}>
              <Link to="/login" style={styles.loginLink}>LOGIN</Link>
              <Link to="/register" style={styles.registerBtn}>JOIN FLEET</Link>
            </div>
          )}
          
          <div style={styles.actionDivider}></div>

          <Link to="/cart" style={{
            ...styles.cartBtn,
            borderColor: cart.length > 0 ? '#6EC1E4' : '#222'
          }}>
            <span style={styles.cartText}>CART</span>
            <div style={{
              ...styles.badge,
              backgroundColor: cart.length > 0 ? '#6EC1E4' : '#333'
            }}>
              {cart.reduce((total, item) => total + (item.quantity || 1), 0)}
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

const styles = {
  // ... existing styles ...
  nav: { position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, height: '90px', display: 'flex', alignItems: 'center', padding: '0 5%', transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)' },
  navContainer: { width: '100%', maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  logoWrapper: { display: 'flex', alignItems: 'center', textDecoration: 'none' },
  logoImg: { height: '60px', width: 'auto', borderRadius: '2px', transition: '0.3s' },
  logoDivider: { width: '1px', height: '30px', backgroundColor: '#222', margin: '0 25px' },
  navLinks: { display: 'flex', gap: '40px', alignItems: 'center' },
  link: { textDecoration: 'none', fontSize: '0.75rem', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase', position: 'relative', transition: 'color 0.3s ease' },
  activeDot: { position: 'absolute', bottom: '-8px', left: '50%', transform: 'translateX(-50%)', width: '4px', height: '4px', backgroundColor: '#6EC1E4', borderRadius: '50%' },
  actionsWrapper: { display: 'flex', alignItems: 'center', gap: '25px' },
  actionDivider: { width: '1px', height: '20px', backgroundColor: '#222' },
  
  // NEW USER STYLES
  userProfile: { display: 'flex', alignItems: 'center', gap: '20px' },
  userInfo: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end' },
  welcomeText: { color: '#444', fontSize: '0.55rem', fontWeight: '900', letterSpacing: '1px' },
  userName: { color: '#FFF', fontSize: '0.75rem', fontWeight: '900', letterSpacing: '1px' },
  logoutBtn: { 
    background: 'none', 
    border: '1px solid #333', 
    color: '#888', 
    padding: '8px 15px', 
    fontSize: '0.6rem', 
    fontWeight: '900', 
    cursor: 'pointer',
    transition: '0.3s',
    letterSpacing: '1px'
  },

  // AUTH STYLES
  authContainer: { display: 'flex', alignItems: 'center', gap: '20px' },
  loginLink: { textDecoration: 'none', color: '#888', fontSize: '0.7rem', fontWeight: '800', letterSpacing: '1px', transition: 'color 0.3s' },
  registerBtn: { textDecoration: 'none', color: '#6EC1E4', fontSize: '0.7rem', fontWeight: '900', border: '1px solid #6EC1E4', padding: '10px 20px', letterSpacing: '1px', transition: 'all 0.3s' },
  
  cartBtn: { display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#0A0A0A', padding: '10px 18px', border: '1px solid #222', textDecoration: 'none', transition: 'all 0.3s' },
  cartText: { color: '#E5E5E5', fontSize: '0.7rem', fontWeight: '900', letterSpacing: '1px' },
  badge: { color: '#000', fontSize: '0.7rem', fontWeight: '900', padding: '2px 8px', minWidth: '20px', textAlign: 'center', transition: 'all 0.3s' }
};

export default Navbar;