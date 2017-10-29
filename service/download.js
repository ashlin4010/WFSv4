const express = require('express');
const router = express.Router();
const config = require.main.require("./lib/config.js");
let url = config.URLPrecursors.download;
const core = require.main.require("./lib/core.js");

router.get("/"+url+"*",function (req, res) {
    let address = decodeURI(req.path).substring(url.length + 1);
    address = core.realPath(address);
    res.download(address);
});

module.exports = router;