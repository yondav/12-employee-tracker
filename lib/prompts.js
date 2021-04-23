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
const update = require('../db/table_funcs/update');
const { Employee, Department, Role } = require('../db/table_funcs/insert');
const { launchTitle, appTitle, depTitle, roleTitle, employeeTitle, mgmtTitle } = require('./title');

// empty array to push departments, roles, or employees to for multiple choice
let roleOptions = [];
let manOptions = [];
let empOptions = [];
let depOptions = [];
let id;

// welcome message
const welcomePrompt = () => {
  // console.clear();
  launchTitle(appTitle.hex, appTitle.text);
  console.log(
    chalk.hex('#E4D874').bgHex('#000000')('\n |  Welcome to Employee Tracker an easy to use cms for keeping track of your team!  | \n')
  );
};

// return key prompt to move to next prompt
const enter = {
  name: 'continue',
  type: 'confirm',
  message: chalk.hex('#DDB9E4').bgHex('#000000')('\n | Enter To Continue To Main Menu | \n'),
};

// main menu prompt
const menuPrompt = {
  name: 'menu',
  type: 'list',
  message: chalk.hex('#74A9E4').bgHex('#000000')('\n | MAIN MENU | \n'),
  choices: ['view', 'add', 'edit', 'remove'],
};

// which table to view
const selectView = {
  name: 'selectView',
  type: 'list',
  message: chalk.hex('#74A9E4').bgHex('#000000')('\n | VIEW BY... | \n'),
  choices: ['employee', 'department', 'role', 'manager'],
};

// prompts for adding
const addSelect = {
  name: 'add_select',
  type: 'list',
  message: chalk.hex('#74A9E4').bgHex('#000000')('\n | Select | \n'),
  choices: ['employee', 'department', 'role'],
};

// prompts for adding employee
const addEmpPrompts = [
  {
    name: 'first_name',
    type: 'input',
    message: chalk.hex('#74E485').bgHex('#000000')('\n | First Name | \n'),
  },
  {
    name: 'last_name',
    type: 'input',
    message: chalk.hex('#74E485').bgHex('#000000')('\n | Last Name | \n'),
  },
  {
    name: 'role',
    type: 'list',
    message: chalk.hex('#74E485').bgHex('#000000')('\n | Role | \n'),
    choices: roleOptions,
  },
  {
    name: 'manager',
    type: 'list',
    message: chalk.hex('#74E485').bgHex('#000000')('\n | Manager | \n'),
    choices: manOptions,
  },
];

// prompt for adding department
const addDepPrompt = {
  name: 'dep_name',
  type: 'input',
  message: chalk.hex('#74E485').bgHex('#000000')('\n | Department Name | \n'),
};

// prompts for adding role
const addRolePrompts = [
  {
    name: 'title',
    type: 'input',
    message: chalk.hex('#74E485').bgHex('#000000')('\n | Title | \n'),
  },
  {
    name: 'salary',
    type: 'input',
    message: chalk.hex('#74E485').bgHex('#000000')('\n | Starting Salary | \n __ DECIMAL FORMAT __ \n __ DO NOT INCLUD $ __'),
  },
  {
    name: 'department',
    type: 'list',
    message: chalk.hex('#74E485').bgHex('#000000')('\n | Department | \n'),
    choices: depOptions,
  },
];

// prompts for editing employee
const empEdit = [
  {
    name: 'emp_select',
    type: 'list',
    message: chalk.hex('#74E485').bgHex('#000000')('\n | Select An Employee | \n'),
    choices: empOptions,
  },
  {
    name: 'emp_params',
    type: 'list',
    message: chalk.hex('#74E485').bgHex('#000000')('\n | What Would You Like To Update? | \n'),
    choices: ['first name', 'last name', 'role', 'manager'],
  },
];

const depEdit = {
  name: 'dep_edit',
  type: 'input',
  message: chalk.hex('#74E485').bgHex('#000000')('\n | Department Name | \n'),
};

const roleEdit = {
  name: 'role_edit',
  type: 'list',
  message: chalk.hex('#74E485').bgHex('#000000')('\n | What Would You Like To Update? | \n'),
  choices: ['title', 'salary', 'department'],
};

// query to push options to options array
const optionsQuery = (x, y, z) => {
  let query = x;
  let param = y;
  return new Promise((resolve, reject) => {
    connection.query(query, (err, res) => {
      if (err) throw err;
      res.forEach((obj) => {
        z.push(obj[param]);
      });
      resolve(true);
    });
  });
};

