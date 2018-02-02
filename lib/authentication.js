const config = require("./config.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secureRandom = require('secure-random');
const secret = secureRandom(256, {type: 'Buffer'});

module.exports = {auth:auth,genToken:genToken,verifyToken:verifyToken,verify,pass};

function auth(key) {
    return bcrypt.compareSync(key, config.server.key);
}

function genToken() {
    let PAYLOAD = {
        "place":"holder"
    };
    return jwt.sign(PAYLOAD, secret, {expiresIn: '12h'});
}

function verifyToken(token) {
    try {
        let decoded = jwt.verify(token, secret);
    } catch(err) {
        return false;
    }
    return true;
}

function verify(req, res, next) {
    if(verifyToken(req.cookies.token)){
        next();
    }
    else {
        res.redirect("/"+config.URLPrecursors.login);
        res.end();
    }
}

function pass(req, res, next) {
    next();
}