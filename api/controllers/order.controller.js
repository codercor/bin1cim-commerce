const { orderService } = require("../services");

async function add(req, res) {
    const { order } = req.body;
    order.userId = req.user.id;
    let response = await orderService.add(order);
    res.json(response);
}
async function getOne(req, res) {
    let response = await orderService.getOne();
    res.json(response);
}
async function getAll(req, res) {
    const page = req.query.page || 1;
    const userId = req.query.userId || -1;
    const perPage = Number(req.query.perPage) || 10;
    const response = await orderService.getAll({page,userId,perPage});
    res.json(response);
}
async function deleteOne(req, res) {
    const { id } = req.params;
    let response = await orderService.deleteOne(id);
    res.json(response);
}
async function getAllByCompanyId(req, res) {
    const { companyId } = req.params;
    let response = await orderService.getCompanyOrders(id);
    res.json(response);
}
async function update(req, res) {
    const { order } = req.body;
    let response = await orderService.update(order);
    res.json(response);
}

module.exports = { add, getOne, getAllByCompanyId, getAll, deleteOne, update }