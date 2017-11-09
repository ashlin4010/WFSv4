const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const config = require("./lib/config.js");
const logger = require("./lib/logger.js");
const login = require("./service/login/login.js");
const auth = require("./lib/authentication.js");

const explorer = require("./service/explorer/explorer.js");
const download = require("./service/download.js");
const videoPlayer = require("./service/videoPlayer/vp.js");
const audioPlayer = require("./service/audioPlayer/audio.js");
const image = require("./service/image/image.js");
const upload = require("./service/upload.js");
const pdf = require("./service/pdf.js");
const text = require("./service/text/text.js");
const html = require("./service/html.js");

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

app.use("/",login);

app.use("/",authentification,explorer);
app.use("/",authentification,download);
app.use("/",authentification,videoPlayer);
app.use("/",authentification,audioPlayer);
app.use("/",authentification,image);
app.use("/",authentification,upload);
app.use("/",authentification,pdf);
app.use("/",authentification,text);
app.use("/",authentification,html);

app.get("/",function (req, res) {
    if(config.server.enableKey){
        res.redirect("/"+config.URLPrecursors.login);
    }
    else res.redirect("/"+config.URLPrecursors.explorer);
});

app.get('/test', function (req, res, next) {
    res.cookie('token', "stuff");
    next();
});

app.get("/test",function (req, res) {
    console.log(req.cookies);
    res.send(req.cookies);
});

app.listen(config.server.port, function () {
    logger.log(`http://localhost:${config.server.port}/`);
}); //Start the http server