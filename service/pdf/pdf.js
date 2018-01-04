const express = require('express');
const router = express.Router();
const fs = require("fs");
const core = require.main.require("./lib/core.js");
const logger = require.main.require("./lib/logger.js");

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