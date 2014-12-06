"use strict";

module.exports = function ($scope) {

    $scope.test = "toto";

    this.emitQuelqueChose = function () {
        $scope.$emit("Test");
    };
};