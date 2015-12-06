'use strict';

var jwt = require('jsonwebtoken');
var _ = require('lodash');

module.exports = function (configuration) {
  return {
    forgeToken: forgeToken,
    tryRefresh: tryRefresh,
    read: read
  };

  function forgeToken(id, options) {
    var realOptions = _.extend(_.clone(configuration), options);
    return jwt.sign(payload(id), configuration.key, {
      expiresInMinutes: 15,
      issuer: realOptions.issuer,
      audience: realOptions.audience
    });
  }

  function payload(id) {
    if (_.isObject(id)) {
      return id;
    }
    return {sub: id};
  }

  function tryRefresh(token) {
    try {
      let result = jwt.verify(token, configuration.key, {
        audience: configuration.audience,
        issuers: configuration.issuer,
        algorithms: ['HS256']
      });
      return forgeToken(result.sub);
    } catch (e) {
      if (e.name !== 'TokenExpiredError') {
        return null;
      }
      let result = jwt.decode(token);
      return forgeToken(result.sub);
    }
  }

  function read(token) {
    return jwt.decode(token);
  }
};
