"use strict";
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const config = require("./lib/config.js");
const logger = require("./lib/logger.js");
const loader = require("./lib/loader.js");

//var mod = require.resolve("./lib/loader.js");
//console.log(require.cache[mod].exports.services);

const routes = loader.loadRoutes();

app.set('view engine', 'ejs'); //Set the view engine to ejs
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, 'public')));//Set path to static files for webPage stuff
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use("/",routes);

app.get("/",function (req, res) {
    res.redirect("/file");
});

app.listen(80, function () {
    logger.log("Starting server at "+`http://localhost:${config.server.port}/`);
}); //Start the http server