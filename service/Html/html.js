const include = require("./../../lib/include.js");
const {express,core} = include;
const router = express.Router();

router.get("/*",function (req, res) {
    let address = decodeURI(req.path);
    address = core.realPath(address);
    res.render(address);
});

module.exports = router;