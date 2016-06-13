var mysql = require('mysql');
var cookieParser = require('cookie-parser');
var express = require('express');
var app = module.exports = express();
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var request = require('request');

app.use(cookieParser());

var db_options = {
    host: 'localhost',
    //port: 3306,
    user: 'pawel',
    password: 'pawelch',
    database: 'accedo_db'
};

var optionsss = {
    host: 'localhost',
    //port: 3306,
    user: 'pawel',
    password: 'pawelch',
    database: 'accedo_db',
    schema: {
        tableName: 'sessions',
        columnNames: {
            sessions_id: 'sessions_id',
            expires: 'expires',
            data: 'data'
        }
    }
};

var method = db.prototype;

function db() {
    var con = mysql.createPool(db_options);
    this.connection = con;
}

method.getcon = function () {
    return this;
};

module.exports = db;
var connection_object = new db();
var db_connection = connection_object.connection;

function getSesisonIDfromCookie(myCookie) {
    myCookie = myCookie.substring(myCookie.indexOf(':') + 1, myCookie.indexOf('.'));
    return myCookie;
}

app.get('/allMovies', function(req,res){
    request('https://demo2697834.mockable.io/movies', function (err, response, body) {
        if (!err && response.statusCode == 200) {
            console.log(body);
            res.end( body);
        }
    });
})

app.get('/load', function (req, res) {
    console.log('load');
    db_connection.query("SELECT * from sessions", function (err, rows) {
        if (err) {
            console.log("Problem with MySQL" + err);
        }
        else {
            res.end(JSON.stringify(rows));
        }
    });
});

app.get('/getHistory', function (req, res) {
    var sessionID = getSesisonIDfromCookie(req.cookies['video-session']);
    console.log(sessionID);
    db_connection.query('SELECT * FROM `history` WHERE `session_id`="' + sessionID + '" ORDER BY DATE_FORMAT(created, "%d") DESC, DATE_FORMAT(created, "%h")  ASC', function (err, rows) {
        if (err) {
            console.log("Problem with MySQL" + err);
        }
        else {
            res.end(JSON.stringify(rows));
        }
    })
});


app.get('/addToHistory', function (req, res) {
    console.log('addToHistory');
    var movieID = req.query.movieID;

    var sessionID = getSesisonIDfromCookie(req.cookies['video-session']);
    checkIfExist();

    function checkIfExist() {
        db_connection.query('SELECT * FROM `history` WHERE `session_id`="' + sessionID + '" AND `movie_id`="' + movieID + '"', function (error, rows) {
            if (error) {
                console.log('Problem with MySQL' + error);
            } else {
                if (rows.length >= 1) {
                    updateExisting();
                } else {
                    createNew();
                }
            }
        })
    }

    function createNew() {
        db_connection.query('INSERT INTO `history` (`session_id`, `movie_id`) VALUES ("' + sessionID + '", "' + movieID + '")', function (error, rows) {
            if (error) {
                console.log('Problem with MySQL' + error);
            } else {
                res.end();
            }
        })
    }

    function updateExisting() {
        db_connection.query('UPDATE history SET created=NOW() WHERE `session_id`="' + sessionID + '" AND `movie_id`="' + movieID + '"', function (error, rows) {
            if (error) {
                console.log('Problem with MySQL' + error);
            } else {
                res.end();
            }
        })
    }

});

var connection = mysql.createConnection(db_options);
var sessionStore = new MySQLStore(optionsss, connection);

app.use(session({
    name: 'video-session',
    secret: 'thisidasnkjcmsxhodsjafasd89fdashojnva',
    cookie: {maxAge: 365 * 24 * 60 * 60 * 1000, httpOnly: false, secure: false},
    resave: true,
    saveUninitialized: true,
    store: sessionStore
}));

app.use('/js', express.static(__dirname + '/app/js'));
app.use('/bower_components', express.static(__dirname + '/app/bower_components'));
app.use('/css', express.static(__dirname + '/app/css'));
app.use('/partials', express.static(__dirname + '/app/partials'));
app.use('/views', express.static(__dirname + '/app/views'));
app.use('/components', express.static(__dirname + '/app/components'));
app.use('/images', express.static(__dirname + '/app/images'));

app.use(function (req, res) {
    console.log(req.session.id)
    res.sendFile(__dirname + '/app/index.html')
});

app.listen(process.env.PORT || 8080, function () {
    console.log("Server is listening ");
});
