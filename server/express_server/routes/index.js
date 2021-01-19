var express = require('express')
var router = express.Router()
// const userModel = require('../models/user')
var sequelize = require('../models/db')
const jwtSecurity = require('../configs/jwtAuth.js');
const userModel = require('../models/user');
const userDetailsModel = require('../models/userDetails');
const pacientModel = require('../models/pacient')

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

router.get('/professional', function (req, res, next) { //revisar mvc y mover .fidnall a un controller
  userModel.findAll({
    include: {
      model: userDetailsModel,
      required: true
    },
    raw: true //para devolver solo DataValues, no instancias
  }).then(data => {
    console.log(data);
    res.render(`professional`, { title: "profesionales", docs: data })
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Database failure."
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
  try {
    let user = await userModel.findOne({ where: { user_name: requestBody.username }, attributes: { exclude: ['password'] } }); 
    if (user == null) {
      sequelize.query(`select create_user ('${requestBody.username}', 
        '${requestBody.password}', '${requestBody.email}')`)
        .then(async response => {  
            let userDetails = await userDetailsModel.create({});            
            await userDetails.save() 
            let user = await userModel.findOne({ where: { user_name: requestBody.username }, attributes: { exclude: ['password'] } }); 
            user.id_details = userDetails.id_details
            await user.save() 
            res.send({ message: 1 }); 
        });
    } else {
      res.send({ message: 2 });
    }
  } catch (err) {
    res.send({ message: 0});
  }
})



module.exports = router;

 

