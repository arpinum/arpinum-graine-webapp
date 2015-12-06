'use strict';

let path = require('path');
const configuration = require(path.join(__dirname, 'files', 'configuration.json'));
const cookieConfiguration = require(path.join(__dirname, 'files', 'cookies.json'));

module.exports = {
  common: configuration,
  cookie: cookieConfiguration
};
