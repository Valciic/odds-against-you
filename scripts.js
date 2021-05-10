import {
  showPlayButton,
  message,
  displayWrongSquare,
  disableInputField,
  chooseRandomNumber,
  showResetButton,
  getRandomNumberInRange,
  isElementInViewport,
  showTheRedSquare
} from "./helpers.js";

const inputField = document.querySelector("#odds-value");
const messageToUser = document.querySelector("#message");
const playBtn = document.querySelector("#btn");
const main = document.querySelector("main");
const percents = document.querySelector(".percent-value");
const gameSizeNumber = document.getElementById("game-size");
const toTheTopBtn = document.getElementById('to-top-btn');
const modalOverlay = document.querySelector('.modal-overlay')
const modalBtnShow = document.getElementById('show')
const modalBtnDoNotShow = document.getElementById('do-not-show');

let squaresArray = [];

let guessIsMade = false;
let randomNumber = 0;
let sizeOfGameField = 0;

window.onload = (e) => {
  sizeOfGameField = getRandomNumberInRange(100, 500);
  createGameField(sizeOfGameField);
  displayGameNumbers(sizeOfGameField);
  updateMessageToUser(message.startGame);
};

playBtn.addEventListener("click", function (e) {
  const button = e.target;
  if (button.classList.contains("reset")) {
    resetGame();
    return;
  }
  if (inputValueIsValidated(inputField.value)) {
    sizeOfGameField = Math.round(inputField.value);
    createGameField(sizeOfGameField);
  }
});
playBtn.addEventListener("keyup", (e) => {
  if (e.key === "Enter" && button.classList.contains("reset")) resetGame();
});

inputField.addEventListener("keyup", (e) => {
  playBtn.classList.remove("reset");
  sizeOfGameField = Math.round(inputField.value);
  if (!sizeOfGameField) {
    playBtn.classList.add("hide-btn");
    updateMessageToUser(message.playAgain);
  } else {
    showPlayButton(btn);
    updateMessageToUser(message.clickToStart);
  }
  if (e.key === "Enter" && inputValueIsValidated(sizeOfGameField)) {
    createGameField(sizeOfGameField);
  }
});
inputField.addEventListener("click", () => {
  if (inputValueIsValidated(inputField.value)) {
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
window.onscroll = function() {scrollFunction()};
toTheTopBtn.addEventListener('click', topFunction);



function createGameField(numberOfSquares) {
  disableInputField(inputField);
  createSquares(numberOfSquares);
  displayGameNumbers(numberOfSquares);
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
      if(!isElementInViewport(correctSquare)) {
        modalOverlay.style.display = "block";
        modalBtnShow.addEventListener('click', ()=> {
          showTheRedSquare(correctSquare);
          modalOverlay.style.display = "none";
        })
        modalBtnDoNotShow.addEventListener('click', ()=>{
          playBtn.focus();
          modalOverlay.style.display = "none";
        })
      }

    }
    guessIsMade = true;
    showResetButton(playBtn);
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
  squares.forEach((square) => grid.removeChild(square));
  main.removeChild(grid);
  guessIsMade = false;
  updateMessageToUser(message.playAgain);
  inputField.disabled = false;
  inputField.style.color = "#000";
  inputField.value = "";
  inputField.focus();
  squaresArray.length = 0;
  playBtn.classList.add("hide-btn");
}

function updateMessageToUser(message) {
  messageToUser.textContent = message;
}

function inputValueIsValidated(value) {
  if(!value) {
    updateMessageToUser(message.inputFieldEmpty);
    inputField.focus();
    return false;
  }
  if (Math.round(value) < 2) {
    updateMessageToUser(message.valueGreaterThanTwo);
    inputField.focus();
    return false;
  }
  return true;
}


function displayGameNumbers(number) {
  gameSizeNumber.textContent = number;
  const percentage = parseFloat((1 / number * 100).toFixed(2));
  percents.textContent = `${percentage}%`;
  inputField.value = number;
  inputField.style.color = "#fff";
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

