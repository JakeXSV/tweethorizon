"use strict";

var LeaderboardRepository = (function () {
    var instance;

    function init() {

        var Datastore = require('nedb');
        var db = new Datastore();

        var socket = null;
        var countCache = 0;

        function registerSocket(socketToRegister) {
            socket = socketToRegister;
        }

        function emit() {
            if (socket !== null) {
                db.find({}, function (err, leaderboard) {
                    if (err) {
                        throw new Error(err);
                    }

                    socket.emit('leaderboard', leaderboard);
                });
            }
        }

        function get(onSuccess) {
            db.find({}, function (err, leaderboard) {
                if (err) {
                    throw new Error(err);
                }

                onSuccess(leaderboard);
            });
        }

        function dropLastPlace(onSuccess) {
            db.find({}, function (err, users) {
                if (err) {
                    throw new Error(err);
                }

                var lastPlace = users[0];
                users.forEach(function (user) {
                    if (user.score < lastPlace.score) {
                        lastPlace = user;
                    }
                });

                db.remove({ _id: lastPlace._id }, {}, function (err, numRemoved) {
                    if (err) {
                        throw new Error(err);
                    }

                    onSuccess();
                });
            });
        }

        function add(user, onSuccess) {
            db.insert({ handle: user.handle, score: user.score }, function (err, result) {
                if (err) {
                    throw new Error(err);
                }

                onSuccess();
            });
        }

        function update(handle, score) {
            if (countCache < 2) {
                add({ handle: handle, score: score}, function () {
                    countCache++;
                    emit();
                });
            } else {
                dropLastPlace(function () {
                    add({ handle: handle, score: score}, function () {
                        emit();
                    });
                })
            }
        }

        return {
            registerSocket: registerSocket,
            get: get,
            update: update
        };
    };

    return {
        getInstance: function () {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    };
})();

module.exports = LeaderboardRepository;
