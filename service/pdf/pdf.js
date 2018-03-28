const include = require("./../../lib/include.js");
const {express,core,logger} = include;
const router = express.Router();
const fs = require("fs");


router.get("/*",function (req, res) {
    let address = decodeURI(req.path);
    address = core.realPath(address);
    fs.readFile(address, function (err,data){
        if(err) logger.error(err);
        res.contentType("application/pdf");
        res.send(data);
    });
});

module.exports = router;