
// ================= NOTIFICATION SYSTEM =================
const notificationIcon = document.querySelector('.notification');
const notificationList = document.querySelector('#notification-list');
const notificationCount = document.querySelector('.notification .num');

let notifications = [];

// TOGGLE DROPDOWN (IMPORTANT FIX)
if (notificationIcon) {
	notificationIcon.addEventListener('click', () => {
		notificationIcon.classList.toggle('active');
	});
}

// ADD NOTIFICATION
function addNotification(type, message) {
	const notif = {
		type,
		message,
		time: new Date().toLocaleTimeString()
	};

	notifications.unshift(notif);
	updateNotifications();
}

// UPDATE UI
function updateNotifications() {
	if (!notificationList || !notificationCount) return;

	notificationList.innerHTML = '';

	if (notifications.length === 0) {
		notificationList.innerHTML = `
			<li style="padding:10px; text-align:center; color:gray;">
				No notifications
			</li>
		`;
		notificationCount.innerText = 0;
		return;
	}

	notifications.forEach(n => {
		const li = document.createElement('li');

		let icon = 'bx-bell';
		if (n.type === 'message') icon = 'bx-message';
		if (n.type === 'post') icon = 'bx-news';
		if (n.type === 'follow') icon = 'bx-user-plus';
		if (n.type === 'subscriber') icon = 'bx-star';

		li.innerHTML = `
			<i class='bx ${icon}'></i>
			<div>
				<p>${n.message}</p>
				<small>${n.time}</small>
			</div>
		`;

		notificationList.appendChild(li);
	});

	notificationCount.innerText = notifications.length;
}

// ================= TEST DATA =================
addNotification('message', 'You received a new message from John');
addNotification('post', 'A new post was uploaded');
addNotification('follow', 'Anna started following you');
addNotification('subscriber', 'You got a new subscriber!');
// ================= DARK MODE =================
const toggle = document.getElementById('switch-mode');

if (toggle) {
    // load saved mode
    if (localStorage.getItem('darkMode') === 'on') {
        document.body.classList.add('dark');
        toggle.checked = true;
    }

    toggle.addEventListener('change', () => {
        document.body.classList.toggle('dark');

        if (document.body.classList.contains('dark')) {
            localStorage.setItem('darkMode', 'on');
        } else {
            localStorage.setItem('darkMode', 'off');
        }
    });
}


// ================= TODO LIST =================
const todoList = document.querySelector('.todo-list');
const addBtn = document.querySelector('#add-todo');

if (todoList && addBtn) {

    addBtn.addEventListener('click', () => {
        const task = prompt("Enter a new task:");

        if (!task || task.trim() === "") return;

        const li = document.createElement('li');
        li.className = 'not-completed';

        li.innerHTML = `
            <p>${task}</p>
            <i class='bx bx-dots-vertical-rounded'></i>
        `;

        todoList.appendChild(li);
    });

    // click events (complete + edit)
    todoList.addEventListener('click', (e) => {
        const li = e.target.closest('li');
        if (!li) return;

        // EDIT TASK
        if (e.target.classList.contains('bx-dots-vertical-rounded')) {
            const p = li.querySelector('p');
            const newText = prompt("Edit task:", p.innerText);

            if (newText && newText.trim() !== "") {
                p.innerText = newText;
            }
        } 
        // TOGGLE COMPLETE
        else {
            li.classList.toggle('completed');
            li.classList.toggle('not-completed');
        }
    });
}