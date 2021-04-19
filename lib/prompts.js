/**
 * /lib/title.js
 *
 * @description: title file holds functionality to render figlet titles
 *
 */

const connection = require('../db/connection');
const chalk = require('chalk');
const view = require('../db/table_funcs/table_views');
const inquirer = require('inquirer');

const welcomePrompt = chalk.hex('#E4D874').bgHex('#000000')(
  `
 ---------------------------------------------------------------------------------- 
|  Welcome to Employee Tracker an easy to use cms for keeping track of your team!  |
 ---------------------------------------------------------------------------------- `
);

const toDoPrompt = {
  name: 'todo',
  type: 'list',
  message: chalk.hex('#74A9E4').bgHex('#000000')(`
 ---------------------------- 
| What would you like to do? |
 ---------------------------- `),
  choices: ['View All Employees', 'View Employees By Department', 'View Employees By Role'],
};

const selectDep = () => {
  let departments = [];
  let query = `SELECT name FROM department`;

  connection.query(query, (err, res) => {
    if (err) throw err;
    res.forEach(({ name }) => {
      departments.push(name);
    });
    inquirer
      .prompt({
        name: 'selectDep',
        type: 'list',
        message: chalk.hex('#74A9E4').bgHex('#000000')(`
 ------------------- 
| Select Department |
 ------------------- `),
        choices: departments,
      })
      .then((answer) => view.viewByTable('department.name', answer.selectDep));
  });
};

const selectRole = () => {
  let roles = [];
  let query = `SELECT title FROM role`;

  connection.query(query, (err, res) => {
    if (err) throw err;
    res.forEach(({ title }) => {
      roles.push(title);
    });
    inquirer
      .prompt({
        name: 'selectRole',
        type: 'list',
        message: chalk.hex('#74A9E4').bgHex('#000000')(`
 ------------- 
| Select Role |
 ------------- `),
        choices: roles,
      })
      .then((answer) => view.viewByTable('role.title', answer.selectRole));
  });
};

const editPrompt = {
  name: 'editPrompt',
  type: 'confirm',
  message: chalk.hex('#74A9E4').bgHex('#000000')('Would you like to make any changes?'),
};

module.exports.welcomePrompt = welcomePrompt;
module.exports.toDoPrompt = toDoPrompt;
module.exports.selectDep = selectDep;
module.exports.selectRole = selectRole;
module.exports.editPrompt = editPrompt;
