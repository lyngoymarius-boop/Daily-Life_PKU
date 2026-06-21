// script_thankyou.js — celebratory entrance with confetti burst

// ============================================
// CONFETTI BURST on page load
// ============================================
function launchConfetti() {
    const container = document.getElementById("confettiContainer");
    const emojis    = ["⭐","✨","🎉","🌟","🎊","💛","💚","💙"];

    for (let i = 0; i < 30; i++) {
        const piece = document.createElement("div");
        piece.classList.add("confetti-piece");
        piece.textContent      = emojis[Math.floor(Math.random() * emojis.length)];
        piece.style.left       = Math.random() * 100 + "vw";
        piece.style.top        = Math.random() * 30 + "vh";
        piece.style.animationDelay = Math.random() * 1 + "s";
        container.appendChild(piece);

        // Remove after animation so DOM stays clean
        setTimeout(() => piece.remove(), 3000);
    }
}

// ============================================
// LOAD ANIMATIONS
// ============================================
window.addEventListener("load", () => {

    // Staggered entrance using data-delay
    document
        .querySelectorAll(".fade-up, .slide-left, .slide-right")
        .forEach((el) => {
            const delay = parseInt(el.dataset.delay) || 0;
            setTimeout(() => el.classList.add("show"), delay);
        });

    // Launch confetti half a second after load
    setTimeout(launchConfetti, 500);

});
