'use strict';

let proxyMiddleware = require('http-proxy-middleware');
let basicAuth = require('basic-auth');

module.exports.register = function (app, configuration) {
  registerApi(app, configuration);
  registerAdmin(app, configuration);
};

function registerApi(app, configuration) {
  var apiProxy = proxyMiddleware(['/api/**', '!/api/**/admin/**'], {
    target: configuration.common.apiUrl,
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
    target: configuration.common.apiUrl,
    pathRewrite: {
      '^/api': ''
    },
    changeOrigin: true
  });
  app.use('/api/**admin**', auth, adminProxy);
}
