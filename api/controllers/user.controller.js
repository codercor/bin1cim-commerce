const userService = require("../services/user.service");


async function login(req,res) {
  let response = await userService.login(req.body); 
  res.json(response)
}

async function register(req,res) {
   let status = await userService.register(req.body);
   res.json(status);
}

async function update(req, res) {
  const {user} = req.body;
  let response = await userService.update(user);
  res.json(response);
}

async function deleteUser(req,res) {
  let response = await userService.deleteUser(req.params.id);
  res.json(response);
}

async function getUsers(req,res) {
    const perPage = parseInt(req.query.perPage) || 10;
    const page = parseInt(req.query.page) || 1;
    const companyName = req.query.companyName ||"";
    let response = await userService.getUsers({perPage,page,companyName});
    res.json(response);
}

module.exports = {login,register,getUsers,update,deleteUser};