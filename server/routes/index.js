'use strict';

let configuration = require('../configuration');

module.exports = (app) => {
  require('./auth').register(app);
  app.get('/', require('./accueil').index);
  app.get(/\/templates\/(.*)/, require('./templates').serve);
  require('./api').register(app, configuration);
};
