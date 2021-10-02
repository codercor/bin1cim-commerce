const router = require("express").Router();
const {userController} = require("../../controllers");


router.post('/login',userController.login);
router.post('/register',userController.register);
router.route("/:id").delete(userController.deleteUser);
router.route('/').get(userController.getUsers)
.post(userController.register).put(userController.update);

module.exports = router;
