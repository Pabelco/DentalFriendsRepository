
const Sequelize = require('sequelize')
const db = require('./db');
const userDetails = require('./userDetails');

var user = db.define('users', {
    user_name: {type: Sequelize.STRING, primaryKey: true},
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
user.belongsTo(userDetails,{foreignKey: 'id_details',targetKey:'id_details'});
/*
user.associate = () => {
    user.belongsTo(userDetails,{
        foreignkey: 'id_details'
    });
}*/
//user.hasOne(userDetails);

module.exports = user