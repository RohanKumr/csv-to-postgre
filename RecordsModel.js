const Sequelize = require("sequelize");
const db = require("./dbconfig");

const Records = db.define("records", {
  Region: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Country: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Item_Type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Sales_Channel: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Order_Priority: {
    type: Sequelize.CHAR,
    allowNull: false,
  },
  Order_Date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  Ship_Date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  Order_ID: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Units_Sold: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Unit_Price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  Unit_Cost: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  Total_Revenue: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  Total_Cost: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  Total_Profit: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
});
db.sync();

module.exports = Records;
