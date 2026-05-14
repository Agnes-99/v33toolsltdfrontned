import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const subtotal = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
  const vat = subtotal * 0.15;
  const total = subtotal + vat;

  if (cart.length === 0) {
    return (
      <div style={styles.emptyPage}>
        <h2 style={styles.emptyTitle}>YOUR CART IS EMPTY</h2>
        <Link to="/" style={styles.shopLink}>RETURN TO SHOP</Link>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* HEADER */}
        <header style={styles.header}>
          <h1 style={styles.title}>SHOPPING CART <span style={styles.count}>({cart.length})</span></h1>
          <div style={styles.headerLine}></div>
        </header>

        <div style={styles.mainContent}>
          {/* ITEMS LIST */}
          <div style={styles.itemSection}>
            <div style={styles.tableLabels}>
              <span style={{flex: 2}}>ITEM</span>
              <span style={{flex: 1, textAlign: 'center'}}>QUANTITY</span>
              <span style={{flex: 1, textAlign: 'right'}}>TOTAL</span>
            </div>

            {cart.map((item) => (
              <div key={item.id} style={styles.cartItem}>
                <div style={styles.itemInfo}>
                  <img src={item.img} alt={item.name} style={styles.itemImg} />
                  <div style={styles.itemDetails}>
                    <span style={styles.category}>{item.category}</span>
                    <h3 style={styles.itemName}>{item.name}</h3>
                    <span style={styles.itemRef}>ID: {item.id}</span>
                    <button onClick={() => removeFromCart(item.id)} style={styles.removeBtn}>Remove</button>
                  </div>
                </div>

                <div style={styles.qtyContainer}>
                  <div style={styles.qtyStepper}>
                    <button onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)} style={styles.stepperBtn}>—</button>
                    <span style={styles.qtyNum}>{item.quantity || 1}</span>
                    <button onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)} style={styles.stepperBtn}>+</button>
                  </div>
                </div>

                <div style={styles.itemPrice}>
                  R { (item.price * (item.quantity || 1)).toLocaleString() }
                </div>
              </div>
            ))}
          </div>

          {/* SUMMARY SIDEBAR */}
          <aside style={styles.sidebar}>
            <div style={styles.summaryCard}>
              <h2 style={styles.summaryTitle}>SUMMARY</h2>
              
              <div style={styles.summaryRow}>
                <span>SUBTOTAL</span>
                <span>R {subtotal.toLocaleString()}</span>
              </div>
              
              <div style={styles.summaryRow}>
                <span>VAT (15%)</span>
                <span>R {vat.toLocaleString()}</span>
              </div>

              <div style={styles.summaryDivider}></div>

              <div style={styles.totalRow}>
                <span>TOTAL</span>
                <span>R {total.toLocaleString()}</span>
              </div>

              <button style={styles.checkoutBtn}>CHECKOUT</button>
              
              <div style={styles.paymentIcons}>
                <span>SECURE CHECKOUT</span>
              </div>
            </div>
            <Link to="/" style={styles.continueLink}>Continue Shopping</Link>
          </aside>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: '#FFFFFF',
    color: '#000',
    minHeight: '100vh',
    paddingTop: '120px',
    paddingBottom: '100px',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 5%'
  },
  header: {
    marginBottom: '60px'
  },
  title: {
    fontSize: '0.8rem',
    fontWeight: '800',
    letterSpacing: '3px',
    marginBottom: '15px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  count: {
    color: '#6EC1E4',
    fontWeight: '400'
  },
  headerLine: {
    height: '1px',
    backgroundColor: '#000',
    width: '100%'
  },
  mainContent: {
    display: 'grid',
    gridTemplateColumns: '1fr 340px',
    gap: '80px',
    alignItems: 'start'
  },
  tableLabels: {
    display: 'flex',
    paddingBottom: '15px',
    borderBottom: '1px solid #EEE',
    fontSize: '0.65rem',
    fontWeight: '700',
    letterSpacing: '1px',
    color: '#999'
  },
  cartItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '30px 0',
    borderBottom: '1px solid #F0F0F0'
  },
  itemInfo: {
    flex: 2,
    display: 'flex',
    gap: '25px',
    alignItems: 'center'
  },
  itemImg: {
    width: '100px',
    height: '80px',
    objectFit: 'cover',
    backgroundColor: '#F9F9F9',
    borderRadius: '2px'
  },
  itemDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  category: {
    fontSize: '0.6rem',
    fontWeight: '700',
    color: '#6EC1E4',
    textTransform: 'uppercase'
  },
  itemName: {
    fontSize: '1rem',
    fontWeight: '600',
    margin: 0
  },
  itemRef: {
    fontSize: '0.65rem',
    color: '#AAA'
  },
  removeBtn: {
    background: 'none',
    border: 'none',
    padding: 0,
    marginTop: '10px',
    fontSize: '0.65rem',
    color: '#000',
    textDecoration: 'underline',
    cursor: 'pointer',
    width: 'fit-content'
  },
  qtyContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center'
  },
  qtyStepper: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #E0E0E0',
    borderRadius: '20px',
    padding: '4px 12px'
  },
  stepperBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0 8px',
    fontSize: '0.8rem'
  },
  qtyNum: {
    fontSize: '0.8rem',
    fontWeight: '600',
    minWidth: '20px',
    textAlign: 'center'
  },
  itemPrice: {
    flex: 1,
    textAlign: 'right',
    fontSize: '0.9rem',
    fontWeight: '700'
  },
  sidebar: {
    position: 'sticky',
    top: '140px'
  },
  summaryCard: {
    backgroundColor: '#F9F9F9',
    padding: '30px',
    borderRadius: '4px'
  },
  summaryTitle: {
    fontSize: '0.75rem',
    fontWeight: '800',
    letterSpacing: '2px',
    marginBottom: '25px'
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.75rem',
    marginBottom: '12px',
    color: '#555'
  },
  summaryDivider: {
    height: '1px',
    backgroundColor: '#DDD',
    margin: '20px 0'
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '1rem',
    fontWeight: '800',
    marginBottom: '30px'
  },
  checkoutBtn: {
    width: '100%',
    backgroundColor: '#000',
    color: '#FFF',
    border: 'none',
    padding: '18px',
    fontSize: '0.75rem',
    fontWeight: '700',
    letterSpacing: '1px',
    cursor: 'pointer',
    transition: 'background 0.2s ease'
  },
  continueLink: {
    display: 'block',
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '0.7rem',
    color: '#888',
    textDecoration: 'none'
  },
  paymentIcons: {
    marginTop: '20px',
    textAlign: 'center',
    fontSize: '0.55rem',
    color: '#BBB',
    letterSpacing: '1px'
  },
  emptyPage: {
    height: '80vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px'
  },
  emptyTitle: {
    fontSize: '0.9rem',
    fontWeight: '800',
    letterSpacing: '3px'
  },
  shopLink: {
    fontSize: '0.7rem',
    fontWeight: '700',
    color: '#FFF',
    backgroundColor: '#000',
    padding: '12px 25px',
    textDecoration: 'none'
  }
};

export default Cart;