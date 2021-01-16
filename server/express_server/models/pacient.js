const Sequelize = require('sequelize')
const db = require('./db');
const appointment = require('./appointment')

var pacient = db.define('pacient', {
    id_card_pacient: {type: Sequelize.STRING, primaryKey: true},
    name_pacient: {type: Sequelize.STRING, allowNull: false},
    lastname_pacient: {type: Sequelize.STRING, allowNull: false},
    age_pacient: {type: Sequelize.INTEGER, allowNull: false},
    gender_pacient: {type: Sequelize.STRING, allowNull: false},
    address_pacient: {type: Sequelize.STRING, allowNull: false},
    phone_pacient: {type: Sequelize.STRING, allowNull: false},
    email_pacient: {type: Sequelize.STRING, allowNull: false},
    details_pacient: {type: Sequelize.JSON}
    },
    {
    timestamps: false,
    freezeTableName: true
})
pacient.associate = () => {
    pacient.hasMany(appointment,{});
}
module.exports = pacient