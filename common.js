
const LS_USERS_KEY = "registeredUsers";
const LS_CURRENT_KEY = "currentUser";

function safeParse(raw, fallback) {
  if (!raw || raw === "undefined") return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}


function getRegisteredUsers() {
  const parsed = safeParse(localStorage.getItem(LS_USERS_KEY), []);
  return Array.isArray(parsed) ? parsed : [];
}

function saveRegisteredUsers(users) {
  const safe = Array.isArray(users) ? users : [];
  localStorage.setItem(LS_USERS_KEY, JSON.stringify(safe));
}


function getCurrentUser() {
  return safeParse(localStorage.getItem(LS_CURRENT_KEY), null);
}

function setCurrentUser(user) {
  localStorage.setItem(LS_CURRENT_KEY, JSON.stringify(user));
}

function clearCurrentUser() {
  localStorage.removeItem(LS_CURRENT_KEY);
}

function requireAuth() {
  if (!getCurrentUser()) window.location.href = "login.html";
}

function redirectIfLoggedIn() {
  if (getCurrentUser()) window.location.href = "home.html";
}


function logout() {
  clearCurrentUser();
  window.location.href = "login.html";
}


function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isTwoOrMoreLetters(text) {
  return /^\p{L}{2,}$/u.test(text);
}


const LS_MOVIES_KEY = "movies";
const LS_RENTS_KEY = "rentedMovies";

const INITIAL_MOVIES = [
  { id: 1, name: "Batman",       genre: "Action",  price12h: 4.55, countInStock: 3 },
  { id: 2, name: "Inception",    genre: "Sci-Fi",  price12h: 5.20, countInStock: 2 },
  { id: 3, name: "Interstellar", genre: "Sci-Fi",  price12h: 5.50, countInStock: 1 },
  { id: 4, name: "Titanic",      genre: "Drama",   price12h: 3.99, countInStock: 0 },
  { id: 5, name: "The Hangover", genre: "Comedy",  price12h: 3.50, countInStock: 4 },
  { id: 6, name: "The Conjuring",genre: "Horror",  price12h: 4.10, countInStock: 2 },
  { id: 7, name: "Avengers",     genre: "Action",  price12h: 5.00, countInStock: 1 },
  { id: 8, name: "La La Land",   genre: "Romance", price12h: 4.25, countInStock: 0 },
];


function seedMoviesIfNeeded() {
  const rawMovies = localStorage.getItem(LS_MOVIES_KEY);
  if (!rawMovies || rawMovies === "undefined") {
    localStorage.setItem(LS_MOVIES_KEY, JSON.stringify(INITIAL_MOVIES));
  }

  const rawRents = localStorage.getItem(LS_RENTS_KEY);
  if (!rawRents || rawRents === "undefined") {
    localStorage.setItem(LS_RENTS_KEY, JSON.stringify([]));
  }
}

function getMovies() {
  const parsed = safeParse(localStorage.getItem(LS_MOVIES_KEY), INITIAL_MOVIES);
  return Array.isArray(parsed) ? parsed : [...INITIAL_MOVIES];
}

function saveMovies(movies) {
  const safe = Array.isArray(movies) ? movies : [];
  localStorage.setItem(LS_MOVIES_KEY, JSON.stringify(safe));
}


function getRents() {
  const parsed = safeParse(localStorage.getItem(LS_RENTS_KEY), []);
  return Array.isArray(parsed) ? parsed : [];
}

function saveRents(rents) {
  const safe = Array.isArray(rents) ? rents : [];
  localStorage.setItem(LS_RENTS_KEY, JSON.stringify(safe));
}

function formatPrice(price) {
  return Number(price).toFixed(2) + "$";
}

function getStockIcon(countInStock) {
  return countInStock > 0 ? "./images/check.png" : "./images/cancel.png";
}
