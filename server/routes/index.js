var indexRoute = require('./accueil');

module.exports = (app) => {
    app.get('/', indexRoute.index);
};
