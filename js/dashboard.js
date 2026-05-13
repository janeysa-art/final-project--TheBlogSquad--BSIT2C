// ================= NOTIFICATIONS =================
let notifications = [];

function addNotification(type, message) {
    notifications.unshift({
        type,
        message,
        time: new Date().toLocaleTimeString()
    });
    updateNotifications();
}

function updateNotifications() {
    const list = document.querySelector('#notification-list');
    const count = document.querySelector('.notification .num');

    if (!list || !count) return;

    list.innerHTML = "";

    if (notifications.length === 0) {
        list.innerHTML = `<li style="padding:10px;text-align:center;color:gray;">No notifications</li>`;
        count.innerText = 0;
        return;
    }

    notifications.forEach(n => {
        let icon = "bx-bell";
        if (n.type === "message") icon = "bx-message";
        if (n.type === "post") icon = "bx-news";
        if (n.type === "follow") icon = "bx-user-plus";
        if (n.type === "subscriber") icon = "bx-star";

        const li = document.createElement("li");
        li.innerHTML = `
            <i class='bx ${icon}'></i>
            <div>
                <p>${n.message}</p>
                <small>${n.time}</small>
            </div>
        `;
        list.appendChild(li);
    });

    count.innerText = notifications.length;
}

// TEST NOTIFICATIONS
addNotification("message", "You received a new message");
addNotification("post", "New diary entry created");
addNotification("follow", "A traveler joined your journey");


// ================= DARK MODE =================
document.addEventListener("DOMContentLoaded", () => {

    const toggle = document.getElementById("switch-mode");

    if (toggle) {
        if (localStorage.getItem("darkMode") === "on") {
            document.body.classList.add("dark");
            toggle.checked = true;
        }

        toggle.addEventListener("change", () => {
            document.body.classList.toggle("dark");

            localStorage.setItem(
                "darkMode",
                document.body.classList.contains("dark") ? "on" : "off"
            );
        });
    }

    syncDashboardStats();
    updateStats();
});


// ================= DIARY SAVE =================
document.getElementById("save-diary")?.addEventListener("click", () => {

    const title = document.getElementById("diary-title").value;
    const content = document.getElementById("diary-body").value;

    if (!title.trim() || !content.trim()) {
        alert("Write a full adventure entry!");
        return;
    }

    let writings = parseInt(localStorage.getItem("totalWritings")) || 0;
    writings++;
    localStorage.setItem("totalWritings", writings);

    document.getElementById("writing-status").innerText =
        "Adventure saved successfully!";

    refreshAdventureStats();
});

function updateDiaryStats() {
    const count = localStorage.getItem("totalWritings") || 0;
    const el = document.getElementById("total-writings-count");
    if (el) el.innerText = count;
}


// ================= POST COUNT =================
function syncDashboardStats() {
    const count = localStorage.getItem("postCount") || 0;
    const el = document.getElementById("total-posts-count");
    if (el) el.innerText = count;
}


