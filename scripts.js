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
let playersNumber = 0;

inputValue.focus();
playBtn.addEventListener("click", createGameField);
inputValue.addEventListener("keyup", (e) => {
  if (e.key === "Enter") createGameField();
});
replayBtn.addEventListener("click", resetGame);
replayBtn.addEventListener("keyup", (e) => {
  if (e.key === "Enter") resetGame;
});

function createGameField() {
  if (!inputValue.value) {
    updateMessageToUser(message.inputFieldEmpty);
    inputValue.focus();
    return;
  }
  playBtn.disabled = "disabled";
  playBtn.textContent = "Look for the red square";
  updateMessageToUser(message.takeAGuess);
  playersNumber = Math.round(inputValue.value);
  disableInputField(inputValue);
  createSquares(playersNumber);
  randomNumber = chooseRandomNumber(playersNumber);
  window.addEventListener("click", checkAnswer);
  window.addEventListener("keyup", (e) => {
    if (e.key === "Enter") checkAnswer(e);
  });
}

function checkAnswer(e) {
  if (guessIsMade) {
    displayPlayAgainMsg();
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
      checkAreHelpingBannersNeeded(correctSquare, e);
    }
    guessIsMade = true;
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
  location.reload();
}

function updateMessageToUser(message) {
  messageToUser.textContent = message;
}
function displayPlayAgainMsg() {
  messageToUser.textContent = message.playAgain;
  arrow.style.display = "block";
  messageToUser.style.fontSize = "1rem";
  setTimeout(()=> {
    messageToUser.style.fontSize = "0.9rem";
  }, 400);
}