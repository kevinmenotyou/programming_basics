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

  displayHiddenHand("Computer", computerHand);
  displayHand("Player", playerHand);

  let playerBust = false;
  let hitOrStay;
  do {
    prompt("Would you like to 'hit' or 'stay'? h/s");
    hitOrStay = readLine.question();

    while (hitOrStay !== "hit" && hitOrStay !== "stay") {
      prompt("Invalid response, please choose either hit 'h' or stay 's'. ");
      hitOrStay = readLine.question();
    }

    if (hitOrStay === "h" || hitOrStay === "hit") {
      playerHand.push(dealCard(deck));
      console.clear();
      displayHiddenHand("Computer", computerHand);
      displayHand("Player", playerHand);
    }

    let total = getHandTotal(playerHand);
    if (isBust(total)) {
      playerBust = true;
      prompt(`You went bust! Your total was: ${total}.`);
      break;
    }
  } while (hitOrStay !== "s" && hitOrStay !== "stay");

  if (!playerBust) {
    while (true) {
      if (getHandTotal(computerHand) < 17) {
        computerHand.push(dealCard(deck));
      } else break;
    }
  }

  console.log("----------------------------");
  displayHand("Player", playerHand);
  displayHand("Computer", computerHand);
  displayResult(playerHand, computerHand);

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

function displayResult(playerHand, computerHand) {
  let playerTotal = getHandTotal(playerHand);
  let computerTotal = getHandTotal(computerHand);

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