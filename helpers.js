export const message = {
  inputFieldEmpty: "Enter number in the input field (min=2, max=99999).",
  valueGreaterThanTwo:
    'Common! Challenge yourself!! Play with at least "2" squares',
  wrongGuess: "Odds were against you! Better luck next time!",
  luckyGuess: "Wow! That was good guess indeed! Go buy a lottery ticket!",
  playAgain: "Enter the number to play again!",
  startGame: "Choose a square and click it to flip!",
  clickToStart: "Click \"Go!\" or press \"Enter\" to play!"
};

export function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

export function showPlayButton(btn) {
  btn.classList.remove("hide-btn");
  btn.textContent = "Go!";
  btn.classList.remove("reset");
  btn.removeAttribute("disabled");
}
export function hideButton(btn) {
  btn.classList.add("hide-btn");
  btn.setAttribute("disabled","true");
}

export function showResetButton(btn) {
  btn.classList.add("reset");
  btn.classList.remove("hide-btn");
  btn.removeAttribute("disabled");
  btn.textContent = "Play again?";
}

export function displayWrongSquare(square) {
  square.classList.add("wrong-square");
  const cross = document.createElement("div");
  cross.classList.add("cross");
  square.appendChild(cross);
}

export function chooseRandomNumber(max) {
  return Math.floor(Math.random() * max);
}
export function getRandomNumberInRange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}