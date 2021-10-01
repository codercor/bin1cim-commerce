const router = require("express").Router();
const auth = require("../../middlewares/auth");
const orderController = require("../../controllers/order.controller");
router.use(auth);

router.route("/").get(orderController.getAll).post(orderController.add).put(orderController.update)
router.route('/company/:companyId').get(orderController.getAllByCompanyId);
router.route("/:id").get(orderController.getOne).delete(orderController.deleteOne);


module.exports = router;
