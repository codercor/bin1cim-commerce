const router = require("express").Router();
const auth = require("../../middlewares/auth");
const {productController} = require('../../controllers');

const multer = require("../../utils/multer")

router.use(auth);



router.route("/").get(productController.getAll).post(multer.array("images[]",80),productController.add);
router.route("/:id").get(productController.getOne).put(productController.update).delete(productController.deleteOne);

module.exports = router;

