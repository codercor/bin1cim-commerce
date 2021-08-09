const router = require("express").Router();
const auth = require("../../middlewares/auth");
const orderController = require("../../controllers/order.controller");
router.use(auth);

router.route("/").get(orderController.getAll).post(orderController.add);
router.route("/:id").get(orderController.getOne).put(orderController.update).delete(orderController.deleteOne);

module.exports = router;
