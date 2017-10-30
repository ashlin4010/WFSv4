const express = require('express');
const router = express.Router();
const config = require.main.require("./lib/config.js");
let url = config.URLPrecursors.text;
const core = require.main.require("./lib/core.js");
const fs = require("fs");
const path = require("path");

router.get("/"+url+"*",function (req, res) {
    let address = decodeURI(req.path).substring(url.length + 1);
    address = core.realPath(address);
    fs.readFile(address, function (err, data) {
        if (err) {
            throw err;
        }
        res.render(path.join(__dirname,"text.ejs"), {text:data.toString()});
    });
});

module.exports = router;