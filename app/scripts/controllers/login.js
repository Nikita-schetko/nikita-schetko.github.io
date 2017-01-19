'use strict';
  
angular.module('Authentication')
  
.controller('LoginController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService',
    function ($scope, $rootScope, $location, AuthenticationService) {
        // reset login status
        AuthenticationService.ClearCredentials();
  
        $scope.login = function () {
            $scope.dataLoading = true;
            AuthenticationService.Login($scope.username, $scope.password, function(response) {
                console.log(response);
                if(response.statusText === 'OK') {
                    // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
                    AuthenticationService.SetCredentials($scope.username, $scope.password, response.data.auth_token);
                    // jscs:enable requireCamelCaseOrUpperCaseIdentifiers
                    $rootScope.logged = true;
                    $location.path('/');
                } else {
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            });
        };
    }]);