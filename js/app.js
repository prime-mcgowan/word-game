//Global Variables
const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingSpan = document.querySelector("span");
const playAgainButton = document.querySelector("play-again hide");
const message = document.querySelector(".message");

const word = "magnolia";
const guessedLetters = [];

//Function to add placeholders for each letter
const placeholder = function (word) {
  const placeholderLetters = [];
  for (let letter of word) {
    console.log(letter);
    placeholderLetters.push("●");
  }
  wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

guessButton.addEventListener("click", function (e) {
  e.preventDefault();
  message.innerText = "";
  const guess = letterInput.value;
  //   console.log(guess);

  const goodGuess = checkInput(guess);
  if (goodGuess) {
    makeGuess(guess);
  }
  letterInput.value = "";
});

const checkInput = function (input) {
  const acceptedLetter = /[a-zA-Z]/;
  if (input.length === 0) {
    message.innerText = `Please enter a letter`;
  } else if (input.length > 1) {
    message.innerText = `Please enter a single letter`;
  } else if (!input.match(acceptedLetter)) {
    message.innerText = `Please enter a letter from A-Z`;
  } else {
    return input;
  }
};

const makeGuess = function (guess) {
  guess = guess.toUpperCase();
  if (guessedLetters.includes(guess)) {
    message.innerText = `That letter has already been guessed`;
  } else guessedLetters.push(guess);
  console.log(guessedLetters);
};
