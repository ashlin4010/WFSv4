const express = require('express');
const router = express.Router();
const Busboy = require('busboy');
const path = require('path');
const fs = require('fs');

const include = require("./../../lib/include.js");
const {config} = include;
const {logger} = include;

const homeDir = config.server.rootDir;

router.post("/*", function(req, res) {

    let address; //Address is the stuff after url in a array without "/" and url example http:/localhost/url/it/gets/this/stuff ==> ["it","gets","this","stuff"]

    //removes url string from url
    address = decodeURI(req.path);
    if (address.endsWith("/")) address = address.slice(0, -1);

    let busboy = new Busboy({ headers: req.headers });

    busboy.on('file', function(fieldname, file, filename, encoding) {

        logger.log('Upload started; filename: ' + filename + ', encoding: ' + encoding);

        // file.on('data', function(data) {
        //     logger.log('Data received; filename:' + filename + ', ' + data.length + ' bytes, encoding: ' + encoding);
        // });

        file.on('end', function() {
            logger.log('Upload ended; filename: ' + filename + ', encoding: ' + encoding);
        });

        if(filename){
            let saveTo = path.join(homeDir,path.join(address, path.basename(filename)));
            if(!fs.existsSync(path.join(homeDir,address))){
                logger.error(`Root directory does not exist,'${saveTo}'`);
                process.exit(1);
            }
            file.pipe(fs.createWriteStream(saveTo));
        }
    });

    busboy.on('finish', function() {
        res.writeHead(303, { Connection: 'close', Location: req.get('referer') });
        res.end();
    });
    req.pipe(busboy);

});//Handles file upload over post

module.exports = router;