const express = require('express');
const router = express.Router();
const config = require.main.require("./lib/config.js");
let url = config.URLPrecursors.pdfViewer;
const fs = require("fs");
const core = require.main.require("./lib/core.js");
const logger = require.main.require("./lib/logger.js");

router.get("/"+url+"*",function (req, res) {
    let address = decodeURI(req.path).substring(url.length + 1);
    address = core.realPath(address);
    fs.readFile(address, function (err,data){
        if(err) logger.error(err);
        res.contentType("application/pdf");
        res.send(data);
    });
});

module.exports = router;