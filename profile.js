requireAuth();

const profileName = document.getElementById("profileName");
const profileSurname = document.getElementById("profileSurname");
const profileEmail = document.getElementById("profileEmail");
const resetEmailBtn = document.getElementById("resetEmailBtn");

function renderProfile() {
  const user = getCurrentUser();
  profileName.textContent = user.name;
  profileSurname.textContent = user.surname;
  profileEmail.textContent = user.email;
}

resetEmailBtn.addEventListener("click", () => {
  const newEmail = prompt("Enter new email:");
  if (newEmail === null) return;

  const trimmed = newEmail.trim();

  if (trimmed === "") {
    alert("Email cannot be empty.");
    return;
  }

  if (!isValidEmail(trimmed)) {
    alert("Email format is not valid.");
    return;
  }

 
  const current = getCurrentUser();
  const oldEmail = current.email;

  
  const users = getRegisteredUsers();

 
  const exists = users.some(u => u.email === trimmed);
  if (exists) {
    alert("User with this email already exists.");
    return;
  }

  const idx = users.findIndex(u => u.email === oldEmail);
  if (idx === -1) {
    alert("User not found in registered users list.");
    return;
  }

  users[idx].email = trimmed;
  saveRegisteredUsers(users);

 
  current.email = trimmed;
  setCurrentUser(current);

  renderProfile();
});

renderProfile();
