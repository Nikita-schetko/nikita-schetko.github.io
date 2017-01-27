'use strict';
/**
 * @ngdoc function
 * @name angularVideoAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularVideoAppApp
 */
// /// <reference path="../../../typings/index.d.ts" />

angular.module('personalModule')
    .controller('PersonalCtrl', function($scope, $rootScope, $http, $sce, $timeout, $location, AuthenticationService, toastr) {
        $scope.items = [];
        $scope.dataLoaded = false;
        $scope.getUserData = function()
        {
             var searchParams = $location.search();
             console.log($location);
             $http.get('https://le-taste.herokuapp.com/api/v1/movies/?opinion='+searchParams.opinion).then(function(response) {
                $scope.items = response.data;
                $scope.dataLoaded = true;
                console.log($scope.items);
                });
        };
        $scope.trustSrc = function(src) {
            return $sce.trustAsResourceUrl(src);
        };
    });