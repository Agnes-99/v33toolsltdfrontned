import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Auth from './pages/Auth';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout'; 
import Logistics from './pages/Logistics';
import Contact from './pages/Contact';
import ScrollToTop from './components/ScrollToTop';
import Account from './pages/Account';


function App() {
  return (
    <Router>
      <ScrollToTop />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <div style={{ flex: 1 }}>
          <Routes>
            {/* Auth Routes */}
            <Route path="/auth" element={<Auth />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/register" element={<Auth />} />
            
            {/* Main Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/account" element={<Account />} />
            {/* 2. ADD THE CHECKOUT ROUTE HERE */}
            <Route path="/checkout" element={<Checkout />} /> 

            <Route path="/logistics" element={<Logistics />} /> 
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;