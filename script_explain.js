// script_explain.js — Sentence builder game

const tiles    = document.querySelectorAll(".word-tile");
const slots    = document.querySelectorAll(".drop-slot");
const checkBtn = document.getElementById("checkBtn");
const retryBtn = document.getElementById("retryBtn");
const hearBtn  = document.getElementById("hearBtn");
const feedback = document.getElementById("feedback");
const nextBtn  = document.getElementById("nextBtn");
const tileTray = document.querySelector(".group-tiles");

nextBtn.classList.add("disabled");

// ============================================
// DRAG START / END
// ============================================
tiles.forEach(function(tile) {
    tile.addEventListener("dragstart", function(event) {
        event.dataTransfer.setData("text/plain", tile.dataset.word);
        tile.classList.add("dragging");
    });
    tile.addEventListener("dragend", function() {
        tile.classList.remove("dragging");
    });
});

// ============================================
// DROP ON SLOTS
// ============================================
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

        const wordValue   = event.dataTransfer.getData("text/plain");
        const droppedTile = document.querySelector(`[data-word="${wordValue}"]`);

        // Return existing tile to tray if slot is occupied
        const existingTile = slot.querySelector(".word-tile");
        if (existingTile) {
            existingTile.classList.remove("placed");
            tileTray.appendChild(existingTile);
        }

        slot.appendChild(droppedTile);
        slot.classList.add("filled");
        droppedTile.classList.add("placed");
    });
});

// ============================================
// CHECK SENTENCE
// ============================================
checkBtn.addEventListener("click", function() {
    let allCorrect = true;
    let allFilled  = true;

    slots.forEach(function(slot) {
        const tile = slot.querySelector(".word-tile");
        if (!tile) { allFilled = false; return; }
        if (tile.dataset.word !== slot.dataset.answer) allCorrect = false;
    });

    if (!allFilled) {
        feedback.textContent = "Fill in all the blanks first!";
        feedback.className   = "feedback incorrect";
        return;
    }

    if (allCorrect) {
        feedback.textContent = "Perfect! That's exactly how you can explain it! 🌟";
        feedback.className   = "feedback correct";
        nextBtn.classList.remove("disabled");
    } else {
        feedback.textContent = "Some words are in the wrong place — try again!";
        feedback.className   = "feedback incorrect";
    }
});

// ============================================
// TRY AGAIN — returns all tiles to the tray
// ============================================
retryBtn.addEventListener("click", function() {
    slots.forEach(function(slot) {
        const tile = slot.querySelector(".word-tile");
        if (tile) {
            tile.classList.remove("placed");
            tileTray.appendChild(tile);
        }
        slot.classList.remove("filled");
    });

    feedback.textContent = "";
    feedback.className   = "feedback";
    nextBtn.classList.add("disabled");
});

// ============================================
// HEAR IT — text to speech
// ============================================
const fullSentence =
    "I have PKU, so I have to be careful with protein. " +
    "I eat special foods and drink a special formula " +
    "to keep my body healthy and strong.";

hearBtn.addEventListener("click", function() {
    const utterance = new SpeechSynthesisUtterance(fullSentence);
    utterance.rate  = 0.9;
    utterance.pitch = 1.1;
    window.speechSynthesis.speak(utterance);
});

// ============================================
// LOAD ANIMATIONS
// ============================================
window.addEventListener("load", () => {

    // Groups with data-delay
    document
        .querySelectorAll(".fade-up, .slide-left, .slide-right")
        .forEach((el) => {
            const delay = parseInt(el.dataset.delay) || 0;
            setTimeout(() => el.classList.add("show"), delay);
        });

    // Tile cascade — pops in one-by-one after sentence appears
    document.querySelectorAll(".tile-enter").forEach((tile, index) => {
        setTimeout(() => tile.classList.add("show"), 900 + index * 120);
    });

});
