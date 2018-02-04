//all libs are loaded form hear so we don't end up with duplicates
//but first they need to be loaded to begin with so call loadLib from index before anything else
let path = require("path");

let authentication;
let config;
let core;
let loader;
let logger;
let servicesTools;

//if the app is not compiled
if(process.pkg === undefined){
    authentication = require("./authentication.js");
    config = require("./config.js");
    core = require("./core.js");
    loader = require("./loader.js");
    logger = require("./logger.js");
    servicesTools = require("./servicesTools.js");
}
else {
    let libPath = path.dirname(process.pkg.entrypoint);
    authentication = require(path.join(libPath,"\\lib\\authentication.js"));
    config = require(path.join(libPath,"\\lib\\config.js"));
    core = require(path.join(libPath,"\\lib\\core.js"));
    loader = require(path.join(libPath,"\\lib\\loader.js"));
    logger = require(path.join(libPath,"\\lib\\logger.js"));
    servicesTools = require(path.join(libPath,"\\lib\\servicesTools.js"));
}

module.exports = {
    authentication,
    config,
    core,
    loader,
    logger,
    servicesTools
};