document.addEventListener('DOMContentLoaded', () => {
    // --- Element Selectors ---
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');
    const bioText = document.getElementById('bio-text');
    const charCount = document.getElementById('current-chars');
    const fileInput = document.getElementById('file-input');
    const profileImg = document.getElementById('profile-img');
    const changeBtn = document.getElementById('change-avatar-btn');
    const saveBtn = document.getElementById('main-save-btn');
    const statusText = document.getElementById('save-status');
    const themeOptions = document.querySelectorAll('.theme-option');

    // --- Tab Switching Logic ---
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;
            
            // Toggle active classes for buttons and content
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            tab.classList.add('active');
            const targetElement = document.getElementById(target);
            if (targetElement) {
                targetElement.classList.add('active');
            }
        });
    });

    // --- Bio Character Counter ---
    if (bioText && charCount) {
        bioText.addEventListener('input', (e) => {
            charCount.textContent = e.target.value.length;
        });
    }

    // --- Profile Picture Logic ---
    if (fileInput && profileImg && changeBtn) {
        const openFileManager = () => fileInput.click();
        
        changeBtn.addEventListener('click', openFileManager);
        profileImg.addEventListener('click', openFileManager);

        fileInput.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                // Size validation (2MB)
                if (file.size > 2 * 1024 * 1024) {
                    alert("Image is too large. Max 2MB.");
                    return;
                }

                const reader = new FileReader();
                reader.onload = (e) => {
                    profileImg.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // --- Theme Selector visual toggle ---
    themeOptions.forEach(opt => {
        opt.addEventListener('click', () => {
            themeOptions.forEach(o => o.classList.remove('active'));
            opt.classList.add('active');
        });
    });

    // --- Save Changes Logic ---
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            const originalContent = saveBtn.innerHTML;
            
            // Update UI to "Saving" state
            saveBtn.innerHTML = `<i data-lucide="loader-2" class="spin"></i> Saving...`;
            saveBtn.style.opacity = '0.7';
            saveBtn.disabled = true;

            if (window.lucide) lucide.createIcons();

            // Simulate API Call
            setTimeout(() => {
                // Success state
                saveBtn.innerHTML = `<i data-lucide="check"></i> Saved!`;
                saveBtn.style.backgroundColor = '#22c55e';
                saveBtn.style.opacity = '1';
                
                if (statusText) {
                    statusText.textContent = `All changes saved at ${new Date().toLocaleTimeString()}`;
                    statusText.style.color = "#22c55e";
                }

                if (window.lucide) lucide.createIcons();

                // Reset button after 3 seconds
                setTimeout(() => {
                    saveBtn.innerHTML = originalContent;
                    saveBtn.style.backgroundColor = '';
                    saveBtn.disabled = false;
                    if (window.lucide) lucide.createIcons();
                }, 3000);

            }, 1500);
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {
    // --- SET DEFAULT THEME TO DARK IMMEDIATELY ---
    document.documentElement.setAttribute('data-theme', 'dark');

    // --- Element Selectors ---
    const themeOptions = document.querySelectorAll('.theme-option');
    const fontSlider = document.querySelector('.range-slider');
    const fontValDisplay = document.getElementById('font-val');

    // --- Appearance Tab Logic ---

    // Helper function to apply system theme
    const applySystemTheme = () => {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    };

    themeOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Update UI visuals for the selected option
            themeOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');

            // Extract theme name safely
            const themeText = option.querySelector('p');
            if (!themeText) return;

            const selectedTheme = themeText.textContent.toLowerCase().trim();

            if (selectedTheme === 'system') {
                applySystemTheme();
            } else {
                // Set explicit theme (dark or light)
                document.documentElement.setAttribute('data-theme', selectedTheme);
            }
        });
    });

    // Listen for System changes while "System" mode is active
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        const activeOption = document.querySelector('.theme-option.active p');
        if (activeOption && activeOption.textContent.toLowerCase().trim() === 'system') {
            applySystemTheme();
        }
    });

    // --- Font Size Slider ---
    if (fontSlider && fontValDisplay) {
        fontSlider.addEventListener('input', (e) => {
            const size = e.target.value;
            fontValDisplay.textContent = `${size}PX`;
            document.body.style.fontSize = `${size}px`;
        });
    }
});

// 2. Listen for System changes while "System" mode is active
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const activeOption = document.querySelector('.theme-option.active p');
    if (activeOption && activeOption.textContent.toLowerCase().trim() === 'system') {
        applySystemTheme();
    }
});

// 3. Font Size Slider (Integration)
const fontSlider = document.querySelector('.range-slider');
const fontValDisplay = document.getElementById('font-val');

if (fontSlider && fontValDisplay) {
    fontSlider.addEventListener('input', (e) => {
        const size = e.target.value;
        fontValDisplay.textContent = `${size}PX`;
        // Applying to body allows scaling via 'rem' units
        document.body.style.fontSize = `${size}px`;
    });
}
// --- Account Tab Logic ---

// 1. Password Visibility Toggle
const togglePassword = document.getElementById('toggle-password');
const passwordInput = document.getElementById('current-pass');

if (togglePassword && passwordInput) {
    togglePassword.addEventListener('click', () => {
        // Toggle the type attribute
        const isPassword = passwordInput.getAttribute('type') === 'password';
        passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
        
        // Toggle the icon
        togglePassword.setAttribute('data-lucide', isPassword ? 'eye-off' : 'eye');
        
        // Re-render the specific icon
        if (window.lucide) lucide.createIcons();
    });
}

// 2. Sign Out Simulation
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        if (confirm("Are you sure you want to sign out?")) {
            // Simulate clearing session
            console.log("User logged out");
            // Redirect to a login page or home
            // window.location.href = 'login.html';
            alert("You have been signed out.");
        }
    });
}

// 3. Delete Account (Danger Zone)
const deleteBtn = document.getElementById('delete-btn');
if (deleteBtn) {
    deleteBtn.addEventListener('click', () => {
        const confirmation = confirm("CRITICAL: This will permanently delete your account. This action cannot be undone. Proceed?");
        if (confirmation) {
            const finalCheck = prompt("Please type 'DELETE' to confirm:");
            if (finalCheck === "DELETE") {
                alert("Account successfully deleted.");
                // Redirect to signup
            } else {
                alert("Action cancelled. Input did not match.");
            }
        }
    });
}