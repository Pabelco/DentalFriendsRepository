const Sequelize = require('sequelize')
const sequelize = require('./db')
const db = require('./db')

var userDetails = db.define('user_details', {
    id_details: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    identityCard: Sequelize.STRING,
    
    address: Sequelize.STRING,
    especiality: Sequelize.BOOLEAN,
    details: Sequelize.JSON,
    pictureUrl: Sequelize.STRING,
    
}, {
    timestamps: false,
    freezeTableName: true
})



module.exports = userDetails