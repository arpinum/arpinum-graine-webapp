'use strict';
let proxyMiddleware = require('http-proxy-middleware');
let basicAuth = require('basic-auth');
let configuration = require('../configuration').common;

module.exports.register = function (app, configuration) {
  registerApi(app);
  registerAdmin(app, configuration);
};

function registerApi(app) {
  var apiProxy = proxyMiddleware(['/api/**', '!/api/**/admin/**'], {
    target: configuration.apiUrl,
    changeOrigin: true,
    pathRewrite: {
      '^/api': ''
    }
  });
  app.use(apiProxy);
}

function registerAdmin(app, configuration) {
  var auth = function (req, res, next) {
    function unauthorized(res) {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      return res.send(401);
    }

    var user = basicAuth(req);

    if (!user || !user.name || !user.pass) {
      return unauthorized(res);
    }

    if (user.name === configuration.common.admin.key && user.pass === configuration.common.admin.password) {
      return next();
    }
    return unauthorized(res);
  };
  var adminProxy = proxyMiddleware('/api/**/admin/**', {
    target: app.locals.apiUrlPrivee,
    pathRewrite: {
      '^/api': ''
    },
    changeOrigin: true
  });
  app.use('/api/**admin**', auth, adminProxy);
}
