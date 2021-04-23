/**
 * /db/table_funcs/add.js
 *
 * @description: all functionality for adding to db here
 *
 */

// dependencies
const chalk = require('chalk');

// modules
const connection = require('../connection');

// *** CONSTRUCTORS *** //

class Department {
  constructor(name) {
    this.name = name;
  }
  insert(cb) {
    let query = `INSERT INTO department(name)
    VALUES(?)`;
    connection.query(query, this.name, (err, res) => {
      err
        ? console.log(chalk.hex('#E47474').bgHex('#000000')("\n | Uh-Oh...Something's not right. Try again! | \n"))
        : console.log(chalk.hex('#85E474').bgHex('#000000')('\n | Success! ' + this.name + ' has been added to Departments! | \n'));
      cb();
    });
  }
}

class Employee {
  constructor(first_name, last_name, role_id, manager_id) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.role_id = role_id;
    this.manager_id = manager_id;
  }
  insert(cb) {
    let query = `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)`;
    connection.query(query, [this.first_name, this.last_name, this.role_id, this.manager_id], (err, res) => {
      err
        ? console.log(chalk.hex('#E47474').bgHex('#000000')("\n | Uh-Oh...Something's not right. Try again! | \n"))
        : console.log(
            chalk.hex('#85E474').bgHex('#000000')('\n | Success! ' + this.last_name + ', ' + this.first_name + ' has been hired! | \n')
          );
      cb();
    });
  }
}

class Role {
  constructor(title, salary, department_id) {
    this.title = title;
    this.salary = salary;
    this.department_id = department_id;
  }
  insert(cb) {
    let query = `INSERT INTO role(title, salary, department_id)
    VALUES(?, ?, ?)`;
    connection.query(query, [this.title, this.salary, this.department_id], (err, res) => {
      err
        ? console.log(chalk.hex('#E47474').bgHex('#000000')("\n | Uh-Oh...Something's not right. Try again! | \n"), err)
        : console.log(
            chalk.hex('#85E474').bgHex('#000000')(
              '\n | Success! ' + this.title + ' has been added with a starting salary of ' + this.salary + '! | \n'
            )
          );
      cb();
    });
  }
}

module.exports = {
  Department: Department,
  Employee: Employee,
  Role: Role,
};
