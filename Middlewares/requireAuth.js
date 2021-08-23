const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

module.exports = (req, res, next) => {
    try {
        let token;
        if(req.headers.authorization){
            token = req.headers.authorization.split(" ")[1];
        }
        let decodedToken;
        if(token){
            decodedToken = jwt.verify(token, keys.jwtSecretKey);
            req.userId = decodedToken.id;
        }else{
            return res.status(401).send("You must be logged in");
        }
        next();
    } catch (e) {
        console.log(e);
        next();
    }
}