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

const empTable = require('./db/table_funcs/emp_table');
const depTable = require('./db/table_funcs/dep_table');
const roleTable = require('./db/table_funcs/role_table');
const { launchTitle, appTitle, depTitle, roleTitle, employeeTitle } = require('./lib/title');

empTable();
depTable('Writing');
roleTable('Writer');

// console.log(title);
// launchTitle(appTitle.hex, appTitle.text);
// launchTitle(depTitle.hex, depTitle.text);
// launchTitle(roleTitle.hex, roleTitle.text);
// launchTitle(employeeTitle.hex, employeeTitle.text);
