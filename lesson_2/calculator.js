const readline = require('readline-sync');
const MESSAGES = require("./calculator_messages.json");
let language;

prompt("ChooseLanguage");
do {
  switch (readline.question()) {
    case "EN":
      language = "English";
      break;
    case "FR":
      language = "French";
      break;
    default:
      prompt("LanguageError");
      break;
  }
} while (language === false);

function prompt(message) {
  console.log(`=> ${messages(message, language)}`);
}

function invalidNumber(number) {
  return number.trimStart() === '' || Number.isNaN(Number(number));
}

function messages(message, lang = "English") {
  return MESSAGES[lang][message];
}

prompt("WelcomeMessage");

let retry = false;

do {
  prompt("FirstNumberPrompt");
  let number1 = readline.question();

  while (invalidNumber(number1)) {
    prompt("InvalidNumberError");
    number1 = readline.question();
  }

  prompt("SecondNumberPrompt");
  let number2 = readline.question();

  while (invalidNumber(number2)) {
    prompt("InvalidNumberError");
    number2 = readline.question();
  }

  prompt("OperationPrompt");
  let operation = readline.question();

  while (!['1', '2', '3', '4'].includes(operation)) {
    prompt("InvalidOperatorError");
    operation = readline.question();
  }

  let output;
  switch (operation) {
    case '1':
      output = Number(number1) + Number(number2);
      break;
    case '2':
      output = Number(number1) - Number(number2);
      break;
    case '3':
      output = Number(number1) * Number(number2);
      break;
    case '4':
      output = Number(number1) / Number(number2);
      break;
  }

  prompt("Result");
  console.log(`${output}`);

  prompt("TryAgainPrompt");
  retry = readline.question() === "Y";

} while (retry);
