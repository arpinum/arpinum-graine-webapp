var expect = require('chai').use(require('sinon-chai')).expect;
var sinon = require('sinon');
import MainController from './main_controller';

describe('Une première spec', function () {

  var controller, $scope;

  beforeEach(function () {
    $scope = {};

    controller = new MainController($scope);
  });

  it('doit parler au scope', function () {
    expect($scope.test).to.equal('toto');
  });

  it('doit pouvoir spy le scope', function () {
    $scope.$emit = sinon.spy();

    controller.emitQuelqueChose();

    expect($scope.$emit).to.have.been.called;
  });
});
