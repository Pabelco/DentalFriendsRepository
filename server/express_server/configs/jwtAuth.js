const jwt = require('jsonwebtoken') 
const keySecret = "FBC71CE36CC20790F2EEED2197898E71"

const authenticateJWT = (req, res, next) => {
    const token = req.headers.token;  
    if (token) { 
        jwt.verify(token, keySecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            } 
            req.user = user;
            next();
        }); 
    } else { 
        res.sendStatus(401);
	} 
};

module.exports = {authenticateJWT, jwt, keySecret}