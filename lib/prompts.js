/**
 * /lib/title.js
 *
 * @description: title file holds functionality to render figlet titles
 *
 */

// dependencies
const chalk = require('chalk');
const inquirer = require('inquirer');

// modules
const connection = require('../db/connection');
const view = require('../db/table_funcs/table_views');
const { launchTitle, appTitle, depTitle, roleTitle, employeeTitle } = require('./title');

const welcomePrompt = chalk.hex('#E4D874').bgHex('#000000')(
  `
 ---------------------------------------------------------------------------------- 
|  Welcome to Employee Tracker an easy to use cms for keeping track of your team!  |
 ---------------------------------------------------------------------------------- `
);

const toDoPrompt = () => {
  return inquirer
    .prompt({
      name: 'todo',
      type: 'list',
      message: chalk.hex('#74A9E4').bgHex('#000000')(`
   ---------------------------- 
  | What would you like to do? |
   ---------------------------- `),
      choices: ['View All Employees', 'View Employees By Department', 'View Employees By Role'],
    })
    .then((answer) => {
      switch (answer.todo) {
        case 'View All Employees':
          console.clear();
          launchTitle(employeeTitle.hex, employeeTitle.text);
          view.empTable();
          break;
        case 'View Employees By Department':
          console.clear();
          launchTitle(depTitle.hex, depTitle.text);
          selectDep();
          break;
        case 'View Employees By Role':
          console.clear();
          launchTitle(roleTitle.hex, roleTitle.text);
          selectRole();
          break;
      }
    });
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

module.exports = {
  welcomePrompt: welcomePrompt,
  toDoPrompt: toDoPrompt,
  selectDep: selectDep,
  selectRole: selectRole,
  editPrompt: editPrompt,
};
