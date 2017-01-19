'use strict';
 
angular.module('HomeTest')
 
.controller('HomeController',
    ['$scope', 'AuthenticationService',
    function ($scope, AuthenticationService) {
      
      $scope.logOut = function() 
      {
          AuthenticationService.ClearCredentials();
      };
    }]);