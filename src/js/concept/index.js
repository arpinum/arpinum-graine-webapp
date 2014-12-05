"use strict";
module.exports = require("angular").module("concept", [])
    .controller("MainController", ["$scope", require("./controller/main_controller")]);

