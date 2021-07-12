const Sequelize = require("sequelize");
const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');

let server;


const sequelize = new Sequelize('bin1cim-commerce', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});


sequelize.authenticate().then(() => {
    logger.info('Connected to MongoDB');
    server = app.listen(config.port, () => {
        logger.info(`Listening to port ${config.port}`);
    });
}).catch((error) => {
    console.error('Unable to connect to the database:', error);

})

const exitHandler = () => {
    if (server) {
        server.close(() => {
            logger.info('Server closed');
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error) => {
    logger.error(error);
    exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
    logger.info('SIGTERM received');
    if (server) {
        server.close();
    }
});