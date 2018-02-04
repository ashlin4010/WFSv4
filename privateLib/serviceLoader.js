const fs = require("fs");
const path = require('path');
const logger = require("./../lib/logger.js");

function readAll(address) {

    let service_dirs = [];
    let service_jsons = [];

    try {
        let files = fs.readdirSync(address);
        for (let i = 0; i < files.length; i++) {
            let info = fs.lstatSync(path.join(address, files[i]));
            if(info.isDirectory()){
                service_dirs.push(files[i]);
            }
        }
    }
    catch(e) {
        logger.error(e);
        process.exit(1)
    }

    for (let i = 0; i < service_dirs.length; i++) {
        let service_root = path.join(address, service_dirs[i]);
        let files = fs.readdirSync(service_root);
        if (files.indexOf("service.json") === -1) {
            logger.warn(service_dirs[i] + " has no 'service.json' file");
            continue;
        }

        try {
            var service_json = require(path.join(service_root, "service.json"));
        }//load config file
        catch (e) {
            if (e.code === 'MODULE_NOT_FOUND') logger.error(service_dirs[i] + " has no 'service.json' file");
            else {
                console.log(e.code);
                throw e;
            }
            continue;
        }

        let sconfig = [
            {name: service_dirs[i]},
            {version: ""},
            {author: ""},
            {description: ""},
            {definitions: null},
            {formatsTypes: []},
            {entryPoint: "./index.js"},
            {requireAuthentication: true},
            {URLPrecursors:service_dirs[i]},
            {publicResources: null}
        ];

        for (let j = 0; j < sconfig.length; j++) {
            let key = Object.keys(sconfig[j])[0];
            if ((service_json[key] === undefined)||(service_json[key] === "")) {
                service_json[key] = sconfig[j][key];
            }
        }
        service_json.root = service_root;
        service_jsons.push(service_json);
    }


    return service_jsons;
}


module.exports = {readAll};