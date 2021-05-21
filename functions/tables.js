const sequelize = require('../config/connection');
const { Department, Employee, Manager, Role } = require('../models');

const allTable = async () => {
  try {
    const empdata = await Employee.findAll();
  } catch (err) {
    console.log(err);
  }
};
allTable();
