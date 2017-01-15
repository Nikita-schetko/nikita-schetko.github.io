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
  .module('angularVideoAppApp', []).filter('youtubeEmbed', function () {
    // value - данные для которых применяется фильтр
    // toUpper - аргумент передаваемый фильтру
    return function (value, toUpper) {
        // проверка переменной value на наличие строки
        if (angular.isString(value)) {
            var processedValue = toUpper ? value.toUpperCase() : value.toLowerCase();
            return processedValue;
        } else {
            return value;
        }
    };
});
