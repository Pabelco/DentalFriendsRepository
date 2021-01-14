const Sequelize = require('sequelize')
const db = require('./db');
const pacient = require('./pacient');
const user = require('./user');

var medical_resume = db.define('medical_resume', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    details: {type: Sequelize.JSON, allowNull: false},
    appointment_id: {
        type:Sequelize.INTEGER,
        references: 'medical_resume' ,
        referencesKey: 'appointment_id'},
}, {
    timestamps: false,
    freezeTableName: true
})
appointment.hasOne(user)
appointment.hasOne(pacient)
module.exports = appointment