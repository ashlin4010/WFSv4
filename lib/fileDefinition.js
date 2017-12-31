const fs = require("fs");
const path = require('path');
const config = require("./config");
const definitions_path = config.modules.definitions_path;
const files = fs.readdirSync(definitions_path);
const logger = require.main.require("./lib/logger.js");

let definitions = [];

for(let i = 0; files.length > i; i++){
    if(path.extname(files[i]) === ".json"){
        try{
            var json = require(path.join(definitions_path,files[i]));
        }
        catch (e){
            logger.error("Invalid json: "+files[i]);
            continue;
        }
        if(json.formats){
            definitions = definitions.concat(json.formats);
            continue;
        }
        definitions.push(json);
    }
}

module.exports = definitions;