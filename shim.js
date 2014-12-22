module.exports = {
    "angular": {
        "exports": "angular",
        "depends": {jquery: "jQuery"}
    },
    "angular-resource": {
        "depends": {
            "angular": "angular"
        },
        "exports": "angular.module('ngResource').name"
    },
    "bootstrap": {
        "depends": {
            "jquery": "jQuery"
        }
    },
    "angular-bootstrap": {
        "depends": {
            "angular": "angular",
            "bootstrap": null
        },
        "exports": "angular.module('ui.bootstrap').name"
    }
};