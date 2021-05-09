export const hello = () => {
  console.log("Hello from helpers!");
};

export const message = {
  inputFieldEmpty: "Enter number in the input field",
  valueGreaterThanTwo:
    'Common! Challenge yourself!! Play with at least "2" squares',
  takeAGuess: "Ok, now try your luck - find where the red square has hidden!",
  wrongGuess: "Odds are against you!!!",
  luckyGuess: "Wow! That was good guess indeed! Go buy a lottery ticket!",
  playAgain: "Click the button to play again!",
};

function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

export function checkAreHelpingBannersNeeded(correctSquare) {
  if (!isElementInViewport(correctSquare)) {
    createHelpingBanners();
  }
}

function createHelpingBanners() {
  const notCorrectAnswerCard = document.createElement("div");
  notCorrectAnswerCard.classList.add("card");
  notCorrectAnswerCard.textContent = "Nop! That is not the red square!";
  const revealAnswerBtn = document.createElement("a");
  revealAnswerBtn.classList.add("btn", "show-correct-square");
  revealAnswerBtn.setAttribute("href", "#correct-square");
  revealAnswerBtn.textContent = "Show me the red square!";
  document.body.appendChild(revealAnswerBtn);
  document.body.appendChild(notCorrectAnswerCard);
  revealAnswerBtn.addEventListener("click", () => {
    (revealAnswerBtn.style.opacity = "0"),
      (notCorrectAnswerCard.style.opacity = "0");
    setTimeout(() => {
      document.body.removeChild(revealAnswerBtn);
    }, 400);
  });
}

export function toggleButton(btn) {
  if (btn.classList.contains("show-btn")) {
    btn.classList.remove("show-btn");
    btn.classList.add("hide-btn");
  } else {
    btn.classList.add("show-btn");
    btn.classList.remove("hide-btn");
  }
}

export function displayWrongSquare(square) {
  square.classList.add("wrong-square");
  const cross = document.createElement("div");
  cross.classList.add("cross");
  square.appendChild(cross);
}

export function disableInputField(inputValue) {
  inputValue.value = "";
  inputValue.disabled = true;
}
export function chooseRandomNumber(max) {
  return Math.floor(Math.random() * max);
}
