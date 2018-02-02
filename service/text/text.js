const express = require('express');
const router = express.Router();
const fs = require("fs");
const path = require("path");

const core = require("./../../lib/core.js");
const logger = require("./../../lib/logger.js");

router.get("/*",function (req, res) {
    let address = decodeURI(req.path);
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