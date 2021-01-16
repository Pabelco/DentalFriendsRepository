const Sequelize = require('sequelize')
const db = require('./db');
const pacient = require('./pacient');
const user = require('./user');

var appointment = db.define('appointment', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    state: {type: Sequelize.BOOLEAN, allowNull: false},
    date: {type: Sequelize.DATE, allowNull: false},
    details: {type: Sequelize.JSON},
}, {
    timestamps: false,
    freezeTableName: true
})
appointment.associate = () => {
    appointment.hasOne(pacient,{
        foreignkey:'id_card_pacient'
    });
}
appointment.associate = () => {
    appointment.hasOne(user,{
        foreignkey:'user_name'
    });
}
module.exports = appointment