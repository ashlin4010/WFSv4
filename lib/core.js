"use strict";

const fs = require("fs");
const path = require("path");
const config = require("./config");

module.exports = {
    contents:contents,
    realPath:realPath,
    fakePath:fakePath};

function contents(address) {
    let safeAddress = realPath(address);
    if(!fs.lstatSync(safeAddress).isDirectory()){
        let base = path.parse(safeAddress).base;
        safeAddress = safeAddress.slice(0,safeAddress.length-base.length-1)
    }
    return {file:fileInfo(safeAddress),address:fakePath(safeAddress)}
}

function fakePath(address) {
    return address.slice(config.server.rootDir.length,address.length);
}//removes the real path

function realPath(address) {
    let safeAddress = max_path(address);
    let realAddress = path.join(config.server.rootDir,safeAddress.join("/"));
    return realAddress;
}

function max_path(address) {

    //this it the path we are checking we wil split this into parts so it is ezey to use
    let addressArray = address;
    if (addressArray.endsWith("/")) addressArray = addressArray.slice(0, -1);     //so when we split it we don't end up with a "" at the end of the array
    if(addressArray.startsWith("/")) addressArray = addressArray.slice(1,addressArray.length); //so when we split it we don't end up with a "" at the start of the array
    addressArray = addressArray.split("/");

    let workingAddress = [];   //This is the last known working Address
    let realRoot = config.server.rootDir; //part of real path

    //for each dir in path
    for (let i = 0; i < addressArray.length; i++) {
        let realAddress = path.join(realRoot,workingAddress.join("/"));

        //if error it was a file with stuff after it and that can not be
        try {
            if (!presentInArray(findFiles(realAddress), addressArray[i])) return workingAddress;
        }
        catch(e) {
            return workingAddress;
        }
        workingAddress.push(addressArray[i]);
    }
    return workingAddress;
}//This will try each dir so we can go as far a possible

function presentInArray(arr,obj) {
    return (arr.indexOf(obj) !== -1);
} //Is obj in the array?? returns bool

function findFiles(dir) {
    return fs.readdirSync(dir);
} //Returns an array of files and directories in a directory

function fileInfo(dir) {
    let files = fs.readdirSync(dir);
    let output = [];
    for (let i = 0; i < files.length; i++) {
        let Extension = fileExtension(files[i]);
        let info = fs.lstatSync(path.join(dir, files[i]));
        let file;
        if (info.isDirectory()) {
            file = {
                name: files[i],
                dateModified: formatDate(info.mtime),
                directory: info.isDirectory(),
                size: toHumanSize(info.size),
                type: "directory",
                fileIcon: config.fileType.directory.icon,
                action: config.URLPrecursors[config.fileType.directory.action]
            };
            output.push(file);
        }
        else {
            file = {
                name: files[i],
                dateModified: formatDate(info.mtime),
                directory: info.isDirectory(),
                size: toHumanSize(info.size),
                type: Extension.type,
                fileIcon: Extension.icon,
                action: Extension.action
            };
            output.push(file);
        }
    }
    return output;
} //Gets all the information that is render to the page each file is and object in an array

