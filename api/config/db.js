
const Sequelize = require("sequelize");
const logger = require("./logger");
const sequelize = new Sequelize('bin1cim-commerce', 'root', '', {
    hos: 'localhost',
    dialect: 'mysql',
    logging:false,
});
let counter = 0;
let connect = ()=>{sequelize.authenticate().then(() => {
    logger.info('Connected to MySQL');
 
}).catch((error) => {
    counter++;
    if(counter > 5){
        //stop node js
        logger.error('Can not connect to MySQL');
        process.exit(1);
        
    }
    console.error('Unable to connect to the database retrying...'+counter);
    setTimeout(() => {

        connect();
    }, 2000);

})}
connect();

module.exports = sequelize;