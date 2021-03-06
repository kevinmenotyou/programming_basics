const FACE_CARDS = ["King", "Queen", "Jack"];
const FACE_CARD_VALUE = 10;
const ACE_HIGH = 11;
const ACE_LOW = 1;
const DEALER_LIMIT = 17;
const MAX_TOTAL = 21;
const NEW_LINE = "----------------------------";
const NUMBER_OF_GAMES = 5;
const SUITS = ["Hearts", "Spades", "Clubs", "Diamonds"];

let readLine = require("readline-sync");

while (true) {

  let gameCounter = 1;
  let score = { player: 0, computer: 0};

  console.clear();
  console.log(NEW_LINE);
  prompt('Welcome to Twenty-One!');
  prompt('Get as close as possible to twenty-one without going over!');
  prompt(`Best of ${NUMBER_OF_GAMES} wins!`);
  console.log(NEW_LINE);
  waitForKey();

  while (true) {

    let deck = initializeDeck();

    let playerTotal = 0;
    let computerTotal = 0;

    let playerHand = dealTwoCards(deck);
    let computerHand = dealTwoCards(deck);

    let playerBust = false;

    console.clear();
    console.log(NEW_LINE);
    prompt(`New round started! Game #${gameCounter}!`);
    displayPlayerRound(computerHand, playerHand);

    let hitOrStay;
    do {
      prompt("Would you like to hit or stay? h/s");
      hitOrStay = readLine.question().trim();

      while (hitOrStay !== "h" && hitOrStay !== "H" && hitOrStay.toLowerCase() !== "hit" &&
          hitOrStay !== "s" && hitOrStay !== "S" && hitOrStay.toLowerCase() !== "stay") {
        prompt("Invalid response, please choose either hit 'h' or stay 's'. ");
        hitOrStay = readLine.question().trim();
      }

      if (hitOrStay[0] === "h" || hitOrStay[0] === "H") {
        playerHand.push(dealCard(deck));
        console.clear();
        displayPlayerRound(computerHand, playerHand);
      }

      playerTotal = getHandTotal(playerHand);
      if (isBust(playerTotal)) {
        playerBust = true;
        break;
      }
    } while (hitOrStay[0] !== "s" && hitOrStay[0] !== "S");

    computerTotal = getHandTotal(computerHand);
    if (!playerBust) {
      while (computerTotal < DEALER_LIMIT) {
        computerHand.push(dealCard(deck));
        computerTotal = getHandTotal(computerHand);
      }
    }

    console.clear();
    console.log(NEW_LINE);
    displayHand("Player", playerHand);
    displayHand("Computer", computerHand);
    displayResult(playerTotal, computerTotal, score);
    console.log(NEW_LINE);

    waitForKey();

    gameCounter++;
    if (gameCounter > NUMBER_OF_GAMES) {
      displayGrandWinner(score);
      break;
    }
  }
  if (!playAgain()) {
    prompt("Thanks for playing Twenty-One!");
    break;
  }
}

function waitForKey() {
  prompt("Press the 'enter' or 'return' key to continue.");
  readLine.question();
}

function playAgain() {
  prompt("Would you like to play again? y/n");
  let playAgain = readLine.question().trim();

  while (playAgain !== "y" && playAgain !== "Y" && playAgain.toLowerCase() !== "yes" &&
      playAgain !== "n" && playAgain !== "N" && playAgain.toLowerCase() !== "no") {
    prompt("Invalid response, please choose either 'y' or 'n'.");
    playAgain = readLine.question().trim();
  }

  if (playAgain[0] === "n" || playAgain[0] === "N") {
    return false;
  } else {
    return true;
  }
}

