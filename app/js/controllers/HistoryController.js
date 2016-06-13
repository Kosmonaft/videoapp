/**
 * Created by Pawel on 8/06/2016.
 */
app.controller('History', ['$scope', 'dbCommunication', function ($scope, dbCommunication) {

    dbCommunication.getMovieDB().success(function (data) {
        $scope.allMovies = data.entries;
        //console.log($scope.allMovies);
        $scope.getHistory();
    });


    $scope.getHistory = function () {
        var historyPromise = dbCommunication.getHistory();
        historyPromise.then(function (result) {
            $scope.userHistory = result.data;
            for (var i = 0; i < $scope.userHistory.length; i++) {
                for (var j = 0; j < $scope.allMovies.length; j++) {
                    if ($scope.userHistory[i].movie_id === $scope.allMovies[j].id) {
                        $scope.userHistory[i].idInMasterArray = j;
                        $scope.userHistory[i].posterUrl = $scope.allMovies[j].images[0].url;
                        $scope.userHistory[i].title = $scope.allMovies[j].title;
                        $scope.userHistory[i].categories = $scope.allMovies[j].categories;
                        break;
                    }
                }
            }
            // console.log($scope.userHistory);
        });
    }

    $scope.random = function () {
        return 0.5 - Math.random();
    }

}]);

app.filter('sameCategory', function () {

    if (category === firstCategory) {
        return true;
    }
    return false;

})