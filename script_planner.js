// script_planner.js — Plan Your Day drag-and-drop game

const correctOrder = ["wake-up", "brush-teeth", "formula", "pack-bag", "school"];

const cards    = document.querySelectorAll(".task-card");
const slots    = document.querySelectorAll(".drop-slot");
const checkBtn = document.getElementById("checkBtn");
const retryBtn = document.getElementById("retryBtn");
const feedback = document.getElementById("feedback");
const nextBtn  = document.getElementById("nextBtn");

// ============================================
// DRAG AND DROP
// ============================================
cards.forEach(function(card) {
    card.addEventListener("dragstart", function(event) {
        event.dataTransfer.setData("text/plain", card.dataset.task);
        card.classList.add("dragging");
    });
    card.addEventListener("dragend", function() {
        card.classList.remove("dragging");
    });
});

slots.forEach(function(slot) {
    slot.addEventListener("dragover", function(event) {
        event.preventDefault();
        slot.classList.add("drag-over");
    });
    slot.addEventListener("dragleave", function() {
        slot.classList.remove("drag-over");
    });
    slot.addEventListener("drop", function(event) {
        event.preventDefault();
        slot.classList.remove("drag-over");

        const taskName    = event.dataTransfer.getData("text/plain");
        const draggedCard = document.querySelector(`[data-task="${taskName}"]`);

        // Return existing card to card tray if slot is occupied
        if (slot.children.length > 0) {
            const existing = slot.querySelector(".task-card");
            document.querySelector(".group-cards").appendChild(existing);
        }

        slot.appendChild(draggedCard);
    });
});

// ============================================
// CHECK ORDER
// ============================================
nextBtn.classList.add("disabled");

checkBtn.addEventListener("click", function() {
    const currentOrder = [];

    slots.forEach(function(slot) {
        const card = slot.querySelector(".task-card");
        currentOrder.push(card ? card.dataset.task : null);
    });

    if (currentOrder.includes(null)) {
        feedback.textContent = "Fill in all the slots first!";
        feedback.className   = "feedback incorrect";
        return;
    }

    if (JSON.stringify(currentOrder) === JSON.stringify(correctOrder)) {
        feedback.textContent = "Great job! That's the correct order! 🎉";
        feedback.className   = "feedback correct";
        nextBtn.classList.remove("disabled");
    } else {
        feedback.textContent = "Not quite right — try again!";
        feedback.className   = "feedback incorrect";
    }
});

// ============================================
// TRY AGAIN — returns all cards to the tray
// ============================================
retryBtn.addEventListener("click", function() {
    const cardTray = document.querySelector(".group-cards");

    slots.forEach(function(slot) {
        const card = slot.querySelector(".task-card");
        if (card) cardTray.appendChild(card);
    });

    feedback.textContent = "";
    feedback.className   = "feedback";
    nextBtn.classList.add("disabled");
});

// ============================================
// LOAD ANIMATIONS — data-delay based
// ============================================
window.addEventListener("load", () => {
    document
        .querySelectorAll(".fade-up, .slide-left, .slide-right")
        .forEach((el) => {
            const delay = parseInt(el.dataset.delay) || 0;
            setTimeout(() => el.classList.add("show"), delay);
        });
});
