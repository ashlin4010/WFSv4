/**
 * Created by Ashlin Inwood on 12/09/2017.
 */
const fs = require("fs");
const path = require('path');
const config = require("./config.js");
const lpath = path.resolve(config.logging.path);

try{
    fs.statSync(lpath).isDirectory();
}
catch (err){
    fs.mkdirSync(lpath);
}
let log_file = fs.createWriteStream(path.join(lpath, '/log.log'), {flags: 'w'});
log_file.on('error', function(e) { console.log(e); });

module.exports = {log,warn,error};

function date() {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();

    if (month.toString().length < 2) month = "0"+month.toString();
    if (minutes.toString().length < 2) minutes = "0"+minutes.toString();
    return {date:day+"/"+month+"/"+year, time: hours+":"+minutes};
} //Makes the time look good

function log(message,type) {
    if(!Boolean(type)) type = "INFO";
    if(!Boolean(message)) return;
    message = message.toString();
    let log = `[${config.logging.log_date ? date().date+" " : ""}${config.logging.log_time ? date().time : ""}][${type}]: ${message}`;
    if(type === "ERROR"){if(config.logging.enable_console_log) console.error(log);}
    else {if(config.logging.enable_console_log) console.log(log);}
    if(config.logging.enable_log_file) log_file.write(log+"\r\n");
}

//WARNING
function warn(message) {
    return log(message,"WARNING");
}

//ERROR
function error(message) {
   return log(message,"ERROR");
}