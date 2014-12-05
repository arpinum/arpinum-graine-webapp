var indexRoute = require("./accueil");

module.exports = function(app) {
    app.get('/', indexRoute.index);
};
