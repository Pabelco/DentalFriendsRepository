const Sequelize = require('sequelize')
const sequelize = require('./db')
const db = require('./db')

var userDetails = db.define('user', {
    id_details: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    identity_card: Sequelize.STRING,
    picture_url: Sequelize.STRING,
    address: Sequelize.STRING,
    especiality: Sequelize.BOOLEAN,
    details: Sequelize.JSON,
    id_user: {
        type: Sequelize.INTEGER,
        references: 'user_' ,
        referencesKey: 'id'   
    }
}, {
    timestamps: false
})

userDetails.hasMany(user);
module.exports = user