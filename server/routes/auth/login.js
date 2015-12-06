'use strict';

var i18n = require('i18next');
var auth = require('../../auth/index');
var cookies = require('../../auth/cookies');

exports.register = function (app) {
  app.get('/login', index);
  app.post('/login', post);
  app.post('/logout', logout);
};

function index(req, res) {
  res.render('login', {
    pageClass: 'login page_form',
    title: i18n.t('app.login.title'),
    destinationPage: req.query.page || '/'
  });
}

function post(req, res) {
  var params = req.body;
  if (params.method === 'jamshake') {
    auth.authenticateWithCredentials(params.email, params.password)
      .then(success)
      .catch(error);
  } else {
    auth.authenticateWithFacebook(params.token)
      .then(success)
      .catch(error);
  }

  function success(token) {
    cookies.setSession(res, token);
    res.status(200).send();
  }

  function error(response) {
    res.status(response.status).send(response.error);
  }
}

function logout(req, res) {
  cookies.resetSession(res);
  res.status(200).send();
}

