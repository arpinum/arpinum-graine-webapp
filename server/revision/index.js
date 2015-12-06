'use strict';

class Revision {
  constructor(mapFile, staticAssets) {
    this.mapFile = mapFile;
    this.staticAssets = staticAssets;
  }

  register(app) {
    app.locals.revision = this._createRevision(app.get('env') !== 'development');
  }

  _createRevision(prod) {
    let loader = this._createLoader(prod);
    return function (bundle, type) {
      return loader(bundle, type);
    }
  }

  _createLoader(prod) {
    var self = this;
    if (!prod) {
      return (bundle, type) => {
        return `${self.staticAssets}/${bundle}.${type}`;
      }
    }
    return (bundle, type) => {
      return require(self.mapFile)[bundle][type];
    }
  }
}

module.exports = Revision;

