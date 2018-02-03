const express = require('express');
const router = express.Router();
//const auth = require("./../../lib/authentication.js");
const path = require("path");

let auth;
if(process.pkg !== undefined){
    auth = require.cache[path.join(path.dirname(process.pkg.entrypoint),"\\lib\\authentication.js")].exports;
}
else {
    auth = require("./../../lib/authentication.js");
}


router.get("/",function (req, res) {
    res.render(path.join(__dirname,"login.html"));
});

router.post("/",function (req, res) {
    if(auth.auth(req.body.key)){
        res.cookie('token', auth.genToken());
        res.redirect("/file");
    }
    else {
        res.cookie('token', "");
        res.redirect(req.get('referer'));
    }
    res.end();
});

module.exports = router;