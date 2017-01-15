'use strict';

/**
 * @ngdoc function
 * @name angularVideoAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularVideoAppApp
 */
angular.module('angularVideoAppApp')
  .controller('MainCtrl', function ($scope, $http, $sce) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.items = [];
    // $scope.items[0] = { title: 'Basic title', tagline: 'basic tagline', plot: 'test', trailerEmbed: 'https://www.youtube.com/embed/1MhPz88bqig' };
    // trailer: 'http://youtube.com/watch?v=1MhPz88bqig'
    $scope.currentItem = {};
    $scope.currentPosition = 0;
    $scope.$watch('currentPosition', function (newValue, oldValue) {
      console.log('Старое значение - ' + oldValue + ', новое значение - ' + newValue);
      $scope.currentItem = $scope.items[$scope.currentPosition];
    });

    $scope.nextItem = function () {
      //Check, if we are at the end of array
      $scope.currentPosition = ($scope.currentPosition === $scope.items.length - 1) ? 0 : $scope.currentPosition + 1;
    };

    $scope.prevItem = function () {
      //Check, if we are at the beginning of array
      $scope.currentPosition = ($scope.currentPosition === 0) ? $scope.currentPosition = $scope.items.length - 1 : $scope.currentPosition - 1;
    };

    $scope.trustSrc = function (src) {
      return $sce.trustAsResourceUrl(src);
    };

    $scope.sendRequest = function () {
      $http.get('https://le-taste.herokuapp.com/api/v1/movies/').then(function (response) {
        console.log(response);
        $scope.items = response.data;
        //Generating url for embed youtube videos
        for (var i = 0; i < $scope.items.length - 1; i++) {
          var rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
          var youtubeBaseURL = 'https://youtube.com/embed/';
          var videoId = '';
          var matchedArray = [];
          var currentElement = $scope.items[i];
          if (currentElement.trailer === null)
          { break; }
          matchedArray = currentElement.trailer.match(rx);
          currentElement.trailerEmbed = youtubeBaseURL + matchedArray[1];
        }
        $scope.currentItem = $scope.items[0];
      });
    };

    $scope.initilizeSlider = function () {
      $('.your-class').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
          // You can unslick at a given breakpoint now by adding:
          // settings: 'unslick'
          // instead of a settings object
        ]
      });
    };
  });
