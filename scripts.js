import {
  showPlayButton,
  message,
  displayWrongSquare,
  chooseRandomNumber,
  showResetButton,
  getRandomNumberInRange,
  isElementInViewport,
  hideButton,
} from "./helpers.js";

const inputField = document.querySelector("#odds-value");
const messageToUser = document.querySelector("#message");
const gameBtn = document.querySelector("#btn");
const grid = document.querySelector(".grid");
const percents = document.querySelector(".percent-value");
const gameSizeNumber = document.getElementById("game-size");
const toTheTopBtn = document.getElementById("to-top-btn");
const modalOverlay = document.querySelector(".modal-overlay");
const modalBtnShow = document.getElementById("show");
const modalBtnDoNotShow = document.getElementById("do-not-show");

let squaresArray = [];

let guessIsMade = false;
let randomNumber = 0;
let sizeOfGameField = 0;

window.onload = () => {
  sizeOfGameField = getRandomNumberInRange(100, 1000);
  createGameField(sizeOfGameField);
  displayGameNumbers(sizeOfGameField);
  updateMessageToUser(message.startGame);
};
window.addEventListener("click", (e) => {
  const clickedElement = e.target;
  if (clickedElement.classList.contains("square")) checkAnswer(clickedElement);
});
window.addEventListener("keyup", (e) => {
  const clickedElement = e.target;
  if (e.key === "Enter" && clickedElement.classList.contains("square"))
    checkAnswer(clickedElement);
});
window.onscroll = function () {
  scrollFunction();
};

inputField.addEventListener("input", () => {
  inputValueIsValid(inputField.value);
});
inputField.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && inputValueIsValid(inputField.value)) {
    
    sizeOfGameField = Math.round(inputField.value);
    createGameField(sizeOfGameField);
  }
});
inputField.addEventListener("click", () => {
  grid.innerHTML = "";
  grid.style.minHeight = "200px";
  if (inputValueIsValid(inputField.value)) {
    showPlayButton(gameBtn);
    updateMessageToUser(message.clickToStart);
  }
});

gameBtn.addEventListener("click", function (e) {
  if (e.target.classList.contains("reset")) {
    resetGame();
    return;
  }
  if (inputValueIsValid(inputField.value)) {
    sizeOfGameField = Math.round(inputField.value);
    createGameField(sizeOfGameField);
  }
});

toTheTopBtn.addEventListener("click", topFunction);

modalBtnDoNotShow.addEventListener("click", () => {
  gameBtn.focus();
  modalOverlay.style.display = "none";
});

function createGameField(numberOfSquares) {
  inputField.disabled = true;
  createSquares(numberOfSquares);
  displayGameNumbers(numberOfSquares);
  randomNumber = chooseRandomNumber(numberOfSquares);
  hideButton(gameBtn);
  updateMessageToUser(message.startGame);
}

function checkAnswer(currentSquare) {
  if (guessIsMade) {
    updateMessageToUser(message.playAgain);
    resetGame();
    return;
  }
  const correctSquare = squaresArray[randomNumber];
  correctSquare.setAttribute("id", "correct-square");
  if (squaresArray.indexOf(currentSquare) === randomNumber) {
    updateMessageToUser(message.luckyGuess);
    
  } else {
    updateMessageToUser(message.wrongGuess);
    displayWrongSquare(currentSquare);
    if (!isElementInViewport(correctSquare)) {
      setTimeout(() => {
        modalOverlay.style.display = "block";
      }, 500);
      modalBtnShow.addEventListener("click", () => {
        correctSquare.focus();
        modalOverlay.style.display = "none";
      });
    }
  }
  guessIsMade = true;
  showResetButton(gameBtn);
  gameBtn.focus();
}

function createSquares(size) {
  grid.style.minHeight = "0";
  for (let i = 0; i < size; i++) {
    const square = document.createElement("a");
    square.classList.add("square");
    square.setAttribute("tabindex", 0);
    grid.appendChild(square);
    squaresArray.push(square);
  }
}

function resetGame() {
  grid.style.minHeight = "200px";
  grid.innerHTML = "";
  guessIsMade = false;
  updateMessageToUser(message.playAgain);
  inputField.disabled = false;
  inputField.focus();
  squaresArray.length = 0;
  showPlayButton(gameBtn);
}

function updateMessageToUser(message) {
  messageToUser.textContent = message;
}

function inputValueIsValid(value) {
  if (
    Math.round(value) >= 0 &&
    Math.round(value) < 2 &&
    value.toString().length > 0
  ) {
    updateMessageToUser(message.valueGreaterThanTwo);
    inputField.focus();
    hideButton(gameBtn);
    return false;
  }
  if (!value) {
    updateMessageToUser(message.inputFieldEmpty);
    inputField.focus();
    hideButton(gameBtn);
    return false;
  }
  updateMessageToUser(message.clickToStart);
  showPlayButton(gameBtn);
  return true;
}

function displayGameNumbers(number) {
  gameSizeNumber.textContent = number;
  const percentage = parseFloat(((1 / number) * 100).toFixed(2));
  percents.textContent = `${percentage}%`;
  inputField.value = number;
}

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    toTheTopBtn.style.display = "block";
  } else {
    toTheTopBtn.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
