"use strict";
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const include = require("./lib/include.js");
const port = include.config.server.port;
const logger = include.logger;
const routes = include.loader.loadRoutes();

app.set('view engine', 'ejs'); //Set the view engine to ejs
app.engine('html', require('ejs').renderFile);
app.use(express.static('./public'));//Set path to static files for webPage stuff
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use("/",routes);

app.listen(port, function () {
    //logger.log("Starting server at "+`http://localhost:${port}/`+"or ");

    require('dns').lookup(require('os').hostname(), function (err, add, fam) {
        logger.log("Starting server at "+`http://localhost:${port}`+" or "+`http://${add}:${port}`);
    })


}); //Start the http server