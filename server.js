"use strict";

var express = require("express"),
    path = require("path"),
    i18n = require("i18next");
var morgan = require("morgan");
var serveStatic = require("serve-static");


var app = express();


console.log("Configuration de l'application pour l'environnement " + app.get("env"));

if ("development" === app.get("env")) {
    app.locals.apiUrl = "http://localtest.me:8080";
    app.use(morgan("combined"));
}

if ("staging" === app.get("env")) {
    app.locals.apiUrl = "http://jamshake-api-itg.arpinum.fr";
}

if ("production" === app.get("env")) {
    app.locals.apiUrl = "http://jamshake.com";
}

i18n.serveClientScript(app)
    .serveDynamicResources(app);

app.set("views", path.join(__dirname, "/vues"));
app.set("view engine", "jade");
app.use(serveStatic(__dirname + "/public/"));

require("./routes")(app);

i18n.registerAppHelper(app);

var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log("Écoute sur le port " + port);
});