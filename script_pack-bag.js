// script_pack-bag.js — Drag correct PKU items into Mika's bag

const bagDrop = document.getElementById("bagDrop");
const bagContents = document.getElementById("bagContents");
const checkBtn = document.getElementById("checkBtn");
const retryBtn = document.getElementById("retryBtn");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("nextBtn");

// IMPORTANT:
// Count the required PKU items ONCE when the page loads
const totalCorrectItems =
document.querySelectorAll(".group-items .pack-item[data-correct='true']").length;

nextBtn.classList.add("disabled");

// Track what's in the bag
let bagItems = [];

// ============================================
// DRAG START
// ============================================

document.querySelectorAll(".pack-item").forEach(function(item) {

item.addEventListener("dragstart", function(event) {

    event.dataTransfer.setData(
        "text/plain",
        item.dataset.item
    );

    item.classList.add("dragging");
});

item.addEventListener("dragend", function() {

    item.classList.remove("dragging");

});

});

// ============================================
// BAG DRAG EVENTS
// ============================================

bagDrop.addEventListener("dragover", function(event) {

event.preventDefault();
bagDrop.classList.add("drag-over");

});

bagDrop.addEventListener("dragleave", function() {

bagDrop.classList.remove("drag-over");

});

// ============================================
// DROP INTO BAG
// ============================================

bagDrop.addEventListener("drop", function(event) {

event.preventDefault();

bagDrop.classList.remove("drag-over");

const itemName =
    event.dataTransfer.getData("text/plain");

const draggedEl =
    document.querySelector(`[data-item="${itemName}"]`);

if (!draggedEl) return;

// Prevent duplicates

if (bagItems.includes(itemName)) {
    return;
}

// Create visual clone

const clone = draggedEl.cloneNode(true);

clone.classList.remove("dragging");

clone.removeAttribute("draggable");

// Remove attributes so clones don't affect counting

clone.removeAttribute("data-item");
clone.removeAttribute("data-correct");

bagContents.appendChild(clone);

// Hide original

draggedEl.classList.add("packed");

// Store item

bagItems.push(itemName);

// Hide hint

const hint = document.querySelector(".bag-hint");

if (hint) {
    hint.style.display = "none";
}

feedback.textContent = "";
feedback.className = "feedback";

});

// ============================================
// CHECK BAG
// ============================================

checkBtn.addEventListener("click", function() {

if (bagItems.length === 0) {

    feedback.textContent =
        "The bag is empty! Drag some items in first.";

    feedback.className =
        "feedback incorrect";

    return;
}

const wrongItems = bagItems.filter(function(item) {

    const el =
        document.querySelector(`[data-item="${item}"]`);

    return el &&
        el.dataset.correct === "false";

});

const correctItems = bagItems.filter(function(item) {

    const el =
        document.querySelector(`[data-item="${item}"]`);

    return el &&
        el.dataset.correct === "true";

});

if (wrongItems.length > 0) {

    feedback.textContent =
        "Oops! Some items in the bag aren't PKU-safe. Try again!";

    feedback.className =
        "feedback incorrect";

    return;
}

if (correctItems.length < totalCorrectItems) {

    feedback.textContent =
        `Good start! But Mika still needs ${totalCorrectItems - correctItems.length} more PKU item(s).`;

    feedback.className =
        "feedback incorrect";

    return;
}

feedback.textContent =
    "Amazing! Mika's bag is perfectly packed! 🎒✨";

feedback.className =
    "feedback correct";

nextBtn.classList.remove("disabled");

});

// ============================================
// TRY AGAIN
// ============================================

retryBtn.addEventListener("click", function() {

bagContents.innerHTML = "";

document
    .querySelectorAll(".pack-item.packed")
    .forEach(function(item) {

        item.classList.remove("packed");

    });

bagItems = [];

const hint = document.querySelector(".bag-hint");

if (hint) {
    hint.style.display = "";
}

feedback.textContent = "";
feedback.className = "feedback";

nextBtn.classList.add("disabled");

});

// ============================================
// LOAD ANIMATIONS
// ============================================

window.addEventListener("load", () => {

document
    .querySelectorAll(
        ".fade-up, .slide-left, .slide-right"
    )
    .forEach((el) => {

        const delay =
            parseInt(el.dataset.delay) || 0;

        setTimeout(() => {

            el.classList.add("show");

        }, delay);

    });

});