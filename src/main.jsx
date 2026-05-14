import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { CurrencyProvider } from './context/CurrencyContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CurrencyProvider>
    <CartProvider>
      <App />
    </CartProvider>
    </CurrencyProvider>
  </StrictMode>,
)
