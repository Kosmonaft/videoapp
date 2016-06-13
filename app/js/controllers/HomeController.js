/**
 * Created by Pawel on 8/06/2016.
 */
app.controller('Home', ['$scope', '$state', '$timeout', 'dbCommunication', function ($scope, $state, $timeout, dbCommunication) {

    dbCommunication.getMovieDB().success(function (data) {
        $scope.allMovies = data;
        console.log($scope.allMovies);
    });

    $timeout(function () {
        $scope.containerHeight = $('.item').height();
    }, 0);
}]);
