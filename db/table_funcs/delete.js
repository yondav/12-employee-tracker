/**
 * /db/table_funcs/delete.js
 *
 * @description: all functionality for removing from db here
 *
 */

// dependencies
const inquirer = require('inquirer');
const chalk = require('chalk');

// modules
const connection = require('../connection');
const { roleOptions, empOptions, depOptions, prompts, optionsQuery } = require('../../lib/prompts');
const { depTitle, roleTitle, employeeTitle, launchTitle } = require('../../lib/title');

// // delete query
// const delete = () => {
//   connection.query(`DELETE FROM ${table} WHERE name = ?`, res.select_dep, (err, res) => {
//     if (err) throw err;
//     console.log(chalk.hex('#85E474').bgHex('#000000')('\n | ' + res.select_dep + ' has been removed | \n'));
//     cb();
//   })
// }

// logic for removing
const remove = (cb) => {
  inquirer.prompt(prompts[9]).then((res) => {
    console.clear();
    switch (res.select_table) {
      case 'employee':
        launchTitle(employeeTitle.hex, employeeTitle.text);
        optionsQuery(`SELECT CONCAT(last_name, ', ', first_name) AS name FROM employee;`, 'name', empOptions).then(() =>
          inquirer.prompt(prompts[5]).then((res) => {
            let employee = res.select_emp.split(',');
            console.log(employee[0]);
            connection.query(`DELETE FROM employee WHERE last_name = ?`, employee[0], (err, res) => {
              if (err) throw err;
              console.log(chalk.hex('#85E474').bgHex('#000000')('\n | ' + employee[0] + ', ' + employee[1] + ' has been terminated | \n'));
              cb();
            });
          })
        );
        break;
      case 'department':
        launchTitle(depTitle.hex, depTitle.text);
        optionsQuery(`SELECT name FROM department`, 'name', depOptions)
          .then(() => inquirer.prompt(prompts[3]))
          .then((res) =>
            connection.query(`DELETE FROM department WHERE name = ?`, res.select_dep, (err, res) => {
              if (err) throw err;
              console.log(chalk.hex('#85E474').bgHex('#000000')('\n | ' + res.select_dep + ' has been removed | \n'));
              cb();
            })
          );
        break;
      case 'role':
        launchTitle(roleTitle.hex, roleTitle.text);
        optionsQuery(`SELECT title FROM role`, 'title', roleOptions).then(() =>
          inquirer.prompt(prompts[4]).then((res) => {
            connection.query(`DELETE FROM role WHERE title = ?`, res.select_role, (err, res) => {
              if (err) throw err;
              console.log(chalk.hex('#85E474').bgHex('#000000')('\n | ' + res.select_role + ' has been removed | \n'));
              cb();
            });
          })
        );
        break;
    }
  });
};

module.exports = { remove };
