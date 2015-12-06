'use strict';

var auth = require('../../auth/index');
var cookies = require('../../auth/cookies');

module.exports.register = function (app) {
  app.use('/token', checkHeader);
  app.get('/token', get);
  app.post('/token', refresh);
};

function checkHeader(req, res, next) {
  if (!auth.isRefererValid(req.headers.referer)) {
    res.status(401).send();
    return;
  }
  next();
}

function get(req, res) {
  var token = cookies.extractToken(req);
  if (!token) {
    res.status(401).send();
    return;
  }
  res.send(token);

}

function refresh(req, res) {
  var token = cookies.extractToken(req);
  if (!token) {
    res.status(401).send();
    return;
  }
  var newToken = auth.tryRefresh(token);
  if (!newToken) {
    res.status(401).send();
    return;
  }
  cookies.setSession(res, newToken);
  res.send(newToken);
}
