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

async function getAll(page) {
    try {
        let products = await Product.findAll({
          limit: page * 9,
          offset: (page - 1) * 9
        });
        return products ? {products,status:true}:{status:false};
    } catch (error) {
        return {status:false};
    }
    
}


async function getOne(id) {
    try {
        let product = await Product.findOne({where:{id}});
        return product ? {product,status:true}:{status:false};
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

module.exports = {add,getAll,getOne,deleteOne,update}
