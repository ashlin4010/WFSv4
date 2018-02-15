/**
 * Created by Ashlin Inwood on 8/08/2017.
 */

let key = "12345";

const fs = require("fs");
const path = require('path');
const config_path = path.join(process.cwd(),"/settings/config.json");

const bcrypt = require('bcryptjs');
let salt = bcrypt.genSaltSync(10);
let hash = bcrypt.hashSync(key, salt);

let config = {
    server:{
        port:80,
        rootDir: ".\\Send",
        enableKey: false,
        key: hash
    },
    logging: {
        enable_log_file: true,
        enable_console_log: true,
        path: ".\\logs",
        log_time: true,
        log_date: true,
    },
    modules:{
        definitions_path: ".\\settings\\definitions",
        service_path: ".\\service"
    }

};//config

try {
    config = require(config_path);
}//load config file
catch(e) {
    if (e.code !== 'MODULE_NOT_FOUND') throw e;
    fs.writeFileSync(config_path, JSON.stringify(config,null,2));
}//make config file

module.exports = config;