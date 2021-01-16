var express = require('express')
var router = express.Router()
// const userModel = require('../models/user')
var sequelize = require('../models/db')
const jwtSecurity = require('../configs/jwtAuth.js');
const userModel = require('../models/user');
const userDetailsModel = require('../models/userDetails');

/* 
 GET METHODS 
*/
router.get('/', function (req, res, next) {
  res.render('login', { action: 'login' })
});

router.get('/register', function (req, res, next) {
  res.render('login', { action: 'register' })
});

router.get('/home', function (req, res, next) {   
    res.render(`home`, {})
});

router.get('/aboutus', function (req, res, next) {   
  res.render(`aboutus`, {})
});

router.get('/appointment', function (req, res, next) {   
  res.render(`appointment`, {})
});

router.get('/dentalcare', function (req, res, next) {   
  res.render(`dentalcare`, {})
});

router.get('/portafolio', function (req, res, next) {   
  res.render(`portafolio`, {})
});

router.get('/medicalRecord', function (req, res, next) {   
  res.render(`medicalRecord`, {})
});

router.get('/professional', function (req, res, next) { 
  //const users = await userModel.findAll({attributes: { exclude: ['password'] }});

  sequelize.query(`Select * from public.user_details inner join public.users ON user_details.id_details = users.id_details`)
  .then(data => {
    if (data){
      res.render(`professional`, {title:"profesionales",docs:data[0]});
    }else
      res.send('nada')
  }).catch(err => {
    console.log(err.message);
    res.send({message:0});
  })   
  
});



router.get('/professional2', function (req, res, next) { 
  /*const  detail =   userModel.findAll({ 
    include: {
      model:userDetailsModel,
      required: true
    }  
  });
  
  console.log(JSON.stringify(detail['user_detail.identity_card']));  
*/
  userModel.findAll({
    include: {
      model:userDetailsModel,
      required: true
    } 
  }).then(data => {
      res.send(data);
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving maestros."
    });
  });
});




router.get('/treatment', function (req, res, next) {
  res.render(`treatment`, {})
});



/* 
 POST METHODS 
*/

router.post('/login', async (req, res, next) => {
  let requestBody = req.body
  sequelize.query(`select login_user ('${requestBody.username}', '${requestBody.password}')`)
    .then(response => {
      if (response[1].rowCount > 0) {        
        const newUser = {
          username: requestBody.username,
          token: jwtSecurity.jwt.sign({ username: requestBody.username, role: requestBody.password },
            jwtSecurity.keySecret)
        };
        req.session.user = newUser 
        res.send(newUser) 
      } else {
        res.send({})
      }
    }).catch(err => {
      console.log(err.message)
      res.send({})
    });
})

router.post('/register', async (req, res, next) => {
  let requestBody = req.body
  sequelize.query(`select create_user ('${requestBody.username}', 
      '${requestBody.password}', '${requestBody.email}')`)
    .then(response => {
      if (response)
        res.send({ message: 1 })
      else
        res.send({ message: 0 })
    }).catch(err => {
      console.log(err.message)
      res.send({ message: 0 })
    })
})



module.exports = router;