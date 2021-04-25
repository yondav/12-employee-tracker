const Sequelize = require('../config/connection');
const { Department, Employee, Role } = require('../models');

const departmentSeedData = require('./departmentSeedData.json');
const employeeSeedData = require('./employeeSeedData.json');
const roleSeedData = require('./roleSeedData.json');

const seedDatabase = async () => {
  await Sequelize.sync({ force: true });

  const departments = await Department.bulkCreate(departmentSeedData, {
    individualHooks: true,
    returning: true,
  });

  const employees = await Employee.bulkCreate(employeeSeedData, {
    individualHooks: true,
    returning: true,
  });

  const roles = await Role.bulkCreate(roleSeedData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
