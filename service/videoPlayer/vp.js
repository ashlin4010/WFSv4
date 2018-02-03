const express = require('express');
const router = express.Router();
const path = require("path");

let services;
if(process.pkg === undefined){
    services = require("./../../lib/loader.js").services;
}
else {
    services = require(path.join(path.dirname(process.pkg.entrypoint),"\\lib\\loader.js")).services;
}

const servicesTools = require("./../../lib/servicesTools.js");
const url = servicesTools.urlName(services);

router.get("/*",function (req, res) {
    let address = decodeURI(req.path);
    res.render(path.join(__dirname,"video.ejs"), {address: `/${path.join(url.Download,address)}`.replace(/\\/g, "/")});
});

module.exports = router;