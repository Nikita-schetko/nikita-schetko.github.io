angular.module("iconsList", [])
.directive("iconsList", function () {
                return {
                    
                    link: function (scope, element, attributes) {
                        scope.data = scope[attributes["iconsList"]];
                        scope.propertyName = attributes["iconName"] || 'DisplayName';
                        scope.propertyLink = attributes["iconLink"] || 'Path';
                        scope.propertyImage = attributes["iconImage"];
                        
                    },
                    restrict: "EA",
                    replace: true,
                    scope: true,
                    // шаблон для создания разметки
                    template: "<div class='flexible-cont' ><div class='flexible-cont__flex-item' ng-repeat='item in data'> <a href='{{item[propertyLink]}}' class='flexible-cont__link'> <img class='flexible-cont__icon-img' ng-src='{{item[propertyImage] || \"http://placehold.it/64x64\"}}'><div class='flexible-cont__icon-title'> {{item[propertyName]}}</div> </a></div></div>"
                }
            });
