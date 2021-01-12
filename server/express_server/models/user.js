
const Sequelize = require('sequelize')
const db = require('./db')

var user = db.define('users', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    user_name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    active: Sequelize.BOOLEAN 
}, {
    timestamps: false,
    freezeTableName: true
})

module.exports = user