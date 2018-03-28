"use strict";

const include = require("./lib/include.js");
const port = include.config.server.port;
const routes = include.loader.loadRoutes();
const {logger,express} = include;

const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.set('view engine', 'ejs'); //Set the view engine to ejs
app.engine('html', require('ejs').renderFile);
app.use(express.static('./public'));//Set path to static files for webPage stuff
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use("/",routes);


app.listen(port, function () {
    require('dns').lookup(require('os').hostname(), function (err, add, fam) {
        logger.log("Starting server at "+`http://localhost:${port}`+" or "+`http://${add}:${port}`);
    })

}); //Start the http server