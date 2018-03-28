const include = require("./../../lib/include.js");
const {express} = include;
const router = express.Router();


router.get("/",function (req, res) {
    res.redirect("/file");
});


module.exports = router;