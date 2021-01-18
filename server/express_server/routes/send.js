const express = require('express');
const router = express.Router();
const SendController = require('../scripts/send');

router.post('/', SendController.send_mail);


module.exports = router;