// Wrap everything in an event listener to ensure the HTML exists first
document.addEventListener("DOMContentLoaded", () => {
    
    // --- NAVIGATION ---
    window.myMenuFunction = function() {
        const nav = document.getElementById("navMenu");
        if (nav) nav.classList.toggle("responsive");
    };

    // --- SLIDING FORM UI ---
    window.login = function() {
        document.getElementById("login").style.left = "4px";
        document.getElementById("register").style.right = "-510px";
    };

    window.register = function() {
        document.getElementById("login").style.left = "-510px";
        document.getElementById("register").style.right = "5px";
    };

    // --- REGISTER LOGIC ---
    window.registerUser = function(event) {
        if (event) event.preventDefault(); // Prevents page refresh

        const first = document.getElementById("firstName").value.trim();
        const last = document.getElementById("lastName").value.trim();
        const email = document.getElementById("email").value.trim();
        const pass = document.getElementById("password").value;

        if (!first || !email || !pass) {
            alert("Please fill all required fields");
            return;
        }

        const user = { first, last, email, password: pass };
        localStorage.setItem("blogUser", JSON.stringify(user));

        alert("Account created successfully!");
        // Optional: window.location.href = "index.html";
    };

    // --- LOGIN LOGIC ---
    window.loginUser = function(event) {
        if (event) event.preventDefault(); // Prevents page refresh

        const email = document.getElementById("loginUser").value.trim();
        const pass = document.getElementById("loginPass").value;

        const saved = JSON.parse(localStorage.getItem("blogUser"));

        if (!saved) {
            alert("No account found. Please register first.");
            return;
        }

        if (email === saved.email && pass === saved.password) {
            alert("Login successful!");
            window.location.href = "index.html";
        } else {
            alert("Invalid email or password");
        }
    };

    // --- DARK MODE ---
    const darkBtn = document.getElementById("darkModeBtn");
    if (darkBtn) {
        darkBtn.onclick = () => {
            document.body.classList.toggle("dark");
        };
    }

    // CTRL + B Shortcut
    document.addEventListener("keydown", (e) => {
        if (e.ctrlKey && e.key.toLowerCase() === "b") {
            e.preventDefault(); // Stop browser from opening bookmarks
            document.body.classList.toggle("dark");
        }
    });
});