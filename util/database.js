const Sequelize = require('sequelize');


const sequelize = new Sequelize('node-sequelize', 'root', 'MySQL@123', {
    dialect: 'mysql', 
    host:'localhost'
});

module.exports = sequelize;
