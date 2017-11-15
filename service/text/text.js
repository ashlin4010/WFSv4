const express = require('express');
const router = express.Router();
const fs = require("fs");
const path = require("path");

const config = require.main.require("./lib/config.js");
const core = require.main.require("./lib/core.js");
const logger = require.main.require("./lib/logger.js");
const url = config.URLPrecursors.text;

router.get("/"+url+"*",function (req, res) {
    let address = decodeURI(req.path).substring(url.length + 1);
    address = core.realPath(address);
    fs.readFile(address, function (err, data) {
        if (err) {
            logger.error(err);
            res.send("internal error");
            return res.end();
        }
        try {
            res.render(path.join(__dirname, "text.ejs"), {text: data.toString()});
        }
        catch (err){
            logger.error(err);
            res.send("internal error");
            return res.end();
        }
    });
});

module.exports = router;