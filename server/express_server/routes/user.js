var express = require('express');
var router = express.Router();
 
const jwtSecurity = require('../configs/jwtAuth.js')

router.post('/', jwtSecurity.authenticateJWT, function(req, res, next) { 
  res.send({message: 'Tu estas autorizado'})
});
 

module.exports = router;
