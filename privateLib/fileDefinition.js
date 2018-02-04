"use strict";
const fs = require("fs");
const path = require('path');
const logger = require("./../lib/logger.js");

function readAll(address) {
    const files = fs.readdirSync(address);
    let definitions = [];
    for(let i = 0; files.length > i; i++){
        let fileAddress = path.join(address,files[i]);
        definitions = definitions.concat(read(fileAddress));
    }
    return definitions;
}

function read(address) {
    let definitions = [];
    if(path.extname(address) === ".json"){
        try{
            var json = require(address);
        }
        catch (e){
            console.log(e);
            logger.error("Invalid json: "+path.parse(address).base);
            return definitions;
        }
        if(json.formats){
            definitions = json.formats;
            return definitions;
        }
        return [json];
    }
    logger.warn("Unable to find json in "+address);
    return [];
}

module.exports = {readAll,read};