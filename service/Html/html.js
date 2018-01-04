const express = require('express');
const router = express.Router();
const core = require.main.require("./lib/core.js");

router.get("/*",function (req, res) {
    let address = decodeURI(req.path);
    address = core.realPath(address);
    res.render(address);
});

module.exports = router;