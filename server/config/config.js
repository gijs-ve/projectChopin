// require('dotenv').config();

module.exports = {
    development: {
        url: process.env.DB_CONNECTION_URI,
        dialect: 'postgres',
    },
    production: {
        url: process.env.DB_CONNECTION_URI,
        dialect: 'postgres',
    },
};
