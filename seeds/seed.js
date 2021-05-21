/**
 * /seeds.seed.js
 *
 * @description: seeding data
 *
 */

const Sequelize = require('../config/connection');
const { Department, Employee, Role } = require('../models');
const Manager = require('../models/Manager');

const departmentSeedData = require('./departmentSeedData.json');
const employeeSeedData = require('./employeeSeedData.json');
const roleSeedData = require('./roleSeedData.json');
const managerSeedData = require('./managerSeedData.json');

const seedDatabase = async () => {
  await Sequelize.sync({ force: true });

  const departments = await Department.bulkCreate(departmentSeedData, {
    individualHooks: true,
    returning: true,
  });

  const roles = await Role.bulkCreate(roleSeedData, {
    individualHooks: true,
    returning: true,
  });

  const managers = await Manager.bulkCreate(managerSeedData, {
    individualHooks: true,
    returning: true,
  });

  const employees = await Employee.bulkCreate(employeeSeedData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
