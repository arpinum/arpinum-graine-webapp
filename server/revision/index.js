var mapToUse = {};


function createLoader(mapFile) {
    if(process.env.NODE_ENV === "development") {
        return () => {
            JSON.parse(require('fs').readFileSync(mapFile, "utf8"));
        }
    }
    var mapStatic = require(mapFile);
    return () => {
        return mapStatic;
    }
}

function createRevision(mapFile) {
    var loader = createLoader(mapFile);
    return function (bundle, type) {
        return loader()[bundle][type];
    }
}

module.exports = {

    registerHelper: function (app, mapFile) {
        app.locals.revision = createRevision(mapFile);
    }
};


