const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const config = require("./lib/config.js");
const logger = require("./lib/logger.js");
const auth = require("./lib/authentication.js");
const loader = require("./lib/loader.js");

let authentification = auth.pass;
if(config.server.enableKey){
    authentification = auth.verify;
}

app.set('view engine', 'ejs'); //Set the view engine to ejs
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, 'public')));//Set path to static files for webPage stuff
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use("/",loader);

app.get("/",function (req, res) {
    res.redirect("/"+config.URLPrecursors.explorer);
});

app.listen(config.server.port, function () {
    logger.log("Starting server at "+`http://localhost:${config.server.port}/`);
}); //Start the http server