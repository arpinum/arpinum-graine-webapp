[ ![Codeship Status for arpinum/arpinum-graine-webapp](https://www.codeship.io/projects/19b0b830-a45b-0131-4116-52e8d0ff4a23/status?branch=master)](https://www.codeship.io/projects/18666)

# Arpinum Graine - Webapp

## Le but 

Ce projet est la base de travail pour la partie webapp des applications Arpinum. 

## Dev

```bash
npm install -g grunt-cli
npm install grunt
```

## Faire un build de prod

grunt build --prod

## Tâches

| Nom | Description | Options |
|-----|-------------|---------|
| default | construit le site, lance les tests, jshint, et surveille les changements||
| js |Construit vendor.js et les app | --watch pour autoconstruire les changements |
| build | Construit tout le site | --prod pour minifier le tout |
| test | ne fait que lancer les tests et jshint ||
| ci | tâche pour l'intégration continue, jshint et tests avec rapport junit ||


## Browserify et dépendances clients

En utilisant browserify, nous favorisons le plus possible des libs disponibles dans NPM.

Si ce n'est pas le cas ou pas pratique, nous utilisons bower. Nous mettons alors dans package.json ce qu'il faut dans la partie browser et shim pour faire le pont.

Le JS est séparé en deux fichiers : vendor, et app. Nous pouvons cependant construire automatiquement plus de modules.
Les libs sont mises à part, car étant donné qu'elles changent moins souvent, nous ne voulons par forcer les clients à retélécharger un énorme js dès que nous changeons notre propre code.

### Ajouter une dépendance via bower

 * Mettre à jour package.json, en ajouter l'entrée browser qui convient
 * Éventuellement ajouter de la configuration dans shim.js
 * Toutes les dépendances misent dans shim sont pour le moment packagés dans vendor

## Écrire des tests unitaires

Grâce à browserify, notre code js côté client ne dépend pas d'angular, ni de rien venant du navigateur. Nous pouvons donc lancer les tests directement dans node.
Les fichiers de tests sont à placer à côté du ficher qu'ils valident, et à suffixer par **_spec**

## Organisation du code client

 * Les specs sont à côté du fichier quelles testent.
 * Les modules sont organisées par notions métiers
 * Chaque module expose un index.js, qui contient la plomberie angular. Il suffit de dépendre de cet index pour avoir la totalité du module à disposition (pas de dépendances aux fichiers du module).
 * ngAnnotate est utilisé pour gérer automatiquement l'injection angular. En revanche, vu notre manière d'importer, il faut absolument passer par l'annotation ngAnnotate

## Configuration heroku

- Run `heroku config:add BUILDPACK_URL=https://github.com/appstack/heroku-buildpack-nodejs-gulp.git`
- Run `heroku config:set NODE_ENV=production` to set your environment to `production` (or any other name)

## Licence

La licence reste pour le moment à définir, faites ce que vous voulez. 
 
 


