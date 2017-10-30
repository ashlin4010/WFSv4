const express = require('express');
const app = express();
const path = require('path');

const config = require("./lib/config.js");
const logger = require("./lib/logger.js");

const explorer = require("./service/explorer/explorer.js");
const download = require("./service/download.js");
const videoPlayer = require("./service/videoPlayer/vp.js");
const audioPlayer = require("./service/audioPlayer/audio.js");
const image = require("./service/image/image.js");
const upload = require("./service/upload.js");
const pdf = require("./service/pdf.js");
const text = require("./service/text/text.js");
const html = require("./service/html.js");


app.set('view engine', 'ejs'); //Set the view engine to ejs
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, 'public')));//Set path to static files for webPage stuff

app.use("/",explorer);
app.use("/",download);
app.use("/",videoPlayer);
app.use("/",audioPlayer);
app.use("/",image);
app.use("/",upload);
app.use("/",pdf);
app.use("/",text);
app.use("/",html);


app.get("/",function (req, res) {
   res.redirect("/"+config.URLPrecursors.explorer);
});

app.listen(config.server.port, function () {
    logger.log(`http://localhost:${config.server.port}/`);
}); //Start the http server