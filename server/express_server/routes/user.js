var express = require('express')
var router = express.Router()
const userModel = require('../models/user')
const userDetailsModel = require("../models/userDetails")
const pacientModel = require('../models/pacient')
const appointment = require('../models/appointment')
var validator = require('validator');

const jwtSecurity = require('../configs/jwtAuth.js')

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
router.post('/formProfile', async (req, res, next) => {
  let requestBody = req.body;
  let dict = {
    "birthday": requestBody.birth,
    "age": requestBody.age,
    "phone": requestBody.phone,
    "recognitions": [requestBody.recog],
    "university": requestBody.school,
    "frase": requestBody.phrase
  };
  //create instance
  const detail = userDetailsModel.build({
    identity_card: requestBody.idCard,
    address: requestBody.address,
    speciality: requestBody.degree,
    details: dict,
    picture_url: requestBody.picture_url
  })
  //Insert into db
  await detail.save()
  .then(dbresponse => {
    if(dbresponse){
      res.send({message:1})
    }else{
      res.send({message:0})
    }
  })
  
  //res.send({message:1})
})

router.post('/medicalResume', async (req, res, next) => {
  try {
    let requestBody = req.body;
    const pacients = await pacientModel.findAll({
      where: {
        id_card_pacient: requestBody.id_card_pacient,
      },
      include: [{
        model: appointment,
      }]
      
    });
    console.log(pacients)
    res.send(pacients)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

router.get('/all', async (req, res, next) => {
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
