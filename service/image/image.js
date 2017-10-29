const express = require('express');
const router = express.Router();
const config = require.main.require("./lib/config.js");
const path = require("path");
let url = config.URLPrecursors.imageViewer;

router.get("/"+url+"*",function (req, res) {
    let address = decodeURI(req.path).substring(url.length + 1);
    res.render(path.join(__dirname,"image.ejs"), {address: `/${path.join(config.URLPrecursors.download,address)}`.replace(/\\/g, "/")});
});

module.exports = router;