/**
 * Created by Pawel on 9/06/2016.
 */
app.controller('Player', ['$scope', '$state', '$sce', '$stateParams', '$timeout', 'dbCommunication', function ($scope, $state, $sce, $stateParams, $timeout, dbCommunication) {

    dbCommunication.getMovieDB().success(function (data) {
        $scope.allMovies = data;
        console.log($scope.allMovies);
        $scope.movieDetails = $scope.allMovies.entries[$stateParams.movieID];
        $scope.setMovie();
        dbCommunication.addToHistory($scope.movieDetails);
    });

    $scope.setMovie = function() {
        $scope.config = {
            sources: [
                {
                    src: $sce.trustAsResourceUrl($scope.movieDetails.contents[0].url),
                    type: "video/" + $scope.movieDetails.contents[0].format
                }
            ],
            tracks: [
                {
                    src: "http://www.videogular.com/assets/subs/pale-blue-dot.vtt",
                    kind: "subtitles",
                    srclang: "en",
                    label: "English",
                    default: ""
                }
            ],
            theme: "bower_components/videogular-themes-default/videogular.css",
            plugins: {
                poster: "http://www.videogular.com/assets/images/videogular.png"
            }
        };
    }

    $scope.goToHomePage = function(){
        $state.go('home');
    }



}]);