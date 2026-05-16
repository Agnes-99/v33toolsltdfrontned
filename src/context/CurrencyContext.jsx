import { createContext, useState, useContext, useEffect } from 'react';

const CurrencyContext = createContext();

const CURRENCIES = {
  ZAR: { symbol: 'R', rate: 1, label: ' ZAR (South Africa)' },
  GBP: { symbol: '£', rate: 0.042, label: ' GBP (United Kingdom)' },
  USD: { symbol: '$', rate: 0.054, label: ' USD (United States)' },
  EUR: { symbol: '€', rate: 0.050, label: ' EUR (Europe)' },
};

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('v33_currency') || ' ZAR';
  });

  useEffect(() => {
    localStorage.setItem('v33_currency', currency);
  }, [currency]);

  // Function to convert and format the price
const formatPrice = (priceInZar) => {
  const config = CURRENCIES[currency];
  const convertedAmount = priceInZar * config.rate;

  // Format the number only (decimal separators, etc.)
  const formattedNumber = new Intl.NumberFormat('en-ZA', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(convertedAmount);

  // Manually attach the symbol from your config
  return `${config.symbol}${formattedNumber}`;
};

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, CURRENCIES }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);