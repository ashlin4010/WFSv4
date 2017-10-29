const express = require('express');
const router = express.Router();
const path = require("path");

const config = require.main.require("./lib/config.js");
const url = config.URLPrecursors.explorer;
const core = require.main.require("./lib/core.js");

router.get("/"+url+"*", function(req, res) {

    let address = decodeURI(req.path).substring(url.length + 1);//removes url "+1" because we have a "/"
    if (address.endsWith("/")) address = address.slice(0, -1);//so we can compear them to see if we need to reload the page
    let contents = core.contents(address);

    if(path.normalize(contents.address) !== path.normalize(address)){
        res.redirect(`/${path.normalize(path.join(url,contents.address))}`.replace(/\\/g, "/")+"/");
        res.end();
        return
    }

    res.send(core.contents(address));
});


module.exports = router;