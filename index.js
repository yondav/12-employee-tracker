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

// mysql password
// change file path to './config' once you've added your mysql password to the config file. See README
const pass = require('./pass');

// connection to db
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: pass,
  database: 'employee_trackerdb',
});
