const express = require('express');
const router = express.Router();
const path = require("path");

const include = require("./../../lib/include.js");
const {services} = include.loader;
const {servicesTools} = include;

const url = servicesTools.urlName(services);

router.get("/*",function (req, res) {
    let address = decodeURI(req.path);
    res.render(path.join(__dirname,"video.ejs"), {address: `/${path.join(url.Download,address)}`.replace(/\\/g, "/"),title:address.replace("/", "")});
});

module.exports = router;