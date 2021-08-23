const {order:Order} = require("../models");
const orderDetailService = require("./orderDetail.service");

async function add(order) {
    try {
        let newOrder = await Order.create(order);
        order.orderDetails.forEach(async function (orderDetail){
            orderDetail.orderId = newOrder.dataValues.id;
        await orderDetailService.add(orderDetail);
        })
        return newOrder ? {...newOrder,status:true}:{status:false};
    } catch (error) {
        return {status:false};
    }
}

async function getAll() {
    try {
        let status = await Order.findAll();
        return status ? {orders:[...status],status:true}:{status:false};
    } catch (error) {
        return {status:false};
    }
}

async function deleteOne(id) {
    console.log("SELO");
    try {
        let deletedDetails = await orderDetailService.deleteOneByOrderId(id);
        console.log("silindi 1");
        let deletedOrder = await Order.destroy({where:{id}});
        console.log("silindi 2");
        return deletedOrder ? {deletedOrder,deletedDetails,status:true}:{status:false};
    } catch (error) {
        return {status:false};
    }
}

async function getCompanyOrders(companyId) {
    try {
        let status = await Order.findOne({where:{companyId}});
        return status ? {...status,status:true}:{status:false};
    } catch (error) {
        return {status:false};
    }
}



async function update(updatedData) {
    try {
        let status = await Order.update(updatedData,{where:{id:updatedData.id}});
        return status ? {...status,status:true}:{status:false};
    } catch (error) {
        return {status:false};
    }
}

module.exports = {add,getAll,getCompanyOrders,update,deleteOne}
