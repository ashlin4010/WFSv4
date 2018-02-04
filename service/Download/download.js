const express = require('express');
const router = express.Router();

const include = require("./../../lib/include.js");
const core = include.core;

router.get("/*",function (req, res) {
    let address = decodeURI(req.path);
    address = core.realPath(address);
    res.download(address);
});

module.exports = router;