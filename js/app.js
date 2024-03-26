//Global Variables
const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const numberOfGuessesLeft = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector("span");
const playAgainButton = document.querySelector("play-again hide");
const message = document.querySelector(".message");

let word = "magnolia";
const guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
  const response = await fetch(
    "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
  );

  const words = await response.text();
  const wordArray = words.split("\n");
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  word = wordArray[randomIndex].trim();
  placeholder(word);
};

getWord();

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
  // call this function displays the guessed letters on the screen for the user
  guessedLettersUpdate();
  updateWordProgress(guessedLetters);
  numGuessesRemaining(guess);
  console.log(guessedLetters);
};

// * Create a function to show the guessed letters
const guessedLettersUpdate = function () {
  // empty the innerHTML of the unordered list
  guessedLettersElement.innerHTML = "";
  for (let letter of guessedLetters) {
    // create a new list item for each letter and add it to the unordered list
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLettersElement.append(li);
  }
};

// * Create a function to update the word in progress & guessedLetters array is a parameter
const updateWordProgress = function (guessedLetters) {
  let wordUpper = word.toUpperCase();
  // splits the word string into an array so the letter can appear in the guessedLetters array
  const wordArray = wordUpper.split("");

  const revealWord = [];
  // check to see if the wordArray contains any letters from the guessedLetters array
  for (const letter of wordArray) {
    if (guessedLetters.includes(letter)) {
      revealWord.push(letter.toUpperCase());
    } else {
      revealWord.push("●");
    }
  }
  wordInProgress.innerText = revealWord.join("");
  checkIfWin();
};

// * Create a function to count guesses remaining
const numGuessesRemaining = function (guess) {
  const upperWord = word.toUpperCase();
  if (!upperWord.includes(guess)) {
    message.innerText = `Sorry, the word has no ${guess}.`;
    remainingGuesses -= 1;
  } else {
    message.innerText = `Good guess! The word has the letter ${guess}.`;
  }

  if (remainingGuesses === 0) {
    message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
  } else if (remainingGuesses === 1) {
    remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
  } else {
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
  }
};

// * Create a function to see if the player won
const checkIfWin = function () {
  if (word.toUpperCase() === wordInProgress.innerText) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight"> You guessed the 
        correct word! Congrats!</p>`;
  }
};
