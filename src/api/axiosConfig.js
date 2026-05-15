import axios from 'axios';

/**
 * V33 TOOLS - AXIOS NETWORK CONFIGURATION
 * This instance handles all communication with the Spring Boot Backend.
 */
const api = axios.create({
  // ✅ Dynamically checks for Vercel's production variable, otherwise falls back to local
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/v33tools',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * REQUEST INTERCEPTOR
 * Before every request leaves the browser, this function:
 * 1. Pulls the 'user' object from localStorage.
 * 2. Parses the JSON to find the token.
 * 3. Injects it into the Authorization header as a Bearer token.
 */
api.interceptors.request.use(
  (config) => {
    try {
      const savedUser = localStorage.getItem('user');

      if (savedUser) {
        const user = JSON.parse(savedUser);

        // 🔍 DEBUG START
        console.log("🔍 USER FROM LOCALSTORAGE:", user);
        console.log("🔍 TOKEN FOUND (user.token):", user?.token);
        console.log("🔍 ALT TOKEN CHECK (user.jwt):", user?.jwt);
        // 🔍 DEBUG END

        // ✅ Handle BOTH possible token names
        const token = user?.token || user?.jwt;

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
          console.log("✅ AUTH HEADER SET:", config.headers.Authorization);
        } else {
          console.warn("⚠️ NO TOKEN FOUND → REQUEST WILL BE UNAUTHORIZED");
        }

      } else {
        console.warn("⚠️ NO USER FOUND IN LOCALSTORAGE");
      }

    } catch (error) {
      console.error("❌ V33_AUTH_ERROR: Could not parse user from storage", error);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * RESPONSE INTERCEPTOR
 * If the server returns a 401 (Unauthorized), it means the token 
 * is expired or invalid. This forces a logout to keep the app secure.
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("🚨 V33_AUTH: 401 Unauthorized → Clearing session");

      // 🔍 DEBUG: show what caused failure
      console.log("🔍 FAILED REQUEST:", error.config?.url);
      console.log("🔍 REQUEST HEADERS:", error.config?.headers);

      localStorage.removeItem('user');

      // Optional redirect
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;