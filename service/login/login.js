const include = require("./../../lib/include.js");
const {express,authentication} = include;
const router = express.Router();
const path = require("path");


router.get("/",function (req, res) {
    res.render(path.join(__dirname,"login.html"));
});


router.post("/",function (req, res) {
    if(authentication.auth(req.body.key)){
        res.cookie('token', authentication.genToken());
        res.redirect("/file");
    }
    else {
        res.cookie('token', "");
        res.redirect(req.get('referer'));
    }
    res.end();
});

module.exports = router;