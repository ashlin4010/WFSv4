module.exports = {names,findall,urls,urlName};

function names(services) {
    let names = [];
    for(let i = 0; i < services.length; i++){
        names.push(services[i].name);
    }
    return names;
}

function findall(services, item) {
    let output = [];
    for(let i = 0; i < services.length; i++){
        output.push(services[i][item]);
    }
    return output;
}

function urls(services) {
    return findall(services,"URLPrecursors");
}

function urlName(services) {
    let output = {};
    for(let i = 0; i < services.length; i++){
        output[services[i].name] = services[i].URLPrecursors
    }
    return output;
}
