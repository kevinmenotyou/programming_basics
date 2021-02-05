const FACE_CARDS = ["King", "Queen", "Jack"];
const FACE_CARD_VALUE = 10;
const ACE_HIGH = 11;
const ACE_LOW = 1;

const SUITS = ["Hearts", "Spades", "Clubs", "Diamonds"];
let MAX_TOTAL = 21;

let readLine = require("readline-sync");

while (true) {
  console.clear();
  prompt('Welcome to Twenty-One!');

  let deck = initializeDeck();

  let playerHand = dealTwoCards(deck);
  let computerHand = dealTwoCards(deck);

  let playerBusted = false;

  displayHiddenHand("Computer", computerHand);
  displayHand("Player", playerHand);

  let hitOrStay;
  do {
    prompt("Would you like to 'hit' or 'stay'?");
    hitOrStay = readLine.question();

    while (hitOrStay !== "hit" && hitOrStay !== "stay") {
      prompt("Invalid response, please choose either 'hit' or 'stay'.");
      hitOrStay = readLine.question();
    }

    if (hitOrStay === "hit") {
      playerHand.push(dealCard(deck));
      console.clear();
      displayHiddenHand("Computer", computerHand);
      displayHand("Player", playerHand);
    }

    let total = getHandTotal(playerHand);
    if (isBust(total)) {
      playerBusted = true;
      prompt(`You went bust! Your total was: ${total}.`);
      break;
    }
  } while (hitOrStay !== "stay");

  let computerBusted = false;
  while (true) {
    if (getHandTotal(computerHand) < 17) {
      computerHand.push(dealCard(deck));
    } else break;

    let total = getHandTotal(computerHand);
    if (isBust(total)) {
      computerBusted = true;
      prompt(`Computer went bust! Their total was: ${total}.`);
      break;
    }
  }

  displayResult(playerHand, computerHand, playerBusted, computerBusted);

  console.log("----------------------------");
  prompt("Would you like to play again? y/n");
  let playAgain = readLine.question();

  while (playAgain !== "y" && playAgain !== "n") {
    prompt("Invalid response, please choose either 'y' or 'n'.");
    playAgain = readLine.question();
  }

  if (playAgain === "n") {
    prompt("Thanks for playing Twenty-One!");
    break;
  }
}

function displayResult(playerHand, computerHand, playerBust, computerBust) {
  console.log("----------------------------");
  displayHand("Player", playerHand);
  displayHand("Computer", computerHand);

  let playerTotal = getHandTotal(playerHand);
  let computerTotal = getHandTotal(computerHand);

  prompt(`Player's total was: ${playerTotal}`);
  prompt(`Computer's total was: ${computerTotal}`);

  prompt(calculateWinner(playerTotal, computerTotal, playerBust, computerBust));
}

function calculateWinner(playerTotal, computerTotal, playerBust, computerBust) {
  if (playerBust) {
    return "Computer won!";
  } else if (computerBust) {
    return "Player won!";
  } else if (playerTotal < computerTotal) {
    return "Computer won!";
  } else if (playerTotal > computerTotal) {
    return "Player won!";
  } else {
    return "It's a tie!";
  }
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