var express = require('express')
var router = express.Router()
const userModel = require('../models/user')
const userDetailsModel = require("../models/userDetails")
const pacientModel = require('../models/pacient')
const appointment = require('../models/appointment')
var validator = require('validator');
const { Op } = require("sequelize");
const utils = require('../scripts/utils.js');

router.get('/byUser/:idUser', async (req, res, next) => {
  try {
    if (validator.isInt(req.params.idUser)) {
      let appointments = await appointment.findAll(
        {
          where: {
            id_user: req.params.idUser,
            date: {
              [Op.lt]: utils.modificateActualTime('day', +15),
              [Op.gt]: utils.modificateActualTime('day', -1)
            }
          }, include: [{
            model: pacientModel
          }]
        })
      res.json(appointments)
    }
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

router.post('/setAppointment', async (req, res, next) => {
  let requestBody = req.body
  console.log(requestBody);
  try {
    let pacient = await pacientModel.findOne({ where: { id_card_pacient: requestBody.id_card_pacient } });
    if (pacient == null) {
      pacient = await pacientModel.create(req.body);
      await pacient.save()
    }
    let appointmentTmp = await appointment.findOne({ where: { id: requestBody.idAppointment, state: false } })
    if (appointmentTmp != null) {
      appointmentTmp.id_pacient = pacient.id
      appointmentTmp.state = true
      await appointmentTmp.save()
      res.send({ message: 1, infoAppointment: appointmentTmp });
    } else {
      res.send({ message: 2 });
    }
  } catch (err) {
    console.log(err);
    res.send({ message: 0 });
  }
})

router.post('/insert', async (req, res, next) => {
  let requestBody = req.body
  try {
    requestBody.state = 0
    console.log(req.body);
    let appointmentTmp = await appointment.findOne({ where: { id_user: requestBody.id_user, 
        date: requestBody.date } })
    if (appointmentTmp == null) {
      appointmentTmp = await appointment.create(req.body);
      await appointmentTmp.save()
      res.send({ message: 1, infoAppointment: appointmentTmp });
    } else {
      res.send({ message: 2, infoAppointment: 'Ya existe' });
    } 
  } catch (err) {
    console.log(err);
    res.send({ message: 0 });
  }
})

router.delete('/delete', async (req, res, next) => {
  let requestBody = req.body
  console.log(requestBody);
  try { 
    await appointment.destroy({
      where: {
        id: requestBody.id
      }
    }) 
    res.send({ message: 1, messageHuman: 'Borrado exitoso' });
  } catch (err) {
    console.log(err);
    res.send({ message: 0 });
  }
})
module.exports = router;