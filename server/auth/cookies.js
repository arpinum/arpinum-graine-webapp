'use strict';

var SESSION_NAME = 'jamshake_session';
var _ = require('lodash');
var configuration = require('../configuration').cookie;
var days = 4;

exports.isSessionPresent = function (req) {
  return SESSION_NAME in req.cookies;
};

exports.setSession = function (response, token) {
  var expires = new Date();
  expires.setTime(expires.getTime() + days * 86400000);
  response.cookie(SESSION_NAME, token,
    _.extend({expires: expires}, createOption(configuration)));
};

exports.resetSession = function (response) {
  response.clearCookie(SESSION_NAME, createOption(configuration));
};

exports.extractToken = function (request) {
  return request.cookies[SESSION_NAME];
};

function createOption(configuration) {
  return {
    domain: configuration.domain,
    path: configuration.path,
    secure: configuration.secure,
    httpOnly: true
  };
}
