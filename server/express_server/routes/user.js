var express = require('express');
var router = express.Router();

//var sequelize = require('../models/db')
const jwtSecurity = require('../configs/jwtAuth.js')

/*
Get methods
*/

router.get('/profile', function(req, res, next) {
  res.render(`profile`,{})
})


router.post('/', jwtSecurity.authenticateJWT, function(req, res, next) { 
  res.send({message: 'Tu estas autorizado'})
});



/* 
 POST METHODS 
*/
router.post('/formProfile', async (req, res, next) =>{
  let requestBody = req.body;
  let dict={"birthday":$(requestBody.birth), 
  "age": $(requestBody.age),
  "phone":$(requestBody.phone), 
  "recognitions":[$(requestBody.recog)],
  "university":$(requestBody.school),
  "frase":$(requestBody.phrase)
  };

  sequelize.query(`INSERT INTO public.user_details(identity_card,picture_url,address,speciality,details,id_user) VALUES ('${requestBody.idCard}', '${requestBody.picture}', '${requestBody.address}', '${requestBody.degree}', '${dict}', '${requestBody.id_}')`)
  .then(response => {
    if (response)
        res.send({ message: 1 })
      else
        res.send({ message: 0 })
  }).catch(err => {
    console.log(err.message);
    res.send({message:0});
  })
})



module.exports = router;
