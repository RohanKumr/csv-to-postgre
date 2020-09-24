const Sequelize = require("sequelize");
module.exports = new Sequelize(
  "postgres://postgres:admin@localhost:5432/xencov"
);
