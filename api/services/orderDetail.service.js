const {orderDetail:OrderDetail} = require("../models");

async function add(orderDetail) {
    try {
        let status = await OrderDetail.create(orderDetail);
        return status ? {...status,status:true}:{status:false};
    } catch (error) {
        return {status:false};
    }
}

async function getallOrderDetailsByOrderId(orderId) {
    try {
        let orderDetails = await OrderDetail.findAll({where:{orderId}});
        return orderDetails ? orderDetails:[];
    } catch (error) {
        return ['err'];
    }
}

async function deleteOne(id) {
    try {
        let status = await OrderDetail.destroy({where:{id}});
        return status ? {...status,status:true}:{status:false};
    } catch (error) {
        return {status:false};
    }
}

async function deleteOneByOrderId(orderId) {
    try {
        let status = await OrderDetail.destroy({where:{orderId}});
        return status ? {...status,status:true}:{status:false};
    } catch (error) {
        return {status:false};
    }
}

async function update(updatedData) {
    try {
        let status = await OrderDetail.update(updatedData,{where:{id:updatedData.id}});
        return status ? {...status,status:true}:{status:false};
    } catch (error) {
        return {status:false};
    }
}

module.exports = {add,getallOrderDetailsByOrderId,deleteOne,update,deleteOneByOrderId}