function displayResult(playerTotal, computerTotal, score) {
  let winner = getWinner(playerTotal, computerTotal);

  switch (winner) {
    case "PLAYER_BUST": prompt(`Player went bust with ${playerTotal}! Computer wins with ${computerTotal}!`);
      break;
    case "COMPUTER": prompt(`Computer wins with ${computerTotal} against player's ${playerTotal}!`);
      break;
    case "COMPUTER_BUST": prompt(`Computer went bust with ${computerTotal}! Player wins with ${playerTotal}!`);
      break;
    case "PLAYER": prompt(`Player wins with ${playerTotal} against computer's ${computerTotal}!`);
      break;
    case "TIE": prompt(`It's a tie with both player and computer getting ${playerTotal}!`);
      break;
  }

  incrementScore(score, winner);
}

function incrementScore(score, winner) {
  if (winner === "PLAYER_BUST" || winner === "COMPUTER") {
    score.computer++;
  } else if (winner === "COMPUTER_BUST" || winner === "PLAYER") {
    score.player++;
  }
}

function getWinner(playerTotal, computerTotal) {
  if (isBust(playerTotal)) {
    return "PLAYER_BUST";
  } else if (isBust(computerTotal)) {
    return "COMPUTER_BUST";
  } else if (playerTotal < computerTotal) {
    return "COMPUTER";
  } else if (playerTotal > computerTotal) {
    return "PLAYER";
  } else {
    return "TIE";
  }
}

function displayGrandWinner(score) {
  console.clear();
  console.log(NEW_LINE);
  prompt(`Player won ${score.player} game(s) out of ${NUMBER_OF_GAMES}.`);
  prompt(`Computer won ${score.computer} game(s) out of ${NUMBER_OF_GAMES}.`);

  let grandWinner = getGrandWinner(score);
  if (grandWinner === "PLAYER") {
    prompt("Player wins!");
  } else if (grandWinner === "COMPUTER") {
    prompt("Computer wins!");
  } else if (grandWinner === "TIE") {
    prompt("It's a tie!");
  }
  console.log(NEW_LINE);
}

function getGrandWinner(score) {
  if (score.player > score.computer) {
    return "PLAYER";
  } else if (score.computer > score.player) {
    return "COMPUTER";
  } else {
    return "TIE";
  }
}

function displayPlayerRound(computerHand, playerHand) {
  console.log(NEW_LINE);
  displayHiddenHand("Computer", computerHand);
  displayHand("Player", playerHand);
  console.log(NEW_LINE);
}

function displayHand(user, hand) {
  prompt(`${user} Hand:`);
  prompt(hand.map(card => `${card[1]} of ${card[0]}`).join(", "));
}

function displayHiddenHand(user, hand) {
  displayHand(user, [hand[0], ["?", "?"]]);
}

function dealCard(deck) {
  return deck.pop();
}

function dealTwoCards(deck) {
  return [dealCard(deck), dealCard(deck)];
}

function getHandTotal(hand) {
  let total = 0;

  hand.forEach( card => {
    if (card[1] === "Ace") total += ACE_HIGH;
    else if (FACE_CARDS.includes(card[1])) total += FACE_CARD_VALUE;
    else total += card[1];
  });

  let aces = hand.filter( card => card[1] === "Ace");
  if (total > MAX_TOTAL && aces.length > 0) {
    for (let index = 0; index < aces.length; index++) {
      if (total > MAX_TOTAL) {
        total -= (ACE_HIGH - ACE_LOW);
      }
    }
  }
  return total;
}

function isBust(total) {
  if (total > MAX_TOTAL) return true;
  else return false;
}

function initializeDeck () {
  let deck = [];
  for (let suit = 0; suit < SUITS.length; suit++) {
    for (let card = 2; card <= 10; card++) {
      deck.push([SUITS[suit], card]);
    }
    deck.push([SUITS[suit], "Jack"]);
    deck.push([SUITS[suit], "Queen"]);
    deck.push([SUITS[suit], "King"]);
    deck.push([SUITS[suit], "Ace"]);
  }

  return shuffle(deck);
}

function shuffle(array) {
  for (let index = array.length - 1; index > 0; index--) {
    let otherIndex = Math.floor(Math.random() * (index + 1)); // 0 to index
    [array[index], array[otherIndex]] = [array[otherIndex], array[index]]; // swap elements
  }
  return array;
}

function prompt(message) {
  console.log(`==> ${message}`);
}