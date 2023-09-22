const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  username: "proyectoreact",
  password: "rolling",
  database: "proyectoreact",
  port: 5432,
});

module.exports = { sequelize };
