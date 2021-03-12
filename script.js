'use strict';

// Get Html elements
const player1El = document.querySelector('.player--0');
const player2El = document.querySelector('.player--1');

const btnNew = document.querySelector('.btn--new');
const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const diceEl = document.querySelector('.dice');
const player1ScoreEl = document.querySelector('#score--0');
const player2ScoreEl = document.querySelector('#score--1');
const player1CurScoreEl = document.querySelector('#current--0');
const player2CurScoreEl = document.querySelector('#current--1');

// Logic Variables
// RollDice Variables
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
// State variables
let playing = true;

// Functions
function switchPlayer() {
  //tERNARY OPERATOR TO SWITCH BETWEEN PLAYERS
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1El.classList.toggle('player--active');
  player2El.classList.toggle('player--active');
}

// Event Listeners
// New Game
btnNew.addEventListener('click', () => {

  player1ScoreEl.textContent = '0';
  player2ScoreEl.textContent = '0';
  player1CurScoreEl.textContent = '0';
  player2CurScoreEl.textContent = '0';
  activePlayer = 0;
  currentScore = 0;
  scores = [0, 0];
  diceEl.classList.add('hidden');
  player1El.classList.remove('player--winner');
  player2El.classList.remove('player--winner');
  player1El.classList.add('player--active');
  playing = true;

});
// Roll the dice
btnRollDice.addEventListener('click', e => {
  // generate diceroll and set dice element
  if (playing) {
    let diceRoll = Math.floor(Math.random() * 6) + 1;
    diceEl.src = `dice-${diceRoll}.png`;
    diceEl.classList.remove('hidden');
    if (diceRoll !== 1) {
      //Add dice roll to current score
      currentScore += diceRoll;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      currentScore = 0;
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      switchPlayer();
    }
  }
});
// Hold, add score and check win
btnHold.addEventListener('click', () => {
  // Add current score to total score and update html element
  scores[activePlayer] += currentScore;
  currentScore = 0;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  // Check to see if score is 100
  if (scores[activePlayer] >= 10) {
    playing = false;
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
    diceEl.classList.add('hidden');
  } else {
    // If score is not 100 or greater, switch player
    switchPlayer();
  }
});