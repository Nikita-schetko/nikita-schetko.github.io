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
                    $rootScope.logged = true;
                    $location.path('/');
                } else {
                    $scope.error = response.data.non_field_errors;
                    $scope.dataLoading = false;
                }
            });
        };
    //   $scope.logout = function() {
    //     Facebook.logout(function() {
    //       $scope.$apply(function() {
    //         $scope.user   = {};
    //         $scope.logged = false;  
    //       });
    //     });
    //   };
    //     $scope.fbSignIn = function() {

    //         Facebook.getLoginStatus(function (response) {
    //             if (response.status === 'connected') {
    //                 $scope.loggedIn = true;
    //                 console.log('already connected!');
    //                 console.log(response);
    //             } else {
    //                 $scope.loggedIn = false;
    //                 Facebook.login(function (response) {
    //                     if (response.status === 'connected') {
    //                         $scope.loggedIn = true;
    //                         console.log('first time connected!');
    //                         console.log(response);
    //                     }
    //                 });
    //             }
    //         });
    //    };       
    }]);
    // jscs:enable requireCamelCaseOrUpperCaseIdentifiers