// ================= TRAVELERS =================
document.addEventListener("DOMContentLoaded", () => {

    const saveTravelerBtn = document.getElementById("save-traveler");

    function loadTravelers() {
        const list = document.getElementById("traveler-list");
        const data = JSON.parse(localStorage.getItem("travelersMet")) || [];

        list.innerHTML = "";

        data.forEach((t, i) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <strong>${t.name}</strong>
                <small>(${t.date})</small>
                <button onclick="deleteTraveler(${i})">❌</button>
            `;
            list.appendChild(li);
        });
    }

    window.deleteTraveler = function (i) {
        let data = JSON.parse(localStorage.getItem("travelersMet")) || [];
        data.splice(i, 1);
        localStorage.setItem("travelersMet", JSON.stringify(data));
        loadTravelers();
        updateStats();
    };

    saveTravelerBtn?.addEventListener("click", () => {

        const input = document.getElementById("traveler-name");
        const name = input.value.trim();

        if (!name) return alert("Enter traveler name!");

        let data = JSON.parse(localStorage.getItem("travelersMet")) || [];

        data.unshift({
            name,
            date: new Date().toLocaleDateString()
        });

        localStorage.setItem("travelersMet", JSON.stringify(data));

        input.value = "";

        loadTravelers();
        updateStats();
    });

    loadTravelers();
});


// ================= GLOBAL STATS =================
function updateStats() {

    const logs = JSON.parse(localStorage.getItem("adventureLogs")) || [];
    const travelers = JSON.parse(localStorage.getItem("travelersMet")) || [];
    const todos = JSON.parse(localStorage.getItem("todos")) || [];

    const done = todos.filter(t => t.completed).length;

    const set = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.innerText = val;
    };

    set("adventures-count", logs.length);
    set("travelers-count", travelers.length);
    set("quest-count", done);
}


// expose for other pages
window.refreshAdventureStats = updateStats;
// ================= DIARY SYSTEM =================

document.addEventListener("DOMContentLoaded", () => {

    const titleInput = document.getElementById("diary-title");
    const bodyInput = document.getElementById("diary-body");
    const saveBtn = document.getElementById("save-diary");
    const list = document.getElementById("diary-list");
    const status = document.getElementById("writing-status");

    // LOAD EXISTING ENTRIES
    loadEntries();
    updateCount();

    // SAVE ENTRY
    saveBtn.addEventListener("click", () => {

        const title = titleInput.value.trim();
        const body = bodyInput.value.trim();

        if (!title || !body) {
            alert("Write a title and your adventure!");
            return;
        }

        let entries = JSON.parse(localStorage.getItem("adventureLogs")) || [];

        const newEntry = {
            id: Date.now(),
            title,
            body,
            date: new Date().toLocaleString()
        };

        entries.unshift(newEntry);
        localStorage.setItem("adventureLogs", JSON.stringify(entries));

        // CLEAR INPUTS (THIS IS WHAT YOU ASKED)
        titleInput.value = "";
        bodyInput.value = "";

        status.innerText = "Adventure saved successfully!";

        loadEntries();
        updateCount();
    });

    // DISPLAY ENTRIES
    function loadEntries() {

        let entries = JSON.parse(localStorage.getItem("adventureLogs")) || [];

        list.innerHTML = "";

        entries.forEach(entry => {

            const div = document.createElement("div");
            div.className = "diary-entry";
            div.style.padding = "10px";
            div.style.margin = "10px 0";
            div.style.border = "1px solid #ddd";
            div.style.borderRadius = "10px";
            div.style.background = "#fff";

            div.innerHTML = `
                <h4>${entry.title}</h4>
                <small style="color:gray;">${entry.date}</small>
                <p>${entry.body}</p>

                <button onclick="deleteEntry(${entry.id})"
                        style="background:red;color:white;border:none;padding:5px 10px;border-radius:5px;cursor:pointer;">
                    Delete
                </button>
            `;

            list.appendChild(div);
        });
    }

    // UPDATE COUNT (for dashboard box)
    function updateCount() {
        let entries = JSON.parse(localStorage.getItem("adventureLogs")) || [];
        const countBox = document.getElementById("adventures-count");

        if (countBox) {
            countBox.innerText = entries.length;
        }
    }

    // DELETE ENTRY
    window.deleteEntry = function(id) {

        let entries = JSON.parse(localStorage.getItem("adventureLogs")) || [];

        entries = entries.filter(e => e.id !== id);

        localStorage.setItem("adventureLogs", JSON.stringify(entries));

        loadEntries();
        updateCount();
    };

});
// ================= BUCKET LIST SYSTEM =================

document.addEventListener("DOMContentLoaded", () => {
    loadBucketList();
    updateBucketCount();
});

// ADD ITEM
function addBucketItem() {

    const input = document.getElementById("bucket-input");
    const text = input.value.trim();

    if (!text) return alert("Write a bucket list goal!");

    let bucket = JSON.parse(localStorage.getItem("bucketList")) || [];

    bucket.unshift({
        id: Date.now(),
        text,
        done: false
    });

    localStorage.setItem("bucketList", JSON.stringify(bucket));

    input.value = "";

    loadBucketList();
    updateBucketCount();
}

// LOAD LIST
function loadBucketList() {

    const list = document.getElementById("bucket-list");
    if (!list) return;

    let bucket = JSON.parse(localStorage.getItem("bucketList")) || [];

    list.innerHTML = "";

    bucket.forEach(item => {

        const li = document.createElement("li");

        li.className = "list-group-item d-flex justify-content-between align-items-center";

        li.innerHTML = `
            <span style="text-decoration:${item.done ? 'line-through' : 'none'}">
                ${item.text}
            </span>

            <div>
                <button onclick="toggleBucketDone(${item.id})"
                        class="btn btn-sm btn-success">
                    ${item.done ? "Undo" : "Done"}
                </button>

                <button onclick="deleteBucketItem(${item.id})"
                        class="btn btn-sm btn-danger">
                    ❌
                </button>
            </div>
        `;

        list.appendChild(li);
    });
}

// MARK DONE / UNDONE
function toggleBucketDone(id) {

    let bucket = JSON.parse(localStorage.getItem("bucketList")) || [];

    bucket = bucket.map(item => {

        if (item.id === id) {
            item.done = !item.done;
        }

        return item;
    });

    localStorage.setItem("bucketList", JSON.stringify(bucket));

    loadBucketList();
    updateBucketCount();
}

// DELETE ITEM
function deleteBucketItem(id) {

    let bucket = JSON.parse(localStorage.getItem("bucketList")) || [];

    bucket = bucket.filter(item => item.id !== id);

    localStorage.setItem("bucketList", JSON.stringify(bucket));

    loadBucketList();
    updateBucketCount();
}

// COUNT COMPLETED (THIS CONNECTS TO YOUR DASHBOARD)
function updateBucketCount() {

    const bucket = JSON.parse(localStorage.getItem("bucketList")) || [];

    // ONLY count completed items
    const completed = bucket.filter(item => item.done).length;

    const questBox = document.getElementById("quest-count");

    if (questBox) {
        questBox.innerText = completed;
    }
}