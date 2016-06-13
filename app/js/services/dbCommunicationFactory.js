/**
 * Created by Pawel on 11/06/2016.
 */
app.factory('dbCommunication', ['$http', function ($http) {

    var obj = {};
    obj.MovieDB;

    obj.addToHistory = function(movieDetails){
        console.log('call');
        $http.get('http://localhost:8080/addToHistory?movieID='+movieDetails.id).success(function(data){
            console.log(data);
        })

        return;
    }

    obj.getHistory = function(){
        return $http.get('http://localhost:8080/getHistory').success(function(data){
            console.log(data);
            return data;
        });

    }

   obj.getMovieDB = function(){
        if(obj.MovieDB){
            return obj.MovieDB
        }
        obj.MovieDB = $http.get('http://localhost:8080/allMovies');
        return obj.MovieDB;
    }

    return obj;

}]);