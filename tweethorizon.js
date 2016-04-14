"use strict";

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var api = require('./routes/api');
var LeaderboardService = require('./service/leaderboardService');
var leaderboardService = new LeaderboardService();

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', api);
app.use('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/views/index.html'));
});
app.use(function (req, res) {
    res.status(404).end();
});

// Config
app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + server.address().port);
});

var io = require('socket.io')(server);
leaderboardService.registerSocket(io);
io.on('connection', function (socket) {
    console.log("Leaderboard Feed.");
});

module.exports = app;
