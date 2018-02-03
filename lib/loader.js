"use strict";
const express = require('express');
const logger = require("./logger.js");
const path = require('path');
const config = require("./config");
const auth = require("./authentication.js");

//first we pre load Services so we get all the Definitions
//then we load Definitions then Services
//this need to happen like this because some of the Services use the CORE but the CORE needs the
//definitions to work so all the Definitions must be loaded first.

logger.log("Pre-loading services");
const service_path = path.resolve(config.modules.service_path);
const services = require("./serviceLoader.js").readAll(service_path);
logger.log("Finished pre-loading services");


logger.log("Loading definitions");
const definitions_path = path.resolve(config.modules.definitions_path);
const definitionLoader = require("./fileDefinition.js");
let definitions = {file:[]};
definitions.file  = definitions.file.concat( definitionLoader.readAll(definitions_path));
definitions.file = definitions.file.concat(generateDefinitionsServices(services));
//get special cases directory and unknown
for(let i = 0; i < definitions.file.length; i++){
    if (definitions.file[i].type === "unknown"){
        definitions.unknown = definitions.file[i];
    }
    if (definitions.file[i].type === "directory"){
        definitions.directory = definitions.file[i];
    }
}


logger.log("Finished loading definitions");

let loadRoutes = function () {
    logger.log("Loading services");
    let routes = generateRoutes(services);
    logger.log("Finished loading services");
    return routes;
}; //must not before module.exports

function generateRoutes(services) {
    let router = express.Router();
    for (let i = 0; i < services.length; i++) {
        let authentification = auth.pass;
        if (config.server.enableKey && services[i].requireAuthentication) {
            authentification = auth.verify;
        }
        try {
            var service = require(path.join(services[i].root, services[i].entryPoint));
        }
        catch(e) {
            console.log(e);
            logger.error("Missing entry point " + path.join(services[i].root, services[i].entryPoint));
            continue;
        }

        if(Boolean(services[i].publicResources)){
            router.use(express.static(path.join(services[i].root,services[i].publicResources)));
        }

        router.use("/"+services[i].URLPrecursors, authentification, service);
    }
    return router;
}

function generateDefinitionsServices(services) {
    let definitions = [];
    for (let i = 0; i < services.length; i++){
        if(Boolean(services[i].definitions)){
            definitions = definitions.concat(definitionLoader.read(path.join(services[i].root,services[i].definitions)));
        }
    }
    return definitions;
}

module.exports = {loadRoutes,services,definitions};