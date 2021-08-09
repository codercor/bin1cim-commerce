const {  Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db")

class OrderDetail extends Model {}

OrderDetail.init({
    productId:DataTypes.INTEGER,
    amount:DataTypes.INTEGER,
    price:DataTypes.DOUBLE,
    orderId:DataTypes.INTEGER
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'OrderDetail' // We need to choose the model name
});
//OrderDetail.sync({force:true})

module.exports = OrderDetail;