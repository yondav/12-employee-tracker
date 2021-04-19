/**
 * /index.js
 *
 * @description: index file is the main file. All functionality will come through this file.
 *
 */

// dependencies
const mysql = require('mysql');
const inquirer = require('inquirer');
const console_table = require('console.table');
// const figlet = require('figlet');
// const chalk = require('chalk');

const title = require('./lib/title');

// mysql password
// change file path to './config' once you've added your mysql password to the config file. See README
const pass = require('./pass');
const { launchTitle, appTitle, depTitle, roleTitle, employeeTitle } = require('./lib/title');

// connection to db
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: pass,
  database: 'employee_trackerdb',
});

const fullTable = () => {
  let query = `SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id, role.title, role.salary, department.name
  FROM employee
  INNER JOIN role
  ON employee.role_id=role.id
  INNER JOIN department
  ON role.department_id=department.id
  ORDER BY employee.id`;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
  });
};

fullTable();

// connection.query('SELECT employee.id, employee.first_name, employee.last_name,  FROM department', (err, res) => {
//   if (err) throw err;
//   res.forEach(({ name }) => {
//     console.table(name);
//   });
// });

// console.log(title);
// launchTitle(appTitle.hex, appTitle.text);
// launchTitle(depTitle.hex, depTitle.text);
// launchTitle(roleTitle.hex, roleTitle.text);
// launchTitle(employeeTitle.hex, employeeTitle.text);
