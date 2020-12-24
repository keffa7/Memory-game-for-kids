'use strict'
// elements
const cards = document.querySelectorAll('.memory-card');

// The matching logic
let hasFlippedCard = false;
//if not a match we need to wait until the cards finish on flipping
let lockBoard = false;
let firstCard, secondCard;

// Functions 
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    //*This keyword represents the element that fired the event
    this.classList.add('flip');
    // registrira prvi klik
    if (!hasFlippedCard) {
        //first click
        hasFlippedCard = true;
        firstCard = this;
        // if the first clause is right it will stop execute
        return;
    }
    // second click
    secondCard = this;

    checkForMatch();
}

function checkForMatch() {
    // do cards match? data-attributes
    let doMatch = firstCard.dataset.animal === secondCard.dataset.animal;
    // ternary operators
    doMatch ? disableCards() : unflipCards();
}

// If it's a match 
function disableCards() {
    // if it's match disable event.listener
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}
// If it's not a match
function unflipCards() {
    lockBoard = true;
    //it will remove flip class from second card before we see it - set delay
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    // ES6 destructuring
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// randomize cards
// * invoke immediate execution
(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12)
        card.style.order = randomPos;
    });
})();

// Event
cards.forEach(card =>
    card.addEventListener('click', flipCard));


















