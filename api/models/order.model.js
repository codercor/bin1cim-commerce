const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db")

class Order extends Model {}

Order.init({
    total:DataTypes.DOUBLE,
    userId: DataTypes.INTEGER,
    paymentMethod:DataTypes.TEXT,
    isDone:DataTypes.BOOLEAN,
    isAccepted:DataTypes.BOOLEAN,
    isPaid:DataTypes.BOOLEAN,
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Order' // We need to choose the model name
});
//Order.sync({force:true})
module.exports = Order;