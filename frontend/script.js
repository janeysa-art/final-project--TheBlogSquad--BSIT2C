
<script>
function myMenuFunction() {
  document.getElementById("navMenu").classList.toggle("responsive");
}

// SHOW LOGIN
function login() {
  document.getElementById("login").style.left = "4px";
  document.getElementById("register").style.right = "-520px";
}

// SHOW REGISTER
function register() {
  document.getElementById("login").style.left = "-510px";
  document.getElementById("register").style.right = "5px";
}

// ================= REGISTER =================
function registerUser() {
  const first = document.getElementById("firstName").value;
  const last = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;

  if (!first || !email || !pass) {
    alert("Please fill all fields");
    return;
  }

  const user = { first, last, email, password: pass };
  localStorage.setItem("blogUser", JSON.stringify(user));

  alert("Account created successfully!");
  window.location.href = "index.html";
}

// ================= LOGIN =================
function loginUser() {
  const email = document.getElementById("loginUser").value;
  const pass = document.getElementById("loginPass").value;

  const saved = JSON.parse(localStorage.getItem("blogUser"));

  if (!saved) {
    alert("No account found");
    return;
  }

  if (email === saved.email && pass === saved.password) {
    alert("Login successful!");
    window.location.href = "index.html";
  } else {
    alert("Invalid credentials");
  }
}

// ================= DARK MODE =================
document.getElementById("darkModeBtn").onclick = () => {
  document.body.classList.toggle("dark");
};

// CTRL + B DARK MODE
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key.toLowerCase() === "b") {
    document.body.classList.toggle("dark");
  }
});
</script>