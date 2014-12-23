var mapToUse = {};

function revision(key) {
    if(mapToUse.hasOwnProperty(key)) {
        return mapToUse[key];
    }
    return key;
}

module.exports = {

    initMap: function (map) {
        mapToUse = map;
    },
    registerHelper: function (app) {
        app.locals.revision = revision;
    }
};


