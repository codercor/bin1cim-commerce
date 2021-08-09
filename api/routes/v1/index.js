const order = require("./order.router");
const product = require("./product.router");
const user = require("./user.router");
const router = require('express').Router();


router.use('/order',order);
router.use('/user',user);
router.use('/product',product);

module.exports = router;