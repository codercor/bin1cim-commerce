const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db")

class User extends Model { }

User.init({
  name: { type: DataTypes.TEXT, allowNull: false },
  lastName: { type: DataTypes.TEXT, allowNull: false },
  companyName: { type: DataTypes.TEXT, allowNull: false },
  username: { type: DataTypes.TEXT, allowNull: false },
  password: { type: DataTypes.TEXT, allowNull: false },
  address: { type: DataTypes.TEXT, allowNull: false },
  phone: {
    type: DataTypes.TEXT, allowNull: false,
  },
  role: {
    type: DataTypes.TEXT,
    defaultValue: "2"
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'User' // We need to choose the model name
});
//User.sync({ force: true })

module.exports = User;