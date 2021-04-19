/**
 * /lib/title.js
 *
 * @description: title file holds functionality to render figlet titles
 *
 */

const chalk = require('chalk');

const welcomePrompt = chalk.hex('#E4D874').bgHex('#000000')(
  `
   -----------------------------------------------------------------------------------   
  |  Welcome to Employee Tracker and easy to use cms for keeping track of your team!  |  
   -----------------------------------------------------------------------------------   
  `
);

const toDoPrompt = {
  name: 'todo',
  type: 'list',
  message: chalk.hex('#74A9E4').bgHex('#000000')('What would you like to do?'),
  choices: ['View All Employees', 'View Employees By Department', 'View Employees By Role'],
};

module.exports.welcomePrompt = welcomePrompt;
module.exports.toDoPrompt = toDoPrompt;
