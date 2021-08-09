const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db")

class Product extends Model {}

Product.init({
    name:DataTypes.TEXT,
    prices:DataTypes.TEXT, //[{200:'20TL'},{500:'15TL'},{1000:'10TL'}]
    images:DataTypes.TEXT, //['a.jpg','b.png']
    stock:DataTypes.INTEGER, //558
    description: DataTypes.TEXT
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Product' // We need to choose the model name
});
//Product.sync({force:true})

module.exports = Product;