const { user: User } = require("../models");
const jwt = require('jsonwebtoken');
const { Op } = require("sequelize");

async function login({ username, password }) {
    try {
        const user = await User.findOne({ where: { username, password } });
        if (user) return { token: createToken(user.dataValues), ...user.dataValues, status: true }
        else return { status: false };
    } catch (error) {
        return { status: false }
    }
}


async function register(userData) {
    try {
        const user = await User.create({ ...userData });
        if (user) return { token: createToken(user.dataValues), ...user.dataValues, status: true };
    } catch (error) {
        return {status:false};
    }
}

async function getUsers({ perPage, page, companyName }) {
    let users = await User.findAll({
        limit: perPage,
        offset: (page - 1) * perPage,
        where: {
            companyName: {
                [Op.like]: `%${companyName}%`
            }
        }
    });
    let length;
    if (companyName === '') length = await User.count();
    else {
        length = await User.count({
            where: {
                companyName: {
                    [Op.like]: `%${companyName}%`
                }
            }
        });
    }
    return { users, length, status: true, };
}

async function getUserById() {
    let user = await User.findOne({ where: { id: 1 } });
    return user;
}

function createToken(payload) {
    const token = jwt.sign(payload, require('../config/config').jwt.secret, { expiresIn: require('../config/config').jwt.accessExpirationMinutes + 'm' })
    return token;
}

function update(userData) {
    return User.update(userData, { where: { id:userData.id } });
}

function deleteUser(id) {
    return User.destroy({ where: { id } });
}


module.exports = { login, register, getUsers, getUserById,update,deleteUser };