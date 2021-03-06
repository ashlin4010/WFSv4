const include = require("./../../lib/include.js");
const {express,servicesTools} = include;
const router = express.Router();
const path = require("path");

const {services} = include.loader;

const url = servicesTools.urlName(services);

router.get("/*",function (req, res) {
    let address = decodeURI(req.path);
    res.render(path.join(__dirname,"image.ejs"), {address: `/${path.join(url.Download,address)}`.replace(/\\/g, "/")});
});

module.exports = router;