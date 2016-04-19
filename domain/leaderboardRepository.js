"use strict";

var LeaderboardRepository = (function () {

    var instance = undefined;

    function init(datastore) {

        var db = null;

        if (datastore) {
            db = datastore
        } else {
            var Datastore = require('nedb');
            db = new Datastore();
        }

        function get(onSuccess) {
            db.find({}, function (err, leaderboard) {
                if (err) {
                    throw new Error(err);
                }

                onSuccess(leaderboard);
            });
        }

        function add(user, onSuccess) {
            db.insert({ handle: user.handle, score: user.score }, function (err, result) {
                if (err) {
                    throw new Error(err);
                }

                onSuccess(result);
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

        return {
            get: get,
            add: add,
            dropLastPlace: dropLastPlace
        };
    };

    return {
        getInstance: function (datastore) {
            if (instance === undefined || datastore !== undefined) {
                instance = init(datastore);
            }
            return instance;
        }
    };
})();

module.exports = LeaderboardRepository;
