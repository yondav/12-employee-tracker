/**
 * /db/table_funcs/table_views.js
 *
 * @description: table views
 *
 */

const connection = require('../connection');

// display all employees
const empTable = () => {
  let query = `SELECT employee.id, employee.last_name, employee.first_name, role.title, department.name 
  AS department, CONCAT('$',role.salary)
  AS salary, CONCAT(manager.last_name, ', ', manager.first_name) 
  AS manager FROM employee 
  LEFT JOIN role 
  On employee.role_id = role.id 
  LEFT JOIN department 
  ON role.department_id = department.id 
  LEFT JOIN employee manager 
  ON manager.id = employee.manager_id`;

  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
  });
};

// display employees by department
const viewByTable = (key, val) => {
  let query = `SELECT employee.id, employee.last_name, employee.first_name, role.title, department.name 
  AS department, CONCAT('$',role.salary)
  AS salary, CONCAT(manager.last_name, ', ', manager.first_name) 
  AS manager FROM employee
  LEFT JOIN role 
  On employee.role_id = role.id 
  LEFT JOIN department 
  ON role.department_id = department.id 
  LEFT JOIN employee manager 
  ON manager.id = employee.manager_id
  WHERE ${key} = ?`;

  connection.query(query, val, (err, res) => {
    if (err) throw err;
    console.table(res);
  });
};

module.exports.empTable = empTable;
module.exports.viewByTable = viewByTable;