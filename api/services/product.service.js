const {product:Product} = require("../models");

async function add(product) {
    console.log(product);
    try {
        let status = await Product.create(product);
        return status ? {...status,status:true}:{status:false};
    } catch (error) {
        return {status:false};
    }
   
}

async function getAll() {
    try {
        let products = await Product.findAll({});
        return products ? {products,status:true}:{status:false};
    } catch (error) {
        return {status:false};
    }
    
}

async function deleteOne(id) {
    try {
        let status = await Product.destroy({where:{id}});
        return status ? {...status,status:true}:{status:false};
    } catch (error) {
        return {status:false};
    }
}

async function update(updatedData) {
    try {
        let status = await Product.update(updatedData,{where:{id:updatedData.id}});
        return status ? {...status,status:true}:{status:false};
    } catch (error) {
        return {status:false};
    }
}

module.exports = {add,getAll,deleteOne,update}
