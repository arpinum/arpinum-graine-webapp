"use strict";
var expect = require("chai").expect;

describe("Une première spec", function () {

    var controller, $scope;

    beforeEach(function () {
        $scope = {};
        controller = require("./main_controller")($scope);
    });

    it("doit être défini", function () {
        expect(controller).to.be.defined;
    });

    it("doit parler au scope", function () {
        expect($scope.test).to.equal("toto");
    });
});