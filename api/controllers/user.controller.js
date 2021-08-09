const userService = require("../services/user.service");


async function login(req,res) {
  let response = await userService.login(req.body); 
  res.json(response)
}

async function register(req,res) {
   let status = await userService.register(req.body);
   res.json(status);
}

async function getUsers(req,res) {
    let users = await userService.getUsers();
    res.json({users});
}

module.exports = {login,register,getUsers}