const Sequelize = require('sequelize')
const sequelize = require('./db')
const db = require('./db')

var userDetails = db.define('user_details', {
    id_details: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    identityCard: Sequelize.STRING,
    pictureUrl: Sequelize.STRING,
    address: Sequelize.STRING,
    especiality: Sequelize.BOOLEAN,
    details: Sequelize.JSON,
    idUser: {
        type: Sequelize.INTEGER,
        references: 'user_' ,
        referencesKey: 'id'   
    }
}, {
    timestamps: false,
    freezeTableName: true
})

userDetails.hasMany(user);

module.exports = user