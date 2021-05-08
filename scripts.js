const inputValue = document.querySelector("#odds-value");
const messageToUser = document.querySelector(".message");
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

playBtn.addEventListener("click", createGameField);
replayBtn.addEventListener("click", resetGame);

function createGameField() {
  if (!inputValue.value) {
    updateMessageToUser(MSG_INPUT_FIELD_EMPTY);
    return;
  }
  toggleButtons();
  updateMessageToUser(MSG_GUESS);
  const bigNumber = Math.round(inputValue.value);
  disableInputField();
  createSquares(bigNumber);
  const randomNumber = getRandomInt(bigNumber);
  squaresArray.forEach((square) =>
    square.addEventListener("click", () => {
      if (squaresArray.indexOf(square) === randomNumber) {
        square.classList.add("correct-square");
        updateMessageToUser(MSG_LUCKY_GUESS);
      } else {
        //   TODO: do the styles of the squares
          updateMessageToUser(MSG_WRONG_GUESS);
          square.style.borderBottom = "5px yellow solid";
          square.style.borderTop = "5px yellow solid";
          square.style.borderRight = "5px black solid";
          square.style.borderLeft = "5px black solid";
        };
    })
  );
}

function createSquares(number) {
  for (let i = 0; i < number; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    grid.appendChild(square);
    squaresArray.push(square);
  }
}

function toggleButtons() {
  if (playBtn.classList.contains("show-btn")) {
    playBtn.classList.remove("show-btn");
    playBtn.classList.add("hide-btn");
    replayBtn.classList.remove("hide-btn");
    replayBtn.classList.add("show-btn");
  } else {
    playBtn.classList.add("show-btn");
    playBtn.classList.remove("hide-btn");
    replayBtn.classList.add("hide-btn");
    replayBtn.classList.remove("show-btn");
  }
}

function resetGame() {
  toggleButtons();
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
