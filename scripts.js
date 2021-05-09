import {
  checkAreHelpingBannersNeeded,
  toggleButton,
  message,
  displayWrongSquare,
  disableInputField,
  chooseRandomNumber,
} from "./helpers.js";

const inputValue = document.querySelector("#odds-value");
const messageToUser = document.querySelector("#message");
const arrow = document.getElementById("arrow");
const playBtn = document.querySelector(".lets-do-this");
const replayBtn = document.querySelector(".play-again");
const main = document.querySelector("main");
let squaresArray = [];

let guessIsMade = false;
let randomNumber = 0;
let sizeOfGameField = 366;

inputValue.focus();
window.onload = (e) => {
  createGameField(sizeOfGameField);
  updateMessageToUser("Find the red square!");
  arrow.style.display = "block";
  playBtn.style.display = 'none';
}
playBtn.addEventListener("click", function () {
  if (inputValueIsValidated(inputValue.value)) {
    sizeOfGameField = Math.round(inputValue.value);
    createGameField(sizeOfGameField);
  }

});
inputValue.addEventListener("keyup", (e) => {
  const keyStroke = e.key;
  console.log({ keyStroke });
  if (e.key === "Enter") {
    sizeOfGameField = Math.round(inputValue.value);
    if (inputValueIsValidated(sizeOfGameField)) {
      createGameField(sizeOfGameField);
    }
  }
});
replayBtn.addEventListener("click", resetGame);
replayBtn.addEventListener("keyup", (e) => {
  if (e.key === "Enter") resetGame;
});
window.addEventListener("click", checkAnswer);
window.addEventListener("keyup", (e) => {
  if (e.key === "Enter") checkAnswer(e);
});

function createGameField(numberOfSquares) {
  playBtn.disabled = "disabled";
  playBtn.textContent = "Look for the red square";
  updateMessageToUser(message.takeAGuess);
  disableInputField(inputValue);
  createSquares(numberOfSquares);
  randomNumber = chooseRandomNumber(numberOfSquares);
}

function inputValueIsValidated(value) {
  if (!value) {
    updateMessageToUser(message.inputFieldEmpty);
    inputValue.focus();
    return false;
  }
  if (Math.round(value) < 2) {
    updateMessageToUser(message.valueGreaterThanTwo);
    inputValue.focus();
    return false;
  }
  if (parseInt(value) === NaN) {
    updateMessageToUser("Only numbers allowed!")
    return false;
  }
  return true;
}

function checkAnswer(e) {
  if (guessIsMade && e.target.classList.contains("square")) {
    displayPlayAgainMsg();
    playBtn.style.display = "none";
    return;
  }
  
  if (e.target.classList.contains("square")) {
    const currentSquare = e.target;
    const correctSquare = squaresArray[randomNumber];
    correctSquare.setAttribute("id", "correct-square");
    if (squaresArray.indexOf(currentSquare) === randomNumber) {
      updateMessageToUser(message.luckyGuess);
    } else {
      updateMessageToUser(message.wrongGuess);
      displayWrongSquare(currentSquare);
      checkAreHelpingBannersNeeded(correctSquare);
    }
    guessIsMade = true;
    playBtn.style.display = "none";
    toggleButton(playBtn);
    toggleButton(replayBtn);
  }
}

function createSquares(number) {
  const grid = document.createElement("div");
  grid.classList.add("grid");
  main.appendChild(grid);
  for (let i = 0; i < number; i++) {
    const square = document.createElement("a");
    square.classList.add("square");
    square.setAttribute("tabindex", 0);
    grid.appendChild(square);
    squaresArray.push(square);
  }
}

function resetGame() {
  const grid = document.querySelector('.grid');
  const squares = document.querySelectorAll('.square');
  const yellowBtn = document.querySelector(".show-correct-square");
  const card = document.querySelector('.card');
  if (document.body.contains(yellowBtn)) document.body.removeChild(yellowBtn);
  if( document.body.contains(card)) document.body.removeChild(card);
  squares.forEach(square => grid.removeChild(square));
  main.removeChild(grid);
  toggleButton(replayBtn);
  toggleButton(playBtn);
  guessIsMade = false;
  playBtn.style.display = "block";
  playBtn.textContent = "Let's do this!",
  playBtn.disabled = false;
  messageToUser.textContent = "";
  arrow.style.display = "none";
  inputValue.disabled = false;
  inputValue.style.color = "#000";
  inputValue.value = "";
  inputValue.focus();
  squaresArray.length = 0;
}

function updateMessageToUser(message) {
  messageToUser.textContent = message;
}
function displayPlayAgainMsg() {
  messageToUser.textContent = message.playAgain;
  arrow.style.display = "block";
  messageToUser.style.fontSize = "1rem";
  setTimeout(() => {
    messageToUser.style.fontSize = "0.9rem";
  }, 400);
}
