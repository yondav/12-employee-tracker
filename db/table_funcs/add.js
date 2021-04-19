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
  add() {
    let query = `INSERT INTO department(name)
    VALUES(?)`;
    connection.query(query, this.name, (err, res) => {
      err
        ? console.log(
            chalk.hex('#E47474').bgHex('#000000')("Uh-Oh...Something's not right. Try again!"),
            err
          )
        : console.log(
            chalk.hex('#85E474').bgHex('#000000')(
              `Success! ${this.name} has been added to Departments!`
            )
          );
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
  add() {
    let query = `INSERT INTO employee(first_name, last_name, role_id, manager_id)
    VALUES(?, ?, ?, ?)`;
    connection.query(
      query,
      [this.first_name, this.last_name, this.role_id, this.manager_id],
      (err, res) => {
        err
          ? console.log(
              chalk.hex('#E47474').bgHex('#000000')("Uh-Oh...Something's not right. Try again!"),
              err
            )
          : console.log(
              chalk.hex('#85E474').bgHex('#000000')(
                `Success! ${this.last_name}, ${this.first_name} has been hired!`
              )
            );
      }
    );
  }
}

class Role {
  constructor(title, salary, department_id) {
    this.title = title;
    this.salary = salary;
    this.department_id = department_id;
  }
  add() {
    let query = `INSERT INTO role(title, salary, department_id)
    VALUES(?, ?, ?)`;
    connection.query(query, [this.title, this.salary, this.department_id], (err, res) => {
      err
        ? console.log(
            chalk.hex('#E47474').bgHex('#000000')("Uh-Oh...Something's not right. Try again!"),
            err
          )
        : console.log(
            chalk.hex('#85E474').bgHex('#000000')(
              `Success! ${this.title} has been added with a starting salary of ${this.salary}!`
            )
          );
    });
  }
}

module.exports = {
  Department: Department,
  Employee: Employee,
  Role: Role,
};

// module.exports.Department = Department;
// module.exports.Employee = Employee;
// module.exports.Role = Role;
