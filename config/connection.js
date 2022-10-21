require("dotenv").config();
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "employees_db",
  process.env.USER,
  process.env.PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

module.exports = sequelize;
