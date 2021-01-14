//Actualizar sql, ese sql es no mas de prueba
//const {Sequelize} = require('sequelize')
//const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname'');
var express = require('express')
var sequelize = require('../../models/db')
$("#searchMedicalResume").submit(function(e){
  sequelize.query(`SELECT * FROM patient`)
  .then(response => {
    if (response)
      alert("xD")
    else
    alert("!xD")
  }).catch(err => {
    console.log(err.message);
  })
});

//La idea esta bien, pero no se puede usar sequelize