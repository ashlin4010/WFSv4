const include = require("./../../lib/include.js");
const {express,servicesTools,core} = include;
const {services} = include.loader;
const router = express.Router();

const path = require("path");

const url = servicesTools.urlName(services);

router.get("/*", function(req, res) {

    let address = decodeURI(req.path);
    if (address.endsWith("/")) address = address.slice(0, -1);//so we can compare them to see if we need to reload the page
    let contents = core.contents(address);
    let addressO = address;
    address = contents.address.replace(/\\/g, "/");
    let addressArray = address.split("/");
    if (addressArray[0] === "") addressArray.shift();

    if(path.normalize(contents.address) !== path.normalize(addressO)){
        res.redirect(`/${path.normalize(path.join(url.Explorer, address))}`.replace(/\\/g, "/")+"/");
        res.end();
        return
    }
    res.render(path.join(__dirname,"index.ejs"), {files: contents.file, address: address, addressArray: addressArray, url: url, path: path});
});

module.exports = router;