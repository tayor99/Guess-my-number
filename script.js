// Selecting Elements
const gameWrapper = document.querySelector("#game");

const button = document.querySelector("#guess-value");
const guessInput = document.querySelector("#guess-input");
const message = document.querySelector(".message");
const minNum = document.querySelector(".min-num");
const maxNum = document.querySelector(".max-num");

// Create Values
// console.log(numberToBeGuessed);
let amountOfGuesses = 3;
let min = 1;
let max = 10;
const numberToBeGuessed = getRandomNum(min, max);

// Assign Ui min and max
minNum.textContent = min;
maxNum.textContent = max;

// Creating Random NUmber

// play again event
gameWrapper.addEventListener("mousedown", function (e) {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

button.addEventListener("click", function () {
  let numberGuessed = parseInt(guessInput.value);
  //Validation
  if (isNaN(numberGuessed) || numberGuessed < min || numberGuessed > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
  }

  // Check if won
  if (numberGuessed === numberToBeGuessed) {
    gameOver(true, `${numberGuessed} is correct, YOU WIN`);
  } else {
    // Wrong Number
    amountOfGuesses--;
    if (amountOfGuesses === 0) {
      // Game over-lost
      // Disable Input
      gameOver(
        false,
        `Game over you lost the correct number was ${numberToBeGuessed}`
      );
    } else {
      // Game continues- answer wrong

      guessInput.style.borderColor = "red";
      guessInput.value = "";
      setMessage(
        `${numberGuessed} was wrong you have ${amountOfGuesses} guesses left`,
        "red"
      );
    }
  }

  // if (numberToBeGuessed !== numberGuessed) {
  //   if (amountOfGuesses === 1) {
  //     button.value = "Play Again";
  //     message.innerHTML = `Sorry game over the correct answer was ${numberToBeGuessed}`;
  //     message.style.color = `red`;
  //   } else if (amountOfGuesses !== 1) {
  //     amountOfGuesses--;
  //     message.innerHTML = `${numberGuessed} is wrong, you have ${amountOfGuesses} left`;
  //     message.style.color = "red";
  //   }
  // } else {
  //   message.innerHTML = `${numberGuessed} is correct`;
  //   message.style.color = "green";

  //   // console.log("guessAgain");
  // }
});

// Game over
function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "red");
  guessInput.disabled = true;
  guessInput.style.borderColor = color;
  message.style.color = color;
  //  set message
  setMessage(msg);

  // Play again
  button.value = "Play Again";
  button.className += "play-again";
}

// Winning Num
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
// set message
function setMessage(msg, color) {
  message.style.color = color;

  message.textContent = msg;
}