function fileExtension(fileName) {
    //The extension that go with what icon
    let audio = [".wav", ".mp3", ".ogg", ".gsm", ".dct", ".flac", ".au", ".aiff", ".vox"];
    let powerpoint = [".pptx", ".pptm", ".ppt", ".xps", ".potx", ".potm", ",pot", ".thmx", ".pps", ".ppsx", ".ppsm", ".ppt", ".ppam", ".ppa"];
    let pdf = [".pdf"];
    let code = [".js", ".c", ".ejs", ".json", ".class", ".cmd", ".cpp", ".py"];
    let archive = [".raw", ".zip", "iso", ".ARJ", ".TAR", ".GZ", ".TGZ"];
    let spreadsheet = [".gnumeric", ".ods", ".xls", ".xlsx", ".xlsm", ".xlsb", ".xlt", ".xml", ".xlam"];
    let text = [".txt", ".docx", ".docm", ".doc", ".dot", ".wbk", ".dotx", ".dotm", ".docb"];
    let video = [".webm", ".mkv", ".flv", ".vob", ".ogv", ".drc", ".mng", ".gifv", ".vai", ".mov", ".qt", ".wmv", ".yuv", ".rm", ".rmvb", ".asf", ".amv", ".mp4", ".m4p", ".m4v", ".mpg", ".mpeg", ".m2v", ".svi", ".3gp", ".svi", ".3g2", ".mxf", ".roq", ".nsv", ".flv", ".f4v", ".f4p", ".f4a", ".f4b"];
    let image = [, ".tif", ".tiff", ".gif", ".jpeg", ".jpg", ".jif", ".jfif", ".jp2", ".jpx", ".j2k", ".j2c", ".fpx", ".pcd", ".png"];
    let html = [".html"]; //html
    let executable = [".bat", ".sh", ".exe"];

    const configT = config.fileType;
    const url = config.URLPrecursors;

    //Get the Extension for the files name
    let Extension = path.extname(fileName);

    //matches the extension to the icon and return the result
    //I might replace this with a switch
    if (presentInArray(audio, Extension)) {
        return {type: "audio", icon: configT.audio.icon, action: url[configT.audio.action]};
    } else if (presentInArray(powerpoint, Extension)) {
        return {type: "powerpoint", icon: powerpoint, action: url[configT.powerpoint.action]};
    } else if (presentInArray(pdf, Extension)) {
        return {type: "pdf", icon: configT.pdf.icon, action: url[configT.pdf.action]};
    } else if (presentInArray(code, Extension)) {
        return {type: "code", icon: configT.code.icon, action: url[configT.code.action]};
    } else if (presentInArray(archive, Extension)) {
        return {type: "archive", icon: configT.archive.icon, action: url[configT.archive.action]};
    } else if (presentInArray(spreadsheet, Extension)) {
        return {type: "spreadsheet", icon: configT.spreadsheet.icon, action: url[configT.spreadsheet.action]};
    } else if (presentInArray(text, Extension)) {
        return {type: "text", icon: configT.text.icon, action: url[configT.text.action]};
    } else if (presentInArray(video, Extension)) {
        return {type: "video", icon: configT.video.icon, action: url[configT.video.action]};
    } else if (presentInArray(image, Extension)) {
        return {type: "image", icon: configT.image.icon, action: url[configT.image.action]};
    } else if (presentInArray(html, Extension)) {
        return {type: "html", icon: configT.html.icon, action: url[configT.html.action]};
    } else if (presentInArray(executable, Extension)) {
        return {type: "executable", icon: configT.executable.icon, action: url[configT.executable.action]};
    }
    return {type: "unknown", icon: configT.unknown.icon, action: url[configT.unknown.action]} //if there is no action it will just download the file
} //Returns a sting that is a class for awesome font

function formatDate(date) {
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();

    if (month.toString().length < 2){
        month = "0"+month.toString();
    }
    if (minutes.toString().length < 2){
        minutes = "0"+minutes.toString();
    }
    return day+"/"+month+"/"+year+" "+hours+":"+minutes;
} //Makes the time look good

function toHumanSize(bytes) {
    if (bytes < 10e3) {
        return `${bytes} B`;
    }else if (bytes < 10e5) {
        return `${Math.round(bytes / 10e2)} KB`;
    }else if (bytes < 10e8) {
        return `${Math.round(bytes / 10e5)} MB`;
    }else if (bytes < 10e11) {
        return `${Math.round(bytes / 10e8)} GB`;
    }else if (bytes < 10e14) {
        return `${Math.round(bytes / 10e11)} TB`;
    }else {
        return 'A lot.'; // Shhhh
    }
}//Makes file size sensible