const express = require('express');
const router = express.Router();
const include = require("./../../lib/include.js");
const {core} = include;

router.get("/*",function (req, res) {
    let address = decodeURI(req.path);
    address = core.realPath(address);
    res.render(address);
});

module.exports = router;