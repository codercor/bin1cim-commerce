const { user: User } = require("../models");
const jwt = require('jsonwebtoken');

async function login({ username, password }) {
        try {
            const user = await User.findOne({ where: { username, password } });
            if(user) return {token:createToken(user.dataValues),...user.dataValues,status:true}
            else return {status:false};
        } catch (error) {
            return {status:false}
        }
}


async function register(userData) {
    try {
        const user = await User.create({ ...userData });
        if (user) return  {token:createToken(user.dataValues),...user.dataValues,status:true};
    } catch (error) {
        return false;
    }
}

async function getUsers() {
    let users =await User.findAll();
    return users;
}

function createToken(payload) {
    const token = jwt.sign(payload,require('../config/config').jwt.secret,{expiresIn:require('../config/config').jwt.accessExpirationMinutes+'m'})
    return token;
}




module.exports = { login, register,getUsers }