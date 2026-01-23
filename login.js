redirectIfLoggedIn();

// -------------------- LOGIN --------------------
const loginForm = document.getElementById("loginForm");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const loginError = document.getElementById("loginError");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = loginEmail.value.trim();
  const pass = loginPassword.value; 

  if (email === "") {
    loginError.textContent = "Email cannot be empty.";
    return;
  }
  if (!isValidEmail(email)) {
    loginError.textContent = "Email format is not valid.";
    return;
  }
  if (pass === "") {
    loginError.textContent = "Password cannot be empty.";
    return;
  }

  const users = getRegisteredUsers();
  const found = users.find((u) => u.email === email && u.password === pass);

  if (!found) {
    loginError.textContent = "Wrong email or password.";
    return;
  }

  setCurrentUser({ name: found.name, surname: found.surname, email: found.email });
  loginError.textContent = "";
  window.location.href = "home.html";
});

// -------------------- REGISTER --------------------
const registerForm = document.getElementById("registerForm");
const regName = document.getElementById("regName");
const regSurname = document.getElementById("regSurname");
const regEmail = document.getElementById("regEmail");
const regEmail2 = document.getElementById("regEmail2");
const regPassword = document.getElementById("regPassword");
const regPassword2 = document.getElementById("regPassword2");
const registerErrors = document.getElementById("registerErrors");

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const errors = [];

  const name = regName.value.trim();
  const surname = regSurname.value.trim();
  const email = regEmail.value.trim();
  const email2 = regEmail2.value.trim();
  const pass = regPassword.value;   
  const pass2 = regPassword2.value; 

  if (name === "") errors.push("Name cannot be empty.");
  else if (!isTwoOrMoreLetters(name)) errors.push("Name must contain 2 or more letters.");

  
  if (surname !== "" && !isTwoOrMoreLetters(surname)) {
    errors.push("Surname must contain 2 or more letters (or leave it empty).");
  }

  if (email === "") errors.push("Email cannot be empty.");
  else if (!isValidEmail(email)) errors.push("Email format is not valid.");

  if (email2 === "") errors.push("Email again cannot be empty.");
  else if (email !== email2) errors.push("Emails do not match.");

  if (pass === "") errors.push("Password cannot be empty.");
  else if (pass.length < 8) errors.push("Password must be 8 or more symbols long.");

  if (pass2 === "") errors.push("Password again cannot be empty.");
  else if (pass !== pass2) errors.push("Passwords do not match.");

  if (errors.length > 0) {
    registerErrors.textContent = errors[0];
    return;
  }

  const users = getRegisteredUsers();

  const exists = users.some((u) => u.email === email);
  if (exists) {
    registerErrors.textContent = "User with this email already exists.";
    return;
  }

  
  users.push({ name, surname, email, password: pass });
  saveRegisteredUsers(users);

 
  setCurrentUser({ name, surname, email });

  registerErrors.textContent = "";
  window.location.href = "home.html";
});
