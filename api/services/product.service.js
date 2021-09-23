const { product: Product, product } = require("../models");
const { Op } = require("sequelize");

async function add(product) {
    console.log(product);
    try {
        let status = await Product.create(product);
        return status ? { ...status, status: true } : { status: false };
    } catch (error) {
        return { status: false };
    }

}

async function getAll({page, keyword,perPage}) {
    try {
        let products = await Product.findAll({
            limit: perPage,
            offset: (page - 1) * perPage,
            where: {
                name: { 
                    [Op.like]: `%${keyword}%` 
                }
            }
        });
        let length;
        if (keyword.length>0) length =  await Product.count({ where: { name: { [Op.like]: `%${keyword}%` } } });
        else length = await Product.count();
        return products ? { products, status: true, length } : { status: false };
    } catch (error) {
        return { status: false };
    }

}


async function getOne(id) {
    try {
        let product = await Product.findOne({ where: { id } });
        return product ? { product, status: true } : { status: false };
    } catch (error) {
        return { status: false };
    }

}

async function deleteOne(id) {
    try {
        let status = await Product.destroy({ where: { id } });
        return status ? { ...status, status: true } : { status: false };
    } catch (error) {
        return { status: false };
    }
}

async function update(updatedData) {
    try {
        let response = await Product.update(updatedData, { where: { id: updatedData.id } });
        return response ? { ...response, status: true } : { status: false };
    } catch (error) {
        console.log(error);
        return { status: false };
    }
}

module.exports = { add, getAll, getOne, deleteOne, update }
