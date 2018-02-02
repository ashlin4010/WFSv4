const express = require('express');
const router = express.Router();
const config = require("./../../lib/config.js");
const path = require("path");

router.get("/*",function (req, res) {
    let address = decodeURI(req.path);
    res.render(path.join(__dirname,"image.ejs"), {address: `/${path.join(config.URLPrecursors.download,address)}`.replace(/\\/g, "/")});
});

module.exports = router;