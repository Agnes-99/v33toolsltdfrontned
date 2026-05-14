import api from './axiosConfig';

/**
 * LOGGING IN
 * Hits LoginController: @RequestMapping("/auth") + @PostMapping("/login")
 */
export const login = async (emailAddress, password) => {
  try {
    // Note: The key 'email' matches your Java LoginRequest's request.getEmail()
    const response = await api.post('/auth/login', {
      email: emailAddress, 
      password: password,
    });

    if (response.data && response.data.token) {
      // Store the full response (token, firstName, role, etc.)
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.error("V33_AUTH_SYSTEM: Login credentials rejected or server unreachable.");
    throw error;
  }
};

/**
 * REGISTRATION
 * Hits CustomerController: @RequestMapping("/customer") + @PostMapping("/create")
 */
export const register = async (customerData) => {
  try {
    // Hits http://localhost:8080/v33tools/customer/create
    const response = await api.post('/customer/create', customerData);
    return response.data;
  } catch (error) {
    console.error("V33_AUTH_SYSTEM: Registration failed.");
    throw error;
  }
};

/**
 * LOGOUT
 * Purges the local session and forces a system-wide reset.
 */
export const logout = () => {
  localStorage.removeItem('user');
  sessionStorage.clear();
  
  // Hard redirect to clear any residual state in the React app
  window.location.href = '/login';
};

/**
 * HELPER: GET CURRENT USER
 * Parses the local user object for UI display (e.g., Navbar)
 */
export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

/**
 * HELPER: GET TOKEN
 * Retreives the JWT for injection into secured headers
 */
export const getAuthToken = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user?.token || null;
};