
const Sequelize = require('sequelize')
const db = require('./db');
const userDetails = require('./userDetails');

var user = db.define('users', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    user_name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    active: Sequelize.BOOLEAN,
    id_details: {
        type: Sequelize.INTEGER,
        references: 'users' ,
        referencesKey: 'id_details'   
    } 
}, {
    timestamps: false,
    freezeTableName: true
})
user.hasOne(userDetails);
module.exports = user