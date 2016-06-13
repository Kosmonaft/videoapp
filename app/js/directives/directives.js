/**
 * Created by Pawel on 9/06/2016.
 */
app.directive('keyTrap', function () {
    return function (scope, elem) {
        elem.bind('keydown', function (event) {
            scope.$broadcast('keydown', {code: event.keyCode});
        })
    }
})


app.directive('imageonload', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
           /*
           element.bind('load', function() {
                console.log('image is loaded');
            });
            element.bind('error', function(){
                console.log('image could not be loaded');
            });
            */
        }
    };
});

app.directive('myCarousel', function(){
    var controller = ['$scope', '$state', function($scope, $state){
        /*
        $scope.$watch('movies', function(newValue, oldValue){
        });
        */
        $scope.playMovie = function(index){
            $state.go('player', {movieID: index})
        }

        $scope.focusIndex = 0;
        $scope.keys = [];
        $scope.keys.push({
            code: 13, action: function () {
                $scope.playMovie($scope.focusIndex);
            }
        });
        $scope.keys.push({
            code: 37, action: function () {
                $scope.rightButton();
            }
        });
        $scope.keys.push({
            code: 100, action: function () {
            }
        });
        $scope.keys.push({
            code: 39, action: function () {
                $scope.leftButton();
            }
        });

        $scope.keys.push({
            code: 102, action: function () {
                $scope.leftButton();
            }
        });

        $scope.leftButton = function () {
            if ($scope.focusIndex < $scope.movies.length - 1) {
                $scope.focusIndex++;
                if ($scope.carouselData.lastItem < $scope.focusIndex) {
                    $scope.rotate('left');
                }
            }
        }

        $scope.rightButton = function () {
            if ($scope.focusIndex > 0) {
                $scope.focusIndex--;
                if ($scope.carouselData.firstItem > $scope.focusIndex ) {
                    $scope.rotate('right');
                }
            }
        }

        $scope.$on('keydown', function (msg, obj) {
            var code = obj.code;
            
            $scope.keys.forEach(function (o) {
                if (o.code !== code) {
                    return;
                }
                //if($scope.focusIndex)
                o.action();
                $scope.$apply();
            });
        });

        $scope.changeFocus = function (index) {
            $scope.focusIndex = index;
        }

        //Carousel
        $scope.carouselData = {};
        $scope.carouselData.visibleItems = 6;
        $scope.carouselData.firstItem = 0;
        $scope.carouselData.lastItem = $scope.carouselData.firstItem + $scope.carouselData.visibleItems - 1;

        $(window).on('resize', function () {
            var win = $(this);
            if (win.width() < 1200) {
                $(".container.my-carousel ul").css('left', 0);
                $scope.carouselData.firstItem = 0;
            }
        })

        $scope.rotate = function (side) {
            var carouselPosition = $(".container.my-carousel ul").offset().left;
            var carouselParentPos = $(".container.my-carousel ul").parent().offset().left;
            var carouselWidth = $(".container.my-carousel ul").width();
            var elementWidth = $(".container.my-carousel ul li").outerWidth(true);
            var newPosition = 0;
            var moveLeft = '=0px';
            if (side === 'left') {
                if (($scope.carouselData.visibleItems * elementWidth + Math.abs(carouselPosition) + carouselParentPos) >= carouselWidth || $scope.carouselData.lastItem === $scope.movies.length-1) {
                    return;
                }
                moveLeft = '-=195px';
                $scope.carouselData.firstItem++;
                $scope.carouselData.lastItem++;
            } else {
                if (carouselPosition - carouselParentPos == 0 || $scope.carouselData.firstItem === 0) {
                    return;
                }
                moveLeft = '+=195px';

                //moveLeft = '+=195px';
                $scope.carouselData.firstItem--;
                $scope.carouselData.lastItem--;
            }
            if($scope.carouselData.firstItem > $scope.focusIndex){
                $scope.focusIndex = $scope.carouselData.firstItem;
            }else if($scope.carouselData.lastItem < $scope.focusIndex){
                $scope.focusIndex = $scope.carouselData.lastItem;
            }
            console.log($scope.carouselData);
            $(".container.my-carousel ul").animate({left: moveLeft});
        }

    }];

    return{
        restrict: 'EA',
        templateUrl: '../views/myCarousel.html',
        scope: {
            movies: "="
        },
        controller: controller
    }
})