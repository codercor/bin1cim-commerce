const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const config = require('../config/config')

function auth(req, res, next) {
    console.log("adas");
    const {token} = req.headers;
    try {
        let decoded = jwt.verify(token,config.jwt.secret)
        req.user = decoded;
        next();
        
    } catch (error) {
        res.status(httpStatus.UNAUTHORIZED).send(error.message)
    }
};

module.exports = auth;