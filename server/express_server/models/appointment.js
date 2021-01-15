const Sequelize = require('sequelize')
const db = require('./db');
const pacient = require('./pacient');
const user = require('./user');

var appointment = db.define('appointment', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    state: {type: Sequelize.BOOLEAN, allowNull: false},
    date: {type: Sequelize.DATE, allowNull: false},
    id_pacient: {type: Sequelize.INTEGER,
        references: 'pacient' ,
        referencesKey: 'id'},
    id_user: {type:Sequelize.INTEGER,
        references: 'user' ,
        referencesKey: 'id'}
    
}, {
    timestamps: false,
    freezeTableName: true
})
appointment.belongsTo(pacient,{foreignKey: "id_pacient"})
appointment.belongsTo(user,{foreignKey: "id_user"})
//appointment.hasOne(user)
//appointment.hasOne(pacient)
module.exports = appointment