// logic for if user selects view from main menu
const viewTable = (cb) =>
  inquirer.prompt(selectView).then((res) => {
    console.clear();
    switch (res.selectView) {
      case 'employee':
        launchTitle(employeeTitle.hex, employeeTitle.text);
        view.empTable(cb);
        break;
      case 'department':
        launchTitle(depTitle.hex, depTitle.text);
        optionsQuery(`SELECT name FROM department`, 'name', depOptions).then(() => {
          return inquirer.prompt(addRolePrompts[2]).then((res) => view.viewByTable('department.name', res.department, cb));
        });
        break;
      case 'role':
        launchTitle(roleTitle.hex, roleTitle.text);
        optionsQuery(`SELECT title FROM role`, 'title', roleOptions).then(() => {
          return inquirer.prompt(addEmpPrompts[2]).then((res) => view.viewByTable('role.title', res.role, cb));
        });
        break;
      case 'manager':
        launchTitle(mgmtTitle.hex, mgmtTitle.text);
        optionsQuery(`SELECT CONCAT(last_name, ', ', first_name) AS manager FROM employee`, 'manager', manOptions).then(() => {
          return inquirer.prompt(addEmpPrompts[3]).then((res) => {
            let manager = res.manager.split(',');
            connection.query('SELECT id FROM employee WHERE last_name = ?', manager[0], (err, res) => {
              view.viewByTable('employee.manager_id', res[0].id, cb);
            });
          });
        });
        break;
    }
  });

// logic for additions
const add = (cb) =>
  inquirer.prompt(addSelect).then((res) => {
    console.clear();
    switch (res.add_select) {
      case 'employee':
        let empProps = [];
        launchTitle(employeeTitle.hex, employeeTitle.text);
        inquirer.prompt(addEmpPrompts[0]).then((res) => {
          empProps.push(res.first_name);
          inquirer.prompt(addEmpPrompts[1]).then((res) => {
            empProps.push(res.last_name);
            optionsQuery(`SELECT title FROM role`, 'title', roleOptions).then(() => {
              return inquirer.prompt(addEmpPrompts[2]).then((res) => {
                let role = res.role;
                connection.query('SELECT id FROM role WHERE title = ?', role, (err, res) => {
                  empProps.push(res[0].id);
                });
                optionsQuery(
                  `SELECT first_name, last_name, CONCAT(last_name, ', ', first_name) AS manager FROM employee;`,
                  'manager',
                  manOptions
                ).then(() => {
                  inquirer.prompt(addEmpPrompts[3]).then((res) => {
                    let manager = res.manager.split(',');
                    connection.query(`SELECT id FROM employee WHERE last_name = ?`, manager[0], (err, res) => {
                      id = res[0].id;
                      empProps.push(id);
                      let newEmp = new Employee(empProps[0], empProps[1], empProps[2], empProps[3]);
                      newEmp.insert(cb);
                    });
                  });
                });
              });
            });
          });
        });
        break;
      case 'department':
        launchTitle(depTitle.hex, depTitle.text);
        inquirer.prompt(addDepPrompt).then((res) => {
          let newDep = new Department(res.dep_name);
          newDep.insert(cb);
        });
        break;
      case 'role':
        let roleProps = [];
        launchTitle(roleTitle.hex, roleTitle.text);
        inquirer.prompt(addRolePrompts[0]).then((res) => {
          roleProps.push(res.title);
          inquirer.prompt(addRolePrompts[1]).then((res) => {
            roleProps.push(res.salary);
            optionsQuery(`SELECT name FROM department`, 'name', depOptions).then(() => {
              inquirer.prompt(addRolePrompts[2]).then((res) => {
                let department = res.department;
                connection.query(`SELECT id FROM department WHERE name = "${department}"`, (err, res) => {
                  id = res[0].id;
                  roleProps.push(id);
                  let newRole = new Role(roleProps[0], roleProps[1], roleProps[2]);
                  newRole.insert(cb);
                });
              });
            });
          });
        });
    }
  });

