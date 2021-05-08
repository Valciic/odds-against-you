const inputValue = document.querySelector("#odds-value");
const messageToUser = document.querySelector("#message");
const arrow = document.getElementById("arrow");
const playBtn = document.querySelector(".lets-do-this");
const replayBtn = document.querySelector(".play-again");
const grid = document.querySelector(".grid");
let squaresArray = [];
const MSG_INPUT_FIELD_EMPTY = "Enter number in the input field";
const MSG_GUESS =
  "Ok, now try your luck - find where the red square has hidden!";
const MSG_WRONG_GUESS = "Odds are against you!!!";
const MSG_LUCKY_GUESS =
  "Wow! That was good guess indeed! Go buy a lottery ticket!";
const MSG_CLICK_TO_PLAY_AGAIN = `Click the button to play again!`;
let guessIsMade = false;
let squareIsFound = false;
let randomNumber = 0;
let playersNumber = 0;

// TODO: style game elements (buttons, input fields, etc.)
playBtn.addEventListener("click", createGameField);
replayBtn.addEventListener("click", resetGame);
replayBtn.addEventListener("keyup", (e) => {
  if (e.key === "Enter") resetGame;
});
inputValue.addEventListener("keyup", (e) => {
  if (e.key === "Enter") createGameField();
});

function createGameField() {
  if (!inputValue.value) {
    updateMessageToUser(MSG_INPUT_FIELD_EMPTY);
    return;
  }
  toggleButton(playBtn);
  updateMessageToUser(MSG_GUESS);
  playersNumber = Math.round(inputValue.value);
  disableInputField();
  createSquares(playersNumber);
  randomNumber = getRandomInt(playersNumber);
  squaresArray.forEach((square) =>
    square.addEventListener("click", checkAnswer)
  );
  squaresArray.forEach((square) =>
    square.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        checkAnswer(e);
      }
    })
  );
}

function checkAnswer(e) {
  if (guessIsMade) {
    messageToUser.textContent = MSG_CLICK_TO_PLAY_AGAIN;
    arrow.style.display = "block";
    messageToUser.style.fontSize = "1rem";
    setTimeout(function () {
      messageToUser.style.fontSize = "0.9rem";
    }, 400);
    return;
  }
  const currentSquare = e.target;
  if (squaresArray.indexOf(currentSquare) === randomNumber) {
    currentSquare.classList.add("correct-square");
    updateMessageToUser(MSG_LUCKY_GUESS);
  } else {
    updateMessageToUser(MSG_WRONG_GUESS);
    displayWrongSquare(currentSquare);
    squaresArray[randomNumber].classList.add("correct-square");
  }
  guessIsMade = true;
  toggleButton(replayBtn);
}

function createSquares(number) {
  for (let i = 0; i < number; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.setAttribute("tabindex", 0);
    grid.appendChild(square);
    squaresArray.push(square);
  }
}

function toggleButton(btn) {
  if (btn.classList.contains("show-btn")) {
    btn.classList.remove("show-btn");
    btn.classList.add("hide-btn");
  } else {
    btn.classList.add("show-btn");
    btn.classList.remove("hide-btn");
  }
}

function displayWrongSquare(square) {
  square.classList.add("wrong-square");
  const cross = document.createElement("div");
  cross.classList.add("cross");
  square.appendChild(cross);
}

function resetGame() {
  location.reload();
}

function updateMessageToUser(message) {
  messageToUser.textContent = message;
}

function disableInputField() {
  inputValue.value = "";
  inputValue.disabled = true;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
