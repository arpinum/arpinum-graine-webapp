'use strict';

var cookies = require('../../auth/cookies');

module.exports.register = function (app) {

  app.use(function (req, res, next) {
    req.userConnected = cookies.isSessionPresent(req);
    req.userToken = cookies.extractToken(req);
    next();
  });
  require('./login').register(app);
  require('./token').register(app);
};
