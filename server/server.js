'use strict';

let express = require('express');
let path = require('path');
let i18n = require('i18next');
let serveStatic = require('serve-static');
let Revision = require('./revision');

class Server {
  constructor() {
    this.app = express();
    i18n.serveClientScript(this.app)
      .serveDynamicResources(this.app);
    this.app.set('views', path.join(__dirname, 'vues'));
    this.app.set('view engine', 'jade');
    this.app.use(serveStatic(path.join(__dirname, 'public')));
    require('./routes')(this.app);
    new Revision(path.join(__dirname, 'public', 'app', 'map.json'), 'app').register(this.app);
    i18n.registerAppHelper(this.app);
  }

  start() {
    console.log(`Configuration de l'application pour l'environnement ${this.app.get('env')}`);
    let port = process.env.PORT || 5000;
    this.app.listen(port, function () {
      console.log('Écoute sur le port ' + port);
    });
  }
}

if (require.main === module) {
  new Server().start();
}

module.exports = Server;
