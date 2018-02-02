const express = require('express');
const router = express.Router();
const logger = require("./logger.js");
const path = require('path');
const config = require("./config");
const auth = require("./authentication.js");

const service_path = config.modules.service_path;
const serviceLoader = require("./serviceLoader.js");
let services = loadServices(service_path);


const definitions_path = config.modules.definitions_path;
const definitionLoader = require("./fileDefinition.js");
let definitions = loadDefinitions(definitions_path);

//Needs to run first
function loadServices(Path) {
    logger.log("Loading services");
    let services = serviceLoader.readAll(Path);

    for (let i = 0; i < services.length; i++) {
        let authentification = auth.pass;
        if (config.server.enableKey && services[i].requireAuthentication) {
            authentification = auth.verify;
        }
        try {
            var service = require(path.join(services[i].root, services[i].entryPoint));
        }
        catch(e) {
            logger.error("Missing entry point " + path.join(services[i].root, services[i].entryPoint));
            continue;
        }

        if(Boolean(services[i].publicResources)){
            router.use(express.static(path.join(services[i].root,services[i].publicResources)));
        }

        router.use("/"+services[i].URLPrecursors, authentification, service);
    }
    logger.log("Finished loading services");
    return services;
}

function loadDefinitions(Path) {
    logger.log("Loading definitions");
    let definitions = definitionLoader.readAll(Path);
    for (let i = 0; i < services.length; i++){
        if(Boolean(services[i].definitions)){
            definitions = definitions.concat(definitionLoader.read(path.join(services[i].root,services[i].definitions)));
        }
    }
    logger.log("Finished loading definitions");
    return definitions;
}

function generateActions() {

}
module.exports = router;