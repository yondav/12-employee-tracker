/**
 * /db/table_funcs/table_views.js
 *
 * @description: table views
 *
 */

// modules
const inquirer = require('inquirer');
const connection = require('../connection');
const chalk = require('chalk');

// display all employees
const empTable = (cb) => {
  let query = `SELECT employee.id, employee.last_name, employee.first_name, role.title, department.name AS department, CONCAT('$',role.salary) AS salary, CONCAT(manager.last_name, ', ', manager.first_name) AS manager 
  FROM employee 
  LEFT JOIN role ON employee.role_id = role.id 
  LEFT JOIN department ON role.department_id = department.id 
  LEFT JOIN employee manager ON manager.id = employee.manager_id`;

  let totalSal = `SELECT CONCAT('$', SUM(role.salary) OVER()) AS total_salary 
  FROM employee 
  LEFT JOIN role ON employee.role_id = role.id 
  LEFT JOIN department ON role.department_id = department.id 
  LEFT JOIN employee manager ON manager.id = employee.manager_id
  LIMIT 1`;

  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
  });

  connection.query(totalSal, (err, res) => {
    if (err) throw err;
    console.log(chalk.hex('#E47474').bgHex('#000000')('\n | Total Payroll: ' + res[0].total_salary + ' | \n'));
    cb();
  });
};

// display employees by department or role
const viewByTable = (key, val, cb) => {
  let query = `SELECT employee.id, employee.last_name, employee.first_name, role.title, department.name AS department, CONCAT('$',role.salary) AS salary, CONCAT(manager.last_name, ', ', manager.first_name) AS manager 
  FROM employee
  LEFT JOIN role ON employee.role_id = role.id 
  LEFT JOIN department ON role.department_id = department.id 
  LEFT JOIN employee manager 
  ON manager.id = employee.manager_id
  WHERE ${key} = ?`;

  let totalSal = `SELECT CONCAT('$', SUM(role.salary) OVER())
  AS total_salary FROM employee
  LEFT JOIN role ON employee.role_id = role.id 
  LEFT JOIN department ON role.department_id = department.id 
  LEFT JOIN employee manager ON manager.id = employee.manager_id
  WHERE ${key} = ?
  LIMIT 1;`;

  connection.query(query, val, (err, res) => {
    if (err) throw err;
    console.table(res);
  });

  connection.query(totalSal, val, (err, res) => {
    if (err) throw err;
    console.log(chalk.hex('#E47474').bgHex('#000000')('\n | Total Payroll: ' + res[0].total_salary + ' | \n'));
    cb();
  });
};

module.exports = {
  empTable: empTable,
  viewByTable: viewByTable,
};
