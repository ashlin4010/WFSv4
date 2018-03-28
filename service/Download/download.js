const include = require("./../../lib/include.js");
const {core,express} = include;
const router = express.Router();

router.get("/*",function (req, res) {
    let address = decodeURI(req.path);
    address = core.realPath(address);
    res.download(address);
});

module.exports = router;