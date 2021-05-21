/**
 * /models.Employee.js
 *
 * @description: extending model for Employee table
 *
 */

const Employee = require('./Employee');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Manager extends Employee {}

Manager.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'manager',
  }
);

module.exports = Manager;
