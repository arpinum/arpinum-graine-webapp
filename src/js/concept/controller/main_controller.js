"use strict";

module.exports = MainController;

/* @ngInject */
function MainController($scope) {
    $scope.test = "toto";
    $scope.message = "Ceci est votre première application ou pas";
    this.emitQuelqueChose = function () {
        $scope.$emit("Test");
    };
}