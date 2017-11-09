const express = require('express');
const router = express.Router();
const auth = require.main.require("./lib/authentication.js");
const path = require("path");


router.get("/login",function (req, res) {
    res.render(path.join(__dirname,"login.html"));
});

router.post("/login",function (req, res) {
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