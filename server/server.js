"use strict";

let express = require("express"),
    path = require("path"),
    i18n = require("i18next");
let morgan = require("morgan");
let serveStatic = require("serve-static");
let revision = require("./revision");


class Server {
    constructor() {
        this.app = express();
        i18n.serveClientScript(this.app)
            .serveDynamicResources(this.app);

        this.app.set("views", path.join(__dirname, "vues"));
        this.app.set("view engine", "jade");
        this.app.use(serveStatic(path.join(__dirname, "public")));
        require("./routes")(this.app );
        revision.registerHelper(this.app, path.join(__dirname, "public", "app", "map.json"));
        i18n.registerAppHelper(this.app);
    }

    start() {
        console.log("Configuration de l'application pour l'environnement " + this.app.get("env"));
        let port = process.env.PORT || 5000;
        this.app.listen(port, function () {
            console.log("Écoute sur le port " + port);
        });
    }
}

module.exports = Server;



if (require.main === module) {
    return new Server().start();
}
