const { productService } = require("../services");

async function add(req, res) {
    const product = req.body;
    let images = [];
    req.files.forEach((f) => {
        images.push(f.filename);
    })
    product.images = JSON.stringify(images);
    console.log(product);
    let response = await productService.add(product);
    res.json(response);
}
async function getOne(req, res) {
    let response = await productService.getOne(req.params.id);
    res.json(response);
}
async function getAll(req, res) {
    let page = req.query.page || 1;
    let keyword = req.query.keyword || '';
    let perPage = Number(req.query.perPage) || 10;
    console.log(req.query);
    let response = await productService.getAll({ page, keyword,perPage });
    res.json(response);
}
async function deleteOne(req, res) {
    const { id } = req.params;
    let response = await productService.deleteOne(id);
    res.json(response);
}
async function update(req, res) {
    const product = req.body;
    product.id = req.params.id;
    product.images = JSON.parse(product.images);
    req.files.forEach((f) => {
        product.images.push(f.filename);
    })
    product.images = JSON.stringify(product.images);
    //delete files with product.deletedImages
    console.log(product);
    let response = await productService.update(product);
    res.json(response);
}

module.exports = { add, getOne, getAll, deleteOne, update };
