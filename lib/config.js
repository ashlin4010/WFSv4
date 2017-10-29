/**
 * Created by Ashlin Inwood on 8/08/2017.
 */
const fs = require("fs");
const path = require('path');
const config_path = path.join(__dirname, "/../config.json");
let config = {
    server:{
        port:80,
        rootDir: path.join(__dirname, "./../Send")
    },
    URLPrecursors: {
        explorer: "file",
        upload: "upload",
        videoPlayer: "video",
        audioPlayer: "audio",
        imageViewer: "image",
        pdfViewer: "pdf",
        download:"download"
    },
    logging: {
        enable_log_file: true,
        enable_console_log: true,
        path: path.join(__dirname, "./../Logs"),
        log_time: true,
        log_date: true,
        log_ip: false
    },
    fileType:{
        directory:{icon:"fa fa-folder",action:"explorer"},
        audio:{icon:"fa fa-file-audio-o",action:"audioPlayer"},
        powerpoint:{icon:"fa fa-file-powerpoint-o",action:""},
        pdf:{icon:"fa fa-file-pdf-o",action:"pdfViewer"},
        code:{icon:"fa fa-file-code-o",action:""},
        archive:{icon:"fa fa-file-archive-o",action:""},
        spreadsheet:{icon:"fa fa-file-excel-o",action:""},
        text:{icon:"fa fa-file-text-o",action:""},
        video:{icon:"fa fa-file-video-o",action:"videoPlayer"},
        image:{icon:"fa fa-file-image-o",action:"imageViewer"},
        html:{icon:"fa fa-chrome",action:""},
        executable:{icon:"fa fa-laptop",action:""},
        unknown:{icon:"fa fa-file-o",action:"download"}
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