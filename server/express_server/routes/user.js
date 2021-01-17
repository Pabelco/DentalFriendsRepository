var express = require('express')
var router = express.Router()
const userModel = require('../models/user')
const userDetailsModel = require("../models/userDetails")
const pacientModel = require('../models/pacient')
const appointment = require('../models/appointment')
var validator = require('validator');

const jwtSecurity = require('../configs/jwtAuth.js')
//const { json } = require('sequelize/types')

/*
Get methods
*/

router.get('/medicalResume', function (req, res, next) {
  res.render(`medicalResume`, {})
})

router.get('/profile', function (req, res, next) {
  res.render(`profile`, {})
})


router.post('/', jwtSecurity.authenticateJWT, function (req, res, next) {
  res.send({ message: 'Tu estas autorizado' })
});



/* 
 POST METHODS 
*/
router.put('/formProfile', async (req, res, next) => { //cambio a put, prueba
  let requestBody = req.body;
  let dict = {
    "birthday": requestBody.birth,
    "age": requestBody.age,
    "phone": requestBody.phone,
    "recognitions": [requestBody.recog],
    "university": requestBody.school,
    "frase": requestBody.phrase
  };
  //update by id
  userDetailsModel.update(
    {identity_card: requestBody.idCard,
      address: requestBody.address,
      speciality: requestBody.degree,
      details: dict,
      picture_url: requestBody.picture_url},
    {returning: true, where:{id_details: 38} }
  ).then(dbresponse => {
    if(dbresponse){
      console.log(dbresponse);
      res.send({message:1});
    }else{
      console.log(dbresponse);
      res.send({message:0});
    }
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Database failure."
    });
  });
})

router.post('/medicalResume', async (req, res, next) => {
  try {
    let requestBody = req.body;
    var condition = {
      where:
      {
        id_card_pacient: requestBody.id_card_pacient
      }    
    }
    const pacientTemp = await pacientModel.findOne(condition);
    condition = {
      where:
      {
        id_pacient: pacientTemp.dataValues.id
      }    
    }
    const medicalResume = await appointment.findAll(condition);
    console.log(medicalResume)
    res.render(`medicalRecord`,{resume: medicalResume })
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

router.get('/all', async (req, res, next) => {
  try {
    const users = await userModel.findAll({attributes: { exclude: ['password'] }, 
      include: [userDetailsModel]}); 
    res.send(users)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

router.get('/allAppoinment', async (req, res, next) => {
  try {
    const users = await userModel.findAll({attributes: { exclude: ['password'] }}); 
    res.send(users)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    if(validator.isInt(req.params.id)){
      let user = await userModel.findOne({ where: { id: req.params.id }, attributes: { exclude: ['password'] } })
      res.json(user)
    } 
  } catch (error) {
      console.log(error)
      res.sendStatus(500)
  } 
})


 

module.exports = router;
