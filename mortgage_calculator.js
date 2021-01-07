let readlineSync = require("readline-sync");

console.log("Please enter the loan amount:");
let loanAmount = readlineSync.prompt();
while (isInvalidNumber(loanAmount)) {
  console.log("Please enter a valid number:");
  loanAmount = readlineSync.prompt();
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
let monthlyInterestRate = (annualPercentageRate / 100) / 12;

let monthlyPayment = calculatePayment(loanAmount,
  monthlyInterestRate, loanDurationMonths);

//Try to print the payment amount as a dollar and cents amount
//e.g., $123.45 or $371.00.
console.log(`Monthly payment: $${monthlyPayment.toFixed(2)}`);

function isInvalidNumber(number) {
  return number.trimStart() === '' || Number.isNaN(Number(number)) || Number(number) < 0;
}

function calculatePayment(loanAmount, interestRate, loanDuration) {
  return loanAmount * (interestRate /
    (1 - Math.pow((1 + interestRate), (-loanDuration))));
}