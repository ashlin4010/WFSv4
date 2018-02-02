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
        rootDir: path.join(process.cwd(), "/Send"),
        enableKey: false,
        key: hash
    },
    URLPrecursors: {
        login:"login",
        explorer: "file",
        upload: "upload",
        videoPlayer: "video",
        audioPlayer: "audio",
        imageViewer: "image",
        pdfViewer: "pdf",
        download:"download",
        text:"text",
        html:"html"
    },
    logging: {
        enable_log_file: true,
        enable_console_log: true,
        path: path.join(process.cwd(), "/Logs"),
        log_time: true,
        log_date: true,
        log_ip: false
    },
    fileType:{
        directory:{icon:"icon-folder",action:"explorer"},
        audio:{icon:"icon-file-audio",action:"audioPlayer"},
        powerpoint:{icon:"icon-file-powerpoint",action:"download"},
        pdf:{icon:"icon-file-pdf",action:"pdfViewer"},
        code:{icon:"icon-file-code",action:"download"},
        archive:{icon:"icon-file-archive",action:"download"},
        spreadsheet:{icon:"icon-file-excel",action:"download"},
        text:{icon:"icon-doc-text",action:"text"},
        video:{icon:"icon-file-video",action:"videoPlayer"},
        image:{icon:"icon-file-image",action:"imageViewer"},
        html:{icon:"icon-chrome",action:"html"},
        executable:{icon:"icon-laptop",action:"download"},
        unknown:{icon:"icon-doc",action:"download"}
    },
    modules:{
        definitions_path: path.join(process.cwd(),"/settings/definitions/"),
        service_path: path.join(process.cwd(), "/service/")
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