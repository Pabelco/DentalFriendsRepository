var express = require('express')
var router = express.Router()
const userModel = require('../models/user')
const userDetailsModel = require("../models/userDetails")
const pacientModel = require('../models/pacient')
const appointment = require('../models/appointment')
var validator = require('validator');

const jwtSecurity = require('../configs/jwtAuth.js')
const user = require('../models/user')
const pacient = require('../models/pacient') 

router.get('/medicalResume', function (req, res, next) {
  res.render(`medicalResume`, {resume: {}})
})

router.get('/profile', function (req, res, next) {
  res.render(`profile`, {})
})

router.get('/medicalRecord', function (req, res, next) {
  res.render(`medicalRecord`, {})
});

router.post('/', jwtSecurity.authenticateJWT, function (req, res, next) {
  res.send({ message: 'Tu estas autorizado' })
});



/* 
 POST METHODS 
*/
router.put('/formProfile', jwtSecurity.authenticateJWT , async (req, res, next) => { //cambio a put, prueba
  let requestBody = req.body;
  let dict = {
    "birthday": requestBody.birth,
    "age": requestBody.age,
    "phone": requestBody.phone,
    "recognitions": [requestBody.recog],
    "university": requestBody.school,
    "frase": requestBody.phrase
  };
  //search the user in the db req.user.username usar .id_details
  const doctor=  await userModel.findOne({
    where: {user_name: req.user.username},
    raw: true
  }).then(dbresponse => {
    if(dbresponse){
      res.send({message:1});  
    }else{
      res.send({message:0});
    }
  });
  
  //update by id
  userDetailsModel.update(
    {identity_card: requestBody.idCard,
      address: requestBody.address,
      speciality: requestBody.degree,
      details: dict,
      picture_url: requestBody.picture_url},
    {returning: true, where:{id_details: doctor.id_details} }
  ).then(dbresponse => {
    if(dbresponse){
      //console.log(dbresponse);
      res.send({message:1});  
    }else{
      //console.log(dbresponse);
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
    const medicalResume = await appointment.findAll({
      where: { '$pacient.id_card_pacient$': requestBody.id_card_pacient },
      include: [{ model: pacient},{model: user}],
      raw: true,

    });
    //console.log(medicalResume)
    //res.json(responseParsed)
    /*res.render(`medicalRecord`, { resume: responseParsed }, function (err, html) {
      res.send(responseParsed)
    })*/
    res.send(medicalResume)
    //res.render(`medicalRecord`,{resume: responseParsed})
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

router.put('/formRecord', jwtSecurity.authenticateJWT , async (req, res, next) => { 
  console.log();('entre aqui')
  let requestBody = req.body;
  console.log(requestBody.id_card_pacient); 
  pacientModel.update(
    {id_card_pacient: requestBody.id_card_pacient,
     name_pacient: requestBody.name_pacient,
     lastname_pacient: requestBody.lastname_pacient,
     age_pacient: requestBody.age_pacient,
     gender_pacient: requestBody.gender_pacient,
     address_pacient: requestBody.address_pacient,
     phone_pacient: requestBody.phone_pacient},
    {returning: true, where:{id_card_pacient: requestBody.id_card_pacient} }
  ).then(dbresponse => {
    if(dbresponse){
      res.send({message:1});  
    }else{
      res.send({message:0});
    }
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Database failure."
    });
  });
})



 

module.exports = router;
