const include = require("./../../lib/include.js");
const {express, core, logger} = include;
const router = express.Router();
const fs = require("fs");
const path = require("path");

let deleteFolderRecursive = function(path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function(file, index){
            let curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};


router.get("/*",function (req, res) {
    let address = decodeURI(req.path);
    address = core.realPath(address);

    if (path.normalize(address) !== path.normalize(core.root)){
        try {
            if(fs.lstatSync(address).isDirectory()){
                deleteFolderRecursive(address);
            }
            else {
                fs.unlinkSync(address);
            }
        }
        catch (e) {
            console.log(e);
            logger.error(e);
        }
    }

    res.reload();
});

module.exports = router;