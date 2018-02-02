const express = require('express');
const router = express.Router();
const path = require("path");
const config = require("./../../lib/config.js");

router.get("/*",function (req, res) {
    let address = decodeURI(req.path);
    res.render(path.join(__dirname,"audio.ejs"), {address: `/${path.join(config.URLPrecursors.download,address)}`.replace(/\\/g, "/")});
});

module.exports = router;