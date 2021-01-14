const Sequelize = require('sequelize')
const db = require('./db');

var pacient = db.define('pacient', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name_pacient: {type: Sequelize.STRING, allowNull: false},
    lastname_pacient: {type: Sequelize.STRING, allowNull: false},
    age_pacient: {type: Sequelize.INTEGER, allowNull: false},
    gender_pacient: {type: Sequelize.STRING, allowNull: false},
    address_pacient: {type: Sequelize.STRING, allowNull: false},
    phone_pacient: {type: Sequelize.STRING, allowNull: false},
    id_card_pacient: {type: Sequelize.STRING, allowNull: false},
    email_pacient: {type: Sequelize.STRING, allowNull: false}
    },
    {
    timestamps: false,
    freezeTableName: true
})
module.exports = pacient