
const Sequelize = require('sequelize')
const db = require('./db');
const userDetails = require('./userDetails');

var user = db.define('users', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    user_name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    active: Sequelize.BOOLEAN,
    id_details: {
        type: Sequelize.INTEGER,
        references: 'user_details' ,
        referencesKey: 'id_details'   
    } 
}, {
    timestamps: false,
    freezeTableName: true
})
user.associate = () => {
    user.hasOne(userDetails,{
        foreignkey: 'id_details'
    });
}
//user.hasOne(userDetails);

module.exports = user