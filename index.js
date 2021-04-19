/**
 * /index.js
 *
 * @description: index file is the main file. All functionality will come through this file.
 *
 */

// dependencies
// const mysql = require('mysql');
// const figlet = require('figlet');
// const chalk = require('chalk');
const inquirer = require('inquirer');
const console_table = require('console.table');

const view = require('./db/table_funcs/table_views');
const add = require('./db/table_funcs/add');
const edit = require('./db/table_funcs/edit');
const prompts = require('./lib/prompts');
const { launchTitle, appTitle, depTitle, roleTitle, employeeTitle } = require('./lib/title');

const init = () => {
  console.clear();
  launchTitle(appTitle.hex, appTitle.text);
  console.log(prompts.welcomePrompt);
  inquirer.prompt(prompts.toDoPrompt);
};

init();
// view.empTable();
// view.viewByTable('department.name', 'Writing');
// view.viewByTable('role.title', 'Writer');
// view.viewDep();
// view.viewRole();

// const editSample = {
//   table: 'department',
//   setProp: 'name',
//   setVal: 'test edit',
//   whereProp: 'name',
//   whereVal: 'Production',
// };
// edit.edit(
//   editSample.table,
//   editSample.setProp,
//   editSample.setVal,
//   editSample.whereProp,
//   editSample.whereVal
// );

// let entourage = new add.Department('Entourage');
// entourage.add();

// let role = new add.Role('Member', 100000.0, 5);
// role.add();

// let dotCom = new add.Employee('Com', 'Dot', 11, 7);
// dotCom.add();

// console.log(title);
// launchTitle(appTitle.hex, appTitle.text);
// launchTitle(depTitle.hex, depTitle.text);
// launchTitle(roleTitle.hex, roleTitle.text);
// launchTitle(employeeTitle.hex, employeeTitle.text);
