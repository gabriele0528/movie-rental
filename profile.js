const user = {
    name: "Jhon",
    surname: "Newman",
    email: "jhon.newman@mail.com"
};

const profileName = document.getElementById("profileName");
const profileSurname = document.getElementById("profileSurname");
const profileEmail = document.getElementById("profileEmail");


const resetEmailBtn = document.getElementById("resetEmailBtn");


function renderProfile() {
  profileName.textContent = user.name;
  profileSurname.textContent = user.surname;
  profileEmail.textContent = user.email;
}


function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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

  
  user.email = trimmed;
  renderProfile();
});


renderProfile();