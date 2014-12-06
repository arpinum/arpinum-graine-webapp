"use strict";
var chai = require("chai"),
    expect = chai.expect,
    sinon = require("sinon"),
    sinonChai = require("sinon-chai");

chai.use(sinonChai);

describe("Une première spec", function () {

    var controller, $scope;

    beforeEach(function () {
        $scope = {};
        var MainController = require("./main_controller");
        controller = new MainController($scope);
    });

    it("doit être défini", function () {
        expect(controller).to.be.defined;
    });

    it("doit parler au scope", function () {
        expect($scope.test).to.equal("toto");
    });

    it("doit pouvoir spy le scope", function () {
        $scope.$emit = sinon.spy();

        controller.emitQuelqueChose();

        expect($scope.$emit).to.have.been.called;
    });
});