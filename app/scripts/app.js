'use strict';

/**
 * @ngdoc overview
 * @name angularVideoAppApp
 * @description
 * # angularVideoAppApp
 *
 * Main module of the application.
 */
angular
  .module('angularVideoAppApp', []).directive('initilizeSlider', function() {
  return function(scope, element, attrs) {
    angular.element(element).css('color','blue');
    if (scope.$last){
      scope.initilizeSlider();
    }
  };
});