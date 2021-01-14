const Sequelize = require('sequelize')
const db = require('./db');
const pacient = require('./pacient');
const user = require('./user');

var appointment = db.define('appointment', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    state: {type: Sequelize.BOOLEAN, allowNull: false},
    date: {type: Sequelize.DATE, allowNull: false},
    id_user: {type:Sequelize.INTEGER,
        references: 'appointment' ,
        referencesKey: 'id_user'},
    id_pacient: {type: Sequelize.INTEGER,
        references: 'appointment' ,
        referencesKey: 'id_pacient'},
}, {
    timestamps: false,
    freezeTableName: true
})
appointment.hasOne(user)
appointment.hasOne(pacient)
module.exports = appointment