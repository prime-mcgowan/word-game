// * Global Variables *******************************************************************************
// **************************************************************************************************
const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const numberOfGuessesLeft = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const playAgainButton = document.querySelector(".play-again");
const message = document.querySelector(".message");

let word = "magnolia";
// will contain the letters guessed by the player
let guessedLetters = [];
let remainingGuesses = 10;
//ensures that the remainingGuesses # will be loaded upon page initialization
remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;

// * Async functiont to get word *********************************************************************
// ***************************************************************************************************
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

// * Function to add placeholders for each letter *****************************************************
// ****************************************************************************************************
const placeholder = function (word) {
  const placeholderLetters = [];
  for (let letter of word) {
    console.log(letter);
    placeholderLetters.push("●");
  }
  wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

// * Event listener for the guess button *************************************************************
// ****************************************************************************************************
guessButton.addEventListener("click", function (e) {
  // prevents the page from constantly reloading
  e.preventDefault();
  message.innerText = "";
  // variable to capture the input value
  const guess = letterInput.value;
  //   console.log(guess);

  const goodGuess = checkInput(guess);
  if (goodGuess) {
    makeGuess(guess);
  }
  letterInput.value = "";
});

// * Check player's input *****************************************************
// ****************************************************************************************************
const checkInput = function (input) {
  const acceptedLetter = /[a-zA-Z]/;
  // check to see if the input empty
  if (input.length === 0) {
    message.innerText = `Please enter a letter`;
    //  check to see if the input is more than one letter
  } else if (input.length > 1) {
    message.innerText = `Please enter a single letter`;
    // check to see if a character that does not match the pattern has been entered
  } else if (!input.match(acceptedLetter)) {
    message.innerText = `Please enter a letter from A-Z`;
  } else {
    // if the user inputted a letter...great!! return the letter
    return input;
  }
};

// * Capture player's input **************************************************************************
// ****************************************************************************************************
const makeGuess = function (guess) {
  // all letters converted to uppercase
  guess = guess.toUpperCase();
  // check to see if the player already guessed that same letter
  if (guessedLetters.includes(guess)) {
    message.innerText = `That letter has already been guessed`;
    //if the letter hasn't already been guessed then add it to the guessedLetters array
  } else guessedLetters.push(guess);
  console.log(guessedLetters);

  // call this function to display the guessed letters on the screen for the user:
  guessedLettersUpdate();

  numGuessesRemaining(guess);

  // call this function to display the updated progress of the word
  updateWordProgress(guessedLetters);
};

// * Create a function to show the guessed letters - This function gets called in makeGuess ***********
// ****************************************************************************************************
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

// * Create a function to update the word in progress & guessedLetters array is a parameter  - This gets called in makeGuess ***********
// *************************************************************************************************************************************
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
  // the revealWord array letter(s) needs to join the wordInProgress so it can be updated
  wordInProgress.innerText = revealWord.join("");
  checkIfWin();
};

// * Create a function to count guesses remaining *****************************************************
// ****************************************************************************************************
const numGuessesRemaining = function (guess) {
  const upperWord = word.toUpperCase();
  if (!upperWord.includes(guess)) {
    message.innerText = `Sorry, the word has no ${guess}.`;
    remainingGuesses -= 1;
    remainingGuessesSpan.innerText = `${remainingGuesses}`;
  } else {
    message.innerText = `Good guess! The word has the letter ${guess}.`;
  }

  if (remainingGuesses === 0) {
    message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
    startOver();
  } else if (remainingGuesses === 1) {
    remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
  } else {
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
  }
};

// * Create a function to see if the player won - this gets called in updateWordProgress ************
// **************************************************************************************************
const checkIfWin = function () {
  if (word.toUpperCase() === wordInProgress.innerText) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight"> You guessed the 
        correct word! Congrats!</p>`;

    startOver();
  }
};

// * Hide and show elements @ end of game *************************************************************
// ****************************************************************************************************
const startOver = function () {
  guessButton.classList.add("hide");
  numberOfGuessesLeft.classList.add("hide");
  guessedLettersElement.classList.add("hide");
  playAgainButton.classList.remove("hide");
};

// * Add click event to the play again button *****************************************************
// ************************************************************************************************
playAgainButton.addEventListener("click", function () {
  message.classList.remove("win");
  guessedLetters = [];
  remainingGuesses = 10;
  remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
  guessedLettersElement.innerHTML = "";
  message.innerText = "";

  getWord();

  guessButton.classList.remove("hide");
  playAgainButton.classList.add("hide");
  numberOfGuessesLeft.classList.remove("hide");
  guessedLettersElement.classList.remove("hide");
});
