import fetchFromApi from './fetchAPI.js';

async function login(username, password) {
  console.log('Login of user: ', username);

  // Fetch all users
  const users = await fetchFromApi('user');

  // Check if users is undefined or not an array
  if (!Array.isArray(users)) {
    throw new Error('Failed to fetch users or users is not an array');
  }

  // Find the user with the matching username
  const user = users.find((user) => user.username === username);

  // If the user exists and the password is correct
  if (user && user.password === password) {
    console.log(user);
    // Store user data in localStorage
    user.isLoggedIn = true;
    // Add user to localStorage
    localStorage.setItem('user', JSON.stringify(user));

    return user;
  }

  throw new Error('Login failed');
}

function logout() {
  // Remove user from localStorage
  localStorage.removeItem('user');
}

function isAuthenticated() {
  const user = JSON.parse(localStorage.getItem('user'));
  return user && user.isLoggedIn === true;
}

export { login, logout, isAuthenticated };
