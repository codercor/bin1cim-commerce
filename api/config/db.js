
const Sequelize = require("sequelize");
const logger = require("./logger");
const sequelize = new Sequelize('bin1cim-commerce', 'root', '', {
    hos: 'localhost',
    dialect: 'mysql',
    logging:false,
});

sequelize.authenticate().then(() => {
    logger.info('Connected to MySQL');
 
}).catch((error) => {
    console.error('Unable to connect to the database:', error);

})

module.exports = sequelize;