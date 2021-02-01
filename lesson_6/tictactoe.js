const INITIAL_MARKER = ' ';
const HUMAN_MARKER = 'X';
const COMPUTER_MARKER = 'O';
const GAMES_TO_WIN = 5;

let WINNING_LINES = [
  [1, 2, 3], [4, 5, 6], [7, 8, 9], // rows
  [1, 4, 7], [2, 5, 8], [3, 6, 9], // columns
  [1, 5, 9], [3, 5, 7]             // diagonals
];

let TURN_ORDER_OPTIONS = ['player', 'computer', 'choose'];

let readline = require("readline-sync");

while (true) {
  let score = { player: 0, computer: 0 };

  prompt("Who should go first? player/computer/choose");
  let turnOrderChoice = readline.question();
  while (!TURN_ORDER_OPTIONS.includes(turnOrderChoice)) {
    prompt("Invalid option, choose between player/computer/choose");
    turnOrderChoice = readline.question();
  }

  while (true) {
    let board = initializeBoard();

    console.log(`${emptySquares(board)[5]}`);

    let currentPlayer;
    if (turnOrderChoice === 'choose') {
      prompt("Who should go first this game? player/computer");
      currentPlayer = readline.question();
      while ((currentPlayer !== 'player' && currentPlayer !== 'computer')) {
        prompt("Invalid option, choose between player/computer");
        currentPlayer = readline.question();
      }
    } else {
      currentPlayer = turnOrderChoice;
    }

    while (true) {
      displayBoard(board);
      chooseSquare(board, currentPlayer);
      currentPlayer = alternatePlayer(currentPlayer);
      if (someoneWon(board) || boardFull(board)) break;
    }

    displayBoard(board);

    if (someoneWon(board)) {
      let winner = detectWinner(board);
      prompt(`${winner} won!`);
      score[winner.toLowerCase()]++;
    } else {
      prompt("It's a tie!");
    }

    if (score.player >= GAMES_TO_WIN) {
      console.log(`Player wins ${score.player} to ${score.computer}!`);
      break;
    } else if (score.computer >= GAMES_TO_WIN) {
      console.log(`Computer wins ${score.computer} to ${score.player}!`);
      break;
    }

    prompt('Press any key to play the next game.');
    readline.keyIn();
  }

  prompt('Play again? (y or n)');
  let answer = readline.question().toLowerCase()[0];
  let validInputs = ['y','Y','n','N'];
  while (!validInputs.includes(answer) || answer.length > 1) {
    prompt("Invalid input! Please choose y or n.");
    answer = readline.question().toLowerCase()[0];
  }

  if (answer === 'n' || answer === 'N') break;
  else if (answer === 'y' || answer === 'Y') continue;

}

prompt('Thanks for playing Tic Tac Toe!');

function chooseSquare(board, player) {
  if (player === TURN_ORDER_OPTIONS[0]) {
    playerChoosesSquare(board);
  } else {
    computerChoosesSquare(board);
  }
}

function alternatePlayer(player) {
  if (player === TURN_ORDER_OPTIONS[0]) {
    return TURN_ORDER_OPTIONS[1];
  } else {
    return TURN_ORDER_OPTIONS[0];
  }
}

function playerChoosesSquare(board) {
  let square;

  while (true) {
    prompt(`Choose a square: ${joinOr(emptySquares(board), ', ')}`);
    square = readline.question().trim(); // input trimmed to allow spaces in input
    if (emptySquares(board).includes(square)) break; // break if it's a valid square
    prompt("Sorry, that's not a valid choice.");
  }

  board[square] = HUMAN_MARKER;
}

function computerChoosesSquare(board) {

  let opportuneSquare = checkOpportunity(board);
  let threatenedSquare = checkThreat(board);

  if (opportuneSquare) {
    board[opportuneSquare] = COMPUTER_MARKER;
  } else if (threatenedSquare) {
    board[threatenedSquare] = COMPUTER_MARKER;
  } else if (board[5] === INITIAL_MARKER) {
    board[5] = COMPUTER_MARKER;
  } else {
    let randomIndex = Math.floor(Math.random() * emptySquares.length);
    let square = emptySquares(board)[randomIndex];
    board[square] = COMPUTER_MARKER;
  }
}

function checkThreat(board) {
  return checkLine(board, HUMAN_MARKER);
}

function checkOpportunity(board) {
  return checkLine(board, COMPUTER_MARKER);
}

function checkLine(board, marker) {
  for (let line = 0; line < WINNING_LINES.length; line++) {
    let currentLine = WINNING_LINES[line];
    let lineMarkers = currentLine.map(square => board[square]);
    if (lineMarkers.filter(value => value === marker).length === 2) {
      let unusedSquare = currentLine.find(square => {
        return board[square] === INITIAL_MARKER;
      });
      if (unusedSquare !== undefined) {
        return unusedSquare;
      }
    }
  }
  return false;
}

function prompt(string) {
  console.log (`==> ${string}`);
}

function detectWinner(board) {
  for (let line = 0; line < WINNING_LINES.length; line++) {
    let [ sq1, sq2, sq3 ] = WINNING_LINES[line];

    if (board[sq1] === HUMAN_MARKER &&
        board[sq2] === HUMAN_MARKER &&
        board[sq3] === HUMAN_MARKER) {
      return 'Player';
    } else if (board[sq1] === COMPUTER_MARKER &&
        board[sq2] === COMPUTER_MARKER &&
        board[sq3] === COMPUTER_MARKER) {
      return 'Computer';
    }
  }

  return null;
}

function joinOr(array, seperator, lastSeperator = "or") {
  if (array.length < 2) {
    return array.join(lastSeperator);
  } else {
    let string = array.slice(0, array.length - 1).join(seperator);
    return `${string} ${lastSeperator} ${array[array.length - 1]}`;
  }
}

function initializeBoard() {
  let board = {};

  for (let square = 1; square <= 9; square++) {
    board[square.toString()] = INITIAL_MARKER;
  }

  return board;
}

function emptySquares(board) {
  return Object.keys(board).filter(key => board[key] === INITIAL_MARKER);
}

function boardFull(board) {
  return emptySquares(board).length === 0;
}

function someoneWon(board) {
  return !!detectWinner(board);
}

function displayBoard(board) {
  console.clear();
  console.log(`You are ${HUMAN_MARKER}. Computer is ${COMPUTER_MARKER}`);
  console.log('');
  console.log('     |     |');
  console.log(`  ${board[1]}  |  ${board[2]}  |  ${board[3]}`);
  console.log('     |     |');
  console.log('-----+-----+-----');
  console.log('     |     |');
  console.log(`  ${board[4]}  |  ${board[5]}  |  ${board[6]}`);
  console.log('     |     |');
  console.log('-----+-----+-----');
  console.log('     |     |');
  console.log(`  ${board[7]}  |  ${board[8]}  |  ${board[9]}`);
  console.log('     |     |');
  console.log('');
}