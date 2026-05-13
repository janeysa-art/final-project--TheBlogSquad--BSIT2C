function addGallery() {
    const input = document.getElementById("galleryInput");
    const box = document.getElementById("galleryBox");

    if (!input.files.length) return;

    Array.from(input.files).forEach(file => {

        // Only images allowed
        if (!file.type.startsWith("image/")) return;

        const url = URL.createObjectURL(file);

        const img = document.createElement("img");
        img.src = url;

        img.style.width = "100px";
        img.style.height = "100px";
        img.style.objectFit = "cover";
        img.style.margin = "5px";
        img.style.borderRadius = "8px";
        img.style.cursor = "pointer";

        // click to preview larger
        img.onclick = () => {
            window.open(url, "_blank");
        };

        box.appendChild(img);
    });

    // reset input so same file can be re-uploaded
    input.value = "";
}

function addGroup() {
  const name = prompt("Enter group name:");
  if (name) {
    const li = document.createElement("li");
    li.innerText = name;
    document.getElementById("groupBox").appendChild(li);
  }
}

function addAbout() {
  const info = prompt("Enter about info:");
  if (info) {
    const box = document.getElementById("aboutBox");
    box.innerText += (box.innerText ? " | " : "") + info;
  }
}
// Function to show the image in full screen
function openFullView() {
    const mainPic = document.getElementById("userMainPic").src;
    const modal = document.getElementById("fullScreenModal");
    const fullImg = document.getElementById("fullResImage");
    
    modal.style.display = "flex";
    fullImg.src = mainPic;
}

// Function to close the modal
function closeFullView() {
    document.getElementById("fullScreenModal").style.display = "none";
}

// Function to change the profile picture locally
function updateImage(event) {
    const reader = new FileReader();
    reader.onload = function() {
        const output = document.getElementById('userMainPic');
        output.src = reader.result; // Updates the UI with the new image
    };
    reader.readAsDataURL(event.target.files[0]);
}
// 1. Run this immediately when the page loads
window.onload = function() {
    const savedImage = localStorage.getItem('userProfilePic');
    if (savedImage) {
        document.getElementById('userMainPic').src = savedImage;
    }
};

// 2. Updated function to change AND save the photo
function updateImage(event) {
    const reader = new FileReader();
    
    reader.onload = function() {
        const imageData = reader.result;
        
        // Update the UI
        const output = document.getElementById('userMainPic');
        output.src = imageData;
        
        // Save to LocalStorage
        localStorage.setItem('userProfilePic', imageData);
    };
    
    if (event.target.files[0]) {
        reader.readAsDataURL(event.target.files[0]);
    }
}

// Full screen functions remain the same
function openFullView() {
    const modal = document.getElementById("fullScreenModal");
    const fullImg = document.getElementById("fullResImage");
    modal.style.display = "flex";
    fullImg.src = document.getElementById("userMainPic").src;
}

function closeFullView() {
    document.getElementById("fullScreenModal").style.display = "none";
}
function applyProfilePicture() {
    const savedImage = localStorage.getItem("profileImage");

    if(savedImage){
        profilePic.src = savedImage;
    }
}