const { order: Order } = require("../models");
const orderDetailService = require("./orderDetail.service");
const { getUserById } = require("./user.service")

async function add(order) {
    try {
        let newOrder = await Order.create(order);
        order.orderDetails.forEach(async function (orderDetail) {
            orderDetail.orderId = newOrder.dataValues.id;
            await orderDetailService.add(orderDetail);
        })
        return newOrder ? { ...newOrder, status: true } : { status: false };
    } catch (error) {
        return { status: false };
    }
}

async function getAll({ page, userId, perPage }) {
    try {
        let orders;
        let length;
        if (userId == -1) {
            orders = await Order.findAll({
                limit: perPage,
                offset: (page - 1) * perPage
            });
            length = await Order.count();
        }
        else {
            orders = await Order.findAll({
                limit: perPage,
                offset: (page - 1) * perPage,
                where: { userId }
            });
            length = await Order.count({ where: { userId } });
        }
        for (let i = 0; i < orders.length; i++) {
            orders[i].dataValues.orderDetails = await orderDetailService.getallOrderDetailsByOrderId(orders[i].id);
            orders[i].dataValues.user = await getUserById(orders[i].userId);
            orders[i].dataValues.user.password = undefined;
        }

        return orders ? { orders, status: true, length } : { status: false };
    } catch (error) {
        return { status: false };
    }
}

async function deleteOne(id) {
    console.log("SELO");
    try {
        let deletedDetails = await orderDetailService.deleteOneByOrderId(id);
        console.log("silindi 1");
        let deletedOrder = await Order.destroy({ where: { id } });
        console.log("silindi 2");
        return deletedOrder ? { deletedOrder, deletedDetails, status: true } : { status: false };
    } catch (error) {
        return { status: false };
    }
}

async function getCompanyOrders(companyId) {
    try {
        let orders = await Order.findAll({ where: { companyId } });
        for (let i = 0; i < orders.length; i++) {
            orders[i].dataValues.orderDetails = await orderDetailService.getallOrderDetailsByOrderId(orders[i].id);
        }
        return orders ? { orders, status: true } : { status: false };
    } catch (error) {
        return { status: false };
    }
}
async function update(updatedData) {
    try {
        let status = await Order.update(updatedData, { where: { id: updatedData.id } });
        return status ? { ...status, status: true } : { status: false };
    } catch (error) {
        return { status: false };
    }
}




module.exports = { add, getAll, getCompanyOrders, update, deleteOne }
