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
