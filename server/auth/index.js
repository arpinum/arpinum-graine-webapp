'use strict';

//var auth = require('../api').auth;
var configuration = require('../configuration');
var authConfiguration = configuration.common.auth;
var tokenFactory = require('./token')(authConfiguration);
var _ = require('lodash');

module.exports = {
  authenticateWithCredentials: function (email, password) {
    console.log(email);
    console.log(password);
    //return auth.checkCredentials(email, password).then(tokenFactory.forgeToken);
  },

  authenticateWithFacebook: function (token) {
    console.log(token);
    //return auth.checkFacebookToken(token).then(tokenFactory.forgeToken);
  },

  forgeToken: tokenFactory.forgeToken,

  tryRefresh: tokenFactory.tryRefresh,

  readToken: tokenFactory.read,

  isRefererValid: function (value) {
    return !configuration.checkReferrer || _.startsWith(value, authConfiguration.issuer);
  }
};

