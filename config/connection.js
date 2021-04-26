const Sequelize = require('sequelize');
require('dotenv').config();

// console.log(process.env);
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,

  {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
  }
);

sequelize.sync({ force: false });

module.exports = Sequelize;
