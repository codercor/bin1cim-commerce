const router = require("express").Router();
const auth = require("../../middlewares/auth");
const {productController} = require('../../controllers');

const multer = require("../../utils/multer")

router.use(auth);



router.route("/").get(productController.getAll).post(multer.array("images[]",80),(req,res,next)=>{
    console.log(req.body,44);
    next()
},productController.add);
router.route("/:id").get(productController.getOne).put(multer.array("newimages[]",80),productController.update).delete(productController.deleteOne);

module.exports = router;

