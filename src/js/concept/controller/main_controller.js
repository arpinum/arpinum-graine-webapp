"use strict";

export default class MainController {

    /* @ngInject */
    constructor($scope) {
        this.$scope = $scope;
        $scope.test = "toto";
        $scope.message = "Ceci est votre première application ou pas";
    }

    emitQuelqueChose() {
        this.$scope.$emit("ploc");
    }

}