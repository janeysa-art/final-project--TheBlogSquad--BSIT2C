function createNewPost() {
    const postArea = document.getElementById("postContent");
    const mediaInput = document.getElementById("mediaInput");
    const feed = document.getElementById("feedContainer");

    const text = postArea.value.trim();
    const file = mediaInput.files[0];

    if (text === "" && !file) {
        alert("Please write something or add a file!");
        return;
    }

    const postId = Date.now();

    let mediaHTML = "";
    if (file) {
        const url = URL.createObjectURL(file);

        if (file.type.startsWith("image/")) {
            mediaHTML = `<img src="${url}" class="w-100" style="max-height:400px; object-fit:cover;">`;
        } else if (file.type.startsWith("video/")) {
            mediaHTML = `<video src="${url}" controls class="w-100"></video>`;
        }
    }

    const newPost = document.createElement("div");
    newPost.className = "post shadow-sm mb-4 bg-white rounded";

    newPost.innerHTML = `
        <div class="p-3 d-flex align-items-center">
            <img src="usl.jpg" style="width:30px;height:30px;border-radius:50%;margin-right:10px;">
            <span class="fw-bold">Anna Smith</span>
            <small class="text-muted ms-2">Just now</small>
        </div>

        ${mediaHTML}

        <div class="px-3 pb-3">
            <p class="mt-2">${text}</p>

            <div class="mb-2">
                <span class="post-action-btn me-3" onclick="toggleLike(this,'like-${postId}')">♡</span>
                <span class="post-action-btn me-3" onclick="toggleComment('${postId}')">💬</span>
                <span class="post-action-btn" onclick="sharePost()">✈️</span>
            </div>

            <div class="fw-bold small mb-2" id="like-${postId}">0 likes</div>

            <div id="comment-box-${postId}" style="display:none;">
                <div id="comment-list-${postId}" class="small text-muted mb-2"></div>

                <div class="input-group">
                    <input id="comment-input-${postId}" class="form-control form-control-sm" placeholder="Write a comment...">
                    <button class="btn btn-sm btn-primary" onclick="addComment('${postId}')">Post</button>
                </div>
            </div>
        </div>
    `;

    feed.prepend(newPost);

    // reset
    postArea.value = "";
    mediaInput.value = "";
    document.getElementById("mediaPreview").innerHTML = "";
}
// ❤️ LIKE
function toggleLike(btn, id) {
    const counter = document.getElementById(id);
    let count = parseInt(counter.innerText);

    if (btn.innerText === "♡") {
        btn.innerText = "❤️";
        btn.style.color = "red";
        counter.innerText = (count + 1) + " likes";
    } else {
        btn.innerText = "♡";
        btn.style.color = "black";
        counter.innerText = (count - 1) + " likes";
    }
}

// 💬 SHOW COMMENT BOX
function toggleComment(postId) {
    const box = document.getElementById(`comment-box-${postId}`);
    box.style.display = box.style.display === "none" ? "block" : "none";
}

// 💬 ADD COMMENT
function addComment(postId) {
    const input = document.getElementById(`comment-input-${postId}`);
    const list = document.getElementById(`comment-list-${postId}`);

    if (input.value.trim()) {
        const div = document.createElement("div");
        div.innerHTML = `<b>You:</b> ${input.value}`;
        list.appendChild(div);
        input.value = "";
    }
}

// ✈️ SHARE
function sharePost() {
    if (navigator.share) {
        navigator.share({
            title: "Blogsquad",
            text: "Check out this post!",
            url: window.location.href
        }).catch(console.error);
    } else {
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied!");
    }
}