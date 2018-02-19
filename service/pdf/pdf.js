const express = require('express');
const router = express.Router();
const fs = require("fs");

const include = require("./../../lib/include.js");
const {core} = include;
const {logger} = include;


router.get("/*",function (req, res) {
    let address = decodeURI(req.path);
    address = core.realPath(address);
    fs.readFile(address, function (err,data){
        if(err) logger.error(err);
        res.contentType("application/pdf");
        res.send(data);
    });
});

module.exports = router;