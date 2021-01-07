let readlineSync = require("readline-sync");

console.log("Welcome to Mortgage Calculator!");

while (true) {

  console.log("-------------------------------");

  console.log("Please enter the loan amount:");
  let amount = readlineSync.prompt();
  while (isInvalidNumber(amount)) {
    console.log("Please enter a valid number:");
    amount = readlineSync.prompt();
  }

  console.log("Please enter the annual percentage rate (APR):");
  let annualPercentageRate = readlineSync.prompt();
  while (isInvalidNumber(annualPercentageRate)) {
    console.log("Please enter a valid number:");
    annualPercentageRate = readlineSync.prompt();
  }

  console.log("Please enter the loan duration in years:");
  let loanDurationYears = readlineSync.prompt();
  while (isInvalidNumber(loanDurationYears)) {
    console.log("Please enter a valid number:");
    loanDurationYears = readlineSync.prompt();
  }

  let loanDurationMonths = loanDurationYears * 12;
  let monthlyRate = (annualPercentageRate / 100) / 12;

  let monthlyPayment = calculatePayment(amount,
    monthlyRate, loanDurationMonths);

  console.log(`The monthly payment is: $${monthlyPayment.toFixed(2)}`);

  console.log("Would you like to run a new calculation? y/n");
  let retryAnswer = readlineSync.prompt().toLowerCase();
  while (retryAnswer !== 'n' && retryAnswer !== "y") {
    console.log("Please either select 'y' or 'n'.");
    retryAnswer = readlineSync.prompt();
  }
  if (retryAnswer === 'n') break;
}

function isInvalidNumber(number) {
  return number.trimStart() === '' || Number.isNaN(Number(number)) || Number(number) < 0;
}

function calculatePayment(amount, interestRate, loanDuration) {
  return amount * (interestRate /
    (1 - Math.pow((1 + interestRate), (-loanDuration)))) || 0;
}