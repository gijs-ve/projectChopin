// require('dotenv').config();

module.exports = {
    development: {
        url: process.env.REACT_APP_DB_CONNECTION_URI,
        dialect: 'postgres',
    },
    production: {
        url: process.env.REACT_APP_DB_CONNECTION_URI,
        dialect: 'postgres',
    },
};
