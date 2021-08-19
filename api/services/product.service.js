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

async function getAll({page, keyword}) {
    try {
        let products = await Product.findAll({
            limit: 6,
            offset: (page - 1) * 6,
            where: {
                name: { 
                    [Op.like]: `%${keyword}%` 
                }
            }
        });
        let length = await Product.count();
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
        let status = await Product.update(updatedData, { where: { id: updatedData.id } });
        return status ? { ...status, status: true } : { status: false };
    } catch (error) {
        return { status: false };
    }
}

module.exports = { add, getAll, getOne, deleteOne, update }
