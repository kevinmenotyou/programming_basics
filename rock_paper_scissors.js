const readline = require('readline-sync');

const DASHED_LINE = "------------------------------------------------------";
const VALID_CHOICES = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
const GAME_VICTORS = {
  scissors : ['paper, lizard'],
  paper : ['rock', 'spock'],
  rock : ['scissors', 'lizard'],
  lizard : ['spock', 'paper'],
  spock : ['scissors', 'rock']
};

const ResultsEnum = {
  PLAYER: 1,
  COMPUTER: 2,
  TIE: 3
};

if (Object.freeze) {
  Object.freeze(ResultsEnum);
}

const GAMES_TO_WIN = 5;
let score = {playerWins : 0, computerWins : 0};

function prompt(message) {
  console.log(`=> ${message}`);
}

prompt(DASHED_LINE);
prompt("WELCOME to Rock Paper Scissors Lizard Spock!");
prompt(`First one to ${GAMES_TO_WIN} wins!`);
prompt(DASHED_LINE);

while (true) {
  prompt(`Choose one: ${VALID_CHOICES.map(item => item + ` [${getAbbreviation(item)}]`).join(", ")}`);
  let choice = readline.question();

  while (!isValidChoice(choice)) {
    prompt("That's not a valid choice");
    choice = readline.question();
  }

  if (choice.length <= 2) {
    choice = getFullWordFromLetter(choice);
  }

  let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
  let computerChoice = VALID_CHOICES[randomIndex];

  prompt(`You chose ${choice}, computer chose ${computerChoice}`);

  let result = getWinner(choice, computerChoice);
  displayWinner(result);
  calculateScore(result);

  if (score.playerWins >= GAMES_TO_WIN || score.computerWins >= GAMES_TO_WIN) {

    displayBestOfFiveWinner();

    prompt ("Would you like to play again? y/n");
    let playAgain = readline.prompt().toLowerCase();

    while (playAgain !== "y" && playAgain !== "n") {
      prompt("Please choose 'y' or 'n'.");
      playAgain = readline.prompt().toLowerCase();
    }

    if (playAgain === "n") {
      break;
    }

    resetScore();
  }
}

function isValidChoice(choice) {
  if (VALID_CHOICES.includes(choice) ||
    matchesAbbreviation(choice)) {
    return true;
  }
  return false;
}

function getAbbreviation(string) {
  let substringLength = 1;
  if (string[0] === 's') substringLength = 2;
  return string.substring(0, substringLength);
}

function matchesAbbreviation(string) {
  return VALID_CHOICES.map(item => getAbbreviation(item)).includes(string);
}

function getFullWordFromLetter(letter) {
  let index = VALID_CHOICES.map(item => getAbbreviation(item)).indexOf(letter);
  return VALID_CHOICES[index];
}

function getWinner(choice, computerChoice) {
  if (choice === computerChoice) {
    return ResultsEnum.TIE;
  } else if (GAME_VICTORS[choice].includes(computerChoice)) {
    return ResultsEnum.PLAYER;
  } else {
    return ResultsEnum.COMPUTER;
  }
}

function displayWinner(result) {
  if (result === ResultsEnum.TIE) {
    prompt ("It's a tie");
  } else if (result === ResultsEnum.PLAYER) {
    prompt("You win!");
  } else if (result === ResultsEnum.COMPUTER) {
    prompt("Computer wins!");
  }
}

function calculateScore(result) {
  if (result === ResultsEnum.PLAYER) {
    score.playerWins++;
  } else if (result === ResultsEnum.COMPUTER) {
    score.computerWins++;
  }
}

function displayBestOfFiveWinner() {
  prompt(DASHED_LINE);
  if (score.playerWins >= GAMES_TO_WIN) {
    prompt("CONGRATULATIONS! You beat the computer!");
  } else if (score.computerWins >= GAMES_TO_WIN) {
    prompt("OH NO! You lost to the computer!");
  }
  prompt(`Final Score: Player:${score.playerWins} Computer:${score.computerWins}`);
  prompt(DASHED_LINE);
}

function resetScore() {
  score.playerWins = 0;
  score.computerWins = 0;
}