const fs = require('fs');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});;
const argv = require('minimist')(process.argv.slice(2));
const logfile = argv['_'][0];
const colors = require('colors');

const plannedNumber = Math.floor(Math.random() * 10) + 1;
let count = 0;


colors.setTheme({
  info: ['black', 'bgWhite', 'italic'],
  help: ['white', 'bgCyan'],
  // warn: 'yellow',
  warn: ['white', 'bgYellow'],
  debug: ['white', 'bgMagenta'],
});

const game = () => {
  const log = data => {
    if (logfile !== undefined) {
      fs.appendFile(logfile, data + '\n', err => {
        if (err) throw err;
        console.log(`Game's data has been wrote in a ${logfile} file!`.yellow.italic.underline);
      });
    }
  }

  const valid = value => {
    if (isNaN(value)) {
      console.log('Please, enter number =)'.help.bold);
      return false;
    }

    if (value < 1 || value > 10) {
      console.log('Your number is out of range ;)'.debug);
      return false;
    }

    return true;
  }

  readline.question('Enter a number from 1 to 10 to guess my plan: '.info, function (
    value
  ) {
    if (!valid(value)) {
      game();
    } else {
      count += 1;
      if (+value === plannedNumber) {
        console.log(
          `Congratulations, you guessed the number in ${count} steps! =)`.rainbow.bold
        );
        log(`Congratulations, you guessed the number in ${count} steps!`);
        readline.close();
      } else {
        console.log('You did not guess the number, try again.'.warn);
        game();
      }
    }
  });
}

game();