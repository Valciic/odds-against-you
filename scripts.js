const inputValue = document.querySelector("#odds-value");
const messageToUser = document.querySelector("#message");
const arrow = document.getElementById("arrow");
const playBtn = document.querySelector(".lets-do-this");
const replayBtn = document.querySelector(".play-again");
const revealAnswerBtn = document.querySelector(".show-correct-square");
const notCorrectAnswerCard = document.querySelector(".card");
const main = document.querySelector("main");
let squaresArray = [];
const message = {
  inputFieldEmpty: "Enter number in the input field",
  takeAGuess: "Ok, now try your luck - find where the red square has hidden!",
  wrongGuess: "Odds are against you!!!",
  luckyGuess: "Wow! That was good guess indeed! Go buy a lottery ticket!",
  playAgain: "Click the button to play again!",
};

// TODO: autofocus on user input field

let guessIsMade = false;
let squareIsFound = false;
let randomNumber = 0;
let playersNumber = 0;

playBtn.addEventListener("click", createGameField);
replayBtn.addEventListener("click", resetGame);
replayBtn.addEventListener("keyup", (e) => {
  if (e.key === "Enter") resetGame;
});
inputValue.addEventListener("keyup", (e) => {
  if (e.key === "Enter") createGameField();
});
revealAnswerBtn.addEventListener('click', () => {
  setTimeout(()=>{
    toggleHelpingBanners();
  }, 2000)
})

function createGameField() {
  if (!inputValue.value) {
    updateMessageToUser(message.inputFieldEmpty);
    return;
  }
  playBtn.disabled = "disabled";
  playBtn.textContent = "Look for the red square";
  updateMessageToUser(message.takeAGuess);
  playersNumber = Math.round(inputValue.value);
  disableInputField();
  createSquares(playersNumber);
  randomNumber = getRandomInt(playersNumber);
  squaresArray.forEach((square) =>
    square.addEventListener("click", checkAnswer)
  );
  squaresArray.forEach((square) =>
    square.addEventListener("keyup", (e) => {
      if (e.key === "Enter") checkAnswer(e);
    })
  );
}

function checkAnswer(e) {
  if (guessIsMade) {
    displayPlayAgainMsg();
    return;
  }
  const currentSquare = e.target;
  if (squaresArray.indexOf(currentSquare) === randomNumber) {
    currentSquare.setAttribute("id", "correct-square");
    updateMessageToUser(message.luckyGuess);
  } else {
    updateMessageToUser(message.wrongGuess);
    displayWrongSquare(currentSquare);
    squaresArray[randomNumber].setAttribute("id", "correct-square");
    document.activeElement.blur();
    toggleHelpingBanners();
  }
  guessIsMade = true;
  toggleButton(playBtn);
  toggleButton(replayBtn);
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

function toggleButton(btn) {
  if (btn.classList.contains("show-btn")) {
    btn.classList.remove("show-btn");
    btn.classList.add("hide-btn");
  } else {
    btn.classList.add("show-btn");
    btn.classList.remove("hide-btn");
  }
}

function toggleHelpingBanners() {
  if( revealAnswerBtn.style.opacity === '1') {
    notCorrectAnswerCard.style.opacity = "0";
    revealAnswerBtn.style.opacity = '0';
    revealAnswerBtn.style.display="none";
  } else {
    notCorrectAnswerCard.style.opacity = "1";
    revealAnswerBtn.style.opacity = '1';
    revealAnswerBtn.style.display = "block";
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
  inputValue.focus();
}

function updateMessageToUser(message) {
  messageToUser.textContent = message;
}
function displayPlayAgainMsg() {
  messageToUser.textContent = message.playAgain;
  arrow.style.display = "block";
  messageToUser.style.fontSize = "1rem";
  setTimeout(function () {
    messageToUser.style.fontSize = "0.9rem";
  }, 400);
}

function disableInputField() {
  inputValue.value = "";
  inputValue.disabled = true;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