// logic for edits
const edit = (cb) => {
  inquirer.prompt(addSelect).then((res) => {
    console.clear();
    switch (res.add_select) {
      case 'employee':
        launchTitle(employeeTitle.hex, employeeTitle.text);
        optionsQuery(`SELECT CONCAT(last_name, ', ', first_name) AS name FROM employee;`, 'name', empOptions).then(() => {
          inquirer.prompt(empEdit[0]).then((res) => {
            let emp = res.emp_select.split(',');
            connection.query(`SELECT id FROM employee WHERE last_name = ?`, emp[0], (err, res) => {
              id = res[0].id;
              inquirer.prompt(empEdit[1]).then((res) => {
                switch (res.emp_params) {
                  case 'first name':
                    inquirer.prompt(addEmpPrompts[0]).then((res) => update.update('employee', 'first_name', res.first_name, 'id', id, cb));
                    break;
                  case 'last name':
                    inquirer.prompt(addEmpPrompts[1]).then((res) => update.update('employee', 'last_name', res.last_name, 'id', id, cb));
                    break;
                  case 'role':
                    optionsQuery(`SELECT title FROM role`, 'title', roleOptions).then(() =>
                      inquirer.prompt(addEmpPrompts[2]).then((res) => {
                        let role = res.role;
                        connection.query(`SELECT id FROM role WHERE title = ?`, role, (err, res) => {
                          id = res[0].id;
                          update.update('employee', 'role_id', id, 'id', id, cb);
                        });
                      })
                    );
                    break;
                  case 'manager':
                    optionsQuery(
                      `SELECT first_name, last_name, CONCAT(last_name, ', ', first_name) AS manager FROM employee;`,
                      'manager',
                      manOptions
                    ).then(() => {
                      inquirer.prompt(addEmpPrompts[3]).then((res) => {
                        let manager = res.manager.split(',');
                        connection.query(`SELECT id FROM employee WHERE last_name = ?`, manager[0], (err, res) => {
                          id = res[0].id;
                          update.update('employee', 'manager_id', id, 'id', id, cb);
                        });
                      });
                    });
                }
              });
            });
          });
        });
        break;
      case 'department':
        launchTitle(depTitle.hex, depTitle.text);
        optionsQuery(`SELECT name FROM department`, 'name', depOptions).then(() =>
          inquirer.prompt(addRolePrompts[2]).then((res) =>
            connection.query(`SELECT id FROM department WHERE name = "${res.department}"`, (err, res) => {
              id = res[0].id;
              inquirer.prompt(depEdit).then((res) => {
                let department = res.dep_edit;
                update.update('department', 'name', department, 'id', id, cb);
              });
            })
          )
        );
        break;
      case 'role':
        launchTitle(roleTitle.hex, roleTitle.text);
        optionsQuery(`SELECT title FROM role`, 'title', roleOptions).then(() =>
          inquirer.prompt(addEmpPrompts[2]).then((res) => {
            let role = res.role;
            connection.query(`SELECT id FROM role WHERE title = ?`, role, (err, res) => {
              id = res[0].id;
              inquirer.prompt(roleEdit).then((res) => {
                switch (res.role_edit) {
                  case 'title':
                    inquirer.prompt(addRolePrompts[0]).then((res) => {
                      let title = res.title;
                      update.update('role', 'title', title, 'id', id, cb);
                    });
                    break;
                  case 'salary':
                    inquirer.prompt(addRolePrompts[1]).then((res) => {
                      let salary = res.salary;
                      update.update('role', 'salary', salary, 'id', id, cb);
                    });
                    break;
                  case 'department':
                    optionsQuery(`SELECT name FROM department`, 'name', depOptions).then(() =>
                      inquirer.prompt(addRolePrompts[2]).then((res) => {
                        connection.query(`SELECT id FROM department WHERE name = "${res.department}"`, (err, res) => {
                          id = res[0].id;
                          update.update('role', 'department_id', id, 'id', id, cb);
                        });
                      })
                    );
                    break;
                }
              });
            });
          })
        );
    }
  });
};

// logic for removing
const remove = (cb) => {
  inquirer.prompt(addSelect).then((res) => {
    console.clear();
    switch (res.add_select) {
      case 'employee':
        launchTitle(employeeTitle.hex, employeeTitle.text);
        optionsQuery(`SELECT CONCAT(last_name, ', ', first_name) AS name FROM employee;`, 'name', empOptions).then(() =>
          inquirer.prompt(empEdit[0]).then((res) => {
            let employee = res.emp_select.split(',');
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
          .then(() => inquirer.prompt(addRolePrompts[2]))
          .then((res) =>
            connection.query(`DELETE FROM department WHERE name = ?`, res.department, (err, res) => {
              if (err) throw err;
              console.log(chalk.hex('#85E474').bgHex('#000000')('\n | ' + res.department + ' has been removed | \n'));
              cb();
            })
          );
        break;
      case 'role':
        launchTitle(roleTitle.hex, roleTitle.text);
        optionsQuery(`SELECT title FROM role`, 'title', roleOptions).then(() =>
          inquirer.prompt(addEmpPrompts[2]).then((res) => {
            connection.query(`DELETE FROM role WHERE title = ?`, res.role, (err, res) => {
              if (err) throw err;
              console.log(chalk.hex('#85E474').bgHex('#000000')('\n | ' + res.role + ' has been removed | \n'));
              cb();
            });
          })
        );
        break;
    }
  });
};

module.exports = { welcomePrompt, enter, menuPrompt, viewTable, add, edit, remove };
