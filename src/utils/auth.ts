
// Simple client-side authentication check
// In a real app, this would check with a backend service or JWT token

// Demo user for testing
const demoUser = {
  username: "demoUser",
  password: "demoPass123",
  displayName: "Demo User",
  email: "demo@example.com"
};

export const isAuthenticated = (): boolean => {
  // For demo purposes, we'll check if there's a user item in localStorage
  // In a real application, this would validate tokens, check expiry, etc.
  return localStorage.getItem('user') !== null;
};

export const login = (username: string, password: string): boolean => {
  // Check if credentials match demo user
  if (username === demoUser.username && password === demoUser.password) {
    localStorage.setItem('user', JSON.stringify({
      username: demoUser.username,
      displayName: demoUser.displayName,
      email: demoUser.email
    }));
    return true;
  }
  return false;
};

export const logout = (): void => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const userJson = localStorage.getItem('user');
  return userJson ? JSON.parse(userJson) : null;
};

export const requireAuth = (path: string): string => {
  if (!isAuthenticated()) {
    // Store the intended destination for redirect after login
    localStorage.setItem('redirectAfterLogin', path);
    return '/login';
  }
  return path;
};
