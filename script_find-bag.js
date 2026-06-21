// script_find-bag.js

const bag      = document.getElementById("bag");
const feedback = document.getElementById("feedback");
const nextBtn  = document.getElementById("nextBtn");
const hintBtn  = document.getElementById("hintBtn");
const retryBtn = document.getElementById("retryBtn");

let found = false;

// ============================================
// FIND THE BAG
// ============================================
bag.addEventListener("click", () => {
    if (found) return;
    found = true;

    bag.classList.add("bag-found");
    feedback.textContent = "Amazing! You found Mika's PKU bag! 🎉";
    feedback.classList.add("success");
    nextBtn.classList.remove("disabled");
    createConfetti();
});

// ============================================
// HINT — makes the bag pulse briefly
// ============================================
hintBtn.addEventListener("click", () => {
    if (found) return;
    bag.animate([
        { transform:"scale(.85)" },
        { transform:"scale(1.2)" },
        { transform:"scale(.85)" }
    ], { duration:800 });
});

// ============================================
// TRY AGAIN — resets the bag to hidden state
// ============================================
retryBtn.addEventListener("click", () => {
    found = false;
    bag.classList.remove("bag-found");
    feedback.textContent = "";
    feedback.className   = "feedback";
    nextBtn.classList.add("disabled");

    // Clear any leftover confetti
    document.querySelectorAll(".confetti").forEach(c => c.remove());
});

// ============================================
// CONFETTI
// ============================================
function createConfetti() {
    const scene  = document.querySelector(".room-scene");
    const emojis = ["⭐","✨","🎉","🌟"];

    for (let i = 0; i < 20; i++) {
        const confetti     = document.createElement("div");
        confetti.classList.add("confetti");
        confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        confetti.style.left  = Math.random() * 700 + "px";
        confetti.style.top   = Math.random() * 300 + "px";
        scene.appendChild(confetti);
        setTimeout(() => confetti.remove(), 1000);
    }
}

// ============================================
// LOAD ANIMATIONS
// ============================================
window.addEventListener("load", () => {
    document
        .querySelectorAll(".fade-up, .slide-left, .slide-right")
        .forEach((el) => {
            const delay = parseInt(el.dataset.delay) || 0;
            setTimeout(() => el.classList.add("show"), delay);
        });
});
