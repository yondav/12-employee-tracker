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

// return key prompt to move to next prompt
const enter = {
  name: 'continue',
  type: 'confirm',
  message: chalk.hex('#DDB9E4').bgHex('#000000')(`
  -------------------  
 | Enter To Continue | 
  -------------------  `),
};

const back = (x) => {
  setTimeout(() => {
    inquirer.prompt(backPrompt).then((res) => {
      // console.log(res.back);
      if (res.back === true) {
        x;
      } else {
        connection.end();
        process.exit(0);
      }
    });
  }, 3000);
};

const backPrompt = {
  name: 'back',
  type: 'confirm',
  message: chalk.hex('#E47474').bgHex('#000000')(`
  ------  
 | BACK | 
  ------  `),
};

// welcome message
const welcomePrompt = () => {
  console.log(
    chalk.hex('#E4D874').bgHex('#000000')(
      `
  ----------------------------------------------------------------------------------  
 |  Welcome to Employee Tracker an easy to use cms for keeping track of your team!  | 
  ----------------------------------------------------------------------------------  `
    )
  );
};

const menu = {
  name: 'menu',
  type: 'list',
  message: chalk.hex('#74A9E4').bgHex('#000000')(`
  -----------  
 | MAIN MENU | 
  -----------  `),
  choices: ['view', 'add', 'edit'],
};

const viewBy = {
  name: 'viewBy',
  type: 'list',
  message: chalk.hex('#74A9E4').bgHex('#000000')(`
  ------------  
 | VIEW BY... | 
  ------------  `),
  choices: ['employee', 'department', 'role'],
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
  enter: enter,
  welcomePrompt: welcomePrompt,
  menu: menu,
  viewBy: viewBy,
  back: back,
  // toDoPrompt: toDoPrompt,
  selectDep: selectDep,
  selectRole: selectRole,
  editPrompt: editPrompt,
};

// const toDoPrompt = () => {
//   return inquirer
//     .prompt({
//       name: 'todo',
//       type: 'list',
//       message: chalk.hex('#74A9E4').bgHex('#000000')(`
//  ----------------------------
// | What would you like to do? |
//  ---------------------------- `),
//       choices: ['View', 'Add', 'Edit', 'Remove'],
//     })
//     .then((answer) => {
//       switch (answer.todo) {
//         case 'View':
//           return inquirer
//             .prompt({
//               name: 'view',
//               type: 'list',
//               message: chalk.hex('#74A9E4').bgHex('#000000')(`
//  ---------
// | View... |
//  --------- `),
//               choices: ['All Employees', 'Employees By Department', 'Employees By Role'],
//             })
//             .then((answer) => {
//               switch (answer.view) {
//                 case 'All Employees':
//                   console.clear();
//                   launchTitle(employeeTitle.hex, employeeTitle.text);
//                   view.empTable();
//                   break;
//                 case 'Employees By Department':
//                   console.clear();
//                   launchTitle(depTitle.hex, depTitle.text);
//                   selectDep();
//                   break;
//                 case 'Employees By Role':
//                   console.clear();
//                   launchTitle(roleTitle.hex, roleTitle.text);
//                   selectRole();
//                   break;
//               }
//             });
//         case 'Add':
//           return inquirer.prompt({
//             name: 'add',
//             type: 'list',
//             message: chalk.hex('#74A9E4').bgHex('#000000')(`
//  --------
// | Add... |
//  -------- `),
//             choices: ['Employee', 'Department', 'Role'],
//           });
//       }
//     });
// };

// const toDoPrompt = () => {
//   return inquirer
//     .prompt({
//       name: 'todo',
//       type: 'list',
//       message: chalk.hex('#74A9E4').bgHex('#000000')(`
//    ----------------------------
//   | What would you like to do? |
//    ---------------------------- `),
//       choices: ['View All Employees', 'View Employees By Department', 'View Employees By Role'],
//     })
//     .then((answer) => {
//       switch (answer.todo) {
//         case 'View All Employees':
//           console.clear();
//           launchTitle(employeeTitle.hex, employeeTitle.text);
//           view.empTable();
//           break;
//         case 'View Employees By Department':
//           console.clear();
//           launchTitle(depTitle.hex, depTitle.text);
//           selectDep();
//           break;
//         case 'View Employees By Role':
//           console.clear();
//           launchTitle(roleTitle.hex, roleTitle.text);
//           selectRole();
//           break;
//       }
//     });
// };
