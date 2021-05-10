import {
  showPlayButton,
  message,
  displayWrongSquare,
  disableInputField,
  chooseRandomNumber,
  showResetButton,
  getRandomNumberInRange,
  isElementInViewport
} from "./helpers.js";

const inputValue = document.querySelector("#odds-value");
const messageToUser = document.querySelector("#message");
const playBtn = document.querySelector("#btn");
const main = document.querySelector("main");
const percents = document.querySelector(".percent-value");
const gameSizeNumber = document.getElementById("game-size");
const footer = document.querySelector("footer");
let squaresArray = [];

let guessIsMade = false;
let randomNumber = 0;
let sizeOfGameField = 0;

window.onload = (e) => {
  sizeOfGameField = getRandomNumberInRange(100, 500);
  const percentage = parseFloat((1 / sizeOfGameField * 100).toFixed(2));
  percents.textContent = `${percentage}%`;
  createGameField(sizeOfGameField);
  inputValue.value = sizeOfGameField;
  gameSizeNumber.textContent = sizeOfGameField;
  updateMessageToUser(message.startGame);
};

playBtn.addEventListener("click", function (e) {
  const button = e.target;
  if (button.classList.contains("reset")) {
    resetGame();
    return;
  }
  if (inputValueIsValidated(inputValue.value)) {
    sizeOfGameField = Math.round(inputValue.value);
    createGameField(sizeOfGameField);
  }
});
playBtn.addEventListener("keyup", (e) => {
  if (e.key === "Enter" && button.classList.contains("reset")) resetGame();
});

inputValue.addEventListener("keyup", (e) => {
  playBtn.classList.remove("reset");
  sizeOfGameField = Math.round(inputValue.value);
  if (!sizeOfGameField) {
    playBtn.classList.add("hide-btn");
    updateMessageToUser(message.playAgain);
  } else {
    showPlayButton(btn);
    updateMessageToUser(" ");
  }
  if (e.key === "Enter" && inputValueIsValidated(sizeOfGameField)) {
    createGameField(sizeOfGameField);
  }
});
inputValue.addEventListener("click", () => {
  if (inputValue.value) {
    showPlayButton(playBtn);
    updateMessageToUser(" ");
  }
});
window.addEventListener("click", (e) => {
  checkAnswer(e);
});
window.addEventListener("keyup", (e) => {
  if (e.key === "Enter") checkAnswer(e);
});

function createGameField(numberOfSquares) {
  disableInputField(inputValue);
  inputValue.value = numberOfSquares;
  inputValue.style.color = "#fff";
  createSquares(numberOfSquares);
  gameSizeNumber.textContent = numberOfSquares;
  const percentage = parseFloat((1 / numberOfSquares * 100).toFixed(2));
  percents.textContent = `${percentage}%`;
  randomNumber = chooseRandomNumber(numberOfSquares);
  playBtn.classList.add("hide-btn");
  updateMessageToUser(message.startGame);
}

function checkAnswer(event) {
  const currentSquare = event.target;
  if (guessIsMade && currentSquare.classList.contains("square")) {
    updateMessageToUser(message.playAgain);
    resetGame();
    return;
  }
  if (currentSquare.classList.contains("square")) {
    const correctSquare = squaresArray[randomNumber];
    correctSquare.setAttribute("id", "correct-square");
    if (squaresArray.indexOf(currentSquare) === randomNumber) {
      updateMessageToUser(message.luckyGuess);
    } else {
      updateMessageToUser(message.wrongGuess);
      displayWrongSquare(currentSquare);
      // checkAreHelpingBannersNeeded(correctSquare);
    }
    guessIsMade = true;
    showResetButton(playBtn);
    if(!isElementInViewport(inputValue)) {
      const toTheTopBtn = document.createElement('a');
      toTheTopBtn.setAttribute("id", "to-top-btn")
      toTheTopBtn.setAttribute("href","#odds-value");
      toTheTopBtn.textContent = "To the top!"
      footer.appendChild(toTheTopBtn);
      toTheTopBtn.addEventListener('click', ()=> {
        footer.removeChild(toTheTopBtn);
      })
    }
  }
}

function createSquares(size) {
  const grid = document.createElement("div");
  grid.classList.add("grid");
  main.appendChild(grid);
  for (let i = 0; i < size; i++) {
    const square = document.createElement("a");
    square.classList.add("square");
    square.setAttribute("tabindex", 0);
    grid.appendChild(square);
    squaresArray.push(square);
  }
}

function resetGame() {
  const grid = document.querySelector(".grid");
  const squares = document.querySelectorAll(".square");
  const yellowBtn = document.querySelector(".show-correct-square");
  const card = document.querySelector(".card");
  if (document.body.contains(yellowBtn)) document.body.removeChild(yellowBtn);
  if (document.body.contains(card)) document.body.removeChild(card);
  squares.forEach((square) => grid.removeChild(square));
  main.removeChild(grid);
  guessIsMade = false;
  updateMessageToUser(message.playAgain);
  inputValue.disabled = false;
  inputValue.style.color = "#000";
  inputValue.value = "";
  inputValue.focus();
  squaresArray.length = 0;
  playBtn.classList.add("hide-btn");

}

function updateMessageToUser(message) {
  messageToUser.textContent = message;
}

function inputValueIsValidated(value) {
  if (!value || value === NaN) {
    updateMessageToUser(message.inputFieldEmpty);
    inputValue.focus();
    return false;
  }
  if (Math.round(value) < 2) {
    updateMessageToUser(message.valueGreaterThanTwo);
    inputValue.focus();
    return false;
  }


  return true;
}
