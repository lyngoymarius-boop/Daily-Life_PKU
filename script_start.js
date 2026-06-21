// script_start.js
// Uses data-delay attributes for ordered entrance animations,
// then IntersectionObserver to trigger wakeup scene on scroll.

window.addEventListener("load", () => {

    // Hero section: each element reads its own data-delay
    document
        .querySelectorAll(".hero .slide-left, .hero .slide-right, .hero .fade-up")
        .forEach((el) => {
            const delay = parseInt(el.dataset.delay) || 0;
            setTimeout(() => el.classList.add("show"), delay);
        });

});

// Wakeup scene: trigger when scrolled into view
const observer = new IntersectionObserver(
    entries => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const delay = parseInt(el.dataset.delay) || index * 350;
                setTimeout(() => el.classList.add("show"), delay);
                observer.unobserve(el);
            }
        });
    },
    { threshold: 0.15 }
);

document
    .querySelectorAll(".wakeup .slide-left, .wakeup .slide-right, .wakeup .fade-up")
    .forEach(el => observer.observe(el));
