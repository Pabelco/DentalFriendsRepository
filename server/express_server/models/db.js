const Sequelize = require('sequelize');

// db, user, password
var sequelize = new Sequelize('dental_friends', 'dental_friends', 'dental_friends', {
    host: 'localhost',
    dialect: 'postgres',
});

sequelize.authenticate()
    .then(() => {
        console.log("db connection succesful!");
    }).catch(err => {
        console.error.bind(console, 'db connection error:')
    });

module.exports = sequelize; 