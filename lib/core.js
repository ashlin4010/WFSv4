"use strict";

const fs = require("fs");
const path = require("path");
const config = require("./config");
const Root = path.resolve(config.server.rootDir);


let definitions;
if(process.pkg !== undefined){
    definitions = require.cache[path.join(path.dirname(process.pkg.entrypoint),"\\lib\\loader.js")].exports.definitions;
}
else {
    definitions = require("./loader.js").definitions;
}

const logger = require("./logger.js");

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
    return address.slice(Root.length,address.length);
}//removes the real path

function realPath(address) {
    let safeAddress = max_path(address);
    let realAddress = path.join(Root,safeAddress.join("/"));
    return realAddress;
}

function max_path(address) {

    //this it the path we are checking we wil split this into parts so it is ezey to use
    let addressArray = address;
    if (addressArray.endsWith("/")) addressArray = addressArray.slice(0, -1);     //so when we split it we don't end up with a "" at the end of the array
    if(addressArray.startsWith("/")) addressArray = addressArray.slice(1,addressArray.length); //so when we split it we don't end up with a "" at the start of the array
    addressArray = addressArray.split("/");

    let workingAddress = [];   //This is the last known working Address
    let realRoot = Root; //part of real path

    //does the Root path exist?
    if(!fs.existsSync(realRoot)){
        logger.error(`Root directory does not exist,'${realRoot}'`);
        process.exit(1);
    }

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
        let info = fs.lstatSync(path.join(dir, files[i]));
        let file;
        if (info.isDirectory()) {
            file = {
                name: files[i],
                dateModified: formatDate(info.mtime),
                directory: true,
                size: toHumanSize(info.size),
                type: "directory",
                fileIcon: definitions.directory.icon,
                action: definitions.directory.defaultAction
            };
            output.push(file);
        }
        else {
            let Extension = fileExtension2(files[i]);
            file = {
                name: files[i],
                dateModified: formatDate(info.mtime),
                directory: false,
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

function fileExtension2(fileName) {
    //Get the Extension for the files name
    let Extension = path.extname(fileName);

    for(let i = 0; definitions.file.length > i; i++){
        if(presentInArray(definitions.file[i].extname, Extension)){
            return {type: definitions.file[i].type, icon: definitions.file[i].icon, action: definitions.file[i].defaultAction};
        }
    }
    return {type: definitions.unknown.type, icon: definitions.unknown.icon, action: definitions.unknown.defaultAction};
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