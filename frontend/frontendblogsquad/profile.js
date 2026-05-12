function addGallery() {
  const url = prompt("Enter image URL:");
  if (url) {
    const img = document.createElement("img");
    img.src = url;
    img.style.width = "100px";
    img.style.margin = "5px";
    document.getElementById("galleryBox").appendChild(img);
  }
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