/**
 * /models.index.js
 *
 * @description: bringing all of the models together here for export and establishing tne connection to one another
 *
 */

const Department = require('./Department');
const Employee = require('./Employee');
const Role = require('./Role');

Employee.hasOne(Role, {
  as: 'role',
  constraints: false,
  allowNull: true,
  defaultValue: null,
});

Role.hasOne(Department, {
  as: 'department',
  constraints: false,
  allowNull: true,
  defaultValue: null,
});

module.exports = { Department, Employee, Role };
