const router = require("express").Router();
const {userController} = require("../../controllers");


router.post('/login',userController.login);
router.post('/register',userController.register);
//router.route("/:id").get(()=>{}).put(()=>{}).delete(()=>{});
router.route('/').get(userController.getUsers)

module.exports = router;
