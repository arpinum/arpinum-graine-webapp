"use strict";

var $ = require("jquery");
var bootstrap = require("bootstrap");
var angular = require("angular");
var concept = require("./concept");

angular.module("app", ["ngResource", "configuration", concept.name])
    .config(["$httpProvider", function ($httpProvider) {
        $httpProvider.interceptors.push("IntercepteurConfiguration");
    }])
    .factory("IntercepteurConfiguration", ["$q", "$rootScope", "configuration", function ($q, $rootScope, configuration) {
        return {
            "request": function (config) {
                config.url = configuration.urlApi + config.url;
                return config || $q.when(config);
            }
        };
    }]);