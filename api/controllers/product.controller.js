const {productService} = require("../services");

async function add(req,res) {
    const product = req.body;
    let images = [];
    req.files.forEach((f)=>{
      images.push(f.filename);
    })
    product.images =  JSON.stringify(images);
    let response = await productService.add(product);
    res.json(response);
}
async function getOne(req,res) {
    let response = await productService.getOne(req.params.id);
    res.json(response);
}
async function getAll(req,res) {
        let response = await productService.getAll();
        res.json(response);
}
async function deleteOne(req,res) {
    const {id} = req.params;
    let response = await productService.deleteOne(id);
    res.json(response);
}
async function update(req,res) {
    const {product} = req.body;
    product.id = req.params.id;
    let response = await productService.update(product);
    res.json(response);
}

module.exports = {add,getOne,getAll,deleteOne,update};
