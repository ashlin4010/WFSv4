const express = require('express');
const router = express.Router();
const path = require("path");

const include = require("./../../lib/include.js");
const auth = include.authentication;


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