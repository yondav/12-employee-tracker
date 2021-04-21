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

// empty array to push departments, roles, or employees to for multiple choice
let options = [];
let manOptions = [];

// welcome message
const welcomePrompt = () => {
  console.clear();
  launchTitle(appTitle.hex, appTitle.text);
  console.log(
    chalk.hex('#E4D874').bgHex('#000000')(
      `
  ----------------------------------------------------------------------------------  
 |  Welcome to Employee Tracker an easy to use cms for keeping track of your team!  | 
  ----------------------------------------------------------------------------------  `
    )
  );
};

// return key prompt to move to next prompt
const enter = {
  name: 'continue',
  type: 'confirm',
  message: chalk.hex('#DDB9E4').bgHex('#000000')(`
  -------------------  
 | Enter To Continue | 
  -------------------  `),
};

// main menu prompt
const menuPrompt = {
  name: 'menu',
  type: 'list',
  message: chalk.hex('#74A9E4').bgHex('#000000')(`
  -----------  
 | MAIN MENU | 
  -----------  `),
  choices: ['view', 'add', 'edit'],
};

// which table to view
const viewBy = {
  name: 'viewBy',
  type: 'list',
  message: chalk.hex('#74A9E4').bgHex('#000000')(`
  ------------  
 | VIEW BY... | 
  ------------  `),
  choices: ['employee', 'department', 'role'],
};

// prompt to chose from employees, departments, roles or managers
const selectPrompt = {
  name: 'select',
  type: 'list',
  message: chalk.hex('#74A9E4').bgHex('#000000')(`
 -------- 
| Select |
 -------- `),
  choices: options,
};

// query to push options to options array
const optionsQuery = async (x, y, z) => {
  let query = x;
  let param = y;
  return new Promise((resolve, reject) => {
    connection.query(query, (err, res) => {
      if (err) throw err;
      res.forEach((obj) => {
        z.push(obj[param]);
      });
      resolve(true);
    });
  });
};

// logic for if user selects view from main menu
const viewTable = async () => {
  inquirer.prompt(viewBy).then(async (res) => {
    console.clear();
    switch (res.viewBy) {
      case 'employee':
        launchTitle(employeeTitle.hex, employeeTitle.text);
        view.empTable();
        break;
      case 'department':
        launchTitle(depTitle.hex, depTitle.text);
        optionsQuery('SELECT name FROM department', 'name', options).then(() => {
          return inquirer
            .prompt(selectPrompt)
            .then((res) => view.viewByTable('department.name', res.select));
        });
        break;
      case 'role':
        launchTitle(roleTitle.hex, roleTitle.text);
        optionsQuery('SELECT title FROM role', 'title', options).then(() => {
          return inquirer
            .prompt(selectPrompt)
            .then((res) => view.viewByTable('role.title', res.select));
        });
        break;
    }
  });
};

// prompts for adding
const addSelect = {
  name: 'add_select',
  type: 'list',
  message: chalk.hex('#74A9E4').bgHex('#000000')(`
  -------- 
 | Select |
  -------- `),
  choices: ['employee', 'department', 'role'],
};

// prompts for adding employee
const addEmpPrompts = [
  {
    name: 'first_name',
    type: 'input',
    message: chalk.hex('#74E485').bgHex('#000000')('First Name'),
  },
  {
    name: 'last_name',
    type: 'input',
    message: chalk.hex('#74E485').bgHex('#000000')('Last Name'),
  },
  {
    name: 'role',
    type: 'list',
    message: chalk.hex('#74E485').bgHex('#000000')('Role'),
    choices: options,
  },
  {
    name: 'manager',
    type: 'list',
    message: chalk.hex('#74E485').bgHex('#000000')('Manager'),
    choices: manOptions,
  },
];

const add = () => {
  inquirer.prompt(addSelect).then((res) => {
    switch (res.add_select) {
      case 'employee':
        let empProps = [];
        console.clear();
        launchTitle(employeeTitle.hex, employeeTitle.text);
        inquirer.prompt(addEmpPrompts[0]).then((res) => {
          empProps.push(res.first_name);
          inquirer.prompt(addEmpPrompts[1]).then((res) => {
            empProps.push(res.last_name);
            optionsQuery('SELECT title FROM role', 'title', options).then(() => {
              return inquirer.prompt(addEmpPrompts[2]).then((res) => {
                empProps.push(res.role);
                optionsQuery(
                  `SELECT first_name, last_name CONCAT(last_name, ', ', first_name) 
                  AS manager FROM employee`,
                  'manager',
                  manOptions
                ).then(() => {
                  inquirer.prompt(addEmpPrompts[3]).then((res) => empProps.push(res.manager));
                });
                console.log('empProps', empProps);
              });
            });
          });
        });
        break;
    }
  });
};

module.exports = {
  welcomePrompt: welcomePrompt,
  enter: enter,
  menuPrompt: menuPrompt,
  viewTable: viewTable,
  add: add,
};
