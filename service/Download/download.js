const express = require('express');
const router = express.Router();
const core = require("./../../lib/core.js");

router.get("/*",function (req, res) {
    let address = decodeURI(req.path);
    address = core.realPath(address);
    res.download(address);
});

module.exports = router;