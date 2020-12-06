
const Sequelize = require('sequelize')
const db = require('./db')

var user = db.define('user', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    user_name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    active: Sequelize.BOOLEAN
}, {
    timestamps: false
})

module.exports = user