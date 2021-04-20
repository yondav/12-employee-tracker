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
const optionsQuery = (x) => {
  let query = x;

  connection.query(query, (err, res) => {
    if (err) throw err;
    res.forEach(({ name }) => {
      options.push(name);
    });
  });
};

// logic for if user selects view from main menu
const viewTable = () => {
  inquirer.prompt(viewBy).then((res) => {
    switch (res.viewBy) {
      case 'employee':
        launchTitle(employeeTitle.hex, employeeTitle.text);
        view.empTable();
        break;
      case 'department':
        launchTitle(depTitle.hex, depTitle.text);
        optionsQuery('SELECT name FROM department');
        inquirer
          .prompt(selectPrompt)
          .then((res) => view.viewByTable('department.name', res.selectPrompt));
        break;
      case 'role':
        launchTitle(roleTitle.hex, roleTitle.text);
        optionsQuery('SELECT title FROM role');
        inquirer
          .prompt(selectPrompt)
          .then((res) => view.viewByTable('role.title', res.selectPrompt));
        break;
    }
  });
};

module.exports = {
  welcomePrompt: welcomePrompt,
  enter: enter,
  menuPrompt: menuPrompt,
  viewBy: viewBy,
  selectPrompt: selectPrompt,
  optionsQuery: optionsQuery,
  viewTable: viewTable,
};

// // back prompt
// const backPrompt = {
//   name: 'back',
//   type: 'confirm',
//   message: chalk.hex('#E47474').bgHex('#000000')(`
//   ------
//  | BACK |
//   ------  `),
// };

// // back prompt functionality
// const back = (x) => {
//   setTimeout(() => {
//     inquirer.prompt(backPrompt).then((res) => {
//       // console.log(res.back);
//       if (res.back === true) {
//         x();
//       } else {
//         connection.end();
//         process.exit(0);
//       }
//     });
//   }, 2000);
// };

// // select role to view by
// const selectRole = () => {
//   let roles = [];
//   let query = `SELECT title FROM role`;

//   connection.query(query, (err, res) => {
//     if (err) throw err;
//     res.forEach(({ title }) => {
//       roles.push(title);
//     });
//     inquirer
//       .prompt({
//         name: 'selectRole',
//         type: 'list',
//         message: chalk.hex('#74A9E4').bgHex('#000000')(`
//  -------------
// | Select Role |
//  ------------- `),
//         choices: roles,
//       })
//       .then((answer) => view.viewByTable('role.title', answer.selectRole));
//   });
// };

// // add prompt
// const addPrompt = {
//   name: 'add',
//   type: 'list',
//   message: chalk.hex('#74A9E4').bgHex('#000000')(`
//   ----------
//  | Addd... |
//   ---------- `),
//   choices: ['employee', 'department', 'role'],
// };

// // add employee prompt
// const empName = [
//   {
//     name: 'first_name',
//     type: 'input',
//     message: chalk.hex('#74A9E4').bgHex('#000000')(`
//  --------------------------
// | Employee's First Name... |
//  -------------------------- `),
//   },
//   {
//     name: 'last_name',
//     type: 'input',
//     message: chalk.hex('#74A9E4').bgHex('#000000')(`
//  -------------------------
// | Employee's Last Name... |
//  ------------------------- `),
//   },
// ];

// const addEmp = () => {
//   let emp = [];
//   inquirer.prompt(empName).then((res) => {
//     emp.push(res.first_name, res.last_name);
//   });
// };

// // add prompt functionality
// const add = () => {
//   return inquirer.prompt(addPrompt).then((res) => {
//     switch (res.add) {
//       case 'employee':
//         inquirer.prompt(empName).then((res) => {});
//     }
//   });
// };

// const editPrompt = {
//   name: 'editPrompt',
//   type: 'confirm',
//   message: chalk.hex('#74A9E4').bgHex('#000000')('Would you like to make any changes?'),
// };

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
