function toggleLike(btn, id) {

    const counter = document.getElementById(id);

    if (!counter) return;

    let count = parseInt(counter.innerText.replace(/[^0-9]/g, "")) || 0;

    // default state fix (important for HTML)
    if (!btn.dataset.liked) {
        btn.dataset.liked = "false";
    }

    if (btn.dataset.liked === "true") {

        btn.dataset.liked = "false";
        btn.innerText = "♡";
        btn.style.color = "black";

        count--;

    } else {

        btn.dataset.liked = "true";
        btn.innerText = "❤️";
        btn.style.color = "red";

        count++;
    }

    counter.innerText = count + " likes";
}
